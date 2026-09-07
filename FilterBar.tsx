import React from 'react';
import { Smartphone, Zap, Headphones, Grid, ChevronDown, Check } from 'lucide-react';
import { CategoryFilter, PriceFilter, SortOption } from '../types';

interface FilterBarProps {
  selectedCategory: CategoryFilter;
  onSelectCategory: (cat: CategoryFilter) => void;
  priceFilter: PriceFilter;
  onPriceFilterChange: (p: PriceFilter) => void;
  brandFilter: string;
  onBrandFilterChange: (b: string) => void;
  inStockOnly: boolean;
  onInStockToggle: () => void;
  sortBy: SortOption;
  onSortChange: (s: SortOption) => void;
  totalActiveItems: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  priceFilter,
  onPriceFilterChange,
  brandFilter,
  onBrandFilterChange,
  inStockOnly,
  onInStockToggle,
  sortBy,
  onSortChange,
  totalActiveItems,
}) => {
  const categories = [
    { id: 'all' as CategoryFilter, label: 'All 150 Items', icon: Grid },
    { id: 'covers' as CategoryFilter, label: 'Phone Back Covers (50)', icon: Smartphone },
    { id: 'power' as CategoryFilter, label: 'Power Banks & MagSafe (50)', icon: Zap },
    { id: 'audio' as CategoryFilter, label: 'Headphones & Audio (50)', icon: Headphones },
  ];

  const priceOptions: { id: PriceFilter; label: string }[] = [
    { id: 'all', label: 'All Prices' },
    { id: 'under2k', label: 'Under රු. 2,000' },
    { id: '2k-5k', label: 'රු. 2,000 - 5,000' },
    { id: 'over5k', label: 'රු. 5,000+' },
  ];

  const brands = [
    'All Brands (Apple, Anker, Baseus...)',
    'Apple',
    'Samsung',
    'Baseus',
    'Anker',
    'Xiaomi',
    'Soundcore',
    'Ugreen',
  ];

  return (
    <div className="w-full max-w-[1320px] mx-auto px-4 pt-4 pb-2">
      <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs space-y-3">
        
        {/* Row 1: Category Filter Buttons & Count Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0037b0] text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200/70 text-slate-700'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-sky-300' : 'text-slate-500'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-[#0037b0] text-xs font-bold border border-blue-200/60">
              <Grid className="w-3.5 h-3.5 text-blue-600" />
              <span>{totalActiveItems} items active</span>
            </span>
          </div>
        </div>

        {/* Row 2: Secondary Filter Controls: Price, Brand, In-Stock, Sort */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Price Range Badges */}
          <div className="flex flex-wrap items-center gap-1.5">
            {priceOptions.map((po) => {
              const isSelected = priceFilter === po.id;
              return (
                <button
                  key={po.id}
                  onClick={() => onPriceFilterChange(po.id)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-blue-100 text-[#0037b0] font-bold border border-blue-300'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {po.label}
                </button>
              );
            })}
          </div>

          {/* Right Group: Brand, InStock, Sort */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Brand Dropdown */}
            <div className="relative">
              <select
                value={brandFilter}
                onChange={(e) => onBrandFilterChange(e.target.value)}
                className="appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-md py-1.5 pl-3 pr-7 text-xs font-medium text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-blue-500 cursor-pointer"
              >
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-2 pointer-events-none" />
            </div>

            {/* In-Stock Checkbox */}
            <label className="flex items-center gap-1.5 text-slate-700 font-medium cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={onInStockToggle}
                className="w-3.5 h-3.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
              />
              <span>In Stock Only</span>
            </label>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                className="appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-md py-1.5 pl-3 pr-7 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-500 cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="popular">Most Popular</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-2 pointer-events-none" />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
