import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, MessageSquare, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onOrderSuccess: (orderId: string) => void;
  onOpenWhatsApp: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onOrderSuccess,
  onOpenWhatsApp,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    district: 'Colombo',
    notes: '',
    paymentMethod: 'COD',
  });

  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal > 5000 ? 0 : 250;
  const total = subtotal + deliveryFee;

  const districts = [
    'Colombo',
    'Gampaha',
    'Kalutara',
    'Kandy',
    'Matale',
    'Nuwara Eliya',
    'Galle',
    'Matara',
    'Hambantota',
    'Kurunegala',
    'Puttalam',
    'Anuradhapura',
    'Polonnaruwa',
    'Badulla',
    'Monaragala',
    'Ratnapura',
    'Kegalle',
    'Jaffna',
    'Kilinochchi',
    'Mannar',
    'Vavuniya',
    'Mullaitivu',
    'Batticaloa',
    'Ampara',
    'Trincomalee',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill in your name, contact number, and delivery address.');
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newOrderId = `#ST-${randomNum}`;
    setPlacedOrderId(newOrderId);
    onOrderSuccess(newOrderId);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 bg-[#0f1f4b] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-sky-300" />
            <div>
              <h3 className="font-bold text-base font-display">
                {placedOrderId ? 'Order Confirmed!' : 'Doorstep Cash on Delivery Checkout'}
              </h3>
              <p className="text-[11px] text-slate-300">
                {placedOrderId ? 'Your package is being verified in Maharagama' : 'Zero upfront payment • Pay after package inspection'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {placedOrderId ? (
          /* Order Confirmation Screen */
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your Official Order ID</span>
              <h4 className="text-2xl font-black text-[#0037b0] font-display mt-0.5">
                {placedOrderId}
              </h4>
            </div>

            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Thank you, <span className="font-bold text-slate-900">{formData.name}</span>! Our team at the Maharagama Fulfillment Hub is inspecting your items and testing voltage parameters before courier handover.
            </p>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-left space-y-1.5 max-w-sm mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-500">Delivery Address:</span>
                <span className="font-semibold text-slate-800 truncate max-w-[180px]">{formData.address}, {formData.district}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">COD Total to Pay:</span>
                <span className="font-black text-slate-900 font-display">රු. {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Delivery:</span>
                <span className="font-bold text-emerald-600">Within 24 to 48 Hours</span>
              </div>
            </div>

            <div className="pt-2 space-y-2 max-w-sm mx-auto">
              <button
                onClick={() => {
                  onClose();
                  onOpenWhatsApp();
                }}
                className="w-full py-2.5 px-4 rounded-lg bg-[#10b981] hover:bg-[#059669] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Notify Maharagama Hub on WhatsApp</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="p-5 max-h-[75vh] overflow-y-auto space-y-4 text-xs">
            
            {/* Guarantee Callout */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2.5 text-emerald-800">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <p className="text-[11px] leading-tight">
                <strong>100% Genuine Tech Guarantee:</strong> Inspect the items and seals when the courier delivers to your door before paying cash.
              </p>
            </div>

            {/* Customer Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Kasun Ranmal"
                  className="w-full h-9 px-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Mobile Hotline (SMS & Call) *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 077 123 4567"
                    className="w-full h-9 px-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">District *</label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full h-9 px-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white"
                  >
                    {districts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Delivery Street Address *</label>
                <textarea
                  required
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. No. 42/B, High Level Road, Maharagama"
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Special Delivery Notes (Optional)</label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Leave with security, or call 15 mins before arrival"
                  className="w-full h-9 px-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block font-bold text-slate-800 mb-2">Payment Method</label>
              <div className="grid grid-cols-2 gap-2">
                <label
                  className={`p-2.5 rounded-lg border flex items-center gap-2 cursor-pointer transition-all ${
                    formData.paymentMethod === 'COD'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                      : 'border-slate-200 text-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={formData.paymentMethod === 'COD'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'COD' })}
                    className="text-emerald-600"
                  />
                  <span>Cash on Delivery (COD)</span>
                </label>

                <label
                  className={`p-2.5 rounded-lg border flex items-center gap-2 cursor-pointer transition-all ${
                    formData.paymentMethod === 'KOKO'
                      ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                      : 'border-slate-200 text-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="KOKO"
                    checked={formData.paymentMethod === 'KOKO'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'KOKO' })}
                    className="text-blue-600"
                  />
                  <span>Koko (3x Installments)</span>
                </label>
              </div>
            </div>

            {/* Total Recap */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-slate-500 text-[11px] block">Pay on Delivery:</span>
                <span className="text-base font-black text-[#0037b0] font-display">
                  රු. {total.toLocaleString()}
                </span>
              </div>
              <span className="text-[11px] text-slate-500">
                {cart.reduce((a, b) => a + b.quantity, 0)} item(s) included
              </span>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#0037b0] hover:bg-blue-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-all cursor-pointer"
            >
              <span>Confirm Cash on Delivery Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
