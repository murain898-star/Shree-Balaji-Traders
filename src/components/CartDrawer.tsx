import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, FileText, ArrowRight, MessageSquare, Truck, AlertCircle } from 'lucide-react';
import { CartItem, AppMode, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { calculateCartSummary, formatINR, getApplicableUnitPrice } from '../utils/pricing';
import { COMPANY_INFO } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  mode: AppMode;
  lang: Language;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onOpenInvoiceModal: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  mode,
  lang,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenInvoiceModal
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[lang];
  const summary = calculateCartSummary(items, mode, false);

  // Check if any wholesale items are below MOQ
  const belowMoqItems = mode === 'wholesale' 
    ? items.filter(item => item.quantity < item.product.wholesaleMoq)
    : [];

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;

    let message = `${t.whatsappOrderGreeting}\n\n`;
    message += `*Mode:* ${mode.toUpperCase()} ORDER\n`;
    message += `-------------------------\n`;
    items.forEach((item, idx) => {
      const unitPrice = getApplicableUnitPrice(item.product, item.quantity, mode);
      const lineTotal = unitPrice * item.quantity;
      message += `${idx + 1}. *${item.product.nameEn}*\n   Qty: ${item.quantity} ${item.product.unit} @ ₹${unitPrice}/${item.product.unit} = ₹${lineTotal}\n`;
    });
    message += `-------------------------\n`;
    message += `Subtotal: ₹${summary.subtotal}\n`;
    message += `GST Tax: ₹${summary.totalTax}\n`;
    message += `Transport: ${summary.transportCharge === 0 ? 'FREE' : `₹${summary.transportCharge}`}\n`;
    message += `*Grand Total: ₹${summary.grandTotal}*\n`;
    message += `\nPlease confirm dispatch date and payment details.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp.replace('+', '')}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Drawer Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-700">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base">
                {t.cartTitle}
              </h3>
              <span className="text-xs text-stone-500 font-medium">
                {items.length} items ({mode === 'wholesale' ? 'B2B Wholesale' : 'Retail'})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs text-stone-400 hover:text-stone-600 transition-colors mr-2 cursor-pointer"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {belowMoqItems.length > 0 && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Wholesale MOQ Notice:</span>{' '}
                Some items are below the wholesale minimum order quantity. Please increase quantity to qualify for wholesale tier rates.
              </div>
            </div>
          )}

          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500 space-y-3">
              <ShoppingBag className="w-12 h-12 text-stone-300" />
              <p className="text-sm font-medium text-stone-700">{t.cartEmpty}</p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-xl hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            items.map(item => {
              const unitPrice = getApplicableUnitPrice(item.product, item.quantity, mode);
              const lineTotal = unitPrice * item.quantity;
              const isBelowMoq = mode === 'wholesale' && item.quantity < item.product.wholesaleMoq;

              return (
                <div 
                  key={item.product.id}
                  className="p-3.5 rounded-2xl border border-stone-200 bg-white hover:border-stone-300 transition-all space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={item.product.image}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-xl object-cover bg-stone-100 shrink-0 border border-stone-100"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-stone-900 text-xs sm:text-sm line-clamp-1">
                          {item.product.nameEn}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-stone-400 hover:text-rose-600 transition-colors cursor-pointer p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-stone-500 font-mono mt-0.5">
                        {item.product.sku} · HSN {item.product.hsnCode}
                      </div>

                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-xs font-bold text-amber-800 tabular-nums">
                          {formatINR(unitPrice)}
                        </span>
                        <span className="text-[11px] text-stone-500">
                          /{item.product.unit}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Stepper & Line Total */}
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-stone-50">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - (mode === 'wholesale' ? 5 : 1))}
                          className="p-1.5 hover:bg-stone-200 text-stone-600 cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-12 text-center text-xs font-bold text-stone-900 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + (mode === 'wholesale' ? 5 : 1))}
                          className="p-1.5 hover:bg-stone-200 text-stone-600 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-xs text-stone-500">
                        {item.product.unit}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-stone-900 tabular-nums">
                        {formatINR(lineTotal)}
                      </span>
                    </div>
                  </div>

                  {isBelowMoq && (
                    <div className="text-[10px] text-rose-600 font-medium">
                      Wholesale MOQ is {item.product.wholesaleMoq} {item.product.unit}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Cart Drawer Footer with Billing Breakdown & Actions */}
        {items.length > 0 && (
          <div className="p-6 border-t border-stone-200 bg-stone-50 space-y-4 shrink-0">
            {/* Delivery threshold notice */}
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                {mode === 'wholesale' ? t.freeTransportNotice : t.freeRetailDeliveryNotice}
              </span>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>{t.subtotal}</span>
                <span className="font-semibold text-stone-900 tabular-nums">{formatINR(summary.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.estimatedGst} (5% / 12% / 18%)</span>
                <span className="font-semibold text-stone-900 tabular-nums">{formatINR(summary.totalTax)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.transportDelivery}</span>
                <span className="font-semibold tabular-nums text-stone-900">
                  {summary.transportCharge === 0 ? (
                    <span className="text-emerald-800 font-bold uppercase">FREE</span>
                  ) : (
                    formatINR(summary.transportCharge)
                  )}
                </span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline text-sm">
                <span className="font-bold text-stone-900">{t.totalAmount}</span>
                <span className="text-lg font-bold text-amber-800 tabular-nums">
                  {formatINR(summary.grandTotal)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={onOpenInvoiceModal}
                className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <FileText className="w-4 h-4" />
                <span>{t.generateInvoiceBtn}</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t.sendWhatsAppBtn}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
