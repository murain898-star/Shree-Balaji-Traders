import React from 'react';
import { ShoppingBag, ArrowLeftRight, Globe, FileSpreadsheet } from 'lucide-react';
import { AppMode, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { formatINR } from '../utils/pricing';

interface NavbarProps {
  mode: AppMode;
  onToggleMode: (mode: AppMode) => void;
  lang: Language;
  onToggleLang: (lang: Language) => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onScrollToSection: (id: string) => void;
  onOpenQuickSheet: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  mode,
  onToggleMode,
  lang,
  onToggleLang,
  cartCount,
  cartTotal,
  onOpenCart,
  onScrollToSection,
  onOpenQuickSheet
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Slim B2B / Notice bar */}
      <div className="bg-stone-900 text-stone-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-semibold uppercase tracking-wider text-[11px]">
              {mode === 'wholesale' ? 'B2B Wholesale Portal' : 'Retail Direct Store'}
            </span>
            <span className="text-stone-500 hidden sm:inline">|</span>
            <span className="hidden sm:inline text-stone-300">
              {mode === 'wholesale' 
                ? 'Direct Factory & Mandi Rates • 100% GST Input Credit • 48h Freight Bilty Dispatch'
                : 'Single Pieces Available • Doorstep Courier Delivery • Secure UPI / COD'
              }
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => onToggleLang(lang === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-stone-300"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold">{lang === 'en' ? 'English' : 'हिन्दी'}</span>
            </button>
            <span className="text-stone-600">|</span>
            <span className="text-stone-400">Helpline: +91 98765 43210</span>
          </div>
        </div>
      </div>

      {/* Main 3-Zone Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element Brand Title */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 hover:text-amber-700 transition-colors whitespace-nowrap shrink-0"
        >
          {t.brandName}
        </a>

        {/* Zone 2: Clean Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700">
          <button 
            onClick={() => onScrollToSection('catalog')} 
            className="hover:text-amber-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            {t.navCatalog}
          </button>
          <button 
            onClick={onOpenQuickSheet}
            className="hover:text-amber-700 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
          >
            <FileSpreadsheet className="w-4 h-4 text-stone-500" />
            {t.navBulkSheet}
          </button>
          <button 
            onClick={() => onScrollToSection('calculator')} 
            className="hover:text-amber-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            {t.navCalculator}
          </button>
          <button 
            onClick={() => onScrollToSection('about-mandi')} 
            className="hover:text-amber-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            {t.navContact}
          </button>
        </nav>

        {/* Zone 3: Interactive Mode Switcher & Cart Action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Wholesale vs Retail Mode Toggle Segment */}
          <div className="bg-stone-100 p-1 rounded-xl flex items-center border border-stone-200">
            <button
              onClick={() => onToggleMode('wholesale')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                mode === 'wholesale'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <ArrowLeftRight className="w-3 h-3" />
              <span>Wholesale (B2B)</span>
            </button>
            <button
              onClick={() => onToggleMode('retail')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                mode === 'retail'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>Retail (B2C)</span>
            </button>
          </div>

          {/* Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="relative px-3 sm:px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-xs whitespace-nowrap"
            aria-label="View shopping cart"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">
              {cartCount > 0 ? formatINR(cartTotal) : 'Cart'}
            </span>
            {cartCount > 0 && (
              <span className="bg-amber-500 text-stone-950 font-bold px-1.5 py-0.5 rounded-full text-[10px] tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
