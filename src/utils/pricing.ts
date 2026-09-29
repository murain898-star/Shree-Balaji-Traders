import { Product, AppMode } from '../types';

export function getApplicableUnitPrice(product: Product, quantity: number, mode: AppMode): number {
  if (mode === 'retail') {
    return product.retailPrice;
  }

  // Wholesale Mode: Check matching tier based on quantity
  // Find highest tier where minQty <= quantity
  let price = product.wholesaleTiers[0].pricePerUnit;
  for (const tier of product.wholesaleTiers) {
    if (quantity >= tier.minQty) {
      price = tier.pricePerUnit;
    }
  }
  return price;
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatNumber(val: number): string {
  return new Intl.NumberFormat('en-IN').format(val);
}

export function calculateCartSummary(
  items: Array<{ product: Product; quantity: number; mode: AppMode }>,
  mode: AppMode,
  isInterstate: boolean = false
) {
  let subtotal = 0;
  let totalMrpValue = 0;
  let cgst = 0;
  let sgst = 0;
  let igst = 0;

  items.forEach(item => {
    const unitPrice = getApplicableUnitPrice(item.product, item.quantity, mode);
    const lineTotal = unitPrice * item.quantity;
    subtotal += lineTotal;
    totalMrpValue += item.product.retailPrice * item.quantity;

    const taxAmount = (lineTotal * item.product.gstRate) / 100;
    if (isInterstate) {
      igst += taxAmount;
    } else {
      cgst += taxAmount / 2;
      sgst += taxAmount / 2;
    }
  });

  const totalTax = isInterstate ? igst : (cgst + sgst);
  
  // Transport rule:
  // Wholesale: Free if subtotal >= 15000, else flat ₹450 local transport loading
  // Retail: Free if subtotal >= 999, else flat ₹75 standard shipping
  let transportCharge = 0;
  if (items.length > 0) {
    if (mode === 'wholesale') {
      transportCharge = subtotal >= 15000 ? 0 : 450;
    } else {
      transportCharge = subtotal >= 999 ? 0 : 75;
    }
  }

  const grandTotal = Math.round(subtotal + totalTax + transportCharge);
  const savingsTotal = Math.max(0, Math.round(totalMrpValue - subtotal));

  return {
    subtotal,
    cgst: Math.round(cgst * 100) / 100,
    sgst: Math.round(sgst * 100) / 100,
    igst: Math.round(igst * 100) / 100,
    totalTax: Math.round(totalTax * 100) / 100,
    transportCharge,
    grandTotal,
    savingsTotal,
    totalMrpValue
  };
}
