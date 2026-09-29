import React, { useState, useEffect } from 'react';
import { X, Package, ShieldCheck, Check, Plus, Minus, FileText, ArrowRight, Truck } from 'lucide-react';
import { Product, AppMode, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { formatINR, getApplicableUnitPrice } from '../utils/pricing';

interface ProductDetailModalProps {
  product: Product | null;
  mode: AppMode;
  lang: Language;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onRequestSample: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  mode,
  lang,
  onClose,
  onAddToCart,
  onRequestSample
}) => {
  if (!product) return null;

  const t = TRANSLATIONS[lang];
  const initialQty = mode === 'wholesale' ? product.wholesaleMoq : 1;
  const [quantity, setQuantity] = useState<number>(initialQty);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setQuantity(mode === 'wholesale' ? product.wholesaleMoq : 1);
  }, [product, mode]);

  const currentUnitPrice = getApplicableUnitPrice(product, quantity, mode);
  const lineTotal = currentUnitPrice * quantity;
  const mrpTotal = product.retailPrice * quantity;
  const savings = Math.max(0, mrpTotal - lineTotal);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  const handleQtyChange = (newQty: number) => {
    const minAllowed = mode === 'wholesale' ? product.wholesaleMoq : 1;
    if (newQty >= minAllowed && newQty <= product.stockQuantity) {
      setQuantity(newQty);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-12 gap-0">
          {/* Left Column: Product Photo & Packaging Specs */}
          <div className="md:col-span-5 bg-stone-100 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200">
            <div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-xs border border-stone-200/80">
                <img
                  src={product.image}
                  alt={lang === 'hi' ? product.nameHi : product.nameEn}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Technical Specifications List */}
              <div className="mt-6 space-y-2.5 text-xs text-stone-600">
                <div className="flex justify-between py-1.5 border-b border-stone-200">
                  <span className="text-stone-500">SKU / Item Code:</span>
                  <span className="font-mono font-semibold text-stone-900">{product.sku}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-200">
                  <span className="text-stone-500">GST HSN Code:</span>
                  <span className="font-mono font-semibold text-stone-900">{product.hsnCode} ({product.gstRate}%)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-200">
                  <span className="text-stone-500">Master Carton Packaging:</span>
                  <span className="font-semibold text-stone-900">{product.cartonUnit}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-200">
                  <span className="text-stone-500">Unit Approx Weight:</span>
                  <span className="font-semibold text-stone-900">{product.weightPerUnitKg} Kg</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-stone-500">Warehouse Availability:</span>
                  <span className="font-semibold text-emerald-800">{product.stockQuantity} {product.unit} (In Stock)</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200 text-[11px] text-stone-500 flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Direct warehouse dispatch in 48 hours</span>
            </div>
          </div>

          {/* Right Column: Title, Slabs & Purchase Stepper */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                  {product.category === 'spices' && 'Spices & Dry Fruits'}
                  {product.category === 'textiles' && 'Textiles & Garments'}
                  {product.category === 'electronics' && 'Consumer Electronics'}
                  {product.category === 'kitchen' && 'Kitchen & Steelware'}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mt-1">
                  {product.nameEn}
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  {product.descriptionEn}
                </p>
              </div>

              {/* Wholesale Tier Slabs Table (crucial for B2B wholesale buyers) */}
              <div className="mt-4 pt-4 border-t border-stone-100">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-amber-700" />
                    <span>Wholesale Volume Slabs</span>
                  </h4>
                  <span className="text-[11px] text-stone-600">
                    Retail MRP: <span className="line-through">{formatINR(product.retailPrice)}</span>
                  </span>
                </div>

                <div className="border border-stone-200 rounded-xl overflow-hidden text-xs">
                  <div className="grid grid-cols-3 bg-stone-100 p-2 font-semibold text-stone-700 border-b border-stone-200">
                    <span>Quantity Tier</span>
                    <span className="text-center">Rate / Unit</span>
                    <span className="text-right">Margin / Unit</span>
                  </div>

                  {product.wholesaleTiers.map((tier, idx) => {
                    const isCurrentTier = mode === 'wholesale' && quantity >= tier.minQty && (!tier.maxQty || quantity <= tier.maxQty);
                    const perUnitMargin = product.retailPrice - tier.pricePerUnit;
                    return (
                      <div 
                        key={idx} 
                        className={`grid grid-cols-3 p-2.5 items-center transition-colors border-b border-stone-100 last:border-b-0 ${
                          isCurrentTier ? 'bg-amber-50 font-semibold text-amber-900' : 'text-stone-700'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          {isCurrentTier && <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />}
                          <span>{tier.labelEn}</span>
                        </div>
                        <div className="text-center font-bold tabular-nums">
                          {formatINR(tier.pricePerUnit)}
                        </div>
                        <div className="text-right text-emerald-800 font-semibold tabular-nums">
                          +{formatINR(perUnitMargin)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Stepper & Price Calculation */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block">
                      Select Order Quantity:
                    </label>
                    <span className="text-[11px] text-stone-600">
                      {mode === 'wholesale' 
                        ? `Min Wholesale MOQ: ${product.wholesaleMoq} ${product.unit}`
                        : 'Retail Order (1 pc onwards)'}
                    </span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-stone-300 rounded-xl bg-white shadow-xs overflow-hidden">
                    <button
                      type="button"
                      onClick={() => handleQtyChange(quantity - (mode === 'wholesale' ? 5 : 1))}
                      className="p-2 hover:bg-stone-100 text-stone-600 cursor-pointer disabled:opacity-40"
                      disabled={quantity <= (mode === 'wholesale' ? product.wholesaleMoq : 1)}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => handleQtyChange(parseInt(e.target.value) || 0)}
                      className="w-16 text-center text-sm font-bold text-stone-900 focus:outline-none tabular-nums"
                      min={mode === 'wholesale' ? product.wholesaleMoq : 1}
                      max={product.stockQuantity}
                    />
                    <button
                      type="button"
                      onClick={() => handleQtyChange(quantity + (mode === 'wholesale' ? 5 : 1))}
                      className="p-2 hover:bg-stone-100 text-stone-600 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Live Cost & Margin preview */}
                <div className="pt-2 border-t border-stone-200 flex items-baseline justify-between text-xs">
                  <div>
                    <span className="text-stone-500">Applied Rate:</span>{' '}
                    <span className="font-bold text-stone-900 tabular-nums">{formatINR(currentUnitPrice)}</span>
                    <span className="text-stone-500">/{product.unit}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-stone-500">Subtotal:</span>{' '}
                    <span className="text-base font-bold text-amber-700 tabular-nums">{formatINR(lineTotal)}</span>
                  </div>
                </div>

                {savings > 0 && (
                  <div className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg">
                    Your Wholesale Margin vs Retail MRP: {formatINR(savings)}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-stone-200 space-y-2.5">
              <button
                onClick={handleAdd}
                className={`w-full py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-900 hover:bg-stone-800 text-white shadow-md'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 text-amber-400" />
                    <span>
                      Add {quantity} {product.unit} to Cart ({formatINR(lineTotal)})
                    </span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onRequestSample(product);
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-stone-300 hover:border-amber-500 bg-white text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-stone-500" />
                <span>
                  Request Wholesale Sample / Truckload Quote
                </span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
