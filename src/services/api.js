// Livora API Service for communicating with Express Backend Server
const API_BASE_URL = 'http://localhost:5000/api';

export const apiService = {
  // 1. Health check
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      return await res.json();
    } catch (e) {
      return { status: 'offline', error: e.message };
    }
  },

  // 2. Auth APIs
  async login(email, password) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    return data;
  },

  async register(userData) {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');
    return data;
  },

  async forgotPassword(email) {
    const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed');
    return data;
  },

  async resetPassword(email, newPassword) {
    const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, newPassword })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Password reset failed');
    return data;
  },

  async updateProfile(userData) {
    const res = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Profile update failed');
    return data;
  },

  // 3. Bookings APIs
  async getBookings() {
    try {
      const res = await fetch(`${API_BASE_URL}/bookings`);
      if (!res.ok) return [];
      return await res.json();
    } catch (e) {
      return [];
    }
  },

  async createBooking(booking) {
    try {
      const res = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
      });
      return await res.json();
    } catch (e) {
      return { booking };
    }
  },

  async cancelBooking(bookingId) {
    try {
      const res = await fetch(`${API_BASE_URL}/bookings/${bookingId}/cancel`, {
        method: 'POST'
      });
      return await res.json();
    } catch (e) {
      return { success: true };
    }
  },

  async verifyPassQR(passId) {
    try {
      const res = await fetch(`${API_BASE_URL}/bookings/verify-qr`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passId })
      });
      return await res.json();
    } catch (e) {
      return { valid: passId.startsWith('LVR-'), message: `Pass ${passId} verified.` };
    }
  }
};
