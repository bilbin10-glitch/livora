import React from 'react';
import { X, MapPin, Check } from 'lucide-react';
import { CITIES } from '../data/eventsData';

export default function CitySelectorModal({
  selectedCity,
  onSelectCity,
  onClose
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div style={{ padding: '1.75rem 1.75rem 1rem 1.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand-primary)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
            <MapPin size={16} />
            <span>Select Entertainment Hub</span>
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Choose Your City</h2>
        </div>

        <div style={{ padding: '1.25rem 1.75rem 1.75rem 1.75rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          {CITIES.map((city) => {
            const isSelected = selectedCity === city.id;

            return (
              <button
                key={city.id}
                style={{
                  background: isSelected ? 'rgba(225, 29, 72, 0.12)' : 'var(--bg-tertiary)',
                  border: `1px solid ${isSelected ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all var(--transition-fast)'
                }}
                onClick={() => {
                  onSelectCity(city.id);
                  onClose();
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <span style={{ fontSize: '1.4rem' }}>{city.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: isSelected ? 'var(--brand-primary)' : 'var(--text-primary)' }}>
                      {city.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {city.country}
                    </div>
                  </div>
                </div>

                {isSelected && <Check size={18} color="var(--brand-primary)" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
