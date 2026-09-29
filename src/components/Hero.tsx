import React from 'react';
import { ShieldCheck, Truck, ReceiptText, TrendingUp, ArrowRight, Layers, ShoppingBag } from 'lucide-react';
import { AppMode, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { HERO_IMAGE } from '../data/products';

interface HeroProps {
  mode: AppMode;
  onToggleMode: (mode: AppMode) => void;
  lang: Language;
  onOpenQuickSheet: () => void;
  onScrollToCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  mode,
  onToggleMode,
  lang,
  onOpenQuickSheet,
  onScrollToCatalog
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <section className="relative bg-stone-900 text-white overflow-hidden border-b border-stone-800">
      {/* Background Warehouse Image with measured contrast scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Modern wholesale distribution warehouse and supply center"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30 filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/85 to-stone-900/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>
                Live Wholesale & Direct Factory Rates • Tax Invoice & E-Way Bill Ready
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight max-w-3xl text-balance">
              {t.heroHeadline}
            </h1>

            <p className="text-base sm:text-lg text-stone-300 max-w-2xl leading-relaxed">
              {t.heroSubheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onScrollToCatalog}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>{mode === 'wholesale' ? t.ctaExploreWholesale : t.ctaRetailShop}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenQuickSheet}
                className="px-6 py-3 rounded-xl bg-stone-800/90 hover:bg-stone-700/90 border border-stone-600 text-white font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-amber-400" />
                <span>{t.ctaOrderSheet}</span>
              </button>
            </div>

            {/* Mode Indicator Card */}
            <div className="pt-2">
              <div className="p-3.5 rounded-xl bg-stone-800/70 border border-stone-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs max-w-2xl">
                <div>
                  <span className="text-stone-400 font-medium">
                    Current Portal Mode:
                  </span>{' '}
                  <span className="font-bold text-amber-300">
                    {mode === 'wholesale' ? t.modeWholesale : t.modeRetail}
                  </span>
                  <p className="text-stone-300 text-[11px] mt-0.5">
                    {mode === 'wholesale' ? t.modeWholesaleDesc : t.modeRetailDesc}
                  </p>
                </div>
                <button
                  onClick={() => onToggleMode(mode === 'wholesale' ? 'retail' : 'wholesale')}
                  className="px-3 py-1.5 rounded-lg bg-stone-700 hover:bg-stone-600 text-stone-200 text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors"
                >
                  {mode === 'wholesale' 
                    ? 'Switch to Retail (Single Pcs)'
                    : 'Switch to Wholesale (Bulk)'
                  }
                </button>
              </div>
            </div>
          </div>

          {/* Right Trust & Facility Highlight Card */}
          <div className="lg:col-span-4">
            <div className="bg-stone-950/80 backdrop-blur-md border border-stone-800 rounded-2xl p-6 shadow-xl space-y-5">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Trading Hub Advantages
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-stone-800 text-amber-400 shrink-0">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-100 text-sm">{t.heroStatDispatch}</h4>
                    <p className="text-stone-400 text-[11px] mt-0.5">
                      Direct freight dispatch via certified B2B logistics network (TCI, V-Trans, SafeExpress).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-stone-800 text-amber-400 shrink-0">
                    <ReceiptText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-100 text-sm">{t.heroStatGst}</h4>
                    <p className="text-stone-400 text-[11px] mt-0.5">
                      Genuine GST tax invoice with HSN codes for instant business input tax credit.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-stone-800 text-amber-400 shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-100 text-sm">{t.heroStatSavings}</h4>
                    <p className="text-stone-400 text-[11px] mt-0.5">
                      Zero middlemen markups. Sourced directly from certified factories and mandi lots.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-stone-800 text-amber-400 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-100 text-sm">{t.heroStatRetailers}</h4>
                    <p className="text-stone-400 text-[11px] mt-0.5">
                      Trusted supplier for thousands of verified retail shops and commercial buyers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
