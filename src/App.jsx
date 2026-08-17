import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import CategoryPills from './components/CategoryPills';
import EventFilters from './components/EventFilters';
import EventCard from './components/EventCard';
import EventDetailModal from './components/EventDetailModal';
import SeatSelectionModal from './components/SeatSelectionModal';
import CheckoutModal from './components/CheckoutModal';
import TicketPassModal from './components/TicketPassModal';
import MyBookingsModal from './components/MyBookingsModal';
import WishlistModal from './components/WishlistModal';
import CitySelectorModal from './components/CitySelectorModal';
import ArtistProfileModal from './components/ArtistProfileModal';
import VenueGuideModal from './components/VenueGuideModal';
import AdminDashboard from './components/AdminDashboard';
import CreateEventModal from './components/CreateEventModal';
import AuthModal from './components/AuthModal';
import UserProfileModal from './components/UserProfileModal';
import Toast from './components/Toast';
import './styles/admin.css';
import './styles/auth.css';
import { getCurrentUser, saveCurrentUser, logoutUser } from './utils/auth';

import { EVENTS_DATA, CATEGORIES, CITIES } from './data/eventsData';
import {
  getStoredBookings,
  saveBooking,
  cancelBookingInStorage,
  getStoredWishlist,
  toggleWishlistInStorage,
  getStoredCity,
  setStoredCity,
  getStoredTheme,
  setStoredTheme
} from './utils/storage';
import { Sparkles, ShieldCheck, Zap, Headphones, Heart } from 'lucide-react';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState(getStoredTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    setStoredTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // City & Search state
  const [selectedCity, setSelectedCity] = useState(getStoredCity);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filters, Sorting & Location state
  const [dateFilter, setDateFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('trending');
  const [locationFilter, setLocationFilter] = useState('all');

  // Events state (allows dynamic creation/deletion from Admin)
  const [eventsList, setEventsList] = useState(EVENTS_DATA);

  // Admin View State
  const [isAdminView, setIsAdminView] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Auth states
  const [currentUser, setCurrentUser] = useState(getCurrentUser);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Storage states
  const [wishlist, setWishlist] = useState(getStoredWishlist);
  const [bookings, setBookings] = useState(getStoredBookings);

  // Modals state
  const [detailEvent, setDetailEvent] = useState(null);
  const [seatEvent, setSeatEvent] = useState(null);
  const [bookingDraft, setBookingDraft] = useState(null);
  const [confirmedPass, setConfirmedPass] = useState(null);
  const [artistProfileEvent, setArtistProfileEvent] = useState(null);
  const [venueGuideEvent, setVenueGuideEvent] = useState(null);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
  };

  // Handle Auth Success
  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    saveCurrentUser(user);
    if (user.role === 'admin') {
      setIsAdminView(true);
      showToast(`👑 Welcome back, ${user.name}! Routed to Organizer Suite.`);
    } else {
      setIsAdminView(false);
      showToast(`👋 Welcome back, ${user.name}!`);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setIsAdminView(false);
    setIsProfileModalOpen(false);
    showToast('Signed out successfully.', 'info');
  };

  // Admin Actions
  const handleAddEvent = (newEvent) => {
    setEventsList(prev => [newEvent, ...prev]);
    showToast(`🎉 "${newEvent.title}" published live successfully!`);
  };

  const handleDeleteEvent = (eventId) => {
    setEventsList(prev => prev.filter(e => e.id !== eventId));
    showToast('Show deleted from live catalog.', 'info');
  };

  const handleToggleSellingFast = (eventId) => {
    setEventsList(prev => prev.map(e => e.id === eventId ? { ...e, isSellingFast: !e.isSellingFast } : e));
    showToast('Updated show selling momentum badge.');
  };

  // Change City
  const handleCityChange = (cityId) => {
    setSelectedCity(cityId);
    setStoredCity(cityId);
    showToast(`Entertainment city changed to ${cityId.toUpperCase()}`);
  };

  // Toggle Wishlist
  const handleToggleWishlist = (eventId) => {
    const updated = toggleWishlistInStorage(eventId);
    setWishlist(updated);
    const isSaved = updated.includes(eventId);
    showToast(isSaved ? 'Saved show to Wishlist ❤️' : 'Removed show from Wishlist', 'info');
  };

  // Booking Flow Triggers
  const handleStartBooking = (event) => {
    setDetailEvent(null);
    setSeatEvent(event);
  };

  const handleProceedToCheckout = (draft) => {
    setSeatEvent(null);
    setBookingDraft(draft);
  };

  const handleBookingSuccess = (confirmedBooking) => {
    const updatedBookings = saveBooking(confirmedBooking);
    setBookings(updatedBookings);
    setBookingDraft(null);
    setConfirmedPass(confirmedBooking);
    showToast('🎉 Booking Confirmed! Your QR Pass is ready.');
  };

  const handleCancelBooking = (bookingId) => {
    const updated = cancelBookingInStorage(bookingId);
    setBookings(updated);
    showToast('Booking cancelled.', 'info');
  };

  // Filtered & Sorted Events
  const filteredEvents = useMemo(() => {
    return eventsList.filter((ev) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = ev.title.toLowerCase().includes(q);
        const matchesArtist = ev.artist.toLowerCase().includes(q);
        const matchesVenue = ev.venue.toLowerCase().includes(q);
        const matchesTags = ev.tags?.some(t => t.toLowerCase().includes(q));
        const matchesCat = ev.categoryLabel?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesArtist && !matchesVenue && !matchesTags && !matchesCat) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategory !== 'all' && ev.category !== selectedCategory) {
        return false;
      }

      // 3. Price Filter
      if (priceFilter === 'under_1500' && ev.priceStartingFrom >= 1500) return false;
      if (priceFilter === '1500_3000' && (ev.priceStartingFrom < 1500 || ev.priceStartingFrom > 3000)) return false;
      if (priceFilter === 'above_3000' && ev.priceStartingFrom <= 3000) return false;

      // 4. Date Filter
      if (dateFilter === 'trending' && !ev.isTrending) return false;

      // 5. Location Filter
      if (locationFilter !== 'all' && ev.city !== locationFilter) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'trending') return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0) || b.rating - a.rating;
      if (sortBy === 'date_asc') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'price_low') return a.priceStartingFrom - b.priceStartingFrom;
      if (sortBy === 'price_high') return b.priceStartingFrom - a.priceStartingFrom;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [eventsList, searchQuery, selectedCategory, priceFilter, dateFilter, sortBy, locationFilter]);

  // Featured Spotlight Events for Hero
  const featuredEvents = useMemo(() => {
    return eventsList.filter(ev => ev.isFeatured);
  }, [eventsList]);

  // Wishlist Events list
  const wishlistEventsList = useMemo(() => {
    return eventsList.filter(ev => wishlist.includes(ev.id));
  }, [eventsList, wishlist]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: eventsList.length };
    CATEGORIES.forEach(c => {
      if (c.id !== 'all') {
        counts[c.id] = eventsList.filter(e => e.category === c.id).length;
      }
    });
    return counts;
  }, [eventsList]);

  // Grouped by city (for 'location' sort mode)
  const groupedByCity = useMemo(() => {
    if (sortBy !== 'location') return null;
    const groups = {};
    filteredEvents.forEach(ev => {
      if (!groups[ev.city]) groups[ev.city] = [];
      groups[ev.city].push(ev);
    });
    // Order groups: selected city first, then alphabetically
    return Object.entries(groups).sort(([a], [b]) => {
      if (a === selectedCity) return -1;
      if (b === selectedCity) return 1;
      return a.localeCompare(b);
    });
  }, [filteredEvents, sortBy, selectedCity]);

  // Reset Filters
  const handleResetFilters = () => {
    setDateFilter('all');
    setPriceFilter('all');
    setSortBy('trending');
    setSelectedCategory('all');
    setLocationFilter('all');
    setSearchQuery('');
  };

  return (
    <div className="app-container">
      {/* Top Sticky Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCity={selectedCity}
        onOpenCityModal={() => setIsCityModalOpen(true)}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        bookingsCount={bookings.filter(b => b.status !== 'cancelled').length}
        onOpenWallet={() => setIsWalletOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
        onToggleAdmin={() => {
          if (!currentUser || currentUser.role !== 'admin') {
            // Prompt admin login
            setAuthModalMode('login');
            setIsAuthModalOpen(true);
            showToast('Please sign in as Organizer/Admin (demo credentials available).', 'info');
          } else {
            setIsAdminView(prev => !prev);
          }
        }}
        currentUser={currentUser}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenAuth={() => {
          setAuthModalMode('login');
          setIsAuthModalOpen(true);
        }}
      />

      {isAdminView ? (
        <AdminDashboard
          events={eventsList}
          bookings={bookings}
          onExitAdmin={() => setIsAdminView(false)}
          onOpenCreateModal={() => setIsCreateModalOpen(true)}
          onDeleteEvent={handleDeleteEvent}
          onToggleSellingFast={handleToggleSellingFast}
        />
      ) : (
        <main className="main-content">
        {/* Spotlight Hero Carousel */}
        {!searchQuery && selectedCategory === 'all' && (
          <HeroBanner
            featuredEvents={featuredEvents}
            onSelectEvent={(ev) => setDetailEvent(ev)}
            onBookEvent={handleStartBooking}
          />
        )}

        {/* Categories Bar */}
        <CategoryPills
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          eventCounts={categoryCounts}
        />

        {/* Filter Controls Bar */}
        <EventFilters
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          onReset={handleResetFilters}
        />

        {/* Events Grid Section */}
        <section>
          <div className="events-section-header">
            <h2 className="section-title">
              {sortBy === 'location'
                ? '📍 Shows by Location'
                : selectedCategory === 'all'
                ? '🔥 Trending Live Shows'
                : `${CATEGORIES.find(c => c.id === selectedCategory)?.emoji || '✨'} ${CATEGORIES.find(c => c.id === selectedCategory)?.label}`}
            </h2>
            <span className="events-count-label">
              Showing {filteredEvents.length} {filteredEvents.length === 1 ? 'experience' : 'experiences'}
            </span>
          </div>

          {filteredEvents.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🎪</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>No matching shows found</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem', marginBottom: '1.25rem' }}>
                Try adjusting your location, date, or price filter.
              </p>
              <button className="btn-hero-book" onClick={handleResetFilters}>
                Reset All Filters
              </button>
            </div>
          ) : sortBy === 'location' && groupedByCity ? (
            // GROUPED BY CITY VIEW
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {groupedByCity.map(([cityId, cityEvents]) => {
                const cityObj = CITIES.find(c => c.id === cityId);
                return (
                  <div key={cityId}>
                    {/* City Header */}
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      marginBottom: '1.15rem', paddingBottom: '0.75rem',
                      borderBottom: '1px solid var(--border-subtle)'
                    }}>
                      <span style={{ fontSize: '1.6rem' }}>{cityObj?.icon || '📍'}</span>
                      <div>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                          {cityObj?.name || cityId}
                        </h3>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {cityObj?.state}{cityObj?.country ? `, ${cityObj.country}` : ''} &nbsp;•&nbsp; {cityEvents.length} {cityEvents.length === 1 ? 'show' : 'shows'}
                        </span>
                      </div>
                      {cityId === selectedCity && (
                        <span style={{ marginLeft: 'auto', fontSize: '0.72rem', fontWeight: 800, padding: '0.2rem 0.65rem', background: 'rgba(225,29,72,0.15)', color: 'var(--brand-primary)', border: '1px solid rgba(225,29,72,0.3)', borderRadius: '9999px' }}>
                          YOUR CITY
                        </span>
                      )}
                    </div>
                    <div className="events-grid">
                      {cityEvents.map((event) => (
                        <EventCard
                          key={event.id}
                          event={event}
                          isWishlisted={wishlist.includes(event.id)}
                          onToggleWishlist={handleToggleWishlist}
                          onSelectEvent={(ev) => setDetailEvent(ev)}
                          onBookNow={handleStartBooking}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // FLAT GRID VIEW
            <div className="events-grid">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isWishlisted={wishlist.includes(event.id)}
                  onToggleWishlist={handleToggleWishlist}
                  onSelectEvent={(ev) => setDetailEvent(ev)}
                  onBookNow={handleStartBooking}
                />
              ))}
            </div>
          )}
        </section>

        {/* Assurance / Feature Highlight Strip */}
        <section style={{ marginTop: '4rem', padding: '2.5rem 1.5rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(225, 29, 72, 0.15)', color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Zap size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Instant Digital Passes</h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Real-time encrypted QR passes generated immediately with 1-click Google/Apple calendar sync.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', color: 'var(--brand-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>100% Verified Entry</h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Direct official ticketing partner with guaranteed seats, genuine tickets, and instant refunds on cancellations.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(6, 182, 212, 0.15)', color: 'var(--brand-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Headphones size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>24/7 VIP Concierge</h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Need group bookings or VIP box suites? Our dedicated live assistance is always one click away.
              </p>
            </div>
          </div>
        </section>
      </main>
      )}

      {/* Footer */}
      <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', padding: '3rem 1.5rem 2rem 1.5rem', marginTop: 'auto' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div className="brand-container" onClick={() => setIsAdminView(false)}>
              <div className="brand-logo-icon">
                <Sparkles size={20} />
              </div>
              <div className="brand-title">
                Livora
                <span className="brand-dot"></span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <span>🎤 Music Concerts</span>
              <span>🎭 Stage Programs</span>
              <span>😂 Comedy Shows</span>
              <span>🎸 Live Bands</span>
              <span>💃 Dance Programs</span>
              <span>🎙️ Stand-up Comedy</span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <div>© 2026 Livora Live Entertainment Inc. All rights reserved.</div>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>100% Buyer Guarantee</span>
              <span>24/7 Concierge</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {isCreateModalOpen && (
        <CreateEventModal
          onClose={() => setIsCreateModalOpen(false)}
          onAddEvent={handleAddEvent}
        />
      )}
      {detailEvent && (
        <EventDetailModal
          event={detailEvent}
          onClose={() => setDetailEvent(null)}
          onBookNow={handleStartBooking}
          isWishlisted={wishlist.includes(detailEvent.id)}
          onToggleWishlist={handleToggleWishlist}
          onViewArtist={(ev) => setArtistProfileEvent(ev)}
          onViewVenue={(ev) => setVenueGuideEvent(ev)}
        />
      )}

      {artistProfileEvent && (
        <ArtistProfileModal
          event={artistProfileEvent}
          allEvents={EVENTS_DATA}
          onClose={() => setArtistProfileEvent(null)}
          onBookEvent={(ev) => {
            setArtistProfileEvent(null);
            handleStartBooking(ev);
          }}
        />
      )}

      {venueGuideEvent && (
        <VenueGuideModal
          event={venueGuideEvent}
          onClose={() => setVenueGuideEvent(null)}
        />
      )}

      {seatEvent && (
        <SeatSelectionModal
          event={seatEvent}
          onClose={() => setSeatEvent(null)}
          onProceedToCheckout={handleProceedToCheckout}
        />
      )}

      {bookingDraft && (
        <CheckoutModal
          bookingDraft={bookingDraft}
          onClose={() => setBookingDraft(null)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {confirmedPass && (
        <TicketPassModal
          booking={confirmedPass}
          onClose={() => setConfirmedPass(null)}
          onOpenWallet={() => {
            setConfirmedPass(null);
            setIsWalletOpen(true);
          }}
        />
      )}

      {isWalletOpen && (
        <MyBookingsModal
          bookings={bookings}
          onClose={() => setIsWalletOpen(false)}
          onViewPass={(pass) => setConfirmedPass(pass)}
          onCancelBooking={handleCancelBooking}
          onExploreEvents={() => setIsWalletOpen(false)}
        />
      )}

      {isWishlistOpen && (
        <WishlistModal
          wishlistEvents={wishlistEventsList}
          onClose={() => setIsWishlistOpen(false)}
          onSelectEvent={(ev) => {
            setIsWishlistOpen(false);
            setDetailEvent(ev);
          }}
          onBookEvent={(ev) => {
            setIsWishlistOpen(false);
            handleStartBooking(ev);
          }}
          onRemoveWishlist={handleToggleWishlist}
        />
      )}

      {isCityModalOpen && (
        <CitySelectorModal
          selectedCity={selectedCity}
          onSelectCity={handleCityChange}
          onClose={() => setIsCityModalOpen(false)}
        />
      )}

      {/* User Profile Modal */}
      {isProfileModalOpen && (
        <UserProfileModal
          user={currentUser}
          bookingsCount={bookings.filter(b => b.status !== 'cancelled').length}
          wishlistCount={wishlist.length}
          onClose={() => setIsProfileModalOpen(false)}
          onLogout={handleLogout}
          onUpdateUser={(updated) => {
            setCurrentUser(updated);
            showToast('Profile updated successfully!');
          }}
          onOpenWallet={() => setIsWalletOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
        />
      )}

      {/* Auth Modal (Login / Register / Forgot Password) */}
      {isAuthModalOpen && (
        <AuthModal
          isOpen={isAuthModalOpen}
          initialMode={authModalMode}
          onClose={() => setIsAuthModalOpen(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}

      {/* Toast Alert */}
      {toastMessage && (
        <Toast
          message={toastMessage.message}
          type={toastMessage.type}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}
