import React, { useState } from 'react';
import {
  Sparkles,
  DollarSign,
  Ticket,
  Users,
  Layers,
  Plus,
  ArrowUpRight,
  Search,
  Trash2,
  CheckCircle,
  QrCode,
  Shield,
  Tag,
  Eye,
  TrendingUp,
  MapPin,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { formatCurrency } from '../utils/helpers';
import { CATEGORIES } from '../data/eventsData';

export default function AdminDashboard({
  events,
  bookings,
  onExitAdmin,
  onOpenCreateModal,
  onDeleteEvent,
  onToggleSellingFast
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchFilter, setSearchFilter] = useState('');
  const [scanPassId, setScanPassId] = useState('');
  const [scanResult, setScanResult] = useState(null);

  // Computed metrics
  const totalRevenue = bookings.reduce((sum, b) => b.status !== 'cancelled' ? sum + b.totalAmount : sum, 0) + 4820000;
  const totalTicketsSold = bookings.filter(b => b.status !== 'cancelled').reduce((sum, b) => sum + b.selectedSeats.length, 0) + 12450;
  const activeEventsCount = events.length;

  // Filter events in table
  const filteredTableEvents = events.filter(e => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return e.title.toLowerCase().includes(q) || e.artist.toLowerCase().includes(q) || e.city.toLowerCase().includes(q) || e.categoryLabel.toLowerCase().includes(q);
  });

  // Handle Pass Scanning
  const handleVerifyScan = (e) => {
    e.preventDefault();
    if (!scanPassId.trim()) return;

    const trimmed = scanPassId.trim().toUpperCase();
    const foundBooking = bookings.find(b => b.id.toUpperCase() === trimmed);

    if (foundBooking) {
      if (foundBooking.status === 'cancelled') {
        setScanResult({ valid: false, message: `Pass ${trimmed} is CANCELLED / REFUNDED. Access Denied.` });
      } else {
        setScanResult({
          valid: true,
          booking: foundBooking,
          message: `✓ Valid Pass! Admit ${foundBooking.selectedSeats.length} Guest(s) for ${foundBooking.event.title} (${foundBooking.selectedSeats.join(', ')})`
        });
      }
    } else {
      // Demo validation for simulated pass codes
      if (trimmed.startsWith('LVR-')) {
        setScanResult({
          valid: true,
          message: `✓ Valid Livora Pass ${trimmed}! Gate 01 Express Entry Authorized.`
        });
      } else {
        setScanResult({ valid: false, message: `Invalid Pass ID: ${trimmed}. Pass not found in system.` });
      }
    }
  };

  return (
    <div className="admin-portal-container">
      {/* Header Bar */}
      <div className="admin-header-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="brand-logo-icon">
            <Shield size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Livora Organizer Suite</h1>
              <span className="admin-badge-role">👑 SuperAdmin</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Live ticketing operations, high-capacity venue management & real-time revenue telemetry
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            className="btn-hero-book"
            style={{ padding: '0.6rem 1.25rem', fontSize: '0.88rem' }}
            onClick={onOpenCreateModal}
          >
            <Plus size={16} />
            <span>Create Live Show</span>
          </button>

          <button
            className="btn-pass-action"
            onClick={onExitAdmin}
            title="Switch to customer booking app"
          >
            <Eye size={16} />
            <span>View Customer App</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="admin-metrics-grid">
        <div className="admin-metric-card">
          <div>
            <div className="metric-label">Total Gross Revenue</div>
            <div className="metric-val">{formatCurrency(totalRevenue)}</div>
            <div className="metric-trend">
              <ArrowUpRight size={14} />
              <span>+18.4% vs last week</span>
            </div>
          </div>
          <div className="metric-icon-box" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
            <DollarSign size={24} />
          </div>
        </div>

        <div className="admin-metric-card">
          <div>
            <div className="metric-label">Tickets Issued</div>
            <div className="metric-val">{totalTicketsSold.toLocaleString()} Passes</div>
            <div className="metric-trend">
              <ArrowUpRight size={14} />
              <span>+2,140 passes today</span>
            </div>
          </div>
          <div className="metric-icon-box" style={{ background: 'rgba(225, 29, 72, 0.15)', color: 'var(--brand-primary)' }}>
            <Ticket size={24} />
          </div>
        </div>

        <div className="admin-metric-card">
          <div>
            <div className="metric-label">Active Live Shows</div>
            <div className="metric-val">{activeEventsCount} Productions</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Across 11 Entertainment Hubs
            </div>
          </div>
          <div className="metric-icon-box" style={{ background: 'rgba(6, 182, 212, 0.15)', color: 'var(--brand-cyan)' }}>
            <Layers size={24} />
          </div>
        </div>

        <div className="admin-metric-card">
          <div>
            <div className="metric-label">Avg. Venue Occupancy</div>
            <div className="metric-val">88.4%</div>
            <div className="metric-trend">
              <TrendingUp size={14} />
              <span>High booking momentum</span>
            </div>
          </div>
          <div className="metric-icon-box" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
            <Users size={24} />
          </div>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="admin-tabs-nav">
        <button
          className={`admin-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Performance Overview
        </button>

        <button
          className={`admin-tab-btn ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          🎪 Live Shows Manager ({events.length})
        </button>

        <button
          className={`admin-tab-btn ${activeTab === 'venues' ? 'active' : ''}`}
          onClick={() => setActiveTab('venues')}
        >
          💺 Venue Capacities (1000+ Seats)
        </button>

        <button
          className={`admin-tab-btn ${activeTab === 'scanner' ? 'active' : ''}`}
          onClick={() => setActiveTab('scanner')}
        >
          🎟️ Gate Turnstile Scanner
        </button>
      </div>

      {/* TAB 1: OVERVIEW TELEMETRY */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {/* Revenue Breakdown by Category */}
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.25rem' }}>Revenue by Show Category</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { label: '🎤 Music Concerts', pct: 42, rev: '₹22,76,000', color: 'var(--brand-primary)' },
                { label: '🎸 Live Bands & Rock', pct: 24, rev: '₹13,00,000', color: '#f59e0b' },
                { label: '🎭 Stage & Drama Programs', pct: 16, rev: '₹8,67,000', color: '#06b6d4' },
                { label: '😂 Comedy Shows & Mimicry', pct: 10, rev: '₹5,42,000', color: '#10b981' },
                { label: '💃 Dance & Temple Rituals', pct: 8, rev: '₹4,35,000', color: '#8b5cf6' }
              ].map((item, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem', fontWeight: 700 }}>
                    <span>{item.label}</span>
                    <span style={{ color: item.color }}>{item.rev} ({item.pct}%)</span>
                  </div>
                  <div style={{ height: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${item.pct}%`, height: '100%', background: item.color, borderRadius: '4px' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Live Transactions */}
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.25rem' }}>Recent Booking Activity</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {bookings.slice(0, 4).map((b) => (
                <div key={b.id} style={{ background: 'var(--bg-tertiary)', padding: '0.85rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{b.event.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Pass: <strong style={{ color: 'var(--text-primary)' }}>{b.id}</strong> • Seats: {b.selectedSeats.join(', ')}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, color: 'var(--brand-success)' }}>{formatCurrency(b.totalAmount)}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Just Now</div>
                  </div>
                </div>
              ))}
              {bookings.length === 0 && (
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '2rem 0' }}>
                  No recent transactions in this session. Book passes in the customer app to see real-time updates!
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LIVE SHOWS MANAGER */}
      {activeTab === 'events' && (
        <div className="admin-table-container">
          <div className="admin-table-header">
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Manage Published Live Productions</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Live catalog across all 6 entertainment categories</p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div className="search-input-wrapper" style={{ width: '280px' }}>
                <Search size={16} color="var(--text-muted)" />
                <input
                  type="text"
                  placeholder="Filter shows or artists..."
                  className="search-input"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                />
              </div>
            </div>
          </div>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Show / Production</th>
                <th>Category</th>
                <th>City & Venue</th>
                <th>Base Price</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTableEvents.map((ev) => (
                <tr key={ev.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img src={ev.thumbnailImage} alt={ev.title} style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }} />
                      <div>
                        <strong style={{ color: 'var(--text-primary)' }}>{ev.title}</strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ev.artist}</div>
                      </div>
                    </div>
                  </td>
                  <td>{ev.categoryEmoji} {ev.categoryLabel}</td>
                  <td>
                    <div>{ev.city.toUpperCase()}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ev.venue.split(',')[0]}</div>
                  </td>
                  <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{formatCurrency(ev.priceStartingFrom)}</td>
                  <td>⭐ {ev.rating} ({ev.reviewCount})</td>
                  <td>
                    {ev.isSellingFast ? (
                      <span className="table-status-pill status-fast">🔥 Selling Fast</span>
                    ) : (
                      <span className="table-status-pill status-live">Live</span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        className="nav-icon-btn"
                        style={{ width: '30px', height: '30px' }}
                        onClick={() => onToggleSellingFast(ev.id)}
                        title="Toggle Selling Fast badge"
                      >
                        ⚡
                      </button>
                      <button
                        className="nav-icon-btn"
                        style={{ width: '30px', height: '30px', color: '#f87171' }}
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to remove "${ev.title}"?`)) {
                            onDeleteEvent(ev.id);
                          }
                        }}
                        title="Delete Show"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: VENUES (1000+ SEATS) */}
      {activeTab === 'venues' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {[
            { name: 'Bolgatty Palace Waterfront Grounds', city: 'Kochi, Kerala', cap: 3500, type: 'Open-Air Amphitheatre', occ: 92, color: '#f59e0b' },
            { name: 'Rajiv Gandhi Indoor Stadium', city: 'Kochi, Kerala', cap: 4800, type: 'Indoor Arena Bowl', occ: 88, color: '#e11d48' },
            { name: 'Nishagandhi Open Auditorium', city: 'Trivandrum, Kerala', cap: 3500, type: 'Palace Amphitheatre', occ: 85, color: '#06b6d4' },
            { name: 'JT Pac (Jose Thomas Performing Arts)', city: 'Kochi, Kerala', cap: 1850, type: 'Proscenium Theatre', occ: 94, color: '#8b5cf6' },
            { name: 'Grand Horizon BKC Superdome', city: 'Mumbai', cap: 4800, type: 'Arena Superdome', occ: 89, color: '#10b981' },
            { name: 'Kozhikode Beach Amphitheatre', city: 'Calicut, Kerala', cap: 3500, type: 'Waterfront Amphitheatre', occ: 96, color: '#f59e0b' }
          ].map((v, i) => (
            <div key={i} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>{v.name}</h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>📍 {v.city} • {v.type}</div>
                </div>
                <span className="venue-capacity-badge">{v.cap.toLocaleString()} Seats</span>
              </div>

              <div style={{ marginTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.35rem' }}>
                  <span>Live Capacity Occupancy</span>
                  <strong style={{ color: v.color }}>{v.occ}% Booked</strong>
                </div>
                <div style={{ height: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${v.occ}%`, height: '100%', background: v.color, borderRadius: '4px' }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: PASS SCANNER SIMULATOR */}
      {activeTab === 'scanner' && (
        <div style={{ maxWidth: '600px', margin: '0 auto', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: '2rem', textAlign: 'center' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(225, 29, 72, 0.15)', color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
            <QrCode size={30} />
          </div>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Gate Turnstile Pass Validator</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem', marginBottom: '1.5rem' }}>
            Scan or enter the customer's digital QR Pass ID to verify admission at venue gates
          </p>

          <form onSubmit={handleVerifyScan} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <input
              type="text"
              className="card-text-input"
              style={{ flex: 1, textTransform: 'uppercase', fontWeight: 700 }}
              placeholder="e.g. LVR-2026-9X4A"
              value={scanPassId}
              onChange={(e) => setScanPassId(e.target.value)}
            />
            <button type="submit" className="btn-hero-book" style={{ padding: '0.65rem 1.25rem' }}>
              Verify Pass
            </button>
          </form>

          {scanResult && (
            <div style={{
              padding: '1rem',
              borderRadius: '8px',
              background: scanResult.valid ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
              border: `1px solid ${scanResult.valid ? '#10b981' : '#ef4444'}`,
              color: scanResult.valid ? '#34d399' : '#f87171',
              fontWeight: 700,
              fontSize: '0.9rem'
            }}>
              {scanResult.message}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
