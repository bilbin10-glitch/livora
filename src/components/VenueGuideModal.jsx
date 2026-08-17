import React from 'react';
import { X, MapPin, Navigation, Car, Utensils, Accessibility, ShieldCheck, Clock } from 'lucide-react';

export default function VenueGuideModal({ event, onClose }) {
  if (!event) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div style={{ padding: '1.75rem 1.75rem 1rem 1.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--brand-primary)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
            <MapPin size={16} />
            <span>Venue Concierge & Guide</span>
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>{event.venue.split(',')[0]}</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{event.address}</p>
        </div>

        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Directions Card */}
          <div style={{ background: 'var(--bg-tertiary)', padding: '1.1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem', fontWeight: 700, color: 'var(--brand-secondary)' }}>
              <Navigation size={18} />
              <span>How to Reach & Metro Access</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Nearest Metro / Tube station located just 350 meters from Gate 2. Feeder shuttles and app-cab drop points are designated at West Concourse Entry.
            </p>
          </div>

          {/* Parking & Valet */}
          <div style={{ background: 'var(--bg-tertiary)', padding: '1.1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem', fontWeight: 700, color: 'var(--brand-cyan)' }}>
              <Car size={18} />
              <span>Parking & Valet Guidance</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Dedicated underground multi-level parking available. Valet desk is situated at Gate 1 (complimentary for VIP Pass holders).
            </p>
          </div>

          {/* Food & Beverage */}
          <div style={{ background: 'var(--bg-tertiary)', padding: '1.1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem', fontWeight: 700, color: '#f43f5e' }}>
              <Utensils size={18} />
              <span>Food & Beverage Lounges</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              12+ artisanal food stalls, craft soda bars, popcorn stations, and cocktail lounges located across Level 1 & 2 corridors. Cashless payment accepted.
            </p>
          </div>

          {/* Accessibility */}
          <div style={{ background: 'var(--bg-tertiary)', padding: '1.1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem', fontWeight: 700, color: 'var(--brand-success)' }}>
              <Accessibility size={18} />
              <span>Accessibility & Special Assistance</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Wheelchair accessible ramps, dedicated viewing platforms on all tiers, and sensory-friendly chill zones staffed by venue stewards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
