// Livora Authentication & User Database Manager

const AUTH_KEYS = {
  USERS: 'livora_users_db_v2',
  CURRENT_USER: 'livora_current_session_v2'
};

// Initial Seed Users
const DEFAULT_USERS = [
  {
    id: 'usr_admin_1',
    name: 'Livora Master Admin',
    email: 'admin@gmail.com',
    password: 'admin123',
    role: 'admin',
    phone: '+91 98450 12345',
    city: 'kochi',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    joinedDate: 'Jan 2026',
    vipStatus: 'Livora Master Administrator',
    walletBalance: 50000,
    preferredGenres: ['Rock & Pop', 'Broadway & Theatre', 'Standup Comedy', 'Malayalam Live Shows']
  },
  {
    id: 'usr_user_1',
    name: 'Rohit Menon',
    email: 'user@gmail.com',
    password: 'user123',
    role: 'user',
    phone: '+91 98765 43210',
    city: 'kochi',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    joinedDate: 'March 2026',
    vipStatus: 'Gold VIP Passholder',
    walletBalance: 1850,
    preferredGenres: ['Malayalam Rock', 'Standup Comedy', 'Indie Blues']
  }
];

export function getUsersDB() {
  try {
    const data = localStorage.getItem(AUTH_KEYS.USERS);
    if (!data) {
      localStorage.setItem(AUTH_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }
    const parsed = JSON.parse(data);
    // Ensure admin@gmail.com is present
    const hasAdmin = parsed.some(u => u.email.toLowerCase() === 'admin@gmail.com');
    if (!hasAdmin) {
      parsed.unshift(DEFAULT_USERS[0]);
      localStorage.setItem(AUTH_KEYS.USERS, JSON.stringify(parsed));
    }
    return parsed;
  } catch (e) {
    return DEFAULT_USERS;
  }
}

export function getCurrentUser() {
  try {
    const data = localStorage.getItem(AUTH_KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
}

export function saveCurrentUser(user) {
  try {
    if (user) {
      localStorage.setItem(AUTH_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_KEYS.CURRENT_USER);
    }
  } catch (e) {
    console.error('Failed to store current session', e);
  }
}

export function registerUser(newUser) {
  const users = getUsersDB();
  const exists = users.find(u => u.email.toLowerCase() === newUser.email.toLowerCase().trim());
  if (exists) {
    throw new Error('An account with this email address already exists.');
  }

  const created = {
    id: `usr_${Date.now()}`,
    name: newUser.name,
    email: newUser.email.trim().toLowerCase(),
    password: newUser.password,
    role: 'user',
    phone: newUser.phone || '+91 98000 00000',
    city: newUser.city || 'kochi',
    avatar: newUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80',
    joinedDate: 'August 2026',
    vipStatus: 'Silver Club Member',
    walletBalance: 500,
    preferredGenres: ['Rock & Pop', 'Standup Comedy']
  };

  const updated = [created, ...users];
  localStorage.setItem(AUTH_KEYS.USERS, JSON.stringify(updated));
  saveCurrentUser(created);
  return created;
}

export function loginUser(email, password) {
  const users = getUsersDB();
  const found = users.find(
    u => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password
  );

  if (!found) {
    throw new Error('Invalid email or password. Please verify your credentials.');
  }

  saveCurrentUser(found);
  return found;
}

export function resetUserPassword(email, newPassword) {
  const users = getUsersDB();
  const idx = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase().trim());
  if (idx === -1) {
    throw new Error('No user account found with this email address.');
  }

  users[idx].password = newPassword;
  localStorage.setItem(AUTH_KEYS.USERS, JSON.stringify(users));

  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === users[idx].id) {
    saveCurrentUser(users[idx]);
  }
  return true;
}

export function updateUserProfile(updatedUser) {
  const users = getUsersDB();
  const updatedList = users.map(u => u.id === updatedUser.id ? { ...u, ...updatedUser } : u);
  localStorage.setItem(AUTH_KEYS.USERS, JSON.stringify(updatedList));
  saveCurrentUser(updatedUser);
  return updatedUser;
}

export function creditUserWallet(amount, reason = 'Booking Cancellation 100% Cashback') {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;
  const currentBalance = currentUser.walletBalance || 0;
  const updated = {
    ...currentUser,
    walletBalance: currentBalance + amount
  };
  return updateUserProfile(updated);
}

export function logoutUser() {
  localStorage.removeItem(AUTH_KEYS.CURRENT_USER);
}
