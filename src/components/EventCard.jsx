import React from 'react';
import { Calendar, MapPin, Star, Heart, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

export default function EventCard({
  event,
  isWishlisted,
  onToggleWishlist,
  onSelectEvent,
  onBookNow
}) {
  return (
    <div className="event-card" onClick={() => onSelectEvent(event)}>
      {/* Thumbnail Container */}
      <div className="card-img-container">
        <img src={event.thumbnailImage} alt={event.title} className="card-img" loading="lazy" />

        {/* Category Badge */}
        <div className="card-category-badge">
          <span>{event.categoryEmoji}</span>
          <span>{event.categoryLabel}</span>
        </div>

        {/* Wishlist Button */}
        <button
          className={`card-wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(event.id);
          }}
          title={isWishlisted ? 'Remove from Saved' : 'Save to Wishlist'}
        >
          <Heart size={16} fill={isWishlisted ? '#f43f5e' : 'none'} />
        </button>

        {/* Selling Fast Badge */}
        {event.isSellingFast && (
          <div className="card-fast-badge">🔥 Selling Fast</div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="card-body">
        {/* Date Row */}
        <div className="card-date-row">
          <Calendar size={13} />
          <span>{event.displayDate} • {event.time}</span>
        </div>

        {/* Title */}
        <h3 className="card-title" title={event.title}>{event.title}</h3>

        {/* Artist Row */}
        <div className="card-artist-row">
          <img src={event.artistAvatar} alt={event.artist} className="artist-mini-avatar" />
          <span style={{ fontWeight: 600 }}>{event.artist}</span>
        </div>

        {/* Venue Row */}
        <div className="card-venue-row">
          <MapPin size={13} />
          <span>{event.venue}</span>
        </div>

        {/* Rating Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem' }}>
          <Star size={14} fill="#f59e0b" color="#f59e0b" />
          <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{event.rating}</span>
          <span style={{ color: 'var(--text-muted)' }}>({event.reviewCount.toLocaleString()})</span>
          <span style={{ marginLeft: 'auto', color: 'var(--text-muted)' }}>{event.duration}</span>
        </div>

        {/* Card Footer */}
        <div className="card-footer">
          <div className="card-price-block">
            <span className="card-price-label">Starts from</span>
            <span className="card-price-val">{formatCurrency(event.priceStartingFrom)}</span>
          </div>

          <button
            className="btn-card-book"
            onClick={(e) => {
              e.stopPropagation();
              onBookNow(event);
            }}
          >
            <span>Book Pass</span>
          </button>
        </div>
      </div>
    </div>
  );
}
