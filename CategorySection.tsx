import React, { useState } from 'react';
import { LucideIcon, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface CategorySectionProps {
  id: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  badgeText: string;
  rightBadgeText?: string;
  products: Product[];
  totalCatalogCount?: number;
  paginationInfo: string;
  onAddToCart: (product: Product) => void;
  onWhatsAppOrder: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onFocusView?: () => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  id,
  icon: Icon,
  iconBg,
  iconColor,
  title,
  subtitle,
  badgeText,
  rightBadgeText,
  products,
  paginationInfo,
  onAddToCart,
  onWhatsAppOrder,
  onQuickView,
  onFocusView,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  return (
    <section id={id} className="w-full max-w-[1320px] mx-auto px-4 py-4 scroll-mt-24">
      
      {/* Section Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3.5 pb-2 border-b border-slate-200">
        
        {/* Left Title & Icon */}
        <div className="flex items-start sm:items-center gap-3">
          <div className={`w-9 h-9 rounded-lg ${iconBg} flex items-center justify-center shrink-0 mt-0.5 sm:mt-0`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                {title}
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#0037b0] text-[11px] font-bold border border-blue-200">
                {badgeText}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right Model/Warranty Info & Focus View Link */}
        <div className="flex items-center gap-3 text-xs self-start md:self-center">
          {rightBadgeText && (
            <span className="text-slate-500 font-medium hidden sm:inline">
              {rightBadgeText}
            </span>
          )}
          <button
            onClick={onFocusView}
            className="flex items-center gap-1 font-bold text-[#0037b0] hover:text-blue-800 transition-colors cursor-pointer group"
          >
            <span>Focus View</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <div className="bg-white rounded-lg border border-slate-200 p-8 text-center text-slate-500 text-xs">
          No items match the selected price or brand filters in this category.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-3.5">
          {products.slice(0, 5).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onWhatsAppOrder={onWhatsAppOrder}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      )}

      {/* Pagination & Counter Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3 pt-2 text-xs text-slate-500">
        <div>
          {paginationInfo}
        </div>

        <div className="flex items-center gap-1 self-center sm:self-auto">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 rounded-md border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none text-slate-700 flex items-center gap-0.5 cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>

          {[1, 2, 3, 4, 5].map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`w-7 h-7 rounded-md text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer ${
                currentPage === pageNum
                  ? 'bg-[#0037b0] text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-2 py-1 rounded-md border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none text-slate-700 flex items-center gap-0.5 cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </section>
  );
};
