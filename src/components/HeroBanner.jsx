import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Play, Square, Ticket, ChevronRight } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';
import { playLiveSnippet, stopLiveSnippet } from '../utils/audioSynth';

export default function HeroBanner({ featuredEvents, onSelectEvent, onBookEvent }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    if (featuredEvents.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredEvents.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredEvents.length]);

  if (!featuredEvents || featuredEvents.length === 0) return null;

  const currentEvent = featuredEvents[currentIndex] || featuredEvents[0];

  const handleAudioToggle = (e) => {
    e.stopPropagation();
    if (isPlayingAudio) {
      stopLiveSnippet();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      playLiveSnippet(currentEvent.category, () => {
        setIsPlayingAudio(false);
      });
    }
  };

  return (
    <section className="hero-container">
      <div className="hero-slider">
        {featuredEvents.map((ev, index) => (
          <div
            key={ev.id}
            className={`hero-slide ${index === currentIndex ? 'active' : ''}`}
            onClick={() => onSelectEvent(ev)}
          >
            <img src={ev.bannerImage} alt={ev.title} className="hero-bg-img" />
            <div className="hero-overlay"></div>

            <div className="hero-content">
              <div className="hero-badges-row">
                <span className="hero-tag">
                  {ev.categoryEmoji} {ev.categoryLabel}
                </span>
                <span className="hero-tag hero-city-tag">
                  <MapPin size={12} /> {ev.venue.split(',')[0]}
                </span>
                {ev.isSellingFast && (
                  <span className="hero-tag" style={{ background: '#f59e0b', color: '#000000', borderColor: '#f59e0b' }}>
                    🔥 Selling Fast
                  </span>
                )}
              </div>

              <h1 className="hero-title">{ev.title}</h1>

              <div className="hero-meta-row">
                <div className="hero-meta-item">
                  <Calendar size={16} color="var(--brand-primary)" />
                  <span>{ev.displayDate} • {ev.time}</span>
                </div>
                <div className="hero-meta-item">
                  <span style={{ color: 'var(--brand-secondary)', fontWeight: 700 }}>
                    Starts from {formatCurrency(ev.priceStartingFrom)}
                  </span>
                </div>
              </div>

              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', maxWidth: '640px', lineHeight: 1.45 }}>
                {ev.artistBio.substring(0, 120)}...
              </p>

              <div className="hero-cta-row">
                <button
                  className="btn-hero-book"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookEvent(ev);
                  }}
                >
                  <Ticket size={18} />
                  <span>Book Passes</span>
                  <ChevronRight size={16} />
                </button>

                <button className="btn-hero-audio" onClick={handleAudioToggle}>
                  {isPlayingAudio ? <Square size={16} fill="#ffffff" /> : <Play size={16} fill="#ffffff" />}
                  <span>{isPlayingAudio ? 'Stop Preview' : 'Live Sound Preview'}</span>
                  <div className={`audio-bars-anim ${isPlayingAudio ? 'playing' : ''}`}>
                    <div className="audio-bar"></div>
                    <div className="audio-bar"></div>
                    <div className="audio-bar"></div>
                    <div className="audio-bar"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slider Indicator Dots */}
      <div className="hero-nav-dots">
        {featuredEvents.map((_, idx) => (
          <div
            key={idx}
            className={`hero-dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
          />
        ))}
      </div>
    </section>
  );
}
