// Account management class
class AccountManager {
    constructor() {
        console.log('Initializing AccountManager');
        this.user = null;
        this.loadFromStorage();
    }

    loadFromStorage() {
        try {
            const userData = localStorage.getItem('taxAssistantUser');
            if (userData) {
                this.user = JSON.parse(userData);
                console.log('User data loaded from storage:', this.user);
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    }

    saveToStorage() {
        try {
            if (this.user) {
                localStorage.setItem('taxAssistantUser', JSON.stringify(this.user));
                console.log('User data saved to storage');
            }
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    }

    login(email, password) {
        console.log('Attempting login for:', email);
        // Simulated login - in a real app, this would validate against a server
        if (!email) {
            throw new Error('Email is required');
        }

        this.user = {
            email: email,
            name: email.split('@')[0],
            lastLogin: new Date().toISOString()
        };
        this.saveToStorage();
        console.log('Login successful, redirecting to dashboard');
        window.location.href = 'index.html';
        return this.user;
    }

    logout() {
        console.log('Logging out user');
        this.user = null;
        localStorage.removeItem('taxAssistantUser');
        window.location.href = 'index.html';
    }

    isLoggedIn() {
        const isLoggedIn = !!this.user;
        console.log('Checking login status:', isLoggedIn);
        return isLoggedIn;
    }

    getProfile() {
        return this.user;
    }

    updateProfile(data) {
        if (this.user) {
            this.user = { ...this.user, ...data };
            this.saveToStorage();
            console.log('Profile updated');
        }
    }
}

// Create and export the account manager instance
window.accountManager = new AccountManager();
console.log('AccountManager initialized and exported');

// For debugging
window.addEventListener('load', () => {
    console.log('Account system ready, manager available:', !!window.accountManager);
    console.log('Current user:', window.accountManager.getProfile());
});
