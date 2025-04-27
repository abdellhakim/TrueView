import axios from '../api/axios';


export const signup = async (userData) => {
  try {
    const res = await axios.post('/auth/signup', userData);
    return { success: true, data: res.data };
  } catch (err) {
    console.error('Signup Error:', err.response?.data || err.message);
    return {
      success: false,
      error: err.response?.data?.message || 'Signup failed. Please try again.',
    };
  }
};

export const login = async (credentials) => {
  try {
    const res = await axios.post('/auth/login', credentials);
    const { jwtToken, message } = res.data;

    if (jwtToken) {
      return { success: true, token: jwtToken, message };
    } else {
      return { success: false, error: "Invalid response from server" };
    }
  } catch (err) {
    console.error('Login Error:', err.response?.data || err.message);
    return {
      success: false,
      error: err.response?.data?.message || 'Login failed. Please try again.',
    };
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};
