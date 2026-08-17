// Livora Express REST API Server
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'data', 'db.json');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper to read DB
function readDatabase() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      return { users: [], bookings: [], promoCodes: [] };
    }
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading database file', err);
    return { users: [], bookings: [], promoCodes: [] };
  }
}

// Helper to write DB
function writeDatabase(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing database file', err);
    return false;
  }
}

// 1. Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    server: 'Livora Core Backend Engine',
    version: '1.0.0',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// 2. Authentication Endpoints
// Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const db = readDatabase();
  const user = db.users.find(
    u => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials. Check your email or password.' });
  }

  const token = `livora_jwt_${user.id}_${Date.now()}`;
  res.json({
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role, // 'admin' | 'user'
      phone: user.phone,
      city: user.city,
      avatar: user.avatar,
      vipStatus: user.vipStatus,
      walletBalance: user.walletBalance,
      preferredGenres: user.preferredGenres,
      joinedDate: user.joinedDate
    }
  });
});

// Register
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, phone, city } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }

  const db = readDatabase();
  const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
  if (existing) {
    return res.status(409).json({ error: 'An account with this email already exists.' });
  }

  const newUser = {
    id: `usr_${Date.now()}`,
    name,
    email,
    password,
    role: 'user', // Default consumer role
    phone: phone || '+91 98000 00000',
    city: city || 'kochi',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80',
    joinedDate: 'August 2026',
    vipStatus: 'Silver Club Member',
    walletBalance: 500,
    preferredGenres: ['Rock & Pop', 'Standup Comedy']
  };

  db.users.push(newUser);
  writeDatabase(db);

  const token = `livora_jwt_${newUser.id}_${Date.now()}`;
  res.status(201).json({
    message: 'User registered successfully',
    token,
    user: newUser
  });
});

// Forgot Password & Reset
app.post('/api/auth/forgot-password', (req, res) => {
  const { email } = req.body;
  const db = readDatabase();
  const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
  if (!user) {
    return res.status(404).json({ error: 'No account found with this email.' });
  }

  res.json({
    message: 'Reset OTP dispatched to email.',
    demoOtp: '489210'
  });
});

app.post('/api/auth/reset-password', (req, res) => {
  const { email, newPassword } = req.body;
  const db = readDatabase();
  const idx = db.users.findIndex(u => u.email.toLowerCase() === email.toLowerCase().trim());
  if (idx === -1) {
    return res.status(404).json({ error: 'User not found.' });
  }

  db.users[idx].password = newPassword;
  writeDatabase(db);
  res.json({ message: 'Password reset successfully. You can now log in.' });
});

// Update Profile
app.put('/api/auth/profile', (req, res) => {
  const { id, name, phone, city, preferredGenres } = req.body;
  const db = readDatabase();
  const idx = db.users.findIndex(u => u.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'User not found.' });
  }

  db.users[idx] = {
    ...db.users[idx],
    name: name || db.users[idx].name,
    phone: phone || db.users[idx].phone,
    city: city || db.users[idx].city,
    preferredGenres: preferredGenres || db.users[idx].preferredGenres
  };

  writeDatabase(db);
  res.json({ message: 'Profile updated', user: db.users[idx] });
});

// 3. Bookings Endpoints
app.get('/api/bookings', (req, res) => {
  const db = readDatabase();
  res.json(db.bookings || []);
});

app.post('/api/bookings', (req, res) => {
  const booking = req.body;
  if (!booking || !booking.id || !booking.selectedSeats) {
    return res.status(400).json({ error: 'Invalid booking payload.' });
  }

  const db = readDatabase();
  db.bookings = [booking, ...(db.bookings || [])];
  writeDatabase(db);

  res.status(201).json({
    message: 'Booking pass confirmed & generated',
    booking
  });
});

app.post('/api/bookings/:id/cancel', (req, res) => {
  const { id } = req.params;
  const db = readDatabase();
  const idx = (db.bookings || []).findIndex(b => b.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Booking not found.' });
  }

  db.bookings[idx].status = 'cancelled';
  writeDatabase(db);
  res.json({ message: 'Booking cancelled successfully', booking: db.bookings[idx] });
});

// 4. Turnstile QR Pass Validator
app.post('/api/bookings/verify-qr', (req, res) => {
  const { passId } = req.body;
  if (!passId) {
    return res.status(400).json({ valid: false, error: 'Pass ID is required.' });
  }

  const db = readDatabase();
  const found = (db.bookings || []).find(b => b.id.toUpperCase() === passId.toUpperCase().trim());

  if (found) {
    if (found.status === 'cancelled') {
      return res.json({ valid: false, message: `Pass ${passId} is CANCELLED / REFUNDED.` });
    }
    return res.json({
      valid: true,
      booking: found,
      message: `✓ Valid Pass! Admit ${found.selectedSeats.length} Guest(s) for ${found.event.title} (${found.selectedSeats.join(', ')})`
    });
  }

  // Fallback for demo pass format
  if (passId.toUpperCase().startsWith('LVR-')) {
    return res.json({ valid: true, message: `✓ Valid Livora Pass ${passId}! Turnstile authorized.` });
  }

  res.status(404).json({ valid: false, message: `Invalid Pass ID: ${passId}. Pass not found in system.` });
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 LIVORA BACKEND API SERVER RUNNING ON PORT ${PORT}`);
  console.log(`📡 URL: http://localhost:${PORT}/api/health`);
  console.log(`💾 Database: ${DB_PATH}`);
  console.log(`======================================================\n`);
});
