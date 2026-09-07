import React from 'react';
import { CategoryFilter } from '../types';

interface CategoryNavProps {
  selectedCategory: CategoryFilter;
  onSelectCategory: (category: CategoryFilter) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const items: { id: CategoryFilter; label: string; count?: number }[] = [
    { id: 'all', label: 'All 150 Items' },
    { id: 'covers', label: 'Phone Back Covers', count: 50 },
    { id: 'power', label: 'Power Banks & MagSafe', count: 50 },
    { id: 'audio', label: 'Headphones & Audio', count: 50 },
    { id: 'deals', label: 'Flash Deals' },
    { id: 'new', label: 'New Arrivals' },
  ];

  return (
    <nav className="w-full bg-white border-b border-slate-200">
      <div className="max-w-[1320px] mx-auto px-4 py-2.5 overflow-x-auto no-scrollbar flex items-center gap-2">
        {items.map((item) => {
          const isActive = selectedCategory === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectCategory(item.id)}
              className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#0037b0] text-white shadow-xs'
                  : 'bg-transparent text-slate-700 hover:text-blue-700 hover:bg-slate-100'
              }`}
            >
              {item.label}
              {item.count && !item.label.includes('150') && (
                <span className={`ml-1 text-xs opacity-80 ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                  ({item.count})
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
