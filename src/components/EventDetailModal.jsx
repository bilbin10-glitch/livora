import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Globe, ShieldAlert, Star, Play, Square, Ticket, Check } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';
import { playLiveSnippet, stopLiveSnippet } from '../utils/audioSynth';

export default function EventDetailModal({
  event,
  onClose,
  onBookNow,
  isWishlisted,
  onToggleWishlist,
  onViewArtist,
  onViewVenue
}) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!event) return null;

  const handleAudioToggle = () => {
    if (isPlayingAudio) {
      stopLiveSnippet();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      playLiveSnippet(event.category, () => {
        setIsPlayingAudio(false);
      });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {/* Hero Cover */}
        <div className="detail-hero-cover">
          <img src={event.bannerImage} alt={event.title} className="detail-cover-img" />
          <div className="detail-cover-gradient"></div>

          <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.75rem', right: '1.75rem', zIndex: 5 }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="hero-tag">
                {event.categoryEmoji} {event.categoryLabel}
              </span>
              <span className="hero-tag hero-city-tag">
                <Star size={12} fill="#f59e0b" color="#f59e0b" /> {event.rating} ({event.reviewCount} reviews)
              </span>
            </div>
            <h2 style={{ fontSize: '1.8rem', color: '#ffffff', fontWeight: 800 }}>{event.title}</h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="detail-content-body">
          {/* Audio Synthesizer Preview Bar */}
          <div className="audio-player-pill">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                onClick={handleAudioToggle}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'var(--brand-primary)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {isPlayingAudio ? <Square size={16} fill="#ffffff" /> : <Play size={16} fill="#ffffff" />}
              </button>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {event.audioTrackTitle || 'Live Performance Snippet'}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Interactive live stage ambiance preview
                </div>
              </div>
            </div>

            <div className={`audio-bars-anim ${isPlayingAudio ? 'playing' : ''}`}>
              <div className="audio-bar"></div>
              <div className="audio-bar"></div>
              <div className="audio-bar"></div>
              <div className="audio-bar"></div>
            </div>
          </div>

          {/* Key Meta Details */}
          <div className="detail-grid-highlights">
            <div className="detail-highlight-card">
              <div className="detail-highlight-icon"><Calendar size={18} /></div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Date & Time</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>{event.displayDate}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{event.time}</div>
              </div>
            </div>

            <div
              className="detail-highlight-card"
              style={{ cursor: onViewVenue ? 'pointer' : 'default' }}
              onClick={() => onViewVenue && onViewVenue(event)}
              title="Click to view full Venue Guide & Directions"
            >
              <div className="detail-highlight-icon"><MapPin size={18} /></div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, display: 'flex', justifyContent: 'space-between' }}>
                  <span>Venue Guide</span>
                  <span style={{ color: 'var(--brand-primary)' }}>Guide →</span>
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>{event.venue.split(',')[0]}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{event.city.toUpperCase()}</div>
              </div>
            </div>

            <div className="detail-highlight-card">
              <div className="detail-highlight-icon"><Clock size={18} /></div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Duration & Age</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>{event.duration}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{event.ageRating}</div>
              </div>
            </div>

            <div className="detail-highlight-card">
              <div className="detail-highlight-icon"><Globe size={18} /></div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Language</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>{event.language}</div>
              </div>
            </div>
          </div>

          {/* Artist Bio & Lineup */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.15rem' }}>About the Headliner</h3>
              {onViewArtist && (
                <button
                  onClick={() => onViewArtist(event)}
                  style={{ color: 'var(--brand-primary)', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                >
                  <span>View Artist Tour</span>
                  <span>→</span>
                </button>
              )}
            </div>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>{event.artistBio}</p>
          </div>

          {event.lineup && event.lineup.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>Artist & Cast Lineup</h3>
              <div className="artist-lineup-row">
                {event.lineup.map((person, idx) => (
                  <div key={idx} className="artist-lineup-item">
                    <img src={person.photo} alt={person.name} className="artist-lineup-photo" />
                    <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{person.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{person.role}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Venue Amenities */}
          {event.venueHighlights && (
            <div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.65rem' }}>Venue Amenities & Entry</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                {event.venueHighlights.map((vh, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <Check size={16} color="var(--brand-success)" />
                    <span>{vh}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fan Reviews */}
          {event.reviews && event.reviews.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.65rem' }}>Verified Attendee Reviews</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {event.reviews.map((rev, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-tertiary)', padding: '0.85rem', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>{rev.name}</span>
                      <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                        <Star size={13} fill="#f59e0b" color="#f59e0b" />
                        <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{rev.rating}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Sticky Bottom Bar */}
        <div
          style={{
            position: 'sticky',
            bottom: 0,
            background: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-medium)',
            padding: '1rem 1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            zIndex: 10
          }}
        >
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Starting from</span>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {formatCurrency(event.priceStartingFrom)}
            </div>
          </div>

          <button
            className="btn-hero-book"
            style={{ padding: '0.75rem 2rem' }}
            onClick={() => {
              onClose();
              onBookNow(event);
            }}
          >
            <Ticket size={18} />
            <span>Select Seats & Book</span>
          </button>
        </div>
      </div>
    </div>
  );
}
