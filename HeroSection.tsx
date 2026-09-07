import React, { useState, useEffect } from 'react';
import { Smartphone, Zap, Headphones, Clock, MessageSquare, Flame } from 'lucide-react';
import { HOT_DEAL_PRODUCT } from '../data/products';
import { CategoryFilter, Product } from '../types';

interface HeroSectionProps {
  onSelectCategory: (category: CategoryFilter) => void;
  onOpenProduct: (product: Product) => void;
  onQuickWhatsAppBuy: (product: Product) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectCategory,
  onOpenProduct,
  onQuickWhatsAppBuy,
}) => {
  // Countdown timer for Hot Deal of the Week (9 hours 42 mins)
  const [timeLeft, setTimeLeft] = useState({ hours: 9, minutes: 42, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format2 = (n: number) => n.toString().padStart(2, '0');

  return (
    <section className="w-full max-w-[1320px] mx-auto px-4 pt-4 pb-2">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0037b0] via-[#0047d4] to-[#0256ea] text-white p-6 md:p-8 lg:p-10 shadow-lg border border-blue-500/30">
        
        {/* Subtle geometric tech background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-300/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Content (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-4 md:space-y-6">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-400/40 text-xs font-semibold text-sky-200 tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>DIRECT IMPORTER • MAHARAGAMA TECH HUB</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] font-display text-white">
              Sri Lanka's #1 Mobile Accessories Hub
            </h1>

            {/* Subtext */}
            <p className="text-sm md:text-base text-blue-100/90 max-w-xl leading-relaxed font-body">
              Explore 150+ verified premium mobile covers, fast-charging GaN power solutions, and high-fidelity audio gear. 100% Genuine Tech with 6-Month Official Store Warranty.
            </p>

            {/* Quick Filter CTAs */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <button
                onClick={() => onSelectCategory('covers')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs md:text-sm transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-blue-600" />
                <span>Browse Covers (50)</span>
              </button>

              <button
                onClick={() => onSelectCategory('power')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-900/40 hover:bg-blue-900/70 text-white border border-blue-400/40 font-semibold text-xs md:text-sm transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-300" />
                <span>Power Banks & MagSafe</span>
              </button>

              <button
                onClick={() => onSelectCategory('audio')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-900/40 hover:bg-blue-900/70 text-white border border-blue-400/40 font-semibold text-xs md:text-sm transition-all cursor-pointer"
              >
                <Headphones className="w-4 h-4 text-sky-300" />
                <span>Audio Gear</span>
              </button>
            </div>
          </div>

          {/* Right Hero Card: "HOT DEAL OF THE WEEK" (5 cols on lg) */}
          <div className="lg:col-span-5">
            <div className="bg-white text-slate-900 rounded-xl p-4 sm:p-5 shadow-xl border border-slate-100 transition-transform duration-300 hover:scale-[1.01]">
              
              {/* Card Header with Countdown */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-orange-600 tracking-wider uppercase">
                  <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
                  <span>HOT DEAL OF THE WEEK</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Ends in {format2(timeLeft.hours)}h {format2(timeLeft.minutes)}m</span>
                </div>
              </div>

              {/* Product Visual Area */}
              <div 
                onClick={() => onOpenProduct(HOT_DEAL_PRODUCT)} 
                className="relative rounded-lg overflow-hidden bg-slate-100 mb-3.5 aspect-16/10 cursor-pointer group"
              >
                {/* Discount Badge */}
                <span className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-sm bg-[#0050cc] text-white text-[11px] font-extrabold tracking-wider shadow-xs">
                  -35% OFF
                </span>

                <img
                  src={HOT_DEAL_PRODUCT.image}
                  alt={HOT_DEAL_PRODUCT.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-1 mb-3">
                <h3 
                  onClick={() => onOpenProduct(HOT_DEAL_PRODUCT)}
                  className="text-base sm:text-lg font-bold text-slate-900 font-display hover:text-blue-600 cursor-pointer line-clamp-1"
                >
                  {HOT_DEAL_PRODUCT.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Compatible with Apple & Qi-Certified Android
                </p>
              </div>

              {/* Price Stack */}
              <div className="flex items-baseline gap-2.5 mb-3.5">
                <span className="text-2xl font-black text-slate-900 font-display tracking-tight">
                  රු. {HOT_DEAL_PRODUCT.price.toLocaleString()}
                </span>
                <span className="text-sm text-slate-400 line-through font-normal">
                  රු. {HOT_DEAL_PRODUCT.originalPrice.toLocaleString()}
                </span>
              </div>

              {/* Instant WhatsApp Buy CTA */}
              <button
                onClick={() => onQuickWhatsAppBuy(HOT_DEAL_PRODUCT)}
                className="w-full py-2.5 px-4 rounded-md bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 transition-all hover:shadow-emerald-500/30 cursor-pointer active:scale-[0.99]"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Instant WhatsApp Buy</span>
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
