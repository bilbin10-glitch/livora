import React from 'react';
import { X, Ticket, Calendar, MapPin, Eye, Ban, Download, Sparkles } from 'lucide-react';
import { formatCurrency, downloadICSFile } from '../utils/helpers';

export default function MyBookingsModal({
  bookings,
  onClose,
  onViewPass,
  onCancelBooking,
  onExploreEvents
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '750px' }} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div style={{ padding: '1.75rem 1.75rem 1rem 1.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand-primary)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
            <Sparkles size={16} />
            <span>Digital Pass Wallet</span>
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>My Bookings & Passes</h2>
        </div>

        {bookings.length === 0 ? (
          <div style={{ padding: '3.5rem 1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ticket size={28} color="var(--text-muted)" />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>No passes booked yet</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '380px' }}>
              Explore concerts, stand-up specials, stage dramas, and live band gigs to book your first unforgettable experience!
            </p>
            <button
              className="btn-hero-book"
              onClick={() => {
                onClose();
                onExploreEvents();
              }}
            >
              Explore Live Shows
            </button>
          </div>
        ) : (
          <div className="wallet-passes-list">
            {bookings.map((booking) => {
              const isCancelled = booking.status === 'cancelled';

              return (
                <div key={booking.id} className="wallet-pass-item">
                  <div className="wallet-pass-left">
                    <img src={booking.event.thumbnailImage} alt={booking.event.title} className="wallet-pass-thumb" />
                    <div className="wallet-pass-info">
                      {isCancelled ? (
                        <span className="wallet-badge-cancelled">Cancelled</span>
                      ) : (
                        <span className="wallet-badge-active">
                          <Ticket size={12} /> Confirmed Pass
                        </span>
                      )}

                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{booking.event.title}</h4>

                      <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Calendar size={13} color="var(--brand-primary)" />
                        <span>{booking.event.displayDate} • {booking.event.time}</span>
                      </div>

                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Tier: <strong style={{ color: 'var(--text-primary)' }}>{booking.tier.name}</strong> • Seats: <strong style={{ color: 'var(--text-primary)' }}>{booking.selectedSeats.join(', ')}</strong>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {formatCurrency(booking.totalAmount)}
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {!isCancelled && (
                        <>
                          <button
                            className="btn-pass-action"
                            style={{ padding: '0.45rem 0.8rem', fontSize: '0.8rem' }}
                            onClick={() => {
                              onClose();
                              onViewPass(booking);
                            }}
                            title="View Digital QR Pass"
                          >
                            <Eye size={14} />
                            <span>View QR</span>
                          </button>

                          <button
                            className="nav-icon-btn"
                            style={{ width: '32px', height: '32px' }}
                            onClick={() => downloadICSFile(booking.event, booking)}
                            title="Download Calendar Reminder"
                          >
                            <Download size={14} />
                          </button>

                          <button
                            className="nav-icon-btn"
                            style={{ width: '32px', height: '32px', color: '#f87171' }}
                            onClick={() => {
                              if (window.confirm('Are you sure you want to cancel this booking?')) {
                                onCancelBooking(booking.id);
                              }
                            }}
                            title="Cancel Booking"
                          >
                            <Ban size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
