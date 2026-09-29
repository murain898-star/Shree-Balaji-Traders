export type AppMode = 'wholesale' | 'retail';
export type Language = 'hi' | 'en';

export interface PriceTier {
  minQty: number;
  maxQty?: number;
  pricePerUnit: number;
  labelEn: string;
  labelHi: string;
}

export interface Product {
  id: string;
  sku: string;
  hsnCode: string;
  gstRate: number; // e.g. 5, 12, 18
  category: 'spices' | 'textiles' | 'electronics' | 'kitchen';
  nameEn: string;
  nameHi: string;
  descriptionEn: string;
  descriptionHi: string;
  image: string;
  unit: string;
  unitHi: string;
  cartonPackSize: number; // units per carton/box
  cartonUnit: string;
  cartonUnitHi: string;
  retailPrice: number; // MRP / Single unit price
  retailMoq: number; // usually 1
  wholesaleMoq: number; // minimum quantity for wholesale rate
  wholesaleTiers: PriceTier[];
  stockQuantity: number;
  weightPerUnitKg: number;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  appliedPricePerUnit: number;
  mode: AppMode;
}

export interface CustomerDetails {
  businessName: string;
  contactPerson: string;
  phone: string;
  email: string;
  gstin: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  transportPreference: string;
  notes?: string;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  type: 'tax_invoice' | 'proforma_quote' | 'retail_cash_memo';
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  discount: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalTax: number;
  transportCharge: number;
  grandTotal: number;
  savingsTotal: number;
}
