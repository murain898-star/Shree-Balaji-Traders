import React, { useState } from 'react';
import { AppMode, Language, CartItem, Product } from './types';
import { PRODUCTS } from './data/products';
import { getApplicableUnitPrice, calculateCartSummary } from './utils/pricing';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CatalogSection } from './components/CatalogSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { BulkOrderSheet } from './components/BulkOrderSheet';
import { MarginCalculator } from './components/MarginCalculator';
import { CartDrawer } from './components/CartDrawer';
import { InvoiceModal } from './components/InvoiceModal';
import { SampleRequestModal } from './components/SampleRequestModal';
import { Footer } from './components/Footer';

export default function App() {
  const [mode, setMode] = useState<AppMode>('wholesale');
  const [lang, setLang] = useState<Language>('en');

  // Starter cart demo items so user can immediately experience the wholesale calculations
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // W240 Cashews
      quantity: 20, // 20 Kg
      appliedPricePerUnit: getApplicableUnitPrice(PRODUCTS[0], 20, 'wholesale'),
      mode: 'wholesale'
    },
    {
      product: PRODUCTS[3], // Cotton Shirts (12 Pcs Box)
      quantity: 24, // 24 Pcs
      appliedPricePerUnit: getApplicableUnitPrice(PRODUCTS[3], 24, 'wholesale'),
      mode: 'wholesale'
    }
  ]);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuickSheetOpen, setIsQuickSheetOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sampleProduct, setSampleProduct] = useState<Product | null>(null);

  // Switch between Wholesale & Retail mode
  const handleToggleMode = (newMode: AppMode) => {
    setMode(newMode);
    // Recalculate price in existing cart
    setCart(prev =>
      prev.map(item => ({
        ...item,
        mode: newMode,
        appliedPricePerUnit: getApplicableUnitPrice(item.product, item.quantity, newMode)
      }))
    );
  };

  // Add to cart handler
  const handleAddToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(item => item.product.id === product.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        const newQty = updated[existingIdx].quantity + quantity;
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: newQty,
          appliedPricePerUnit: getApplicableUnitPrice(product, newQty, mode),
          mode
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            quantity,
            appliedPricePerUnit: getApplicableUnitPrice(product, quantity, mode),
            mode
          }
        ];
      }
    });
    setIsCartOpen(true);
  };

  // Add multiple items from bulk sheet
  const handleAddMultipleToCart = (itemsToAdd: Array<{ product: Product; quantity: number }>) => {
    setCart(prev => {
      let updated = [...prev];
      itemsToAdd.forEach(({ product, quantity }) => {
        const existingIdx = updated.findIndex(item => item.product.id === product.id);
        if (existingIdx > -1) {
          const newQty = updated[existingIdx].quantity + quantity;
          updated[existingIdx] = {
            ...updated[existingIdx],
            quantity: newQty,
            appliedPricePerUnit: getApplicableUnitPrice(product, newQty, mode),
            mode
          };
        } else {
          updated.push({
            product,
            quantity,
            appliedPricePerUnit: getApplicableUnitPrice(product, quantity, mode),
            mode
          });
        }
      });
      return updated;
    });
    setIsCartOpen(true);
  };

  // Update item quantity in cart
  const handleUpdateQuantity = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (item.product.id === productId) {
          return {
            ...item,
            quantity: newQty,
            appliedPricePerUnit: getApplicableUnitPrice(item.product, newQty, mode)
          };
        }
        return item;
      })
    );
  };

  // Remove item from cart
  const handleRemoveItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  // Clear cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Open Sample Request
  const handleRequestSample = (product: Product) => {
    setSampleProduct(product);
    setIsSampleModalOpen(true);
  };

  // Smooth scroll
  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const summary = calculateCartSummary(cart, mode, false);
  const totalCartUnits = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      {/* Navigation */}
      <Navbar
        mode={mode}
        onToggleMode={handleToggleMode}
        lang={lang}
        onToggleLang={setLang}
        cartCount={totalCartUnits}
        cartTotal={summary.grandTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToSection={handleScrollToSection}
        onOpenQuickSheet={() => setIsQuickSheetOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          mode={mode}
          onToggleMode={handleToggleMode}
          lang={lang}
          onOpenQuickSheet={() => setIsQuickSheetOpen(true)}
          onScrollToCatalog={() => handleScrollToSection('catalog')}
        />

        {/* Product Catalog */}
        <CatalogSection
          mode={mode}
          onToggleMode={handleToggleMode}
          lang={lang}
          onAddToCart={handleAddToCart}
          onOpenQuickView={(prod) => setSelectedProduct(prod)}
          onOpenQuickSheet={() => setIsQuickSheetOpen(true)}
        />

        {/* Retailer Profit Margin & B2B Calculator */}
        <MarginCalculator
          lang={lang}
          onAddToCart={handleAddToCart}
        />
      </main>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        mode={mode}
        lang={lang}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onRequestSample={handleRequestSample}
      />

      {/* Quick Bulk Order Sheet Modal */}
      <BulkOrderSheet
        isOpen={isQuickSheetOpen}
        onClose={() => setIsQuickSheetOpen(false)}
        lang={lang}
        onAddMultipleToCart={handleAddMultipleToCart}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        mode={mode}
        lang={lang}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenInvoiceModal={() => setIsInvoiceOpen(true)}
      />

      {/* GST Tax Invoice & Quotation Preview Modal */}
      <InvoiceModal
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
        items={cart}
        mode={mode}
        lang={lang}
      />

      {/* Wholesale Sample & Bulk Truckload Request Modal */}
      <SampleRequestModal
        product={sampleProduct}
        isOpen={isSampleModalOpen}
        onClose={() => {
          setIsSampleModalOpen(false);
          setSampleProduct(null);
        }}
        lang={lang}
      />
    </div>
  );
}
