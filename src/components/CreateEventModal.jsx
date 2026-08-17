import React, { useState } from 'react';
import { X, Sparkles, Plus, Image, Calendar, MapPin, Tag } from 'lucide-react';
import { CATEGORIES, CITIES } from '../data/eventsData';

export default function CreateEventModal({ onClose, onAddEvent }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'music_concert',
    artist: '',
    artistBio: '',
    city: 'kochi',
    venue: '',
    address: '',
    date: '2026-11-28',
    displayDate: 'Sat, Nov 28, 2026',
    time: '07:00 PM',
    duration: '3h 00m',
    language: 'Malayalam & English',
    ageRating: 'All Ages',
    priceStartingFrom: 999,
    bannerImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1400&auto=format&fit=crop&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    isTrending: true,
    isFeatured: false,
    isSellingFast: true,
    rating: 4.95,
    reviewCount: 120
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.artist || !formData.venue) {
      alert('Please fill all required fields (Title, Artist, Venue).');
      return;
    }

    const catObj = CATEGORIES.find(c => c.id === formData.category) || CATEGORIES[1];

    const newEvent = {
      ...formData,
      id: `ev-custom-${Date.now()}`,
      categoryLabel: catObj.label,
      categoryEmoji: catObj.emoji || '🎤',
      priceStartingFrom: Number(formData.priceStartingFrom),
      tags: [catObj.label, formData.city.toUpperCase(), 'Live Pass'],
      ticketTiers: [
        { id: 'tier_vip', name: 'VIP Front Deck', price: Number(formData.priceStartingFrom) * 3, description: 'Direct stage proximity pass', perks: ['Stage Proximity', 'Fast Gate'], availableSeats: 30, color: '#f59e0b' },
        { id: 'tier_gold', name: 'Gold Center Tier', price: Number(formData.priceStartingFrom) * 2, description: 'Center stage comfort seating', perks: ['Center View'], availableSeats: 70, color: '#e11d48' },
        { id: 'tier_silver', name: 'Silver Grandstand', price: Number(formData.priceStartingFrom) * 1.4, description: 'Standard numbered pass', perks: ['Standard Seating'], availableSeats: 120, color: '#06b6d4' },
        { id: 'tier_bronze', name: 'General Admission', price: Number(formData.priceStartingFrom), description: 'Budget lawn/balcony pass', perks: ['General Entry'], availableSeats: 250, color: '#8b5cf6' }
      ]
    };

    onAddEvent(newEvent);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '780px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div style={{ padding: '1.5rem 1.75rem 1rem 1.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--brand-primary)', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase' }}>
            <Sparkles size={14} />
            <span>Livora Event Publisher</span>
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Create New Live Show</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-form-grid">
            <div className="admin-input-box form-group-full">
              <label>Event Show Title *</label>
              <input
                type="text"
                className="admin-text-input"
                placeholder="e.g. Cochin Symphony 2026 Live Tour"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="admin-input-box">
              <label>Show Category *</label>
              <select
                className="admin-text-input"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {CATEGORIES.filter(c => c.id !== 'all').map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.emoji} {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin-input-box">
              <label>Entertainment City Hub *</label>
              <select
                className="admin-text-input"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              >
                {CITIES.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.icon} {city.name} ({city.state})
                  </option>
                ))}
              </select>
            </div>

            <div className="admin-input-box">
              <label>Lead Artist / Troupe *</label>
              <input
                type="text"
                className="admin-text-input"
                placeholder="e.g. Masala Coffee Live"
                value={formData.artist}
                onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                required
              />
            </div>

            <div className="admin-input-box">
              <label>Starting Price (₹) *</label>
              <input
                type="number"
                className="admin-text-input"
                placeholder="899"
                value={formData.priceStartingFrom}
                onChange={(e) => setFormData({ ...formData, priceStartingFrom: e.target.value })}
                required
              />
            </div>

            <div className="admin-input-box form-group-full">
              <label>Venue Name & City Landmark *</label>
              <input
                type="text"
                className="admin-text-input"
                placeholder="e.g. Marine Drive Grounds, Kochi"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                required
              />
            </div>

            <div className="admin-input-box">
              <label>Display Date *</label>
              <input
                type="text"
                className="admin-text-input"
                placeholder="e.g. Sat, Nov 28, 2026"
                value={formData.displayDate}
                onChange={(e) => setFormData({ ...formData, displayDate: e.target.value })}
              />
            </div>

            <div className="admin-input-box">
              <label>Show Time *</label>
              <input
                type="text"
                className="admin-text-input"
                placeholder="07:00 PM"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>

            <div className="admin-input-box form-group-full">
              <label>Artist Biography & Show Description</label>
              <textarea
                className="admin-text-input"
                style={{ height: '70px', resize: 'vertical' }}
                placeholder="Describe the performance highlights, laser shows, and special guests..."
                value={formData.artistBio}
                onChange={(e) => setFormData({ ...formData, artistBio: e.target.value })}
              />
            </div>
          </div>

          <div style={{ padding: '1rem 1.75rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button
              type="button"
              className="btn-pass-action"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-hero-book"
            >
              <Plus size={16} />
              <span>Publish Live Show</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
