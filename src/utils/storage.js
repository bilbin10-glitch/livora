// LocalStorage manager for Livora

const STORAGE_KEYS = {
  BOOKINGS: 'livora_bookings_v1',
  WISHLIST: 'livora_wishlist_v1',
  CITY: 'livora_city_v1',
  THEME: 'livora_theme_v1'
};

export const getStoredBookings = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to read bookings from storage', e);
    return [];
  }
};

export const saveBooking = (booking) => {
  try {
    const current = getStoredBookings();
    const updated = [booking, ...current];
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save booking', e);
    return [];
  }
};

export const cancelBookingInStorage = (bookingId, refundAmount = 0) => {
  try {
    const current = getStoredBookings();
    const updated = current.map(b => b.id === bookingId ? { ...b, status: 'cancelled', refundedAmount: refundAmount, cancelledAt: new Date().toISOString() } : b);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to cancel booking', e);
    return [];
  }
};

export const removeBookingFromStorage = (bookingId) => {
  try {
    const current = getStoredBookings();
    const updated = current.filter(b => b.id !== bookingId);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to remove booking', e);
    return [];
  }
};

export const getCancellationRefundDetails = (booking) => {
  if (!booking || !booking.event) {
    return { isEligible24Hr: true, refundPercent: 100, refundAmount: booking?.totalAmount || 0, message: '100% Instant Cashback' };
  }
  try {
    const eventDate = new Date(`${booking.event.date}T${booking.event.time ? '18:00:00' : '00:00:00'}`);
    const now = new Date();
    const diffHours = (eventDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (diffHours >= 24 || isNaN(diffHours)) {
      return {
        isEligible24Hr: true,
        hoursRemaining: Math.max(24, Math.round(diffHours) || 72),
        refundPercent: 100,
        refundAmount: booking.totalAmount,
        message: '100% Instant Cashback credited to Livora Wallet (>24 hours before showtime)'
      };
    } else if (diffHours > 0) {
      return {
        isEligible24Hr: false,
        hoursRemaining: Math.round(diffHours),
        refundPercent: 50,
        refundAmount: Math.round(booking.totalAmount * 0.5),
        message: '50% Partial Cashback (<24 hours before showtime)'
      };
    } else {
      return {
        isEligible24Hr: false,
        hoursRemaining: 0,
        refundPercent: 0,
        refundAmount: 0,
        message: 'Event has concluded. Non-refundable.'
      };
    }
  } catch (e) {
    return { isEligible24Hr: true, refundPercent: 100, refundAmount: booking.totalAmount, message: '100% Instant Cashback' };
  }
};

export const getStoredWishlist = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.WISHLIST);
    return data ? JSON.parse(data) : ['ev-1', 'ev-3']; // Default with some favorites
  } catch (e) {
    return ['ev-1', 'ev-3'];
  }
};

export const toggleWishlistInStorage = (eventId) => {
  try {
    const current = getStoredWishlist();
    const exists = current.includes(eventId);
    const updated = exists ? current.filter(id => id !== eventId) : [...current, eventId];
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to toggle wishlist', e);
    return [];
  }
};

export const getStoredCities = () => {
  try {
    const data = localStorage.getItem('livora_cities_multiselect_v1');
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
};

export const setStoredCities = (cities) => {
  try {
    localStorage.setItem('livora_cities_multiselect_v1', JSON.stringify(cities));
  } catch (e) {
    console.error('Failed to store cities', e);
  }
};

export const getStoredCity = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.CITY) || 'kochi';
  } catch (e) {
    return 'kochi';
  }
};

export const setStoredCity = (cityId) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CITY, cityId);
  } catch (e) {
    console.error('Failed to store city', e);
  }
};

export const getStoredTheme = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
  } catch (e) {
    return 'dark';
  }
};

export const setStoredTheme = (theme) => {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (e) {
    console.error('Failed to store theme', e);
  }
};
