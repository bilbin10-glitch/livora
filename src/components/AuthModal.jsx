import React, { useState } from 'react';
import { X, Sparkles, Mail, Lock, User, Phone, MapPin, ArrowRight, ShieldCheck, Key, CheckCircle, AlertCircle } from 'lucide-react';
import { loginUser, registerUser, resetUserPassword } from '../utils/auth';
import { CITIES } from '../data/eventsData';

export default function AuthModal({
  isOpen,
  onClose,
  onAuthSuccess,
  initialMode = 'login'
}) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'register' | 'forgot'
  
  // Login Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register Form states
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCity, setRegCity] = useState('kochi');
  const [regPassword, setRegPassword] = useState('');
  
  // Forgot Password states
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  // Status & Error
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const user = loginUser(loginEmail, loginPassword);
      setIsLoading(false);
      onAuthSuccess(user);
      onClose();
    } catch (err) {
      setIsLoading(false);
      setErrorMsg(err.message);
    }
  };

  // 1-Click Demo Login Shortcuts
  const handleDemoLogin = (email, password) => {
    setErrorMsg('');
    try {
      const user = loginUser(email, password);
      onAuthSuccess(user);
      onClose();
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  // Handle Register
  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (regPassword.length < 4) {
      setErrorMsg('Password must be at least 4 characters long.');
      return;
    }

    setIsLoading(true);
    try {
      const newUser = registerUser({
        name: regName,
        email: regEmail,
        phone: regPhone,
        city: regCity,
        password: regPassword
      });
      setIsLoading(false);
      onAuthSuccess(newUser);
      onClose();
    } catch (err) {
      setIsLoading(false);
      setErrorMsg(err.message);
    }
  };

  // Handle Forgot Password
  const handleSendResetOtp = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      setErrorMsg('Please enter your account email.');
      return;
    }
    setErrorMsg('');
    setIsOtpSent(true);
    setForgotOtp('489210'); // Simulated OTP
    setSuccessMsg('Reset OTP sent! Auto-filled demo OTP 489210 for convenience.');
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 4) {
      setErrorMsg('Please enter a valid new password (min 4 chars).');
      return;
    }

    try {
      resetUserPassword(forgotEmail, newPassword);
      setSuccessMsg('Password updated successfully! You can now log in.');
      setTimeout(() => {
        setMode('login');
        setLoginEmail(forgotEmail);
        setSuccessMsg('');
      }, 1200);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Ambient Glow */}
        <div className="auth-glow-accent"></div>

        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        {/* Header */}
        <div className="auth-card-header">
          <div className="auth-brand-badge">
            <Sparkles size={14} color="var(--brand-primary)" />
            <span>LIVORA ENTERTAINMENT ID</span>
          </div>

          <h2 className="auth-title">
            {mode === 'login' ? 'Welcome Back' : mode === 'register' ? 'Create Your Account' : 'Reset Password'}
          </h2>
          <p className="auth-subtitle">
            {mode === 'login'
              ? 'Sign in to access your digital passes, wishlists & bookings'
              : mode === 'register'
              ? 'Join Livora for 1-click booking, VIP lounge access & presale passes'
              : 'Enter your registered email to reset your security credentials'}
          </p>
        </div>

        {/* Mode Selector Tabs */}
        {mode !== 'forgot' && (
          <div className="auth-mode-tabs">
            <button
              type="button"
              className={`auth-mode-btn ${mode === 'login' ? 'active' : ''}`}
              onClick={() => { setMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`auth-mode-btn ${mode === 'register' ? 'active' : ''}`}
              onClick={() => { setMode('register'); setErrorMsg(''); setSuccessMsg(''); }}
            >
              New Registration
            </button>
          </div>
        )}

        {/* --- TAB 1: LOGIN FORM --- */}
        {mode === 'login' && (
          <form className="auth-form-body" onSubmit={handleLogin}>
            {errorMsg && (
              <div className="auth-error-alert">
                <AlertCircle size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="auth-input-group">
              <label>Email Address</label>
              <div className="auth-input-wrapper">
                <Mail size={16} color="var(--text-muted)" />
                <input
                  type="email"
                  className="auth-input-field"
                  placeholder="name@domain.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="auth-input-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label>Password</label>
                <button
                  type="button"
                  onClick={() => { setMode('forgot'); setErrorMsg(''); }}
                  style={{ fontSize: '0.72rem', color: 'var(--brand-primary)', fontWeight: 700 }}
                >
                  Forgot Password?
                </button>
              </div>
              <div className="auth-input-wrapper">
                <Lock size={16} color="var(--text-muted)" />
                <input
                  type="password"
                  className="auth-input-field"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-proceed-checkout"
              style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
              disabled={isLoading}
            >
              <span>{isLoading ? 'Authenticating...' : 'Sign In to Livora'}</span>
              <ArrowRight size={16} />
            </button>

            {/* 1-Click Demo Accounts */}
            <div className="demo-accounts-strip">
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, textAlign: 'center' }}>
                ⚡ Quick 1-Click Demo Logins
              </span>
              <div className="demo-btn-row">
                <button
                  type="button"
                  className="demo-account-pill admin"
                  onClick={() => handleDemoLogin('admin@livora.com', 'admin')}
                >
                  <span>👑</span>
                  <span>Demo Admin (Organizer)</span>
                </button>

                <button
                  type="button"
                  className="demo-account-pill"
                  onClick={() => handleDemoLogin('rohit@livora.com', 'user123')}
                >
                  <span>👤</span>
                  <span>Demo User (Rohit)</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* --- TAB 2: REGISTER FORM --- */}
        {mode === 'register' && (
          <form className="auth-form-body" onSubmit={handleRegister}>
            {errorMsg && (
              <div className="auth-error-alert">
                <AlertCircle size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="auth-input-group">
              <label>Full Name *</label>
              <div className="auth-input-wrapper">
                <User size={16} color="var(--text-muted)" />
                <input
                  type="text"
                  className="auth-input-field"
                  placeholder="e.g. Rohit Menon"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label>Email Address *</label>
              <div className="auth-input-wrapper">
                <Mail size={16} color="var(--text-muted)" />
                <input
                  type="email"
                  className="auth-input-field"
                  placeholder="rohit@example.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="auth-input-group">
                <label>Mobile Phone</label>
                <div className="auth-input-wrapper">
                  <Phone size={16} color="var(--text-muted)" />
                  <input
                    type="tel"
                    className="auth-input-field"
                    placeholder="+91 98***"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="auth-input-group">
                <label>Home City</label>
                <div className="auth-input-wrapper">
                  <MapPin size={16} color="var(--text-muted)" />
                  <select
                    className="auth-input-field"
                    style={{ background: 'transparent', cursor: 'pointer' }}
                    value={regCity}
                    onChange={(e) => setRegCity(e.target.value)}
                  >
                    {CITIES.map((c) => (
                      <option key={c.id} value={c.id} style={{ background: '#0f121d', color: '#ffffff' }}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="auth-input-group">
              <label>Create Password *</label>
              <div className="auth-input-wrapper">
                <Lock size={16} color="var(--text-muted)" />
                <input
                  type="password"
                  className="auth-input-field"
                  placeholder="Min 4 characters"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-proceed-checkout"
              style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
              disabled={isLoading}
            >
              <span>Create Free Account</span>
              <ArrowRight size={16} />
            </button>
          </form>
        )}

        {/* --- TAB 3: FORGOT PASSWORD FLOW --- */}
        {mode === 'forgot' && (
          <div className="auth-form-body">
            {errorMsg && (
              <div className="auth-error-alert">
                <AlertCircle size={16} />
                <span>{errorMsg}</span>
              </div>
            )}
            {successMsg && (
              <div className="auth-success-alert">
                <CheckCircle size={16} />
                <span>{successMsg}</span>
              </div>
            )}

            {!isOtpSent ? (
              <form onSubmit={handleSendResetOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="auth-input-group">
                  <label>Registered Account Email</label>
                  <div className="auth-input-wrapper">
                    <Mail size={16} color="var(--text-muted)" />
                    <input
                      type="email"
                      className="auth-input-field"
                      placeholder="e.g. rohit@livora.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-proceed-checkout"
                  style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
                >
                  <Key size={16} />
                  <span>Send Reset OTP</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="auth-input-group">
                  <label>6-Digit Verification OTP</label>
                  <div className="auth-input-wrapper">
                    <Key size={16} color="var(--brand-secondary)" />
                    <input
                      type="text"
                      className="auth-input-field"
                      placeholder="489210"
                      value={forgotOtp}
                      onChange={(e) => setForgotOtp(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="auth-input-group">
                  <label>Enter New Password</label>
                  <div className="auth-input-wrapper">
                    <Lock size={16} color="var(--brand-primary)" />
                    <input
                      type="password"
                      className="auth-input-field"
                      placeholder="New password (min 4 chars)"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-proceed-checkout"
                  style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
                >
                  <CheckCircle size={16} />
                  <span>Set New Password</span>
                </button>
              </form>
            )}

            <button
              type="button"
              onClick={() => { setMode('login'); setErrorMsg(''); setSuccessMsg(''); setIsOtpSent(false); }}
              style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}
            >
              ← Back to Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
