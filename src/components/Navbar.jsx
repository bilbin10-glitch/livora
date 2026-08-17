import React from 'react';
import { Sparkles, Search, MapPin, Heart, Ticket, Sun, Moon } from 'lucide-react';
import { CITIES } from '../data/eventsData';

export default function Navbar({
  searchQuery,
  setSearchQuery,
  selectedCity,
  onOpenCityModal,
  wishlistCount,
  onOpenWishlist,
  bookingsCount,
  onOpenWallet,
  theme,
  toggleTheme,
  onToggleAdmin,
  currentUser,
  onOpenProfile,
  onOpenAuth
}) {
  const currentCityObj = CITIES.find(c => c.id === selectedCity) || CITIES[0];

  return (
    <header className="navbar-wrapper">
      <div className="navbar">
        {/* Brand Logo */}
        <div className="brand-container" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="brand-logo-icon">
            <Sparkles size={20} />
          </div>
          <div className="brand-title">
            Livora
            <span className="brand-dot"></span>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="nav-search-bar">
          <div className="search-input-wrapper">
            <Search size={18} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search concerts, comedy shows, plays, artists..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Actions & Utilities */}
        <div className="nav-actions">
          {/* City Selector */}
          <button className="btn-city-picker" onClick={onOpenCityModal} title="Change City">
            <MapPin size={15} color="var(--brand-primary)" />
            <span>{currentCityObj.icon} {currentCityObj.name}</span>
          </button>

          {/* Wishlist */}
          <button className="nav-icon-btn" onClick={onOpenWishlist} title="Saved Events">
            <Heart size={18} />
            {wishlistCount > 0 && <span className="badge-count">{wishlistCount}</span>}
          </button>

          {/* Theme Toggle */}
          <button className="nav-icon-btn" onClick={toggleTheme} title="Toggle Theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Pass Wallet */}
          <button className="btn-my-passes" onClick={onOpenWallet}>
            <Ticket size={17} />
            <span>Passes</span>
            {bookingsCount > 0 && <span className="badge-count" style={{ position: 'static' }}>{bookingsCount}</span>}
          </button>

          {/* User Account / Profile */}
          {currentUser ? (
            <button
              onClick={onOpenProfile}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.35rem 0.65rem 0.35rem 0.4rem',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-pill)',
                cursor: 'pointer'
              }}
              title="View Profile & Settings"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <span style={{ fontSize: '0.82rem', fontWeight: 700, maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {currentUser.name.split(' ')[0]}
              </span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="btn-pass-action"
              style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem', fontWeight: 700 }}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
