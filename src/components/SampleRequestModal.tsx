import React, { useState } from 'react';
import { X, Send, CheckCircle2, PackageCheck, MessageSquare } from 'lucide-react';
import { Product, Language } from '../types';
import { COMPANY_INFO } from '../data/products';

interface SampleRequestModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const SampleRequestModal: React.FC<SampleRequestModalProps> = ({
  product,
  isOpen,
  onClose,
  lang
}) => {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    phone: '',
    email: '',
    city: '',
    inquiryType: 'sample_pack', // 'sample_pack' | 'truckload' | 'dealership'
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppInquiry = () => {
    let msg = `*Wholesale Inquiry / Sample Request*\n`;
    if (product) {
      msg += `Product: ${product.nameEn} (SKU: ${product.sku})\n`;
    }
    msg += `Type: ${formData.inquiryType.toUpperCase()}\n`;
    msg += `Firm: ${formData.businessName}\n`;
    msg += `Contact: ${formData.contactName} (${formData.phone})\n`;
    msg += `City: ${formData.city}\n`;
    if (formData.notes) msg += `Note: ${formData.notes}\n`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp.replace('+', '')}?text=${encoded}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl border border-stone-200 shadow-2xl p-6 sm:p-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">
              Sample & Quotation Request Received!
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto">
              Our wholesale trade desk will contact your registered phone number shortly with sample transit details and customized tiered lot quotations.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={handleWhatsAppInquiry}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp Now</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-700">
                <PackageCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 text-lg">
                  Request Wholesale Sample / Custom Quote
                </h3>
                <p className="text-xs text-stone-500">
                  {product ? product.nameEn : 'Direct Factory & Mandi Supply'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-stone-700 font-semibold block mb-1">
                  Inquiry Type:
                </label>
                <select
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 font-medium focus:outline-none"
                >
                  <option value="sample_pack">
                    Sample Test Pack (Quality inspection)
                  </option>
                  <option value="truckload">
                    Full Truckload / Container Lot Inquiry
                  </option>
                  <option value="dealership">
                    District Dealership / Wholesale Supply
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-stone-700 font-semibold block mb-1">
                    Business / Firm Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="M/s Trader Name"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-stone-700 font-semibold block mb-1">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Owner / Buyer Name"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-stone-700 font-semibold block mb-1">
                    Mobile Phone (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-stone-700 font-semibold block mb-1">
                    City & State *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kanpur, UP"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-stone-700 font-semibold block mb-1">
                  Special Requirement / Quantity details:
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Recurring monthly demand of 500 units or custom packaging..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Wholesale Inquiry</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
