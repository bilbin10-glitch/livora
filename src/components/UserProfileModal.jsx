import React, { useState } from 'react';
import { X, User, Mail, Phone, MapPin, Sparkles, Ticket, Heart, LogOut, Save, ShieldCheck, Check } from 'lucide-react';
import { updateUserProfile } from '../utils/auth';
import { formatCurrency } from '../utils/helpers';
import { CITIES, GENRES } from '../data/eventsData';

export default function UserProfileModal({
  user,
  bookingsCount,
  wishlistCount,
  onClose,
  onLogout,
  onUpdateUser,
  onOpenWallet,
  onOpenWishlist
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [city, setCity] = useState(user?.city || 'kochi');
  const [selectedGenres, setSelectedGenres] = useState(user?.preferredGenres || ['Rock & Pop']);

  if (!user) return null;

  const toggleGenre = (genre) => {
    if (genre === 'All Genres') return;
    setSelectedGenres((prev) => {
      if (prev.includes(genre)) return prev.filter((g) => g !== genre);
      return [...prev, genre];
    });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = updateUserProfile({
      ...user,
      name,
      phone,
      city,
      preferredGenres: selectedGenres
    });
    onUpdateUser(updated);
    setIsEditing(false);
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="profile-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header Banner */}
        <div className="profile-header-banner">
          <button className="modal-close-btn" onClick={onClose} style={{ top: '1rem', right: '1rem' }}>
            <X size={18} />
          </button>

          <div className="profile-avatar-box">
            <img src={user.avatar} alt={user.name} className="profile-avatar-img" />
          </div>
        </div>

        {/* Profile Content Body */}
        <div className="profile-content-area">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{user.name}</h2>
                {user.role === 'admin' && (
                  <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', borderRadius: '9999px', fontWeight: 800 }}>
                    👑 SuperAdmin
                  </span>
                )}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                {user.email} • Member since {user.joinedDate || '2026'}
              </div>
            </div>

            <button
              className="btn-pass-action"
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
          </div>

          {/* Quick Metrics Grid */}
          <div className="profile-stats-grid">
            <div className="profile-stat-box" style={{ cursor: 'pointer' }} onClick={() => { onClose(); onOpenWallet(); }}>
              <div className="profile-stat-val" style={{ color: 'var(--brand-primary)' }}>{bookingsCount}</div>
              <div className="profile-stat-lbl">Active Passes</div>
            </div>

            <div className="profile-stat-box" style={{ cursor: 'pointer' }} onClick={() => { onClose(); onOpenWishlist(); }}>
              <div className="profile-stat-val" style={{ color: '#f43f5e' }}>{wishlistCount}</div>
              <div className="profile-stat-lbl">Saved Wishlist</div>
            </div>

            <div className="profile-stat-box">
              <div className="profile-stat-val" style={{ color: '#34d399' }}>{formatCurrency(user.walletBalance || 1850)}</div>
              <div className="profile-stat-lbl">Livora Credits</div>
            </div>
          </div>

          {/* Edit Form or Read-only Info */}
          {isEditing ? (
            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="auth-input-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="card-text-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="auth-input-group">
                  <label>Mobile Phone</label>
                  <input
                    type="tel"
                    className="card-text-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="auth-input-group">
                <label>Preferred Entertainment Hub</label>
                <select
                  className="card-text-input"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  {CITIES.map((c) => (
                    <option key={c.id} value={c.id} style={{ background: '#0f121d' }}>
                      {c.icon} {c.name} ({c.state})
                    </option>
                  ))}
                </select>
              </div>

              <div className="auth-input-group">
                <label>Favorite Entertainment Genres</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.25rem' }}>
                  {GENRES.filter((g) => g !== 'All Genres').map((genre) => {
                    const isSelected = selectedGenres.includes(genre);
                    return (
                      <button
                        type="button"
                        key={genre}
                        className={`date-chip-btn ${isSelected ? 'active' : ''}`}
                        style={{ fontSize: '0.78rem', padding: '0.3rem 0.65rem' }}
                        onClick={() => toggleGenre(genre)}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {genre}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="btn-hero-book"
                style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}
              >
                <Save size={16} />
                <span>Save Profile Changes</span>
              </button>
            </form>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Phone Number</span>
                  <div style={{ fontWeight: 700 }}>{user.phone || '+91 98765 43210'}</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Preferred Hub</span>
                  <div style={{ fontWeight: 700 }}>{user.city?.toUpperCase()}</div>
                </div>
              </div>

              {user.preferredGenres && user.preferredGenres.length > 0 && (
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                    Preferred Music & Show Genres
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.35rem' }}>
                    {user.preferredGenres.map((g) => (
                      <span key={g} className="hero-tag" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Logout Button */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
              <ShieldCheck size={14} color="var(--brand-success)" />
              <span>Livora Verified Session</span>
            </div>

            <button
              onClick={onLogout}
              className="btn-pass-action"
              style={{ color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.08)' }}
            >
              <LogOut size={15} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
