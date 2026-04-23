"use client";
import React from 'react';

const tabs = [
  { key: 'all', label: 'All' },
  { key: 'minimal', label: 'Minimal' },
  { key: 'dark', label: 'Dark' },
  { key: 'colorful', label: 'Colorful' },
  { key: 'interactive', label: 'Interactive' },
];

export default function FilterTabs() {
  const [active, setActive] = React.useState('all');

  React.useEffect(() => {
    // simple client-side filtering by toggling CSS classes on cards
    const cards = document.querySelectorAll('[data-category]');
    cards.forEach((c) => {
      const cat = c.getAttribute('data-category') || 'minimal';
      if (active === 'all' || cat === active) {
        (c as HTMLElement).style.display = '';
      } else {
        (c as HTMLElement).style.display = 'none';
      }
    });
  }, [active]);

  return (
    <div className="flex gap-3 mb-6">
      {tabs.map((t) => (
        <button
          key={t.key}
          className={`px-3 py-1 rounded-full ${active === t.key ? 'bg-[#7c5cff] text-white' : 'bg-[#111118] text-gray-300'}`}
          onClick={() => setActive(t.key)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
