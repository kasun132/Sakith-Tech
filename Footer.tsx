import React from 'react';
import { ShieldCheck, MapPin, Phone, Clock } from 'lucide-react';

interface FooterProps {
  onOpenTrackOrder: () => void;
  onOpenWhatsApp: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTrackOrder,
  onOpenWhatsApp,
}) => {
  return (
    <footer className="w-full bg-[#0b162c] text-slate-300 pt-12 pb-6 border-t border-blue-900/40">
      <div className="max-w-[1320px] mx-auto px-4">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800 text-xs">
          
          {/* Column 1: Store Brand */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white font-display">
              Sakith Tech Store
            </h4>
            <p className="text-slate-400 leading-relaxed">
              Sri Lanka's premier destination for original mobile cases, high-wattage GaN chargers, premium audio gear, and authentic MagSafe accessories.
            </p>
            <div className="flex items-center gap-2 text-amber-400 font-bold pt-1">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>6 Months Official Warranty Guaranteed</span>
            </div>
          </div>

          {/* Column 2: Customer Care */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white font-display">
              Customer Care
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={onOpenWhatsApp} className="hover:text-sky-300 transition-colors cursor-pointer">
                  Help Center & FAQs
                </button>
              </li>
              <li>
                <button onClick={onOpenTrackOrder} className="hover:text-sky-300 transition-colors cursor-pointer">
                  Order Tracking Portal
                </button>
              </li>
              <li>
                <button onClick={onOpenWhatsApp} className="hover:text-sky-300 transition-colors cursor-pointer">
                  7-Day Replacement Policy
                </button>
              </li>
              <li>
                <button onClick={onOpenWhatsApp} className="hover:text-sky-300 transition-colors cursor-pointer">
                  Colombo & Islandwide Delivery Rates
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Payment Methods */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white font-display">
              Payment Methods
            </h4>
            <p className="text-slate-400 leading-relaxed">
              100% Secure Checkout with flexible Sri Lankan payment gateways.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-sm bg-slate-800 text-slate-200 font-bold border border-slate-700 text-[11px]">
                Cash On Delivery
              </span>
              <span className="px-2.5 py-1 rounded-sm bg-slate-800 text-slate-200 font-bold border border-slate-700 text-[11px]">
                Koko (3 Pay)
              </span>
              <span className="px-2.5 py-1 rounded-sm bg-slate-800 text-slate-200 font-bold border border-slate-700 text-[11px]">
                Mintpay
              </span>
              <span className="px-2.5 py-1 rounded-sm bg-slate-800 text-slate-200 font-bold border border-slate-700 text-[11px]">
                Direct Bank Transfer
              </span>
            </div>
          </div>

          {/* Column 4: Hotline & Warehouse */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white font-display">
              Hotline & Warehouse
            </h4>
            <div className="space-y-2.5 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>Sakith Tech Fulfillment Hub, High Level Road, Maharagama, Sri Lanka</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+94771234567" className="hover:text-white transition-colors">
                  +94 77 123 4567 / +94 11 234 5678
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Open Daily: 9:00 AM - 8:30 PM</span>
              </div>
            </div>
          </div>

        </div>

        {/* Sub-Footer Copyright & Legal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © 2025 Sakith Tech Store. All Rights Reserved. Engineered for Speed & Authenticity.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onOpenWhatsApp} className="hover:text-slate-400 transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={onOpenWhatsApp} className="hover:text-slate-400 transition-colors cursor-pointer">
              Terms of Service
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
