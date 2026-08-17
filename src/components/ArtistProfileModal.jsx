import React from 'react';
import { X, Sparkles, Users, Calendar, MapPin, Ticket, Star, ExternalLink } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

export default function ArtistProfileModal({
  event,
  allEvents,
  onClose,
  onBookEvent
}) {
  if (!event) return null;

  // Find all events with this artist
  const artistEvents = allEvents.filter(e => e.artist === event.artist);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {/* Artist Header Banner */}
        <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
          <img
            src={event.bannerImage}
            alt={event.artist}
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-secondary) 0%, transparent 100%)' }} />

          <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 3 }}>
            <img
              src={event.artistAvatar}
              alt={event.artist}
              style={{ width: '80px', height: '80px', borderRadius: '50%', border: '3px solid var(--brand-primary)', objectFit: 'cover', boxShadow: '0 4px 15px rgba(0,0,0,0.5)' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--brand-secondary)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                <Sparkles size={13} />
                <span>Verified Livora Headliner</span>
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>{event.artist}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: '#cbd5e1' }}>
                <Users size={14} />
                <span>{event.artistFollowers || '1.5M Followers'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Artist Bio & Tour Schedule */}
        <div style={{ padding: '1.5rem', display: 'flex', flex_direction: 'column', gap: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>Biography & Background</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              {event.artistBio}
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Upcoming Live Tour Dates</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {artistEvents.map((ae) => (
                <div
                  key={ae.id}
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--brand-primary)', fontWeight: 700 }}>
                      {ae.categoryEmoji} {ae.categoryLabel}
                    </span>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{ae.title}</h4>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                      <Calendar size={13} />
                      <span>{ae.displayDate}</span>
                      <span>•</span>
                      <MapPin size={13} />
                      <span>{ae.venue.split(',')[0]}</span>
                    </div>
                  </div>

                  <button
                    className="btn-card-book"
                    onClick={() => {
                      onClose();
                      onBookEvent(ae);
                    }}
                  >
                    Book Passes
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
