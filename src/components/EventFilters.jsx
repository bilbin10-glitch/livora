import React from 'react';
import { SlidersHorizontal, RotateCcw, MapPin } from 'lucide-react';
import { CITIES } from '../data/eventsData';

export const DATE_FILTERS = [
  { id: 'all', label: 'All Dates' },
  { id: 'weekend', label: 'This Weekend' },
  { id: 'month', label: 'This Month' },
  { id: 'trending', label: '🔥 Trending Only' }
];

export const PRICE_FILTERS = [
  { id: 'all', label: 'Any Price' },
  { id: 'under_1500', label: 'Under ₹1,500' },
  { id: '1500_3000', label: '₹1,500 – ₹3,000' },
  { id: 'above_3000', label: 'Above ₹3,000' }
];

export const SORT_OPTIONS = [
  { id: 'trending', label: '🔥 Popular / Trending' },
  { id: 'location', label: '📍 Group by Location' },
  { id: 'date_asc', label: '📅 Date: Soonest First' },
  { id: 'price_low', label: '💰 Price: Low → High' },
  { id: 'price_high', label: '💎 Price: High → Low' },
  { id: 'rating', label: '⭐ Highest Rated' },
];

export default function EventFilters({
  dateFilter,
  setDateFilter,
  priceFilter,
  setPriceFilter,
  sortBy,
  setSortBy,
  locationFilter,
  setLocationFilter,
  onReset
}) {
  const hasActiveFilters =
    dateFilter !== 'all' ||
    priceFilter !== 'all' ||
    sortBy !== 'trending' ||
    locationFilter !== 'all';

  return (
    <div className="filter-bar-container">
      <div className="filter-bar-top">
        {/* Date Filter Chips */}
        <div className="filter-group-dates">
          {DATE_FILTERS.map((df) => (
            <button
              key={df.id}
              className={`date-chip-btn ${dateFilter === df.id ? 'active' : ''}`}
              onClick={() => setDateFilter(df.id)}
            >
              {df.label}
            </button>
          ))}
        </div>

        {/* Location + Price + Sort Selectors */}
        <div className="filter-actions-right">
          {/* Location Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '0 0.7rem' }}>
            <MapPin size={14} color={locationFilter !== 'all' ? 'var(--brand-primary)' : 'var(--text-muted)'} />
            <select
              className="custom-select"
              style={{ background: 'transparent', border: 'none', padding: '0.55rem 0.25rem' }}
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="all">All Locations</option>
              {CITIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
          </div>

          <select
            className="custom-select"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            {PRICE_FILTERS.map((pf) => (
              <option key={pf.id} value={pf.id}>
                {pf.label}
              </option>
            ))}
          </select>

          <select
            className="custom-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="nav-icon-btn"
              title="Reset all filters"
              style={{ width: 'auto', padding: '0 0.75rem', gap: '0.35rem', fontSize: '0.82rem', fontWeight: 600 }}
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
