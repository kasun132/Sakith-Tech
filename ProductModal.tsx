import React, { useState, useRef } from 'react';
import { X, Star, ShoppingBag, MessageSquare, ShieldCheck, Check, Truck, Upload, Camera } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, model?: string) => void;
  onWhatsAppBuy: (product: Product, model?: string) => void;
  onUpdateImage?: (productId: string, newImageUrl: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onWhatsAppBuy,
  onUpdateImage,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedModel, setSelectedModel] = useState<string>(
    product.compatibleModels?.[0] || product.tag || 'Standard'
  );
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdateImage) {
      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        if (loadEvt.target?.result) {
          onUpdateImage(product.id, loadEvt.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && onUpdateImage) {
      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        if (loadEvt.target?.result) {
          onUpdateImage(product.id, loadEvt.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="p-3.5 bg-[#0f1f4b] text-white flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-sky-400 uppercase tracking-wider font-display">
              {product.categoryLabel}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-300">Verified Authentic Tech</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[80vh] overflow-y-auto">
          
          {/* Left: Image & Quick Badges */}
          <div className="space-y-3">
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative aspect-square rounded-xl overflow-hidden bg-slate-50 border transition-all flex items-center justify-center group ${
                isDragging ? 'border-blue-600 ring-2 ring-blue-400 bg-blue-50/50' : 'border-slate-200'
              }`}
            >
              {product.badge && (
                <span className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-sm bg-[#0037b0] text-white text-[11px] font-extrabold uppercase shadow-xs">
                  {product.badge}
                </span>
              )}
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {/* Upload Overlay on Hover / Drag */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`absolute inset-0 bg-slate-900/60 backdrop-blur-2xs flex flex-col items-center justify-center p-4 text-white text-center cursor-pointer transition-opacity ${
                  isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}
              >
                <Camera className="w-7 h-7 mb-1.5 text-sky-300" />
                <span className="text-xs font-bold">Upload / Replace Image</span>
                <span className="text-[10px] text-slate-300 mt-0.5">Drag & drop or click to choose file</span>
              </div>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Manual Upload Button for accessibility & clarity */}
            <div className="flex items-center justify-between gap-2 px-1">
              <span className="text-[11px] text-slate-400">Want to use custom product photo?</span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
              >
                <Upload className="w-3 h-3" />
                <span>Upload New Image</span>
              </button>
            </div>

            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{product.warranty || '6 Months Official Store Warranty'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Islandwide Doorstep Cash On Delivery (COD)</span>
              </div>
            </div>
          </div>

          {/* Right: Details, Model selection & Actions */}
          <div className="flex flex-col justify-between space-y-4 text-xs">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-display leading-snug mb-2">
                {product.title}
              </h3>

              {/* Rating & Sold count */}
              <div className="flex items-center gap-2 text-xs mb-3">
                <div className="flex items-center text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                  <span>{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600 font-medium">{product.soldCount} happy customers</span>
                <span className="text-slate-400">•</span>
                <span className="text-emerald-600 font-bold">In Stock (Maharagama Hub)</span>
              </div>

              {/* Price Stack */}
              <div className="flex items-baseline gap-3 p-3 bg-blue-50/70 border border-blue-200/80 rounded-xl mb-4">
                <span className="text-2xl font-black text-slate-900 font-display">
                  රු. {product.price.toLocaleString()}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-slate-400 line-through">
                    රු. {product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="ml-auto text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-sm">
                  Save රු. {(product.originalPrice - product.price).toLocaleString()}
                </span>
              </div>

              {/* Compatible Models / Sizes */}
              {product.compatibleModels && product.compatibleModels.length > 0 && (
                <div className="mb-4">
                  <label className="block text-slate-700 font-bold mb-1.5">
                    Select Your Phone / Device Model:
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {product.compatibleModels.map((model) => (
                      <button
                        key={model}
                        onClick={() => setSelectedModel(model)}
                        className={`p-2 text-left rounded-md border text-[11px] transition-all cursor-pointer truncate ${
                          selectedModel === model
                            ? 'border-blue-600 bg-blue-50 text-[#0037b0] font-bold ring-1 ring-blue-500'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {model}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Specs */}
              {product.specs && (
                <div className="mb-4 space-y-1.5">
                  <label className="block text-slate-700 font-bold mb-1">
                    Technical Specifications:
                  </label>
                  {product.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-slate-600 text-[11px]">
                      <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-3 pt-3 border-t border-slate-200">
              
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">Quantity:</span>
                <div className="flex items-center border border-slate-300 rounded-lg bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-l-lg font-bold"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-slate-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-r-lg font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onAddToCart(product, quantity, selectedModel);
                    onClose();
                  }}
                  className="py-2.5 px-3 rounded-lg bg-[#0037b0] hover:bg-blue-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => {
                    onWhatsAppBuy(product, selectedModel);
                    onClose();
                  }}
                  className="py-2.5 px-3 rounded-lg bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Instant WhatsApp</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
