import React from 'react';
import { Truck, Banknote, ShieldCheck, MessageCircle } from 'lucide-react';

interface FeatureBarProps {
  onOpenWhatsApp: () => void;
}

export const FeatureBar: React.FC<FeatureBarProps> = ({ onOpenWhatsApp }) => {
  const features = [
    {
      icon: Truck,
      title: 'Islandwide Express',
      subtitle: '24 to 72 Hours Doorstep',
      color: 'text-blue-600',
      bg: 'bg-blue-50/70',
      border: 'border-blue-100',
    },
    {
      icon: Banknote,
      title: 'Cash on Delivery',
      subtitle: 'Pay After Inspection',
      color: 'text-sky-600',
      bg: 'bg-sky-50/70',
      border: 'border-sky-100',
    },
    {
      icon: ShieldCheck,
      title: '100% Genuine Tech',
      subtitle: '6 Months Store Warranty',
      color: 'text-indigo-600',
      bg: 'bg-indigo-50/70',
      border: 'border-indigo-100',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Hotline',
      subtitle: '+94 77 123 4567',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50/70',
      border: 'border-emerald-100',
      isAction: true,
    },
  ];

  return (
    <section className="w-full max-w-[1320px] mx-auto px-4 py-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {features.map((f, index) => {
          const Icon = f.icon;
          return (
            <div
              key={index}
              onClick={f.isAction ? onOpenWhatsApp : undefined}
              className={`bg-white rounded-xl p-3.5 flex items-center gap-3.5 border ${f.border} shadow-2xs hover:shadow-xs transition-all ${
                f.isAction ? 'cursor-pointer hover:border-emerald-300' : ''
              }`}
            >
              <div className={`w-10 h-10 rounded-lg ${f.bg} flex items-center justify-center shrink-0`}>
                <Icon className={`w-5 h-5 ${f.color}`} />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-display leading-tight truncate">
                  {f.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-tight mt-0.5 truncate">
                  {f.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
