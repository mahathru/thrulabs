// THRULABS Certificate Verification & Registry Manager

const certificatesManager = {
    // Fetch user's certificates from Supabase
    async getEarnedCertificates() {
        const userId = window.progressManager ? window.progressManager.getUserId() : null;
        if (!userId || !window.supabaseClient) return [];

        try {
            const { data, error } = await window.supabaseClient
                .from('certificates')
                .select('*')
                .eq('user_id', userId)
                .order('issued_at', { ascending: false });

            if (error) throw error;
            return data;
        } catch (e) {
            console.error("Failed to load user certificates", e);
            return [];
        }
    },

    // Verify certificate ID/Code against database
    async verifyCertificate(code) {
        const searchId = code.toUpperCase().trim();
        if (!searchId) return null;

        if (window.supabaseClient) {
            try {
                const { data, error } = await window.supabaseClient
                    .rpc('verify_certificate', { cert_id: searchId })
                    .maybeSingle();

                if (!error && data) {
                    let courseTitle = data.course_id;
                    if (window.academyData) {
                        const matched = window.academyData.certifications[data.course_id] || 
                                        window.academyData.featuredCourses.find(c => c.id === data.course_id);
                        if (matched) courseTitle = matched.title;
                    }
                    
                    return {
                        name: data.full_name || "Thrulabs Student",
                        program: courseTitle,
                        date: new Date(data.issued_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                        status: "Verified & Active",
                        grade: "Passed with Distinction (100%)",
                        id: data.certificate_id,
                        certificate_url: data.certificate_url
                    };
                }
            } catch (e) {
                console.warn("Database certificate verification RPC failed", e);
            }
        }
        return null;
    },

    // Unlock and generate new certificate entry in Supabase database
    async unlockCertificate(courseId, courseTitle, certIdPrefix) {
        const userId = window.progressManager ? window.progressManager.getUserId() : null;
        if (!userId || !window.supabaseClient) return null;

        const user = window.getCurrentUser();
        const userName = user ? user.name : 'THRULABS Student';

        // Check if certificate already exists for this course & user
        try {
            const { data: existing } = await window.supabaseClient
                .from('certificates')
                .select('*')
                .eq('user_id', userId)
                .eq('course_id', courseId)
                .maybeSingle();

            if (existing) {
                return existing;
            }
        } catch(e) {}

        // Generate ID matching requested format: TL-COURSE-YYYY-XXXXX
        const mapping = {
            "arduino-fundamentals": "ARD",
            "embedded-systems": "EMB",
            "esp32-iot": "IOT",
            "digital-electronics": "DIG",
            "pcb-design": "PCB",
            "uav-drone": "UAV",
            "communication-systems-basics": "COM",
            "introduction-to-embedded": "INT",
            "basic-electronics": "ELC",
            "rtos": "RTOS",
            "aiot": "AIOT",
            "advanced-embedded": "ADV",
            "industry-projects": "IND"
        };
        const courseCode = mapping[courseId] || "GEN";
        const currentYear = new Date().getFullYear();
        const randDigits = Math.floor(10000 + Math.random() * 90000); // 5 digits
        const certId = `TL-${courseCode}-${currentYear}-${randDigits}`;
        const issueDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

        // Generate and upload PDF
        let certificateUrl = null;
        try {
            certificateUrl = await this.generateAndUploadPDF(certId, userName, courseTitle, issueDate);
        } catch (err) {
            console.error("Failed to upload PDF", err);
        }

        const payload = {
            user_id: userId,
            course_id: courseId,
            certificate_id: certId,
            issued_at: new Date().toISOString(),
            certificate_url: certificateUrl
        };

        try {
            const { data, error } = await window.supabaseClient
                .from('certificates')
                .insert(payload)
                .select('*')
                .single();

            if (error) throw error;
            return data;
        } catch (e) {
            console.error("Failed to register certificate to Supabase", e);
            return null;
        }
    },

    // Dynamic PDF generator helper
    async generateAndUploadPDF(certId, studentName, courseTitle, issueDate) {
        if (!window.supabaseClient) return null;
        
        const element = document.createElement('div');
        element.style.width = '800px';
        element.style.height = '568px';
        element.style.position = 'relative';
        element.style.fontFamily = "'Inter', sans-serif";
        element.style.color = '#EDEDEF';
        element.style.backgroundColor = '#020203';
        
        element.innerHTML = `
            <div style="position: absolute; inset: 0; background-image: url('certificate.png'); background-size: cover; background-position: center; pointer-events: none;"></div>
            
            <div style="position: absolute; top: 33.1%; left: 10%; right: 10%; text-align: center; font-size: 24px; font-weight: 800; color: #FFFFFF; font-family: 'Plus Jakarta Sans', sans-serif; letter-spacing: 0.05em;">
                ${studentName}
            </div>

            <div style="position: absolute; top: 50.7%; left: 10%; right: 10%; text-align: center; font-size: 16px; font-weight: 700; color: #7C89FF; font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: 0.1em;">
                ${courseTitle}
            </div>

            <div style="position: absolute; bottom: 14.3%; left: 0; right: 0; font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 700;">
                <div style="position: absolute; left: 21.06%; transform: translateX(-50%); text-align: center; color: #FFFFFF; width: 150px;">
                    ${issueDate}
                </div>
                <div style="position: absolute; left: 50.00%; transform: translateX(-50%); text-align: center; color: #FFFFFF; width: 200px;">
                    ${certId}
                </div>
                <div style="position: absolute; left: 78.75%; transform: translateX(-50%); text-align: center; color: #10B981; width: 150px;">
                    VERIFIED
                </div>
            </div>
        `;

        document.body.appendChild(element);

        const opt = {
            margin:       0,
            filename:     `certificate-${certId}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'px', format: [800, 568], orientation: 'landscape' }
        };

        try {
            if (typeof html2pdf === 'undefined') {
                await new Promise((resolve) => {
                    const script = document.createElement('script');
                    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
                    script.onload = resolve;
                    document.head.appendChild(script);
                });
            }

            const pdfWorker = html2pdf().set(opt).from(element);
            const blob = await pdfWorker.outputPdf('blob');
            
            const userId = window.getCurrentUser()?.id;
            const filePath = `${userId}/${certId}.pdf`;
            
            const { data, error } = await window.supabaseClient.storage
                .from('certificates')
                .upload(filePath, blob, {
                    contentType: 'application/pdf',
                    upsert: true
                });
                
            if (error) throw error;
            
            const { data: publicUrlData } = window.supabaseClient.storage
                .from('certificates')
                .getPublicUrl(filePath);
                
            return publicUrlData?.publicUrl || null;
        } catch (err) {
            console.error("PDF upload failed", err);
            return null;
        } finally {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }
    },

    async downloadCertificatePDF(certId, studentName, courseTitle, issueDate) {
        const element = document.createElement('div');
        element.style.width = '800px';
        element.style.height = '568px';
        element.style.position = 'relative';
        element.style.fontFamily = "'Inter', sans-serif";
        element.style.color = '#EDEDEF';
        element.style.backgroundColor = '#020203';
        
        element.innerHTML = `
            <div style="position: absolute; inset: 0; background-image: url('certificate.png'); background-size: cover; background-position: center; pointer-events: none;"></div>
            
            <div style="position: absolute; top: 33.1%; left: 10%; right: 10%; text-align: center; font-size: 24px; font-weight: 800; color: #FFFFFF; font-family: 'Plus Jakarta Sans', sans-serif; letter-spacing: 0.05em;">
                ${studentName}
            </div>

            <div style="position: absolute; top: 50.7%; left: 10%; right: 10%; text-align: center; font-size: 16px; font-weight: 700; color: #7C89FF; font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: 0.1em;">
                ${courseTitle}
            </div>

            <div style="position: absolute; bottom: 14.3%; left: 0; right: 0; font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 700;">
                <div style="position: absolute; left: 21.06%; transform: translateX(-50%); text-align: center; color: #FFFFFF; width: 150px;">
                    ${issueDate}
                </div>
                <div style="position: absolute; left: 50.00%; transform: translateX(-50%); text-align: center; color: #FFFFFF; width: 200px;">
                    ${certId}
                </div>
                <div style="position: absolute; left: 78.75%; transform: translateX(-50%); text-align: center; color: #10B981; width: 150px;">
                    VERIFIED
                </div>
            </div>
        `;

        document.body.appendChild(element);

        const opt = {
            margin:       0,
            filename:     `certificate-${certId}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'px', format: [800, 568], orientation: 'landscape' }
        };

        try {
            if (typeof html2pdf === 'undefined') {
                await new Promise((resolve) => {
                    const script = document.createElement('script');
                    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
                    script.onload = resolve;
                    document.head.appendChild(script);
                });
            }
            await html2pdf().set(opt).from(element).save();
        } catch (err) {
            console.error("PDF download failed", err);
        } finally {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }
    }
};

window.certificatesManager = certificatesManager;
