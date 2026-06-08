// Thrulabs User Profile & Database Manager
// Profile reads always come from Supabase or the in-memory auth.js session cache.
// localStorage is NOT used for profile data persistence.

const profileManager = {
    async getProfile(userId) {
        try {
            // Attempt to fetch from Supabase profiles table
            const { data, error } = await supabaseClient
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();
                
            if (!error && data) {
                // Map the profile to match expected cache format
                const mapped = {
                    ...data,
                    first_name: data.full_name ? data.full_name.split(' ')[0] : '',
                    last_name: data.full_name ? data.full_name.split(' ').slice(1).join(' ') : '',
                    certificate_name: data.full_name || ''
                };
                // Update in-memory cache (not localStorage)
                this._updateMemoryCache(mapped);
                return mapped;
            }
        } catch (e) {
            console.warn("Database profiles query failed. Falling back to in-memory session cache.", e);
        }
        
        // Fallback: use in-memory session cache from auth.js
        const currentUser = window.getCurrentUser ? window.getCurrentUser() : null;
        if (currentUser) {
            return {
                id: userId,
                full_name: currentUser.name || '',
                first_name: currentUser.firstName || '',
                last_name: currentUser.lastName || '',
                email: currentUser.email || '',
                avatar_url: currentUser.avatar || '',
                certificate_name: currentUser.certificateName || currentUser.name || ''
            };
        }
        return null;
    },

    async upsertProfile(userId, profileData) {
        const fullName = profileData.full_name || `${profileData.first_name || ''} ${profileData.last_name || ''}`.trim() || 'Thrulabs User';
        
        const payload = {
            id: userId,
            full_name: fullName,
            email: profileData.email || '',
            avatar_url: profileData.avatar_url || profileData.avatar || '',
            created_at: new Date().toISOString()
        };

        // Update auth metadata for redundancy
        try {
            await supabaseClient.auth.updateUser({
                data: {
                    full_name: fullName,
                    avatar_url: payload.avatar_url
                }
            });
        } catch(e) {
            console.warn("Failed to update auth user metadata.", e);
        }

        // Upsert to profiles table in Supabase
        try {
            const { error } = await supabaseClient
                .from('profiles')
                .upsert(payload, { onConflict: 'id' });
            if (error) {
                console.warn("Supabase profiles table upsert failed. RLS or missing table?", error);
            }
        } catch (e) {
            console.warn("Database upsert failed.", e);
        }

        // Update the in-memory cache maintained by auth.js
        const cachePayload = {
            ...payload,
            first_name: fullName.split(' ')[0] || '',
            last_name: fullName.split(' ').slice(1).join(' ') || '',
            certificate_name: fullName
        };
        this._updateMemoryCache(cachePayload);

        return cachePayload;
    },

    // Updates the in-memory _currentUser cache in auth.js (no localStorage writes)
    _updateMemoryCache(data) {
        const fallbackUsername = data.email ? data.email.split('@')[0] : 'engineer';
        // auth.js exposes _currentUser as module-level; we update it via reassignment
        // through the global currentUser reference if available.
        if (window._currentUser !== undefined) {
            window._currentUser = {
                id: data.id,
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
        }
    }
};

window.profileManager = profileManager;
