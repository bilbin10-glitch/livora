import React, { useState, useRef } from 'react';
import { X, User, Mail, Phone, MapPin, Sparkles, Ticket, Heart, LogOut, Save, ShieldCheck, Check, Camera, Image, Upload } from 'lucide-react';
import { updateUserProfile } from '../utils/auth';
import { formatCurrency } from '../utils/helpers';
import { CITIES, GENRES } from '../data/eventsData';

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80'
];

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
  const [avatar, setAvatar] = useState(user?.avatar || AVATAR_PRESETS[0]);
  const [selectedGenres, setSelectedGenres] = useState(user?.preferredGenres || ['Rock & Pop']);
  const fileInputRef = useRef(null);

  if (!user) return null;

  const toggleGenre = (genre) => {
    if (genre === 'All Genres') return;
    setSelectedGenres((prev) => {
      if (prev.includes(genre)) return prev.filter((g) => g !== genre);
      return [...prev, genre];
    });
  };

  // Handle local file upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Please select an image smaller than 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = updateUserProfile({
      ...user,
      name,
      phone,
      city,
      avatar,
      preferredGenres: selectedGenres
    });
    onUpdateUser(updated);
    setIsEditing(false);
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="profile-modal-card" style={{ maxWidth: '620px' }} onClick={(e) => e.stopPropagation()}>
        {/* Header Banner */}
        <div className="profile-header-banner" style={{ position: 'relative' }}>
          <button className="modal-close-btn" onClick={onClose} style={{ top: '1rem', right: '1rem' }}>
            <X size={18} />
          </button>

          {/* Profile Avatar Box with Upload Trigger */}
          <div className="profile-avatar-box" style={{ position: 'relative' }}>
            <img src={avatar} alt={name} className="profile-avatar-img" />
            
            {isEditing && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                style={{
                  position: 'absolute',
                  bottom: '2px',
                  right: '2px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--brand-primary)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid var(--bg-secondary)',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
                }}
                title="Change Photo / Upload Image"
              >
                <Camera size={16} />
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
          </div>
        </div>

        {/* Profile Content Body */}
        <div className="profile-content-area">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{name}</h2>
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
            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              {/* Avatar Selector Gallery */}
              <div className="auth-input-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Profile Photo / Avatar
                  </label>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{ fontSize: '0.75rem', color: 'var(--brand-primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}
                  >
                    <Upload size={13} />
                    <span>Upload from Device</span>
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                  {AVATAR_PRESETS.map((presetUrl, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setAvatar(presetUrl)}
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: avatar === presetUrl ? '2.5px solid var(--brand-primary)' : '2px solid var(--border-subtle)',
                        padding: 0,
                        cursor: 'pointer',
                        flexShrink: 0,
                        opacity: avatar === presetUrl ? 1 : 0.65,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <img src={presetUrl} alt={`Avatar ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              </div>

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
                    placeholder="+91 98450 12345"
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
                  <div style={{ fontWeight: 700 }}>{user.phone || '+91 98450 12345'}</div>
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
