import React, { useState } from 'react';
import { Calculator, TrendingUp, Sparkles, Plus, ArrowRight, Percent } from 'lucide-react';
import { Product, AppMode, Language } from '../types';
import { PRODUCTS } from '../data/products';
import { TRANSLATIONS } from '../data/translations';
import { formatINR, getApplicableUnitPrice, formatNumber } from '../utils/pricing';

interface MarginCalculatorProps {
  lang: Language;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const MarginCalculator: React.FC<MarginCalculatorProps> = ({
  lang,
  onAddToCart
}) => {
  const t = TRANSLATIONS[lang];
  const [selectedProductId, setSelectedProductId] = useState<string>(PRODUCTS[0].id);
  const [quantity, setQuantity] = useState<number>(PRODUCTS[0].wholesaleMoq * 2);

  const selectedProduct = PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];

  // Wholesale rate at chosen quantity
  const wholesaleRate = getApplicableUnitPrice(selectedProduct, Math.max(quantity, selectedProduct.wholesaleMoq), 'wholesale');
  const retailMrp = selectedProduct.retailPrice;

  const totalWholesaleCost = wholesaleRate * quantity;
  const totalRetailRevenue = retailMrp * quantity;
  const netProfit = totalRetailRevenue - totalWholesaleCost;
  const profitMarginPercent = totalWholesaleCost > 0 ? ((netProfit / totalWholesaleCost) * 100).toFixed(1) : '0';
  const marginOnSellingPrice = totalRetailRevenue > 0 ? ((netProfit / totalRetailRevenue) * 100).toFixed(1) : '0';

  const handleProductChange = (id: string) => {
    setSelectedProductId(id);
    const prod = PRODUCTS.find(p => p.id === id);
    if (prod) {
      setQuantity(prod.wholesaleMoq * 2);
    }
  };

  return (
    <section id="calculator" className="py-12 bg-stone-100/70 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden p-6 sm:p-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                <Calculator className="w-4 h-4" />
                <span>Retailer Business Toolkit</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
                {t.calcTitle}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                {t.calcSubtitle}
              </p>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold self-start md:self-auto">
              <TrendingUp className="w-4 h-4 text-amber-700" />
              <span>
                Direct Wholesale Slab Advantage
              </span>
            </div>
          </div>

          {/* Calculator Grid */}
          <div className="grid lg:grid-cols-12 gap-8 pt-8">
            
            {/* Input Controls */}
            <div className="lg:col-span-6 space-y-6">
              {/* Product Selector */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                  {t.selectProduct}
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => handleProductChange(e.target.value)}
                  className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer"
                >
                  {PRODUCTS.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.nameEn} (MRP: ₹{p.retailPrice} / {p.unit})
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity Slider & Numeric input */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                    {t.enterQty}
                  </label>
                  <span className="text-xs text-amber-800 font-semibold">
                    MOQ: {selectedProduct.wholesaleMoq} {selectedProduct.unit}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={selectedProduct.wholesaleMoq}
                    max={Math.min(500, selectedProduct.stockQuantity)}
                    step={selectedProduct.wholesaleMoq >= 10 ? 10 : 1}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || selectedProduct.wholesaleMoq)}
                    className="flex-1 h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                  <div className="flex items-center border border-stone-300 rounded-xl bg-white px-3 py-1.5">
                    <input
                      type="number"
                      min={selectedProduct.wholesaleMoq}
                      max={selectedProduct.stockQuantity}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(selectedProduct.wholesaleMoq, parseInt(e.target.value) || 0))}
                      className="w-16 text-center font-bold text-sm text-stone-900 focus:outline-none tabular-nums"
                    />
                    <span className="text-xs text-stone-600 pl-1">
                      {selectedProduct.unit}
                    </span>
                  </div>
                </div>

                {/* Quick Quantity Buttons */}
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-[11px] text-stone-600">
                    Quick Select:
                  </span>
                  {[selectedProduct.wholesaleMoq, selectedProduct.wholesaleMoq * 2, selectedProduct.wholesaleMoq * 5, selectedProduct.wholesaleMoq * 10].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setQuantity(preset)}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                        quantity === preset
                          ? 'bg-amber-600 text-white'
                          : 'bg-stone-200/80 hover:bg-stone-300 text-stone-700'
                      }`}
                    >
                      {preset} {selectedProduct.unit}
                    </button>
                  ))}
                </div>
              </div>

              {/* Per-Unit Comparison Box */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <div>
                  <span className="text-[11px] text-stone-600 block">{t.wholesaleCostUnit}</span>
                  <span className="text-lg font-bold text-amber-800 tabular-nums">
                    {formatINR(wholesaleRate)}
                  </span>
                  <span className="text-xs text-stone-600">/{selectedProduct.unit}</span>
                </div>
                <div>
                  <span className="text-[11px] text-stone-600 block">{t.retailMrpUnit}</span>
                  <span className="text-lg font-bold text-stone-900 tabular-nums">
                    {formatINR(retailMrp)}
                  </span>
                  <span className="text-xs text-stone-600">/{selectedProduct.unit}</span>
                </div>
              </div>
            </div>

            {/* Calculated Output Card */}
            <div className="lg:col-span-6 bg-stone-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Profit & Return Analysis
                  </span>
                  <span className="text-xs text-stone-400">
                    {quantity} {selectedProduct.unit} Lot
                  </span>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between items-center text-stone-300">
                    <span>{t.totalPurchaseCost}</span>
                    <span className="font-bold text-white tabular-nums text-base">
                      {formatINR(totalWholesaleCost)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-stone-300">
                    <span>{t.totalExpectedRevenue}</span>
                    <span className="font-bold text-white tabular-nums text-base">
                      {formatINR(totalRetailRevenue)}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-stone-800 flex justify-between items-center">
                    <span className="font-semibold text-emerald-400 text-sm sm:text-base">
                      {t.netProfitAmount}
                    </span>
                    <span className="text-xl sm:text-2xl font-extrabold text-emerald-400 tabular-nums">
                      +{formatINR(netProfit)}
                    </span>
                  </div>
                </div>

                {/* Return On Investment Badge */}
                <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Percent className="w-4 h-4 text-amber-400" />
                    <span className="text-xs text-stone-300">{t.profitMarginPercent}</span>
                  </div>
                  <span className="text-base font-bold text-amber-400 tabular-nums">
                    {profitMarginPercent}% ROI
                  </span>
                </div>
              </div>

              {/* Add this Calculated Lot to Cart */}
              <div className="pt-6 mt-6 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => onAddToCart(selectedProduct, quantity)}
                  className="w-full py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>
                    Add This {quantity} {selectedProduct.unit} Lot to Cart ({formatINR(totalWholesaleCost)})
                  </span>
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
