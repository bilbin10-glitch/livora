import React from 'react';
import { SlidersHorizontal, RotateCcw, MapPin, ChevronDown } from 'lucide-react';
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
  selectedCities = [],
  onOpenCityModal,
  onReset
}) {
  const citiesArray = Array.isArray(selectedCities) ? selectedCities : selectedCities ? [selectedCities] : [];
  const hasActiveFilters =
    dateFilter !== 'all' ||
    priceFilter !== 'all' ||
    sortBy !== 'trending' ||
    citiesArray.length > 0;

  // Compute location button label
  let locationBtnText = 'All Locations';
  if (citiesArray.length === 1) {
    const c = CITIES.find((city) => city.id === citiesArray[0]);
    locationBtnText = c ? `${c.icon} ${c.name}` : '1 Location';
  } else if (citiesArray.length > 1) {
    locationBtnText = `📍 ${citiesArray.length} Locations Selected`;
  }

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
          {/* Multi-Location Hub Filter Button */}
          <button
            type="button"
            className="custom-select"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              cursor: 'pointer',
              borderColor: citiesArray.length > 0 ? 'var(--brand-primary)' : 'var(--border-subtle)',
              background: citiesArray.length > 0 ? 'rgba(225, 29, 72, 0.08)' : 'var(--bg-tertiary)'
            }}
            onClick={onOpenCityModal}
            title="Filter shows by selecting one or more locations"
          >
            <MapPin size={14} color={citiesArray.length > 0 ? 'var(--brand-primary)' : 'var(--text-muted)'} />
            <span style={{ fontWeight: citiesArray.length > 0 ? 700 : 500, color: citiesArray.length > 0 ? 'var(--brand-primary)' : 'inherit' }}>
              {locationBtnText}
            </span>
            <ChevronDown size={14} color="var(--text-muted)" />
          </button>

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
