import React from 'react';
import { Phone, Mail, MapPin, Building, ShieldCheck, Clock, Award } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer id="about-mandi" className="bg-stone-950 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand & Mandi Hub Info */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xl font-bold text-white tracking-tight">
              {COMPANY_INFO.name}
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              Direct factory and mandi wholesale distribution hub for bulk trade & retail supply. Serving verified retailers, commercial shopkeepers, and consumer households across India.
            </p>

            <div className="pt-2 space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}, {COMPANY_INFO.city}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{COMPANY_INFO.phone} / WhatsApp Order Desk</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Legal & Business Registration Credentials */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Tax & Business Registration
            </h4>
            
            <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-400">GST Registration:</span>
                <span className="font-mono font-bold text-stone-200">{COMPANY_INFO.gstin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Permanent A/c (PAN):</span>
                <span className="font-mono font-bold text-stone-200">{COMPANY_INFO.pan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">B2B E-Way Bill Portal:</span>
                <span className="text-emerald-400 font-semibold">Active & Verified</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">FSSAI / BIS Certified:</span>
                <span className="text-stone-200 font-medium">10019011002341</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-stone-400">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Trading Hours: Monday - Saturday (9:00 AM - 8:00 PM IST)</span>
            </div>
          </div>

          {/* Banking / Direct Mandi Transfer */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Wholesale Bank Details
            </h4>
            <div className="text-xs text-stone-400 space-y-1.5 p-3.5 rounded-xl bg-stone-900 border border-stone-800">
              <div>
                <span className="text-stone-500">Bank:</span>{' '}
                <span className="text-stone-200 font-semibold">{COMPANY_INFO.bankName}</span>
              </div>
              <div>
                <span className="text-stone-500">A/C:</span>{' '}
                <span className="font-mono font-bold text-white">{COMPANY_INFO.accountNo}</span>
              </div>
              <div>
                <span className="text-stone-500">IFSC:</span>{' '}
                <span className="font-mono font-bold text-white">{COMPANY_INFO.ifsc}</span>
              </div>
              <div className="pt-1 text-[11px] text-amber-300">
                Accepting RTGS / NEFT & B2B UPI Payments
              </div>
            </div>
          </div>

        </div>

        {/* Quiet Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-stone-800 text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>GST Rule 31 Compliant</span>
            <span aria-hidden="true">·</span>
            <span>B2B & B2C Gateway</span>
            <span aria-hidden="true">·</span>
            <span>ISO 9001:2015 Mandi Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
