import React, { useState } from 'react';
import { Search, Filter, Sparkles, Layers, SlidersHorizontal, ArrowLeftRight } from 'lucide-react';
import { Product, AppMode, Language } from '../types';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { TRANSLATIONS } from '../data/translations';

interface CatalogSectionProps {
  mode: AppMode;
  onToggleMode: (mode: AppMode) => void;
  lang: Language;
  onAddToCart: (product: Product, quantity: number) => void;
  onOpenQuickView: (product: Product) => void;
  onOpenQuickSheet: () => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  mode,
  onToggleMode,
  lang,
  onAddToCart,
  onOpenQuickView,
  onOpenQuickSheet
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const t = TRANSLATIONS[lang];

  // Filtering
  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesCategory;

    const matchesNameEn = p.nameEn.toLowerCase().includes(query);
    const matchesNameHi = p.nameHi.toLowerCase().includes(query);
    const matchesSku = p.sku.toLowerCase().includes(query);
    const matchesHsn = p.hsnCode.includes(query);

    return matchesCategory && (matchesNameEn || matchesNameHi || matchesSku || matchesHsn);
  });

  return (
    <section id="catalog" className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Section Header & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
            <span>{mode === 'wholesale' ? 'B2B Wholesale Catalog' : 'Retail Direct Storefront'}</span>
            <span aria-hidden="true">·</span>
            <span>{PRODUCTS.length} Verified Products</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
            Product Catalog & Volume Rates
          </h2>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl">
            {mode === 'wholesale'
              ? 'Order in bulk tiers to unlock maximum wholesale discounts. Full GST input tax credit available.'
              : 'Shop single units for retail needs with verified quality packaging and fast doorstep dispatch.'}
          </p>
        </div>

        {/* Quick Bulk Sheet CTA button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenQuickSheet}
            className="px-4 py-2.5 rounded-xl border border-stone-300 hover:border-amber-500 bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold transition-all flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Layers className="w-4 h-4 text-amber-600" />
            <span>Quick Bulk Matrix</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Active Mode Switch Info */}
          <div className="flex items-center justify-between sm:justify-end gap-3 px-3 py-2 bg-stone-100 rounded-xl text-xs">
            <span className="text-stone-600 font-medium">
              Pricing Mode:
            </span>
            <span className={`font-bold ${mode === 'wholesale' ? 'text-amber-700' : 'text-stone-900'}`}>
              {mode === 'wholesale' ? 'Wholesale Slabs (MOQ Active)' : 'Retail MRP (Single Pcs)'}
            </span>
            <button
              onClick={() => onToggleMode(mode === 'wholesale' ? 'retail' : 'wholesale')}
              className="text-[11px] font-semibold text-amber-700 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeftRight className="w-3 h-3" />
              <span>Switch</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {CATEGORIES.map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {cat.labelEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              mode={mode}
              lang={lang}
              onAddToCart={onAddToCart}
              onOpenQuickView={onOpenQuickView}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8">
          <p className="text-stone-500 text-sm">
            {lang === 'hi' ? 'कोई उत्पाद नहीं मिला। कृपया दूसरा नाम या श्रेणी खोजें।' : 'No products found matching your search. Try changing the category or search keyword.'}
          </p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="mt-4 px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors"
          >
            {lang === 'hi' ? 'सभी उत्पाद देखें' : 'Reset Filters'}
          </button>
        </div>
      )}
    </section>
  );
};
