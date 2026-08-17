import React, { useState } from 'react';
import { X, Ticket, Calendar, MapPin, Eye, Ban, Download, Sparkles, CheckCircle2, AlertTriangle, Trash2, Wallet, ArrowRight, ShieldCheck } from 'lucide-react';
import { formatCurrency, downloadICSFile } from '../utils/helpers';
import { getCancellationRefundDetails } from '../utils/storage';

export default function MyBookingsModal({
  bookings = [],
  currentUser,
  onClose,
  onViewPass,
  onCancelBooking,
  onDeleteBooking,
  onExploreEvents
}) {
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'cancelled'
  const [cancellationTarget, setCancellationTarget] = useState(null); // booking object to cancel

  const activeBookings = bookings.filter(b => b.status !== 'cancelled');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

  const handleOpenCancelDialog = (booking) => {
    setCancellationTarget(booking);
  };

  const handleConfirmCancel = () => {
    if (!cancellationTarget) return;
    const refundDetails = getCancellationRefundDetails(cancellationTarget);
    onCancelBooking(cancellationTarget.id, refundDetails.refundAmount, refundDetails);
    setCancellationTarget(null);
  };

  const cancelRefundInfo = cancellationTarget ? getCancellationRefundDetails(cancellationTarget) : null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '820px', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {/* Header with Wallet Balance Preview */}
        <div style={{ padding: '1.75rem 1.75rem 1rem 1.75rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand-primary)', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase' }}>
              <Sparkles size={16} />
              <span>Digital Pass Wallet & Tickets</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '0.2rem' }}>My Bookings & Passes</h2>
          </div>

          {currentUser && (
            <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 'var(--radius-md)', padding: '0.45rem 0.85rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Wallet size={18} color="#34d399" />
              <div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Livora Wallet Balance</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#34d399' }}>
                  {formatCurrency(currentUser.walletBalance || 0)}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '0.5rem', padding: '0.85rem 1.75rem 0.2rem 1.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <button
            type="button"
            className={`auth-mode-btn ${activeTab === 'active' ? 'active' : ''}`}
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            onClick={() => setActiveTab('active')}
          >
            Confirmed Passes ({activeBookings.length})
          </button>
          <button
            type="button"
            className={`auth-mode-btn ${activeTab === 'cancelled' ? 'active' : ''}`}
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            onClick={() => setActiveTab('cancelled')}
          >
            Cancelled & Refunded ({cancelledBookings.length})
          </button>
        </div>

        {/* ACTIVE PASSES VIEW */}
        {activeTab === 'active' && (
          <div>
            {activeBookings.length === 0 ? (
              <div style={{ padding: '3.5rem 1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Ticket size={28} color="var(--text-muted)" />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>No active passes right now</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '380px' }}>
                  Explore trending concerts, live band gigs, and stand-up specials to book your next live pass!
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
              <div className="wallet-passes-list" style={{ padding: '1.25rem 1.75rem', maxHeight: '420px', overflowY: 'auto' }}>
                {activeBookings.map((booking) => (
                  <div key={booking.id} className="wallet-pass-item">
                    <div className="wallet-pass-left">
                      <img src={booking.event.thumbnailImage || booking.event.bannerImage} alt={booking.event.title} className="wallet-pass-thumb" />
                      <div className="wallet-pass-info">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span className="wallet-badge-active">
                            <Ticket size={12} /> Confirmed Pass
                          </span>
                          <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700 }}>
                            • 100% Refund Available
                          </span>
                        </div>

                        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginTop: '0.2rem' }}>{booking.event.title}</h4>

                        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Calendar size={13} color="var(--brand-primary)" />
                          <span>{booking.event.displayDate} • {booking.event.time}</span>
                        </div>

                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          Tier: <strong style={{ color: 'var(--text-primary)' }}>{booking.tier?.name || 'Standard Pass'}</strong> • Seats: <strong style={{ color: 'var(--brand-primary)' }}>{booking.selectedSeats?.join(', ')}</strong>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {formatCurrency(booking.totalAmount)}
                      </div>

                      <div style={{ display: 'flex', gap: '0.4rem' }}>
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
                          style={{ width: 'auto', height: '32px', padding: '0 0.6rem', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.08)', gap: '0.3rem', fontSize: '0.78rem', fontWeight: 700 }}
                          onClick={() => handleOpenCancelDialog(booking)}
                          title="Cancel Booking & Get 100% Cashback"
                        >
                          <Ban size={13} />
                          <span>Cancel</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CANCELLED & REFUNDED PASSES VIEW */}
        {activeTab === 'cancelled' && (
          <div>
            {cancelledBookings.length === 0 ? (
              <div style={{ padding: '3rem 1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                <p>No cancelled bookings recorded.</p>
              </div>
            ) : (
              <div className="wallet-passes-list" style={{ padding: '1.25rem 1.75rem', maxHeight: '420px', overflowY: 'auto' }}>
                {cancelledBookings.map((booking) => (
                  <div key={booking.id} className="wallet-pass-item" style={{ opacity: 0.85, background: 'rgba(239, 68, 68, 0.04)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                    <div className="wallet-pass-left">
                      <img src={booking.event.thumbnailImage || booking.event.bannerImage} alt={booking.event.title} className="wallet-pass-thumb" style={{ filter: 'grayscale(60%)' }} />
                      <div className="wallet-pass-info">
                        <span className="wallet-badge-cancelled">
                          ✕ Cancelled & Refunded
                        </span>

                        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginTop: '0.2rem' }}>{booking.event.title}</h4>

                        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                          Show Date: {booking.event.displayDate} • Seats: {booking.selectedSeats?.join(', ')}
                        </div>

                        <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <CheckCircle2 size={13} />
                          <span>Refunded: {formatCurrency(booking.refundedAmount || booking.totalAmount)} credited to Livora Wallet</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                      <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                        {formatCurrency(booking.totalAmount)}
                      </div>

                      {onDeleteBooking && (
                        <button
                          type="button"
                          className="nav-icon-btn"
                          style={{ width: '32px', height: '32px', color: 'var(--text-muted)' }}
                          onClick={() => onDeleteBooking(booking.id)}
                          title="Remove from history"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 24-HOUR CANCELLATION & INSTANT CASHBACK CONFIRMATION MODAL */}
        {cancellationTarget && cancelRefundInfo && (
          <div className="auth-overlay" style={{ zIndex: 100 }}>
            <div className="auth-modal-card" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
              <div className="auth-card-header">
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: cancelRefundInfo.isEligible24Hr ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)', color: cancelRefundInfo.isEligible24Hr ? '#10b981' : '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem auto' }}>
                  {cancelRefundInfo.isEligible24Hr ? <CheckCircle2 size={26} /> : <AlertTriangle size={26} />}
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                  {cancelRefundInfo.isEligible24Hr ? '100% Instant Cashback Available' : 'Confirm Pass Cancellation'}
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                  {cancelRefundInfo.message}
                </p>
              </div>

              {/* Cancellation Breakdown Card */}
              <div style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', padding: '1rem', margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Show:</span>
                  <strong>{cancellationTarget.event.title}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Seats ({cancellationTarget.selectedSeats.length}):</span>
                  <span>{cancellationTarget.selectedSeats.join(', ')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Original Amount Paid:</span>
                  <span>{formatCurrency(cancellationTarget.totalAmount)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.5rem', fontWeight: 800 }}>
                  <span style={{ color: '#10b981' }}>Cashback Credited to Wallet:</span>
                  <span style={{ color: '#10b981', fontSize: '1.05rem' }}>
                    +{formatCurrency(cancelRefundInfo.refundAmount)} ({cancelRefundInfo.refundPercent}%)
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  type="button"
                  className="nav-icon-btn"
                  style={{ flex: 1, height: '44px', fontSize: '0.85rem', fontWeight: 700 }}
                  onClick={() => setCancellationTarget(null)}
                >
                  Keep Pass
                </button>

                <button
                  type="button"
                  className="btn-hero-book"
                  style={{ flex: 1, padding: '0.65rem 1rem', fontSize: '0.85rem', background: '#ef4444', borderColor: '#ef4444' }}
                  onClick={handleConfirmCancel}
                >
                  <span>Cancel & Claim {formatCurrency(cancelRefundInfo.refundAmount)}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
