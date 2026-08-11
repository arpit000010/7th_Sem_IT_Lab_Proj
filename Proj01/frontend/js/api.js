const getApiBaseUrl = () => {
  if (window.location.protocol === 'file:') {
    return 'http://localhost:8000/api';
  }
  if (window.location.port && window.location.port !== '8000') {
    return `http://${window.location.hostname}:8000/api`;
  }
  return '/api';
};

const API_BASE_URL = getApiBaseUrl();

const API = {
  getToken() {
    return localStorage.getItem('token');
  },

  setToken(token) {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  },

  async request(endpoint, method = 'GET', data = null) {
    const token = this.getToken();
    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      method,
      headers,
      credentials: 'include',
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      const text = await response.text();
      let resData = {};

      if (text) {
        try {
          resData = JSON.parse(text);
        } catch (e) {
          resData = { message: response.statusText || 'Server returned non-JSON response.' };
        }
      }

      if (!response.ok) {
        throw new Error(resData.message || `Request failed with status ${response.status}`);
      }

      return resData;
    } catch (error) {
      console.error(`[API Error ${method} ${endpoint}]:`, error.message);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Could not connect to backend server. Make sure "npm run start" is running on port 8000.');
      }
      throw error;
    }
  },

  signup(userData) {
    return this.request('/auth/signup', 'POST', userData);
  },

  login(credentials) {
    return this.request('/auth/login', 'POST', credentials);
  },

  logout() {
    this.setToken(null);
    return this.request('/auth/logout', 'POST');
  },

  getProfile() {
    return this.request('/user/profile', 'GET');
  },

  updateProfile(profileData) {
    return this.request('/user/profile', 'PUT', profileData);
  }
};
