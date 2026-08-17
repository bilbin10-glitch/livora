import React, { useState } from 'react';
import { X, MapPin, Check, Sparkles, RotateCcw } from 'lucide-react';
import { CITIES, EVENTS_DATA } from '../data/eventsData';

export default function CitySelectorModal({
  selectedCities = [],
  onSelectCities,
  onClose
}) {
  const [tempSelected, setTempSelected] = useState(
    Array.isArray(selectedCities) ? selectedCities : selectedCities ? [selectedCities] : []
  );

  const toggleCity = (cityId) => {
    setTempSelected((prev) => {
      if (prev.includes(cityId)) {
        return prev.filter((id) => id !== cityId);
      } else {
        return [...prev, cityId];
      }
    });
  };

  const handleSelectAll = () => {
    setTempSelected(CITIES.map((c) => c.id));
  };

  const handleClearAll = () => {
    setTempSelected([]);
  };

  const handleSelectKerala = () => {
    const keralaIds = CITIES.filter((c) => c.state === 'Kerala').map((c) => c.id);
    setTempSelected(keralaIds);
  };

  const handleSelectMetros = () => {
    const metroIds = ['mumbai', 'delhi', 'bangalore'];
    setTempSelected(metroIds);
  };

  const handleApply = () => {
    onSelectCities(tempSelected);
    onClose();
  };

  // Count events per city
  const cityEventCounts = {};
  CITIES.forEach((c) => {
    cityEventCounts[c.id] = EVENTS_DATA.filter((e) => e.city === c.id).length;
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ padding: '1.75rem 1.75rem 1rem 1.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand-primary)', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase' }}>
            <MapPin size={16} />
            <span>Select Multiple Entertainment Hubs</span>
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '0.2rem' }}>Choose Locations to Explore</h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Select one or multiple cities to display only shows happening in your chosen areas.
          </p>

          {/* Quick Presets Bar */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.85rem' }}>
            <button
              type="button"
              onClick={handleSelectKerala}
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.3rem 0.65rem',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(225, 29, 72, 0.12)',
                border: '1px solid rgba(225, 29, 72, 0.3)',
                color: 'var(--brand-primary)',
                cursor: 'pointer'
              }}
            >
              🌴 Kerala Cities (4)
            </button>

            <button
              type="button"
              onClick={handleSelectMetros}
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.3rem 0.65rem',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              🌆 Metros (Mumbai, NCR, BLR)
            </button>

            <button
              type="button"
              onClick={handleSelectAll}
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.3rem 0.65rem',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              ✓ Select All
            </button>

            {tempSelected.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.3rem 0.65rem',
                  borderRadius: 'var(--radius-pill)',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                <RotateCcw size={11} />
                <span>Show All Cities</span>
              </button>
            )}
          </div>
        </div>

        {/* Cities Grid with Checkboxes */}
        <div style={{ padding: '1.25rem 1.75rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.75rem', maxHeight: '380px', overflowY: 'auto' }}>
          {CITIES.map((city) => {
            const isSelected = tempSelected.includes(city.id);
            const count = cityEventCounts[city.id] || 0;

            return (
              <div
                key={city.id}
                style={{
                  background: isSelected ? 'rgba(225, 29, 72, 0.12)' : 'var(--bg-tertiary)',
                  border: `1.5px solid ${isSelected ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
                onClick={() => toggleCity(city.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.4rem' }}>{city.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: isSelected ? 'var(--brand-primary)' : 'var(--text-primary)' }}>
                      {city.name}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {city.state ? `${city.state}, ` : ''}{city.country} &nbsp;•&nbsp; {count} {count === 1 ? 'show' : 'shows'}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '6px',
                    border: `1.5px solid ${isSelected ? 'var(--brand-primary)' : 'var(--border-medium)'}`,
                    background: isSelected ? 'var(--brand-primary)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    flexShrink: 0
                  }}
                >
                  {isSelected && <Check size={14} strokeWidth={3} />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div style={{ padding: '1rem 1.75rem', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            {tempSelected.length === 0 ? (
              <span>Showing <strong>All Locations</strong></span>
            ) : (
              <span>Selected <strong>{tempSelected.length} {tempSelected.length === 1 ? 'Location' : 'Locations'}</strong></span>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="button"
              className="nav-icon-btn"
              style={{ width: 'auto', padding: '0.55rem 1rem', fontSize: '0.85rem' }}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn-hero-book"
              style={{ padding: '0.55rem 1.5rem', fontSize: '0.85rem' }}
              onClick={handleApply}
            >
              Apply Filter ({tempSelected.length === 0 ? 'All' : tempSelected.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
