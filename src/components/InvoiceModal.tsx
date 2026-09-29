import React, { useState } from 'react';
import { X, Printer, Download, MessageSquare, Building2, CheckCircle2, ShieldCheck, QrCode } from 'lucide-react';
import { CartItem, AppMode, Language, CustomerDetails } from '../types';
import { COMPANY_INFO } from '../data/products';
import { TRANSLATIONS } from '../data/translations';
import { calculateCartSummary, formatINR, getApplicableUnitPrice } from '../utils/pricing';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  mode: AppMode;
  lang: Language;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  onClose,
  items,
  mode,
  lang
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[lang];
  const [docType, setDocType] = useState<'tax_invoice' | 'proforma_quote' | 'retail_memo'>(
    mode === 'wholesale' ? 'tax_invoice' : 'retail_memo'
  );

  const [customer, setCustomer] = useState<CustomerDetails>({
    businessName: mode === 'wholesale' ? 'M/s Agrawal Super Mart & Traders' : 'Rajesh Kumar',
    contactPerson: 'Rajesh Agrawal',
    phone: '+91 98290 11223',
    email: 'contact@agrawalsupermart.com',
    gstin: mode === 'wholesale' ? '07AAPCA1234C1ZV' : '',
    address: 'Near Old Railway Station, Main Mandi Road',
    city: 'Jaipur',
    state: 'Rajasthan (08)',
    pincode: '302006',
    transportPreference: 'V-Trans Logistics (Bilty)'
  });

  const isInterstate = customer.state.toLowerCase().includes('delhi') ? false : true;
  const summary = calculateCartSummary(items, mode, isInterstate);

  const invoiceNumber = docType === 'tax_invoice' 
    ? 'SBT/GST/26-27/0419' 
    : docType === 'proforma_quote' 
      ? 'SBT/QTN/26-27/0892' 
      : 'SBT/RTL/26-27/1104';

  const today = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  const handleSendWhatsApp = () => {
    let text = `*${docType === 'tax_invoice' ? 'TAX INVOICE' : 'QUOTATION'} - ${COMPANY_INFO.name}*\n`;
    text += `Doc No: ${invoiceNumber} | Date: ${today}\n`;
    text += `Customer: ${customer.businessName} (${customer.phone})\n`;
    text += `--------------------------------\n`;
    items.forEach((item, i) => {
      const rate = getApplicableUnitPrice(item.product, item.quantity, mode);
      text += `${i + 1}. ${item.product.nameEn} (HSN: ${item.product.hsnCode})\n   Qty: ${item.quantity} ${item.product.unit} @ ₹${rate} = ₹${rate * item.quantity}\n`;
    });
    text += `--------------------------------\n`;
    text += `Subtotal: ₹${summary.subtotal}\n`;
    text += `GST Tax: ₹${summary.totalTax}\n`;
    text += `Transport: ₹${summary.transportCharge}\n`;
    text += `*Grand Total: ₹${summary.grandTotal}*\n\n`;
    text += `Bank: ${COMPANY_INFO.bankName}\nA/C: ${COMPANY_INFO.accountNo}\nIFSC: ${COMPANY_INFO.ifsc}\n`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp.replace('+', '')}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-950/75 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden my-4 flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Controls Toolbar (Non-printable) */}
        <div className="px-6 py-4 bg-stone-900 text-white flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-stone-400">{t.invoiceTypeSelect}</span>
            <div className="flex items-center bg-stone-800 p-1 rounded-xl text-xs">
              <button
                type="button"
                onClick={() => setDocType('tax_invoice')}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                  docType === 'tax_invoice' ? 'bg-amber-600 text-white shadow-xs' : 'text-stone-300 hover:text-white'
                }`}
              >
                {t.taxInvoice}
              </button>
              <button
                type="button"
                onClick={() => setDocType('proforma_quote')}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                  docType === 'proforma_quote' ? 'bg-stone-700 text-white shadow-xs' : 'text-stone-300 hover:text-white'
                }`}
              >
                {t.proformaQuotation}
              </button>
              <button
                type="button"
                onClick={() => setDocType('retail_memo')}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                  docType === 'retail_memo' ? 'bg-stone-700 text-white shadow-xs' : 'text-stone-300 hover:text-white'
                }`}
              >
                {t.retailMemo}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.printInvoice}</span>
            </button>
            <button
              onClick={handleSendWhatsApp}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Container with Buyer Edit Form + Printable Invoice Sheet */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-stone-100/60 space-y-6">
          
          {/* Customer / Consignee Form Fields (Non-printable) */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs print:hidden">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-700" />
              <span>{t.buyerDetailsTitle} (Edit Invoice Header)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="text-stone-500 font-medium block mb-1">{t.firmName}</label>
                <input
                  type="text"
                  value={customer.businessName}
                  onChange={(e) => setCustomer({ ...customer, businessName: e.target.value })}
                  className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="text-stone-500 font-medium block mb-1">{t.gstinLabel}</label>
                <input
                  type="text"
                  value={customer.gstin}
                  placeholder="07AAAAA0000A1Z5"
                  onChange={(e) => setCustomer({ ...customer, gstin: e.target.value.toUpperCase() })}
                  className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-mono font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="text-stone-500 font-medium block mb-1">{t.stateLabel}</label>
                <input
                  type="text"
                  value={customer.state}
                  onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                  className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-stone-500 font-medium block mb-1">{t.transportLabel}</label>
                <input
                  type="text"
                  value={customer.transportPreference}
                  onChange={(e) => setCustomer({ ...customer, transportPreference: e.target.value })}
                  className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Printable Invoice Sheet */}
          <div 
            id="printable-invoice" 
            className="bg-white rounded-2xl border border-stone-300 shadow-sm p-6 sm:p-10 text-stone-900 space-y-6 text-xs"
          >
            {/* Invoice Top Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b-2 border-stone-900">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                  {docType === 'tax_invoice' && 'TAX INVOICE (SECTION 31 OF CGST ACT)'}
                  {docType === 'proforma_quote' && 'PROFORMA QUOTATION'}
                  {docType === 'retail_memo' && 'RETAIL CASH MEMO'}
                </span>
                <h1 className="text-xl sm:text-2xl font-bold text-stone-950 mt-1">
                  {COMPANY_INFO.name}
                </h1>
                <p className="text-stone-600 mt-0.5 text-xs">
                  {COMPANY_INFO.address}, {COMPANY_INFO.city}
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-1.5 text-stone-700 font-medium text-[11px]">
                  <span>GSTIN: <strong className="font-mono">{COMPANY_INFO.gstin}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>PAN: <strong className="font-mono">{COMPANY_INFO.pan}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>Phone: {COMPANY_INFO.phone}</span>
                </div>
              </div>

              {/* Invoice Meta Numbers */}
              <div className="sm:text-right bg-stone-50 p-3 rounded-xl border border-stone-200 min-w-48">
                <div className="text-[11px] text-stone-500 font-medium">Invoice No:</div>
                <div className="font-mono font-bold text-sm text-stone-900">{invoiceNumber}</div>
                <div className="text-[11px] text-stone-500 mt-1">Date of Issue:</div>
                <div className="font-semibold text-stone-900">{today}</div>
                <div className="text-[10px] text-stone-500 mt-1">Place of Supply:</div>
                <div className="font-semibold text-stone-800">{customer.state}</div>
              </div>
            </div>

            {/* Consignee / Buyer & Dispatch Info Grid */}
            <div className="grid sm:grid-cols-2 gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200">
              <div>
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                  Details of Receiver (Billed & Shipped To):
                </span>
                <div className="font-bold text-stone-950 text-sm mt-0.5">{customer.businessName}</div>
                <div className="text-stone-600 mt-0.5">{customer.address}, {customer.city}</div>
                <div className="text-stone-700 mt-1">
                  <span>GSTIN: </span>
                  <strong className="font-mono">{customer.gstin || 'UNREGISTERED CONSUMER'}</strong>
                </div>
                <div className="text-stone-600">Phone: {customer.phone}</div>
              </div>

              <div className="sm:border-l sm:border-stone-200 sm:pl-4">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                  Dispatch & Transport Information:
                </span>
                <div className="mt-1 space-y-1">
                  <div>
                    <span className="text-stone-500">Transporter:</span>{' '}
                    <span className="font-semibold text-stone-900">{customer.transportPreference}</span>
                  </div>
                  <div>
                    <span className="text-stone-500">E-Way Bill:</span>{' '}
                    <span className="font-mono text-stone-800">Auto-Generated (Under Rule 138)</span>
                  </div>
                  <div>
                    <span className="text-stone-500">Terms of Delivery:</span>{' '}
                    <span className="font-semibold text-stone-800">Warehouse Door-to-Bilty Freight</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Itemized Table with HSN & GST */}
            <div className="border border-stone-200 rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="bg-stone-100 text-stone-700 font-semibold border-b border-stone-200">
                    <th className="p-2.5 w-8">#</th>
                    <th className="p-2.5">Description of Goods</th>
                    <th className="p-2.5">HSN Code</th>
                    <th className="p-2.5 text-center">Qty</th>
                    <th className="p-2.5 text-right">Rate</th>
                    <th className="p-2.5 text-center">GST %</th>
                    <th className="p-2.5 text-right">Taxable Amt</th>
                    <th className="p-2.5 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {items.map((item, idx) => {
                    const unitPrice = getApplicableUnitPrice(item.product, item.quantity, mode);
                    const lineTaxable = unitPrice * item.quantity;
                    const taxRate = item.product.gstRate;
                    const taxVal = (lineTaxable * taxRate) / 100;
                    const lineGrand = lineTaxable + taxVal;

                    return (
                      <tr key={item.product.id} className="hover:bg-stone-50/50">
                        <td className="p-2.5 text-stone-500">{idx + 1}</td>
                        <td className="p-2.5 font-medium text-stone-900">
                          <div>{item.product.nameEn}</div>
                          <div className="text-[10px] text-stone-500 font-mono">SKU: {item.product.sku}</div>
                        </td>
                        <td className="p-2.5 font-mono text-stone-600">{item.product.hsnCode}</td>
                        <td className="p-2.5 text-center font-bold tabular-nums">
                          {item.quantity} {item.product.unit}
                        </td>
                        <td className="p-2.5 text-right tabular-nums">{formatINR(unitPrice)}</td>
                        <td className="p-2.5 text-center font-semibold text-stone-600">{taxRate}%</td>
                        <td className="p-2.5 text-right font-medium tabular-nums">{formatINR(lineTaxable)}</td>
                        <td className="p-2.5 text-right font-bold tabular-nums text-stone-900">{formatINR(lineGrand)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Bottom Calculations & Bank Transfer Details */}
            <div className="grid sm:grid-cols-12 gap-6 pt-2">
              {/* Left Column: Bank Account Details & QR */}
              <div className="sm:col-span-7 space-y-3">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <div className="text-[10px] font-bold text-stone-600 uppercase tracking-wider mb-1">
                    Bank Remittance Details (RTGS / NEFT / IMPS):
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-stone-500">Bank Name:</span>
                      <div className="font-semibold text-stone-900">{COMPANY_INFO.bankName}</div>
                    </div>
                    <div>
                      <span className="text-stone-500">Account No:</span>
                      <div className="font-mono font-bold text-stone-900">{COMPANY_INFO.accountNo}</div>
                    </div>
                    <div>
                      <span className="text-stone-500">IFSC Code:</span>
                      <div className="font-mono font-bold text-stone-900">{COMPANY_INFO.ifsc}</div>
                    </div>
                    <div>
                      <span className="text-stone-500">UPI ID:</span>
                      <div className="font-mono font-semibold text-amber-800">shreebalaji@sbi</div>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-stone-500 space-y-1">
                  <div className="font-bold text-stone-700">{t.termsTitle}</div>
                  <div>{t.terms1}</div>
                  <div>{t.terms2}</div>
                  <div>{t.terms3}</div>
                </div>
              </div>

              {/* Right Column: Final Tax Breakdown & Signatory */}
              <div className="sm:col-span-5 space-y-3">
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-600">Total Taxable Value:</span>
                    <span className="font-bold tabular-nums">{formatINR(summary.subtotal)}</span>
                  </div>

                  {isInterstate ? (
                    <div className="flex justify-between text-stone-600">
                      <span>IGST (Integrated Tax):</span>
                      <span className="font-semibold tabular-nums">{formatINR(summary.totalTax)}</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between text-stone-600">
                        <span>CGST (Central Tax):</span>
                        <span className="font-semibold tabular-nums">{formatINR(summary.cgst)}</span>
                      </div>
                      <div className="flex justify-between text-stone-600">
                        <span>SGST (State Tax):</span>
                        <span className="font-semibold tabular-nums">{formatINR(summary.sgst)}</span>
                      </div>
                    </>
                  )}

                  <div className="flex justify-between text-stone-600">
                    <span>Freight / Transport Loading:</span>
                    <span className="font-semibold tabular-nums">
                      {summary.transportCharge === 0 ? 'FREE' : formatINR(summary.transportCharge)}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-stone-300 flex justify-between items-baseline">
                    <span className="font-bold text-stone-900 text-sm">Invoice Grand Total:</span>
                    <span className="font-bold text-base text-amber-800 tabular-nums">
                      {formatINR(summary.grandTotal)}
                    </span>
                  </div>
                </div>

                {/* Signatory Box */}
                <div className="pt-4 text-center sm:text-right">
                  <div className="text-[11px] font-semibold text-stone-700">
                    {t.authorizedSignatory}
                  </div>
                  <div className="h-12 flex items-center justify-center sm:justify-end">
                    <span className="font-serif italic text-stone-400 text-xs">[Digitally Signed / E-Way Ready]</span>
                  </div>
                  <div className="text-[10px] text-stone-500 font-medium">Authorized Signatory</div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
