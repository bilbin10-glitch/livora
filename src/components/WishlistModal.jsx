import React from 'react';
import { X, Heart, Calendar, MapPin, Ticket, Trash2 } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

export default function WishlistModal({
  wishlistEvents,
  onClose,
  onSelectEvent,
  onBookEvent,
  onRemoveWishlist
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div style={{ padding: '1.75rem 1.75rem 1rem 1.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f43f5e', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
            <Heart size={16} fill="#f43f5e" />
            <span>Saved Favorites</span>
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>My Wishlist</h2>
        </div>

        {wishlistEvents.length === 0 ? (
          <div style={{ padding: '3.5rem 1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Heart size={28} color="var(--text-muted)" />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Your wishlist is empty</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Click the heart icon on any live show to save it for later!
            </p>
          </div>
        ) : (
          <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {wishlistEvents.map((event) => (
              <div
                key={event.id}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', flex: 1 }}>
                  <img
                    src={event.thumbnailImage}
                    alt={event.title}
                    style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--brand-primary)', fontWeight: 700, textTransform: 'uppercase' }}>
                      {event.categoryEmoji} {event.categoryLabel}
                    </span>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 700 }}>{event.title}</h4>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Calendar size={12} />
                      <span>{event.displayDate}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Starts from</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {formatCurrency(event.priceStartingFrom)}
                    </div>
                  </div>

                  <button
                    className="btn-card-book"
                    style={{ padding: '0.45rem 0.9rem' }}
                    onClick={() => {
                      onClose();
                      onBookEvent(event);
                    }}
                  >
                    Book
                  </button>

                  <button
                    className="nav-icon-btn"
                    style={{ width: '32px', height: '32px' }}
                    onClick={() => onRemoveWishlist(event.id)}
                    title="Remove"
                  >
                    <Trash2 size={14} color="#f87171" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
