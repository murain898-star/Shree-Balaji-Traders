import React from 'react';
import { Plus, Eye, Check, Package, Sparkles } from 'lucide-react';
import { Product, AppMode, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { formatINR } from '../utils/pricing';

interface ProductCardProps {
  product: Product;
  mode: AppMode;
  lang: Language;
  onAddToCart: (product: Product, quantity: number) => void;
  onOpenQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  mode,
  lang,
  onAddToCart,
  onOpenQuickView
}) => {
  const [added, setAdded] = React.useState(false);
  const t = TRANSLATIONS[lang];

  // Lowest wholesale price tier
  const lowestWholesalePrice = product.wholesaleTiers[product.wholesaleTiers.length - 1].pricePerUnit;
  const initialWholesalePrice = product.wholesaleTiers[0].pricePerUnit;
  const savingsPercent = Math.round(((product.retailPrice - lowestWholesalePrice) / product.retailPrice) * 100);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const qty = mode === 'wholesale' ? product.wholesaleMoq : 1;
    onAddToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div 
      onClick={() => onOpenQuickView(product)}
      className="group bg-white rounded-2xl border border-stone-200 overflow-hidden flex flex-col hover:border-amber-400/80 hover:shadow-lg transition-all duration-200 cursor-pointer"
    >
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
        <img
          src={product.image}
          alt={lang === 'hi' ? product.nameHi : product.nameEn}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
          onError={(e) => {
            // Styled CSS fallback container
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Fallback pattern in case image is missing */}
        <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center p-4 bg-stone-100 text-stone-400">
          <Package className="w-10 h-10 mb-2 opacity-50" />
          <span className="text-xs">{product.sku}</span>
        </div>

        {/* Quiet top-left text tag */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-900/85 backdrop-blur-xs text-white text-[11px] font-medium">
          {mode === 'wholesale' ? (
            <span>MOQ: {product.wholesaleMoq} {product.unit}</span>
          ) : (
            <span>Single Pcs Available</span>
          )}
        </div>

        {/* Wholesale savings tag */}
        {mode === 'wholesale' && savingsPercent > 0 && (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-amber-500 text-stone-950 font-bold text-[10px] uppercase tracking-wide">
            {savingsPercent}% Margin
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata: Category & HSN Code without pill boxes */}
          <div className="flex items-center gap-2 text-[11px] text-stone-600 mb-1.5">
            <span className="uppercase tracking-wider font-semibold">
              {product.category === 'spices' && 'Spices & Dry Fruits'}
              {product.category === 'textiles' && 'Textiles & Garments'}
              {product.category === 'electronics' && 'Consumer Electronics'}
              {product.category === 'kitchen' && 'Kitchen & Steelware'}
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>HSN {product.hsnCode}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>GST {product.gstRate}%</span>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-stone-900 text-base line-clamp-2 group-hover:text-amber-700 transition-colors">
            {product.nameEn}
          </h3>

          {/* Packaging Details */}
          <div className="mt-2 text-xs text-stone-500 flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span className="truncate">
              Packing: {product.cartonUnit}
            </span>
          </div>
        </div>

        {/* Pricing Block */}
        <div className="pt-4 border-t border-stone-100 mt-4">
          {mode === 'wholesale' ? (
            <div className="space-y-1">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] text-stone-600 block">
                    Wholesale Slab Rate:
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-bold text-amber-700 tabular-nums">
                      {formatINR(initialWholesalePrice)} - {formatINR(lowestWholesalePrice)}
                    </span>
                    <span className="text-xs text-stone-600">
                      /{product.unit}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-stone-600 block">Retail MRP</span>
                  <span className="text-xs line-through text-stone-600 tabular-nums">
                    {formatINR(product.retailPrice)}
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-emerald-800 font-medium pt-0.5">
                Earn up to ₹{product.retailPrice - lowestWholesalePrice}/{product.unit} margin
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] text-stone-600 block">
                    Retail Price (MRP):
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-stone-900 tabular-nums">
                      {formatINR(product.retailPrice)}
                    </span>
                    <span className="text-xs text-stone-600">
                      /{product.unit}
                    </span>
                  </div>
                </div>

                <div className="text-right text-[11px] text-emerald-800 font-medium">
                  Ready to Dispatch
                </div>
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="mt-3.5 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenQuickView(product);
              }}
              className="px-3 py-2 border border-stone-300 hover:border-stone-400 bg-stone-50 hover:bg-white text-stone-700 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-stone-500" />
              <span>View Slabs</span>
            </button>

            <button
              type="button"
              onClick={handleAdd}
              className={`px-3 py-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                added 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-stone-900 hover:bg-stone-800 text-white shadow-xs'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    {mode === 'wholesale' 
                      ? `+${product.wholesaleMoq} ${product.unit}`
                      : '+Add to Cart'
                    }
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
