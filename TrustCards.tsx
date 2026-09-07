import React from 'react';
import { ShieldCheck, MessageCircle, RefreshCw, ArrowRight } from 'lucide-react';

interface TrustCardsProps {
  onOpenWhatsApp: () => void;
}

export const TrustCards: React.FC<TrustCardsProps> = ({ onOpenWhatsApp }) => {
  return (
    <section className="w-full max-w-[1320px] mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: Original Stock Guarantee */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0037b0] flex items-center justify-center mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-display mb-1.5">
              Original Stock Guarantee
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-body">
              No cheap knockoffs. Every power bank and charger undergoes strict voltage safety testing and includes official serial validation before islandwide dispatch.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100">
            <span className="inline-block px-2.5 py-1 rounded-sm bg-blue-50 text-[#0037b0] text-[11px] font-bold tracking-wide uppercase border border-blue-200">
              QC PASSED SRI LANKA
            </span>
          </div>
        </div>

        {/* Card 2: Direct WhatsApp Desk */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-display mb-1.5">
              Direct WhatsApp Desk
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-body">
              Unsure whether a case fits your camera cutout? Message our Maharagama warehouse team directly for real-time live photos of the product before paying.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={onOpenWhatsApp}
              className="flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer group"
            >
              <span>Open Chat with Warehouse</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Card 3: Transparent COD Terms */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-display mb-1.5">
              Transparent COD Terms
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-body">
              Pay safely when courier arrives at your doorstep in Colombo, Gampaha, Kandy, Galle, or Jaffna. Open packaging and check product authenticity before payment.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100">
            <span className="inline-block px-2.5 py-1 rounded-sm bg-amber-50 text-amber-800 text-[11px] font-bold tracking-wide uppercase border border-amber-200">
              ISLANDWIDE COD
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
