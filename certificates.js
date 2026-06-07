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

    // Verify certificate ID/Code against database (and static fallback database)
    async verifyCertificate(code) {
        const searchId = code.toUpperCase().trim();
        if (!searchId) return null;

        // 1. Query Supabase Database
        if (window.supabaseClient) {
            try {
                const { data, error } = await window.supabaseClient
                    .from('certificates')
                    .select('*, user_profiles(certificate_name, full_name)')
                    .or(`certificate_id.eq.${searchId},verification_code.eq.${searchId}`)
                    .maybeSingle();

                if (!error && data) {
                    return {
                        name: data.user_profiles ? (data.user_profiles.certificate_name || data.user_profiles.full_name) : data.certificate_name,
                        program: data.certificate_name,
                        date: new Date(data.issued_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                        status: "Verified & Active",
                        grade: "Passed with Distinction (100%)",
                        id: data.certificate_id
                    };
                }
            } catch (e) {
                console.warn("Database certificate verification query failed", e);
            }
        }

        // 2. Static Fallback database (from original verify.html)
        const staticCertificatesDb = {
            "TL-2026-00001": { name: "Alex Mercer", program: "Arduino Fundamentals Certification", date: "March 15, 2026", status: "Verified & Active", grade: "Distinction (96%)", id: "TL-2026-00001" },
            "TL-2026-00002": { name: "Jane Doe", program: "Embedded Systems Certification", date: "April 2, 2026", status: "Verified & Active", grade: "First Class (88%)", id: "TL-2026-00002" },
            "TL-2026-00003": { name: "Siddharth Sharma", program: "IoT Development Certification", date: "May 10, 2026", status: "Verified & Active", grade: "Distinction (94%)", id: "TL-2026-00003" },
            "TL-2026-00004": { name: "Elena Rostova", program: "PCB Design Certification", date: "January 22, 2026", status: "Verified & Active", grade: "First Class (85%)", id: "TL-2026-00004" },
            "TL-2026-00005": { name: "Marcus Vance", program: "Drone Technology Certification", date: "May 30, 2026", status: "Verified & Active", grade: "Distinction (98%)", id: "TL-2026-00005" },
            "TL-2026-00006": { name: "Lina Chen", program: "Digital Electronics Certification", date: "February 18, 2026", status: "Verified & Active", grade: "First Class (90%)", id: "TL-2026-00006" }
        };

        if (staticCertificatesDb[searchId]) {
            return staticCertificatesDb[searchId];
        }

        // 3. Local storage fallback
        try {
            const localDb = JSON.parse(localStorage.getItem('thrulabs_certificate_database')) || {};
            if (localDb[searchId]) {
                const item = localDb[searchId];
                return {
                    name: item.name,
                    program: item.program,
                    date: item.date,
                    status: item.status,
                    grade: item.grade,
                    id: searchId
                };
            }
        } catch(e) {}

        return null;
    },

    // Unlock and generate new certificate entry in Supabase database
    async unlockCertificate(courseId, courseTitle, certIdPrefix) {
        const userId = window.progressManager ? window.progressManager.getUserId() : null;
        if (!userId || !window.supabaseClient) return null;

        const user = window.getCurrentUser();
        const userName = user ? (user.certificate_name || user.certificateName || user.name) : 'Grounded Engineer';

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

        // Generate ID and code
        const randDigits = Math.floor(100000 + Math.random() * 900000);
        const certId = `${certIdPrefix}-${randDigits}`;
        const verificationCode = `VERIFY-${courseId.toUpperCase().slice(0, 4)}-${randDigits}`;

        const payload = {
            user_id: userId,
            course_id: courseId,
            certificate_id: certId,
            certificate_name: courseTitle + " Certification",
            issued_at: new Date().toISOString(),
            verification_code: verificationCode
        };

        try {
            const { data, error } = await window.supabaseClient
                .from('certificates')
                .insert(payload)
                .select('*')
                .single();

            if (error) throw error;

            // Cache to local cert verification DB
            try {
                const localDb = JSON.parse(localStorage.getItem('thrulabs_certificate_database')) || {};
                localDb[certId] = {
                    name: userName,
                    program: payload.certificate_name,
                    date: new Date(payload.issued_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                    status: "Verified & Active",
                    grade: "Passed with Distinction"
                };
                localStorage.setItem('thrulabs_certificate_database', JSON.stringify(localDb));
            } catch(e){}

            return data;
        } catch (e) {
            console.error("Failed to register certificate to Supabase", e);
            return null;
        }
    }
};

window.certificatesManager = certificatesManager;
