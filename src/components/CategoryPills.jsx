import React from 'react';
import { CATEGORIES } from '../data/eventsData';

export default function CategoryPills({ selectedCategory, onSelectCategory, eventCounts }) {
  return (
    <section className="categories-container">
      <div className="categories-list">
        {CATEGORIES.map((cat) => {
          const count = eventCounts[cat.id] || 0;
          const isActive = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              className={`category-pill-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              {cat.emoji && <span>{cat.emoji}</span>}
              <span>{cat.label}</span>
              <span className="category-pill-count">{count}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
