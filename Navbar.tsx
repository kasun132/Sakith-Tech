import React, { useState } from 'react';
import { Search, ShoppingBag, Truck, Phone, ChevronDown, User, ShieldCheck } from 'lucide-react';
import { CategoryFilter } from '../types';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenTrackOrder: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: CategoryFilter;
  onSelectCategory: (cat: CategoryFilter) => void;
  onOpenWhatsApp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenTrackOrder,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onOpenWhatsApp,
}) => {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const categoryLabels: Record<CategoryFilter, string> = {
    all: 'All Gadgets',
    covers: 'Phone Covers',
    power: 'Power Banks & MagSafe',
    audio: 'Audio Gear',
    deals: 'Flash Deals',
    new: 'New Arrivals',
  };

  return (
    <header className="w-full sticky top-0 z-40 bg-white shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-[#0c1a38] text-white text-[12px] py-1.5 px-4 border-b border-blue-900/40">
        <div className="max-w-[1320px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Left info */}
          <div className="flex items-center space-x-3 text-slate-200">
            <span className="flex items-center gap-1.5 font-medium">
              <Truck className="w-3.5 h-3.5 text-blue-400" />
              Islandwide Delivery 1-3 Days
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-emerald-400 font-medium">Cash on Delivery Available</span>
          </div>

          {/* Right info */}
          <div className="flex items-center space-x-3 text-slate-300">
            <button 
              onClick={onOpenWhatsApp}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>Hotline: +94 77 123 4567</span>
            </button>
            <span className="text-slate-500">|</span>
            <button 
              onClick={onOpenWhatsApp}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Help Center
            </button>
            <span className="text-slate-500">|</span>
            <span className="flex items-center gap-1 font-medium text-slate-200">
              <span className="text-xs">🌐</span> LKR (Rs.) / English
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="bg-[#0f1f4b] text-white py-3 px-4">
        <div className="max-w-[1320px] mx-auto flex items-center justify-between gap-3 md:gap-6">
          
          {/* Logo */}
          <div 
            onClick={() => onSelectCategory('all')} 
            className="flex items-center gap-2.5 cursor-pointer select-none shrink-0"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center shadow-md shadow-blue-500/20 border border-blue-400/30">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xl md:text-2xl font-extrabold tracking-tight font-display text-white">Sakith</span>
                <span className="text-xl md:text-2xl font-extrabold tracking-tight font-display text-sky-400">Tech</span>
              </div>
              <p className="text-[9px] uppercase tracking-widest text-slate-300 font-semibold leading-none">
                Mobile Accessories Store
              </p>
            </div>
          </div>

          {/* Search Box with Category Dropdown */}
          <div className="flex-1 max-w-2xl relative">
            <div className="flex items-center bg-white rounded-md overflow-hidden border border-blue-300 focus-within:ring-2 focus-within:ring-sky-400 transition-all shadow-inner">
              
              {/* Category Dropdown Button */}
              <div className="relative shrink-0 hidden sm:block">
                <button
                  type="button"
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="h-10 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 border-r border-slate-300 transition-colors cursor-pointer"
                >
                  <span className="max-w-[110px] truncate">{categoryLabels[selectedCategory] || 'All Gadgets'}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {showCategoryDropdown && (
                  <div className="absolute left-0 top-full mt-1 w-52 bg-white text-slate-800 rounded-md shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1">
                    {(Object.keys(categoryLabels) as CategoryFilter[]).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          onSelectCategory(cat);
                          setShowCategoryDropdown(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between hover:bg-blue-50 transition-colors ${
                          selectedCategory === cat ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700'
                        }`}
                      >
                        <span>{categoryLabels[cat]}</span>
                        {selectedCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search 150+ phone cases, power banks, chargers, earbuds..."
                className="w-full h-10 px-3.5 text-xs md:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden"
              />

              {/* Search Button */}
              <button
                type="button"
                className="h-10 px-4 bg-[#1d4ed8] hover:bg-[#1e40af] text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
              >
                <Search className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            
            {/* Track Order Button */}
            <button
              onClick={onOpenTrackOrder}
              className="flex items-center gap-1.5 px-3 py-2 rounded-md hover:bg-blue-900/60 text-slate-100 text-xs font-semibold transition-colors cursor-pointer border border-transparent hover:border-blue-700"
              title="Track courier order live"
            >
              <Truck className="w-4 h-4 text-sky-400" />
              <span className="hidden md:inline">Track Order</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-md bg-[#162a63] hover:bg-[#1b357d] border border-blue-400/40 text-white transition-all cursor-pointer shadow-xs hover:shadow-blue-500/20"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-sky-300" />
                <span className="absolute -top-2 -right-2 bg-amber-500 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-[10px] text-slate-300 font-medium leading-tight">Cart Total</div>
                <div className="text-xs font-bold text-white leading-tight font-display">
                  Rs. {cartTotal.toLocaleString()}
                </div>
              </div>
            </button>

            {/* Account Icon */}
            <button 
              onClick={onOpenWhatsApp}
              className="w-9 h-9 rounded-md flex items-center justify-center bg-blue-950/60 hover:bg-blue-900 text-slate-200 border border-blue-800 transition-colors cursor-pointer"
              title="Customer Profile & Support"
            >
              <User className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
