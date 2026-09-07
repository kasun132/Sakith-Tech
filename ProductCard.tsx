import React from 'react';
import { Star, ShoppingBag, MessageSquare } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onWhatsAppOrder: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onWhatsAppOrder,
  onQuickView,
}) => {
  // Determine badge styling
  const getBadgeStyle = (badge?: string, color?: string) => {
    if (!badge) return null;
    if (badge.startsWith('-') || color === 'red' || badge.includes('40ms')) {
      return 'bg-[#ef4444] text-white';
    }
    if (badge === 'BESTSELLER' || badge === 'TRENDING' || color === 'amber' || badge.includes('60H')) {
      return 'bg-[#d97706] text-white';
    }
    return 'bg-[#0050cc] text-white';
  };

  const badgeClass = getBadgeStyle(product.badge, product.badgeColor);

  return (
    <div className="bg-white rounded-lg border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col justify-between p-3 group relative">
      
      {/* Top Image Box */}
      <div 
        onClick={() => onQuickView(product)}
        className="relative w-full aspect-square rounded-md overflow-hidden bg-slate-50 mb-2.5 cursor-pointer flex items-center justify-center"
      >
        {/* Top-Left Badge */}
        {product.badge && (
          <span className={`absolute top-2 left-2 z-10 px-1.5 py-0.5 rounded-xs text-[10px] sm:text-[11px] font-black uppercase tracking-wider shadow-2xs ${badgeClass}`}>
            {product.badge}
          </span>
        )}

        {/* Top-Right Model/Spec Tag */}
        {product.tag && (
          <span className="absolute top-2 right-2 z-10 px-1.5 py-0.5 rounded-xs text-[10px] sm:text-[11px] font-bold bg-white/95 text-slate-800 border border-slate-200 shadow-2xs">
            {product.tag}
          </span>
        )}

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Product Content Details */}
      <div className="flex-1 flex flex-col">
        
        {/* Category Series Subtitle */}
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#0050cc] mb-1 leading-tight">
          {product.categoryLabel}
        </span>

        {/* Product Title */}
        <h4 
          onClick={() => onQuickView(product)}
          className="text-xs sm:text-[13px] font-semibold text-slate-900 line-clamp-2 leading-snug mb-1.5 hover:text-[#0037b0] cursor-pointer"
          title={product.title}
        >
          {product.title}
        </h4>

        {/* Star Rating & Sold Count */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-2">
          <div className="flex items-center text-amber-500 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-0.5" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
          <span className="text-slate-400">({product.soldCount} sold)</span>
        </div>

        {/* Price Row */}
        <div className="flex items-baseline gap-2 mt-auto mb-2.5">
          <span className="text-sm sm:text-base font-extrabold text-slate-900 font-display">
            රු. {product.price.toLocaleString()}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-slate-400 line-through">
              රු. {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {/* Bottom Action Buttons (Cart + WhatsApp) */}
      <div className="grid grid-cols-4 gap-1.5 pt-1 border-t border-slate-100">
        
        {/* Add to Cart Icon Button */}
        <button
          type="button"
          onClick={() => onAddToCart(product)}
          title="Add to Shopping Cart"
          className="col-span-1 h-8 rounded-md bg-blue-50 hover:bg-blue-100 text-[#0037b0] border border-blue-200 flex items-center justify-center transition-colors cursor-pointer active:scale-95"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-blue-700" />
        </button>

        {/* WhatsApp Order Button */}
        <button
          type="button"
          onClick={() => onWhatsAppOrder(product)}
          className="col-span-3 h-8 rounded-md bg-[#10b981] hover:bg-[#059669] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs hover:shadow-emerald-500/20 cursor-pointer active:scale-95"
        >
          <MessageSquare className="w-3 h-3 fill-white" />
          <span>WhatsApp</span>
        </button>

      </div>

    </div>
  );
};
