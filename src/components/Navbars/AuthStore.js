import { create } from 'zustand';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Correct import

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const AuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  technician: null,
  token: null,
  loading: true,
  error: null,

  // User login
  loginUser: async (userid, password) => {
    try {
      set({ loading: true });
      const response = await axios.post(`${API_BASE_URL}/login-user`, { userid, password });

      const { token, user } = response.data;
      const decodedToken = jwtDecode(token);

      const userId = decodedToken.id || decodedToken._id || decodedToken.userId;

      if (userId) {
        localStorage.setItem('user_token', token);
        localStorage.setItem('user_id', userId);

        set({
          isAuthenticated: true,
          user,
          token,
          loading: false,
          error: null,
        });
      } else {
        throw new Error('Failed to retrieve user ID from token.');
      }
    } catch (err) {
      set({
        error: err.response?.data?.message || 'Login failed',
        loading: false,
      });
    }
  },

  // User signup
  signupUser: async (userData) => {
    try {
      set({ loading: true });
      const response = await axios.post(`${API_BASE_URL}/register-user`, userData);
      const { token, user } = response.data;

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id || decodedToken._id || decodedToken.userId;

      if (userId) {
        localStorage.setItem('user_token', token);
        localStorage.setItem('user_id', userId);

        set({
          isAuthenticated: true,
          user,
          token,
          loading: false,
          error: null,
        });
      } else {
        throw new Error('Failed to retrieve user ID from token.');
      }
    } catch (err) {
      set({
        error: err.response?.data?.message || 'Signup failed',
        loading: false,
      });
    }
  },

  // Fetch user details
  fetchUser: async () => {
    try {
      set({ loading: true });
  
      const token = localStorage.getItem('user_token');
      const userId = localStorage.getItem('user_id');
  
      if (!userId) {
        set({ isAuthenticated: false, loading: false });
        return;
      }
  
      if (token && userId) {
        // Update the endpoint to match your backend route
        const response = await axios.get(`${API_BASE_URL}/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        // Ensure that response.data.user matches your backend response
        set({
          user: response.data.user,
          isAuthenticated: true,
          loading: false,
          error: null,
        });
      } else {
        set({ isAuthenticated: false, loading: false });
      }
    } catch (err) {
      // Handle cases where err might not have a response property
      set({
        error: err.response?.data?.message || 'Failed to fetch user data',
        loading: false,
      });
    }
  },
  

  // Technician login
  loginTechnician: async (techid, password) => {
    try {
      set({ loading: true });
      const response = await axios.post(`${API_BASE_URL}/login-technician`, { techid, password });

      const { token, technician } = response.data;
      const decodedToken = jwtDecode(token);

      const techId = decodedToken.id || decodedToken._id || decodedToken.techId;

      if (techId) {
        localStorage.setItem('tech_token', token);
        localStorage.setItem('tech_id', techId);

        set({
          isAuthenticated: true,
          technician,
          token,
          loading: false,
          error: null,
        });
      } else {
        throw new Error('Failed to retrieve technician ID from token.');
      }
    } catch (err) {
      set({
        error: err.response?.data?.message || 'Login failed',
        loading: false,
      });
    }
  },

  // Technician signup
  signupTechnician: async (techData) => {
    try {
      set({ loading: true });
      const response = await axios.post(`${API_BASE_URL}/register-technician`, techData);
      const { token, technician } = response.data;

      const decodedToken = jwtDecode(token);
      const techId = decodedToken.id || decodedToken._id || decodedToken.techId;

      if (techId) {
        localStorage.setItem('tech_token', token);
        localStorage.setItem('tech_id', techId);

        set({
          isAuthenticated: true,
          technician,
          token,
          loading: false,
          error: null,
        });
      } else {
        throw new Error('Failed to retrieve technician ID from token.');
      }
    } catch (err) {
      set({
        error: err.response?.data?.message || 'Signup failed',
        loading: false,
      });
    }
  },

  // Fetch technician details
  fetchTechnician: async () => {
    try {
      set({ loading: true });

      const token = localStorage.getItem('tech_token');
      const techId = localStorage.getItem('tech_id');

      if (!techId) {
        set({ isAuthenticated: false, loading: false });
        return;
      }

      if (token && techId) {
        const response = await axios.get(`${API_BASE_URL}/technician/${techId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        set({
          technician: response.data.technician,
          isAuthenticated: true,
          loading: false,
          error: null,
        });
      } else {
        set({ isAuthenticated: false, loading: false });
      }
    } catch (err) {
      set({
        error: err.response?.data?.message || 'Failed to fetch technician data',
        loading: false,
      });
    }
  },

  logout: () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('tech_token');
    localStorage.removeItem('tech_id');
    set({ isAuthenticated: false, user: null, technician: null, token: null, error: null });
  },

  checkAuth: () => {
    const userToken = localStorage.getItem('user_token');
    const techToken = localStorage.getItem('tech_token');
    set({
      isAuthenticated: !!userToken || !!techToken,
      user: userToken ? jwtDecode(userToken) : null,
      technician: techToken ? jwtDecode(techToken) : null,
    });
  },
  
}));


export default AuthStore;
