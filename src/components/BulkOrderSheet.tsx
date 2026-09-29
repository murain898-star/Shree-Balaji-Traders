import React, { useState } from 'react';
import { X, Check, ShoppingBag, Plus, RefreshCw, Layers, ArrowRight } from 'lucide-react';
import { Product, AppMode, Language } from '../types';
import { PRODUCTS } from '../data/products';
import { TRANSLATIONS } from '../data/translations';
import { formatINR, getApplicableUnitPrice } from '../utils/pricing';

interface BulkOrderSheetProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onAddMultipleToCart: (items: Array<{ product: Product; quantity: number }>) => void;
}

export const BulkOrderSheet: React.FC<BulkOrderSheetProps> = ({
  isOpen,
  onClose,
  lang,
  onAddMultipleToCart
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[lang];
  // Map of product id -> quantity
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    PRODUCTS.forEach(p => {
      // By default set to 0
      initial[p.id] = 0;
    });
    return initial;
  });

  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleQtyChange = (productId: string, val: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, val)
    }));
  };

  const handleQuickAddCarton = (product: Product) => {
    setQuantities(prev => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + Math.max(product.wholesaleMoq, product.cartonPackSize)
    }));
  };

  const handleClear = () => {
    const cleared: Record<string, number> = {};
    PRODUCTS.forEach(p => {
      cleared[p.id] = 0;
    });
    setQuantities(cleared);
  };

  // Calculations
  let totalOrderUnits = 0;
  let totalOrderAmount = 0;
  let activeItemsCount = 0;
  const itemsToAdd: Array<{ product: Product; quantity: number }> = [];

  PRODUCTS.forEach(p => {
    const qty = quantities[p.id] || 0;
    if (qty > 0) {
      totalOrderUnits += qty;
      activeItemsCount += 1;
      const rate = getApplicableUnitPrice(p, qty, 'wholesale');
      totalOrderAmount += rate * qty;
      itemsToAdd.push({ product: p, quantity: qty });
    }
  });

  const handleAddAll = () => {
    if (itemsToAdd.length === 0) return;
    onAddMultipleToCart(itemsToAdd);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden my-4 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">
                {t.quickSheetTitle}
              </h3>
              <p className="text-xs text-stone-400">
                {t.quickSheetDesc}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Spreadsheet Matrix Table */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-100 text-stone-700 font-semibold border-b border-stone-200">
                  <th className="p-3.5">{t.colProduct}</th>
                  <th className="p-3.5 hidden md:table-cell">{t.colPacking}</th>
                  <th className="p-3.5">{t.colWholesaleTier}</th>
                  <th className="p-3.5 w-36 text-center">{t.colOrderQty}</th>
                  <th className="p-3.5 text-right">{t.colSubtotal}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {PRODUCTS.map(product => {
                  const qty = quantities[product.id] || 0;
                  const unitPrice = getApplicableUnitPrice(product, qty > 0 ? qty : product.wholesaleMoq, 'wholesale');
                  const rowSubtotal = qty > 0 ? unitPrice * qty : 0;
                  const isBelowMoq = qty > 0 && qty < product.wholesaleMoq;

                  return (
                    <tr 
                      key={product.id}
                      className={`hover:bg-stone-50/80 transition-colors ${qty > 0 ? 'bg-amber-50/40' : ''}`}
                    >
                      {/* Product Name & SKU */}
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt=""
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-lg object-cover bg-stone-200 shrink-0"
                          />
                          <div>
                            <div className="font-semibold text-stone-900 line-clamp-1">
                              {product.nameEn}
                            </div>
                            <div className="text-[11px] text-stone-500 font-mono">
                              {product.sku} · HSN {product.hsnCode}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Packing & MOQ */}
                      <td className="p-3.5 hidden md:table-cell text-stone-600">
                        <div>{product.cartonUnit}</div>
                        <div className="text-[11px] text-amber-700 font-medium">
                          MOQ: {product.wholesaleMoq} {product.unit}
                        </div>
                      </td>

                      {/* Wholesale Tier Rates */}
                      <td className="p-3.5">
                        <div className="space-y-0.5 text-[11px]">
                          {product.wholesaleTiers.map((tier, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-stone-600">
                              <span className="w-24 truncate">{tier.labelEn}:</span>
                              <span className="font-bold text-stone-900 tabular-nums">
                                {formatINR(tier.pricePerUnit)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Order Quantity Input */}
                      <td className="p-3.5 text-center">
                        <div className="inline-flex flex-col items-center gap-1">
                          <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden shadow-2xs">
                            <input
                              type="number"
                              min="0"
                              step={product.wholesaleMoq >= 5 ? 5 : 1}
                              value={qty === 0 ? '' : qty}
                              placeholder="0"
                              onChange={(e) => handleQtyChange(product.id, parseInt(e.target.value) || 0)}
                              className="w-20 py-1.5 px-2 text-center font-bold text-stone-900 text-sm focus:outline-none tabular-nums"
                            />
                            <span className="text-[10px] text-stone-500 pr-2">
                              {product.unit}
                            </span>
                          </div>

                          {/* Quick Add MOQ / Carton helper */}
                          <button
                            type="button"
                            onClick={() => handleQuickAddCarton(product)}
                            className="text-[10px] text-amber-700 hover:text-amber-800 font-medium hover:underline cursor-pointer flex items-center gap-0.5"
                          >
                            <Plus className="w-2.5 h-2.5" />
                            <span>+{product.wholesaleMoq} MOQ</span>
                          </button>

                          {isBelowMoq && (
                            <span className="text-[10px] text-rose-600 font-semibold">
                              Min {product.wholesaleMoq} req.
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Line Subtotal */}
                      <td className="p-3.5 text-right font-bold tabular-nums text-stone-900">
                        {qty > 0 ? (
                          <div>
                            <span className="text-amber-700">{formatINR(rowSubtotal)}</span>
                            <div className="text-[10px] text-stone-600 font-normal">
                              @{formatINR(unitPrice)}/{product.unit}
                            </div>
                          </div>
                        ) : (
                          <span className="text-stone-300">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Summary & Action Bar */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={handleClear}
              className="text-stone-500 hover:text-stone-700 flex items-center gap-1 cursor-pointer font-medium"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t.clearSheet}</span>
            </button>
            <span className="text-stone-300">|</span>
            <div>
              <span className="text-stone-500">Selected:</span>{' '}
              <span className="font-bold text-stone-900">{activeItemsCount} items</span> ({totalOrderUnits} units)
            </div>
            <span className="text-stone-300">|</span>
            <div>
              <span className="text-stone-500">Total:</span>{' '}
              <span className="font-bold text-base text-amber-700 tabular-nums">
                {formatINR(totalOrderAmount)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleAddAll}
              disabled={activeItemsCount === 0}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                addedSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-600 hover:bg-amber-500 text-white shadow-md'
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>All Items Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {t.addAllToCart} ({activeItemsCount})
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
