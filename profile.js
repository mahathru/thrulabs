// Thrulabs User Profile & Database Manager
const profileManager = {
    async getProfile(userId) {
        try {
            // Attempt to fetch from Supabase user_profiles table
            const { data, error } = await supabaseClient
                .from('user_profiles')
                .select('*')
                .eq('id', userId)
                .single();
                
            if (!error && data) {
                // Cache locally
                this._cacheProfile(data);
                return data;
            }
        } catch (e) {
            console.warn("Database profiles query failed. Falling back to local session cache.", e);
        }
        
        // Fallback: load from localStorage cached user
        const localUser = localStorage.getItem('thru_user');
        if (localUser) {
            try {
                const parsed = JSON.parse(localUser);
                return {
                    id: userId,
                    full_name: parsed.name || '',
                    first_name: parsed.first_name || '',
                    last_name: parsed.last_name || '',
                    email: parsed.email || '',
                    avatar_url: parsed.avatar || '',
                    certificate_name: parsed.certificateName || parsed.name || ''
                };
            } catch (e) {}
        }
        return null;
    },

    async upsertProfile(userId, profileData) {
        const fullName = profileData.full_name || `${profileData.first_name || ''} ${profileData.last_name || ''}`.trim() || 'Thrulabs User';
        const certificateName = profileData.certificate_name || profileData.certificateName || fullName;
        
        const payload = {
            id: userId,
            full_name: fullName,
            first_name: profileData.first_name || '',
            last_name: profileData.last_name || '',
            email: profileData.email || '',
            avatar_url: profileData.avatar_url || profileData.avatar || '',
            certificate_name: certificateName,
            updated_at: new Date().toISOString()
        };

        // Cache locally immediately to ensure UI is updated
        this._cacheProfile(payload);

        // Update auth metadata for redundancy
        try {
            await supabaseClient.auth.updateUser({
                data: {
                    full_name: fullName,
                    first_name: payload.first_name,
                    last_name: payload.last_name,
                    certificate_name: certificateName,
                    avatar_url: payload.avatar_url
                }
            });
        } catch(e) {
            console.warn("Failed to update auth user metadata.", e);
        }

        // Upsert to user_profiles table in Supabase
        try {
            const { error } = await supabaseClient
                .from('user_profiles')
                .upsert(payload, { onConflict: 'id' });
            if (error) {
                console.warn("Supabase user_profiles table upsert failed. RLS or missing table?", error);
            }
        } catch (e) {
            console.warn("Database upsert failed.", e);
        }

        return payload;
    },

    _cacheProfile(data) {
        const fallbackUsername = data.email ? data.email.split('@')[0] : 'engineer';
        const userCache = {
            name: data.full_name || `${data.first_name || ''} ${data.last_name || ''}`.trim(),
            username: data.username || fallbackUsername,
            firstName: data.first_name || '',
            first_name: data.first_name || '',
            lastName: data.last_name || '',
            last_name: data.last_name || '',
            email: data.email || '',
            avatar: data.avatar_url || '',
            certificateName: data.certificate_name || data.full_name || '',
            certificate_name: data.certificate_name || data.full_name || ''
        };
        localStorage.setItem('thru_user', JSON.stringify(userCache));
        localStorage.setItem('thrulabs_user_name', userCache.name);
        localStorage.setItem('thrulabs_user_email', userCache.email);
    }
};

window.profileManager = profileManager;
