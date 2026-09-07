import React, { useState } from 'react';
import { X, Search, Truck, CheckCircle2, Clock, MapPin, Package, Phone } from 'lucide-react';
import { DEMO_TRACKING } from '../data/products';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWhatsApp: () => void;
}

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({
  isOpen,
  onClose,
  onOpenWhatsApp,
}) => {
  const [orderInput, setOrderInput] = useState('#ST-8821');
  const [activeTracking, setActiveTracking] = useState<any>(DEMO_TRACKING['#ST-8821']);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = orderInput.trim().toUpperCase();
    if (DEMO_TRACKING[query]) {
      setActiveTracking(DEMO_TRACKING[query]);
    } else {
      // Dynamic simulated result
      setActiveTracking({
        orderId: query.startsWith('#') ? query : `#${query}`,
        customerName: 'Valued Customer',
        phone: '+94 7X XXX XXXX',
        destination: 'Doorstep Delivery Address',
        estimatedDelivery: 'Within 24-48 Hours',
        courier: 'Domex Express Courier (COD Verified)',
        status: 'Dispatched',
        total: 2850,
        items: [{ name: 'Premium Mobile Accessories Order', qty: 1, price: 2850 }],
        steps: DEMO_TRACKING['DEFAULT'].steps,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 bg-[#0f1f4b] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/40 border border-blue-400/40 flex items-center justify-center">
              <Truck className="w-4 h-4 text-sky-300" />
            </div>
            <div>
              <h3 className="font-bold text-base font-display">Islandwide Order Tracker</h3>
              <p className="text-[11px] text-slate-300">Live Domex & Pronto Courier Status</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Package className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={orderInput}
                onChange={(e) => setOrderInput(e.target.value)}
                placeholder="Enter Order ID (e.g. #ST-8821) or Phone..."
                className="w-full h-10 pl-9 pr-3 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>
            <button
              type="submit"
              className="px-4 h-10 bg-[#0037b0] hover:bg-blue-800 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track</span>
            </button>
          </form>
          <p className="text-[11px] text-slate-500 mt-2">
            Quick demo order codes: <button type="button" onClick={() => { setOrderInput('#ST-8821'); setActiveTracking(DEMO_TRACKING['#ST-8821']); }} className="text-blue-600 font-bold underline cursor-pointer">#ST-8821</button> or <button type="button" onClick={() => { setOrderInput('#ST-9042'); setActiveTracking(DEMO_TRACKING['DEFAULT']); }} className="text-blue-600 font-bold underline cursor-pointer">#ST-9042</button>
          </p>
        </div>

        {/* Tracking Details */}
        <div className="p-5 max-h-[65vh] overflow-y-auto space-y-5 text-xs">
          {/* Order Summary Card */}
          <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-extrabold text-sm text-slate-900 font-display">
                  {activeTracking.orderId}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-600 text-white uppercase tracking-wider">
                  {activeTracking.status}
                </span>
              </div>
              <p className="text-slate-600">
                Courier: <span className="font-semibold text-slate-800">{activeTracking.courier}</span>
              </p>
              <p className="text-slate-600">
                Destination: <span className="font-semibold text-slate-800">{activeTracking.destination}</span>
              </p>
            </div>

            <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-blue-100">
              <span className="text-[11px] text-slate-500 block">Estimated Arrival</span>
              <span className="text-xs font-extrabold text-emerald-700 block">
                {activeTracking.estimatedDelivery}
              </span>
              <span className="text-[11px] text-slate-500 block mt-1">COD Amount Due</span>
              <span className="text-sm font-black text-slate-900 font-display">
                රු. {activeTracking.total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Timeline Steps */}
          <div>
            <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider mb-3">
              Delivery Progress
            </h4>
            <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {activeTracking.steps.map((step: any, index: number) => {
                const isCurrent = step.current;
                const isDone = step.completed;

                return (
                  <div key={index} className="relative group">
                    {/* Circle Node */}
                    <span
                      className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isDone
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : isCurrent
                          ? 'bg-blue-600 border-white ring-2 ring-blue-500 text-white animate-pulse'
                          : 'bg-white border-slate-300 text-slate-300'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-3 h-3 stroke-2" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      )}
                    </span>

                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <h5
                          className={`font-bold text-xs ${
                            isCurrent
                              ? 'text-[#0037b0]'
                              : isDone
                              ? 'text-slate-900'
                              : 'text-slate-400'
                          }`}
                        >
                          {step.title}
                        </h5>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {step.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{step.location}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Package Items */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
            <h5 className="font-bold text-slate-800 text-xs mb-2">Package Contents</h5>
            <div className="space-y-1.5">
              {activeTracking.items.map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between text-slate-600 text-[11px]">
                  <span>{item.qty}x {item.name}</span>
                  <span className="font-semibold text-slate-800">රු. {item.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Assistance Button */}
          <div className="pt-2">
            <button
              onClick={() => {
                onClose();
                onOpenWhatsApp();
              }}
              className="w-full py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold border border-emerald-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Need courier rider contact? Message WhatsApp Desk</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
