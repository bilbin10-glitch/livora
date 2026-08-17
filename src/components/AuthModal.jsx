import React, { useState, useEffect } from 'react';
import { X, Sparkles, Mail, Lock, User, Phone, MapPin, ArrowRight, Key, CheckCircle, AlertCircle, Eye, EyeOff, Shield, ShieldCheck, AlertTriangle } from 'lucide-react';
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
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  
  // Register Form states
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCity, setRegCity] = useState('kochi');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  
  // Forgot Password states
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);

  // Security UI states
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  // Status & Error
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Listen for CapsLock
  const handleKeyDown = (e) => {
    if (e.getModifierState) {
      setIsCapsLockOn(e.getModifierState('CapsLock'));
    }
  };

  // Password strength calculation
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, label: '', color: 'transparent', width: '0%' };
    let score = 0;
    if (pwd.length >= 6) score += 1;
    if (pwd.length >= 10) score += 1;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    switch (score) {
      case 1:
        return { score, label: 'Weak', color: '#ef4444', width: '20%' };
      case 2:
        return { score, label: 'Fair', color: '#f59e0b', width: '45%' };
      case 3:
        return { score, label: 'Good', color: '#38bdf8', width: '70%' };
      case 4:
      case 5:
        return { score, label: 'Rock-Solid 🛡️', color: '#10b981', width: '100%' };
      default:
        return { score: 0, label: 'Too short', color: '#ef4444', width: '10%' };
    }
  };

  const regStrength = getPasswordStrength(regPassword);

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

  // Handle Register
  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (regPassword.length < 6) {
      setErrorMsg('For high security, password must be at least 6 characters.');
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
    setForgotOtp('489210');
    setSuccessMsg('A 6-digit security code has been sent to your registered email/mobile.');
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setErrorMsg('Please enter a secure password with at least 6 characters.');
      return;
    }

    try {
      resetUserPassword(forgotEmail, newPassword);
      setSuccessMsg('Password updated successfully! You can now sign in.');
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
      <div className="auth-modal-card" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
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
            <span>LIVORA ENCRYPTED AUTH</span>
          </div>

          <h2 className="auth-title">
            {mode === 'login' ? 'Welcome Back' : mode === 'register' ? 'Create Secure Account' : 'Reset Password'}
          </h2>
          <p className="auth-subtitle">
            {mode === 'login'
              ? 'Sign in to access your encrypted passes, wishlists & venue bookings'
              : mode === 'register'
              ? 'Join Livora with bank-grade 256-bit SSL encrypted credentials'
              : 'Enter your account email to receive a dynamic password reset key'}
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
          <form className="auth-form-body" onSubmit={handleLogin} onKeyDown={handleKeyDown}>
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
                  placeholder="admin@gmail.com or your email"
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
                  type={showLoginPassword ? 'text' : 'password'}
                  className="auth-input-field"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.2rem' }}
                  title={showLoginPassword ? 'Hide password' : 'Show password'}
                >
                  {showLoginPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {isCapsLockOn && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#f59e0b', fontSize: '0.75rem', marginTop: '0.3rem', fontWeight: 700 }}>
                  <AlertTriangle size={13} />
                  <span>Caps Lock is ON</span>
                </div>
              )}
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

            <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => { setMode('register'); setErrorMsg(''); }}
                style={{ color: 'var(--brand-primary)', fontWeight: 700 }}
              >
                Register here
              </button>
            </div>
          </form>
        )}

        {/* --- TAB 2: REGISTER FORM --- */}
        {mode === 'register' && (
          <form className="auth-form-body" onSubmit={handleRegister} onKeyDown={handleKeyDown}>
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
                  placeholder="e.g. Rahul Sharma"
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
                  placeholder="yourname@gmail.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="auth-input-group">
                <label>Mobile Phone * (For Bank OTP)</label>
                <div className="auth-input-wrapper">
                  <Phone size={16} color="var(--text-muted)" />
                  <input
                    type="tel"
                    className="auth-input-field"
                    placeholder="+91 98450 12345"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    required
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

            {/* Secure Password Input with Strength Meter & Eye Toggle */}
            <div className="auth-input-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label>Create Secure Password *</label>
                {regPassword && (
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: regStrength.color }}>
                    {regStrength.label}
                  </span>
                )}
              </div>

              <div className="auth-input-wrapper">
                <Lock size={16} color="var(--text-muted)" />
                <input
                  type={showRegPassword ? 'text' : 'password'}
                  className="auth-input-field"
                  placeholder="Min 6 chars (e.g. Pass@123)"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowRegPassword(!showRegPassword)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.2rem' }}
                  title={showRegPassword ? 'Hide password' : 'Show password'}
                >
                  {showRegPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Password Strength Progress Bar */}
              {regPassword && (
                <div style={{ width: '100%', height: '4px', background: 'var(--bg-tertiary)', borderRadius: '2px', marginTop: '0.35rem', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: regStrength.width,
                      background: regStrength.color,
                      transition: 'width 0.3s ease, background 0.3s ease'
                    }}
                  />
                </div>
              )}

              {isCapsLockOn && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#f59e0b', fontSize: '0.75rem', marginTop: '0.3rem', fontWeight: 700 }}>
                  <AlertTriangle size={13} />
                  <span>Caps Lock is ON</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn-proceed-checkout"
              style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
              disabled={isLoading}
            >
              <span>Create Free Secure Account</span>
              <ArrowRight size={16} />
            </button>

            <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => { setMode('login'); setErrorMsg(''); }}
                style={{ color: 'var(--brand-primary)', fontWeight: 700 }}
              >
                Sign in
              </button>
            </div>
          </form>
        )}

        {/* --- TAB 3: FORGOT PASSWORD FLOW --- */}
        {mode === 'forgot' && (
          <div className="auth-form-body" onKeyDown={handleKeyDown}>
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
                      placeholder="e.g. user@gmail.com"
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
                  <span>Send Security Reset Code</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="auth-input-group">
                  <label>6-Digit Verification Code</label>
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
                      type={showNewPassword ? 'text' : 'password'}
                      className="auth-input-field"
                      placeholder="New password (min 6 chars)"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.2rem' }}
                    >
                      {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-proceed-checkout"
                  style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
                >
                  <CheckCircle size={16} />
                  <span>Set New Secure Password</span>
                </button>
              </form>
            )}

            <button
              type="button"
              onClick={() => { setMode('login'); setErrorMsg(''); setSuccessMsg(''); setIsOtpSent(false); }}
              style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.5rem', background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              ← Back to Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
