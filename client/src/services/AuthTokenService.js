import decode from 'jwt-decode';

class AuthTokenService {
    constructor() {
        this.domain = '/api/auth';
    }

    login(email, password) {
        // Get token from server
        return this.fetch(`${this.domain}/login`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(response => {
                // Success status lies between 200 to 300
                if (response.status > 300 || response.status < 200) {
                    var error = new Error(response.statusText);
                    error.response = response;
                    throw error;
                }
                return response;
            })
            .then(res => res.json())
            .then(res => {
                this.setToken(res.token); // Setting the token in localStorage
                return Promise.resolve(res);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }

    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        };

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken();
        }

        return fetch(url, {
            headers,
            ...options
        });
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }

    setToken(token) {
        // Saves user token to localStorage
        localStorage.setItem('jwt_token', token);
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('jwt_token');
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('jwt_token');
    }

    getProfile() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    }
}

export default AuthTokenService;
