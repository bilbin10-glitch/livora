import React from 'react';
import { X, CheckCircle, Calendar, Download, Printer, Share2, Sparkles, MapPin } from 'lucide-react';
import QRCodeDisplay from './QRCodeDisplay';
import { formatCurrency, downloadICSFile } from '../utils/helpers';

export default function TicketPassModal({
  booking,
  onClose,
  onOpenWallet
}) {
  if (!booking) return null;

  const { event, selectedSeats, tier, totalAmount, id, selectedAddons } = booking;

  const handleCalendarDownload = () => {
    downloadICSFile(event, booking);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '480px', background: 'transparent', border: 'none', boxShadow: 'none' }} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" style={{ top: '0', right: '0' }} onClick={onClose}>
          <X size={20} />
        </button>

        <div className="pass-wrapper">
          {/* Booking Success Banner */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#34d399', fontWeight: 800 }}>
            <CheckCircle size={20} />
            <span>Booking Confirmed! Pass Ready</span>
          </div>

          {/* Digital Pass Card */}
          <div className="digital-pass-card">
            {/* Header */}
            <div className="pass-header">
              <img src={event.bannerImage} alt={event.title} className="pass-header-bg" />
              <div className="pass-header-overlay"></div>

              <div className="pass-brand-badge">
                <Sparkles size={14} color="var(--brand-primary)" />
                <span>LIVORA PASS</span>
              </div>
            </div>

            {/* Pass Body */}
            <div className="pass-body">
              <div className="pass-event-title">{event.title}</div>

              <div className="pass-info-grid">
                <div className="pass-info-item">
                  <span className="pass-info-label">Date & Time</span>
                  <span className="pass-info-value">{event.displayDate}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{event.time}</span>
                </div>

                <div className="pass-info-item">
                  <span className="pass-info-label">Tier / Pass Type</span>
                  <span className="pass-info-value" style={{ color: tier.color || 'var(--brand-secondary)' }}>
                    {tier.name?.replace(/^[^\w\s]+/, '') || 'Standard Pass'}
                  </span>
                </div>

                <div className="pass-info-item">
                  <span className="pass-info-label">Seat Allocation</span>
                  <span className="pass-info-value" style={{ letterSpacing: '0.05em', color: 'var(--text-primary)' }}>
                    {selectedSeats.join(', ')}
                  </span>
                </div>

                <div className="pass-info-item">
                  <span className="pass-info-label">Entry Turnstile</span>
                  <span className="pass-info-value">
                    {selectedSeats.some(s => s.startsWith('VIP'))
                      ? 'Gate 01 (VIP Fast-Track)'
                      : selectedSeats.some(s => s.startsWith('GOLD'))
                      ? 'Gate 03 (Gold Concourse)'
                      : selectedSeats.some(s => s.startsWith('BALCONY'))
                      ? 'Gate 07 (Balcony Escalator)'
                      : 'Gate 04 (Main Concourse)'}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <MapPin size={14} style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>{event.venue}</span>
              </div>

              {selectedAddons && selectedAddons.length > 0 && (
                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '0.5rem 0.75rem', borderRadius: '8px', fontSize: '0.78rem' }}>
                  <span style={{ fontWeight: 700, color: 'var(--brand-secondary)' }}>Included Perks: </span>
                  <span style={{ color: 'var(--text-secondary)' }}>{selectedAddons.map(a => a.name).join(', ')}</span>
                </div>
              )}
            </div>

            {/* Perforation Cut */}
            <div className="pass-perforation">
              <div className="notch-left"></div>
              <div className="perforation-dashed-line"></div>
              <div className="notch-right"></div>
            </div>

            {/* Footer with Scannable QR Code */}
            <div className="pass-footer">
              <div className="qr-code-box">
                <QRCodeDisplay value={`LIVORA-AUTH-${id}-${selectedSeats.join('-')}`} size={130} />
              </div>

              <div className="pass-barcode-text">{id}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Show this digital QR pass at venue turnstiles for fast-track admission
              </div>
            </div>
          </div>

          {/* Pass Action Buttons */}
          <div className="pass-actions-row">
            <button className="btn-pass-action" onClick={handleCalendarDownload}>
              <Calendar size={16} />
              <span>Add to Calendar (.ics)</span>
            </button>

            <button className="btn-pass-action" onClick={handlePrint}>
              <Printer size={16} />
              <span>Print Pass</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
