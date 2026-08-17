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

export const cancelBookingInStorage = (bookingId) => {
  try {
    const current = getStoredBookings();
    const updated = current.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to cancel booking', e);
    return [];
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
