import React, { useState, useMemo } from 'react';
import { X, Sparkles, Users, Layers, Ticket, ArrowRight, ArrowLeft, ShieldCheck, Info } from 'lucide-react';
import { getVenueArchitecture } from '../data/venueArchitectures';
import { formatCurrency } from '../utils/helpers';

export default function SeatSelectionModal({
  event,
  onClose,
  onBack,
  onProceedToCheckout
}) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [activeBlockId, setActiveBlockId] = useState('all');
  const [hoveredSeat, setHoveredSeat] = useState(null);

  // Retrieve 1,000+ seat venue architecture for this specific event
  const venueArch = useMemo(() => {
    if (!event) return null;
    return getVenueArchitecture(event);
  }, [event]);

  if (!event || !venueArch) return null;

  // Toggle Seat Selection
  const handleSeatClick = (seat) => {
    if (seat.status === 'booked' || seat.status === 'reserved') return;

    setSelectedSeats((prev) => {
      const exists = prev.some((s) => s.id === seat.id);
      if (exists) {
        return prev.filter((s) => s.id !== seat.id);
      }
      if (prev.length >= 8) {
        alert('You can select a maximum of 8 seats per booking.');
        return prev;
      }
      return [...prev, seat];
    });
  };

  const removeSeat = (seatId) => {
    setSelectedSeats((prev) => prev.filter((s) => s.id !== seatId));
  };

  const totalSeatsPrice = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  // Filter visible blocks
  const visibleBlocks = activeBlockId === 'all'
    ? venueArch.blocks
    : venueArch.blocks.filter((b) => b.id === activeBlockId);

  const handleProceed = () => {
    if (selectedSeats.length === 0) return;

    const primaryTier = selectedSeats[0]?.tierObj || event.ticketTiers[0];

    onProceedToCheckout({
      event,
      venueArch,
      selectedSeats: selectedSeats.map((s) => s.id),
      seatObjects: selectedSeats,
      tier: primaryTier,
      totalSeatsPrice
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '980px' }} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="seatmap-container">
          {/* Venue Header with 1000+ Capacity Metric */}
          <div className="seatmap-header">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {onBack && (
                    <button
                      type="button"
                      onClick={onBack}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        background: 'var(--bg-tertiary)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-secondary)',
                        padding: '0.35rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      <ArrowLeft size={14} />
                      <span>Back</span>
                    </button>
                  )}
                  <span className="venue-capacity-badge">
                    <Users size={13} />
                    <span>Venue Capacity: {venueArch.totalCapacity.toLocaleString()} Seats</span>
                  </span>
                  <span className="venue-arch-tag">
                    <Layers size={13} />
                    <span>{venueArch.typeName}</span>
                  </span>
                </div>
              </div>

              <h2 className="seatmap-title" style={{ marginTop: '0.2rem' }}>{event.title}</h2>
              <div className="seatmap-subtitle">
                {event.displayDate} • {event.time} • 📍 {event.venue}
              </div>
            </div>
          </div>

          {/* Block / Zone Filter Tabs */}
          <div className="block-navigator-bar">
            <button
              className={`block-pill-card ${activeBlockId === 'all' ? 'active' : ''}`}
              style={{ '--block-color': 'var(--brand-primary)' }}
              onClick={() => setActiveBlockId('all')}
            >
              <div className="block-pill-top">
                <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: '#ffcad4' }}>
                  Full Arena
                </span>
                <span className="block-pill-cap">{venueArch.totalCapacity.toLocaleString()} Seats</span>
              </div>
              <div className="block-pill-name">All Venue Blocks</div>
              <div className="block-pill-price">from {formatCurrency(event.priceStartingFrom)}</div>
            </button>

            {venueArch.blocks.map((block) => {
              const isSelected = activeBlockId === block.id;
              const countInBlock = selectedSeats.filter((s) => s.blockId === block.id).length;

              return (
                <button
                  key={block.id}
                  className={`block-pill-card ${isSelected ? 'active' : ''}`}
                  style={{ '--block-color': block.color }}
                  onClick={() => setActiveBlockId(block.id)}
                >
                  <div className="block-pill-top">
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: block.color }}>
                      {block.tierName}
                    </span>
                    {countInBlock > 0 && (
                      <span className="badge-count" style={{ position: 'static' }}>{countInBlock}</span>
                    )}
                  </div>
                  <div className="block-pill-name">{block.name}</div>
                  <div className="block-pill-price">{formatCurrency(block.price)}</div>
                  <div className="block-pill-cap">{block.capacity.toLocaleString()} Capacity</div>
                </button>
              );
            })}
          </div>

          {/* Stage Visualizer */}
          <div className="stage-visualizer-container">
            <div className="stage-light-glow"></div>
            <div className="stage-title-text">🎤 STAGE / LIVE PERFORMANCE AREA</div>
          </div>

          {/* Seating Canvas with Dynamic Venue Alignment Shape */}
          <div className={`venue-seating-canvas layout-${venueArch.layoutShape}`}>
            {visibleBlocks.map((block) => (
              <div key={block.id} className="zone-block-group">
                <div className="zone-block-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: block.color }}>
                    <span>{block.name}</span>
                    <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', background: `${block.color}20`, borderRadius: '9999px', border: `1px solid ${block.color}40` }}>
                      {formatCurrency(block.price)} / seat
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Block Capacity: {block.capacity.toLocaleString()} seats
                  </div>
                </div>

                {/* Rows & Columns for this block */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', width: '100%', alignItems: 'center' }}>
                  {block.rows.map((rowName, rIdx) => {
                    const rowSeats = [];
                    const midAisle = Math.floor(block.colsPerRow / 2);

                    for (let c = 1; c <= block.colsPerRow; c++) {
                      const seatId = `${rowName}-${c}`;
                      
                      // Deterministic booking state
                      const hash = (seatId.charCodeAt(0) * 17 + c * 23 + event.id.charCodeAt(3) + rIdx * 7) % 100;
                      let status = 'available';
                      if (hash > 76) {
                        status = 'booked';
                      } else if (hash > 69) {
                        status = 'reserved';
                      }

                      rowSeats.push({
                        id: seatId,
                        row: rowName,
                        col: c,
                        blockId: block.id,
                        blockName: block.name,
                        tierName: block.tierName,
                        price: block.price,
                        color: block.color,
                        tierClass: block.tierId === 'tier_vip' ? 'tier-vip' : block.tierId === 'tier_gold' ? 'tier-gold' : block.tierId === 'tier_silver' ? 'tier-silver' : 'tier-bronze',
                        status,
                        isAisle: c === midAisle
                      });
                    }

                    return (
                      <div key={rowName} className="venue-seat-row">
                        <span className="row-identifier">{rowName}</span>

                        {rowSeats.map((seat) => {
                          const isSelected = selectedSeats.some((s) => s.id === seat.id);
                          let seatClass = `venue-seat-btn ${seat.tierClass} ${seat.status}`;
                          if (isSelected) seatClass += ' selected';
                          if (seat.isAisle) seatClass += ' aisle-spacing';

                          return (
                            <div
                              key={seat.id}
                              style={{ position: 'relative' }}
                              onMouseEnter={() => setHoveredSeat(seat)}
                              onMouseLeave={() => setHoveredSeat(null)}
                            >
                              <button
                                className={seatClass}
                                onClick={() => handleSeatClick(seat)}
                                disabled={seat.status === 'booked' || seat.status === 'reserved'}
                              >
                                {isSelected ? '✓' : seat.col}
                              </button>

                              {/* Hover Tooltip Card */}
                              {hoveredSeat?.id === seat.id && (
                                <div className="seat-hover-card">
                                  <div style={{ fontWeight: 800, color: '#ffffff' }}>Seat {seat.id}</div>
                                  <div style={{ color: block.color, fontWeight: 700 }}>
                                    {block.name} • {formatCurrency(seat.price)}
                                  </div>
                                  <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>
                                    Status: <strong style={{ color: seat.status === 'available' ? 'var(--brand-success)' : '#f87171' }}>{seat.status.toUpperCase()}</strong>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}

                        <span className="row-identifier">{rowName}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Venue Status Legend */}
          <div className="venue-legend-bar">
            <div className="legend-chip">
              <span className="legend-swatch" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-medium)' }}></span>
              <span>Available</span>
            </div>
            <div className="legend-chip">
              <span className="legend-swatch" style={{ background: 'var(--brand-primary)' }}></span>
              <span>Selected ({selectedSeats.length})</span>
            </div>
            <div className="legend-chip">
              <span className="legend-swatch" style={{ background: 'rgba(255, 255, 255, 0.08)' }}></span>
              <span>Sold Out</span>
            </div>
            <div className="legend-chip">
              <span className="legend-swatch" style={{ background: '#f59e0b' }}></span>
              <span>VIP Tier</span>
            </div>
            <div className="legend-chip">
              <span className="legend-swatch" style={{ background: '#e11d48' }}></span>
              <span>Gold Circle</span>
            </div>
            <div className="legend-chip">
              <span className="legend-swatch" style={{ background: '#06b6d4' }}></span>
              <span>Silver Concourse</span>
            </div>
            <div className="legend-chip">
              <span className="legend-swatch" style={{ background: '#8b5cf6' }}></span>
              <span>Balcony / Lawn</span>
            </div>
          </div>

          {/* Bottom Floating Bar */}
          <div className="seatmap-checkout-bar">
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                {selectedSeats.length > 0
                  ? `Selected Seats (${selectedSeats.length} / 8 Max):`
                  : 'Click on any available seat in your preferred zone to book'}
              </div>

              {selectedSeats.length > 0 ? (
                <div className="selected-seat-tags-list">
                  {selectedSeats.map((seat) => (
                    <span key={seat.id} className="seat-tag-item">
                      <span>{seat.id} ({formatCurrency(seat.price)})</span>
                      <span className="seat-tag-remove" onClick={() => removeSeat(seat.id)}>✕</span>
                    </span>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-muted)' }}>
                  No Seats Selected
                </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              {selectedSeats.length > 0 && (
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Subtotal</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                    {formatCurrency(totalSeatsPrice)}
                  </div>
                </div>
              )}

              <button
                className="btn-proceed-checkout"
                disabled={selectedSeats.length === 0}
                onClick={handleProceed}
              >
                <Ticket size={18} />
                <span>
                  Proceed to Checkout {selectedSeats.length > 0 ? `(${selectedSeats.length})` : ''}
                </span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
