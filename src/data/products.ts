import { Product } from '../types';

import imgWarehouse from '../assets/images/hero_wholesale_warehouse_1790676420443.jpg';
import imgSpices from '../assets/images/product_spices_dryfruits_1790676489624.jpg';
import imgTextile from '../assets/images/product_cotton_textile_1790676507619.jpg';
import imgElectronics from '../assets/images/product_electronics_accessories_1790676523351.jpg';

export const HERO_IMAGE = imgWarehouse;

export const PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    sku: 'SBT-SP-001',
    hsnCode: '080132',
    gstRate: 5,
    category: 'spices',
    nameEn: 'Premium Jumbo W240 Whole Cashews (Kaju)',
    nameHi: 'प्रीमियम जंबो W240 काजू (साबुत होल)',
    descriptionEn: 'Grade A W240 Mangalore-processed whole crunchy cashew nuts, vacuum packed for extended shelf life and zero moisture.',
    descriptionHi: 'ग्रेड-A W240 साबुत कुरकुरा काजू, लंबी शेल्फ लाइफ और शुद्धता के लिए वैक्यूम पैक। किराना और मिठाई दुकानों के लिए बेस्ट।',
    image: imgSpices,
    unit: 'Kg',
    unitHi: 'किलो',
    cartonPackSize: 10,
    cartonUnit: '10 Kg Tin/Box',
    cartonUnitHi: '10 किलो टिन/कार्टन',
    retailPrice: 880,
    retailMoq: 1,
    wholesaleMoq: 10,
    wholesaleTiers: [
      { minQty: 10, maxQty: 49, pricePerUnit: 730, labelEn: '10 - 49 Kg', labelHi: '10 - 49 किलो' },
      { minQty: 50, maxQty: 199, pricePerUnit: 685, labelEn: '50 - 199 Kg', labelHi: '50 - 199 किलो' },
      { minQty: 200, pricePerUnit: 640, labelEn: '200+ Kg (Bori/Pallet)', labelHi: '200+ किलो (बोरी/थोक)' }
    ],
    stockQuantity: 4200,
    weightPerUnitKg: 1,
    featured: true
  },
  {
    id: 'prod-02',
    sku: 'SBT-SP-002',
    hsnCode: '090831',
    gstRate: 5,
    category: 'spices',
    nameEn: 'Royal Green Cardamom 8mm+ (Hari Elaichi)',
    nameHi: 'रॉयल ग्रीन इलायची 8mm+ (हरी इलायची बोल्ड)',
    descriptionEn: 'Bold 8mm+ emerald green cardamom sourced directly from Idukki, Kerala plantations. Intense aroma and high oil content.',
    descriptionHi: 'केरल इडुक्की बागानों से सीधे प्राप्त 8mm+ बोल्ड हरी इलायची। तीव्र खुशबू और शुद्ध तेल अंश।',
    image: imgSpices,
    unit: 'Kg',
    unitHi: 'किलो',
    cartonPackSize: 5,
    cartonUnit: '5 Kg Master Carton',
    cartonUnitHi: '5 किलो मास्टर कार्टन',
    retailPrice: 2450,
    retailMoq: 1,
    wholesaleMoq: 5,
    wholesaleTiers: [
      { minQty: 5, maxQty: 19, pricePerUnit: 2050, labelEn: '5 - 19 Kg', labelHi: '5 - 19 किलो' },
      { minQty: 20, maxQty: 49, pricePerUnit: 1920, labelEn: '20 - 49 Kg', labelHi: '20 - 49 किलो' },
      { minQty: 50, pricePerUnit: 1780, labelEn: '50+ Kg (Mandi Lot)', labelHi: '50+ किलो (मंडी लॉट)' }
    ],
    stockQuantity: 850,
    weightPerUnitKg: 1,
    featured: false
  },
  {
    id: 'prod-03',
    sku: 'SBT-SP-003',
    hsnCode: '080212',
    gstRate: 5,
    category: 'spices',
    nameEn: 'California Supreme Almond Kernels (Badam)',
    nameHi: 'कैलिफोर्निया सुप्रीम बादाम गिरी (100% शुद्ध)',
    descriptionEn: '27/30 count nonpareil California almonds, sweet taste, unpolished, rich in vitamin E and natural oils.',
    descriptionHi: '27/30 काउंट नॉनपेरिल बादाम, प्राकृतिक मिठास, अनपॉलिश्ड, विटामिन-E से भरपूर।',
    image: imgSpices,
    unit: 'Kg',
    unitHi: 'किलो',
    cartonPackSize: 22.68,
    cartonUnit: '22.68 Kg Carton',
    cartonUnitHi: '22.68 किलो कार्टन',
    retailPrice: 760,
    retailMoq: 1,
    wholesaleMoq: 20,
    wholesaleTiers: [
      { minQty: 20, maxQty: 99, pricePerUnit: 630, labelEn: '20 - 99 Kg', labelHi: '20 - 99 किलो' },
      { minQty: 100, maxQty: 499, pricePerUnit: 595, labelEn: '100 - 499 Kg', labelHi: '100 - 499 किलो' },
      { minQty: 500, pricePerUnit: 565, labelEn: '500+ Kg (Full Lot)', labelHi: '500+ किलो (फुल लॉट)' }
    ],
    stockQuantity: 6500,
    weightPerUnitKg: 1,
    featured: true
  },
  {
    id: 'prod-04',
    sku: 'SBT-TX-101',
    hsnCode: '620520',
    gstRate: 5,
    category: 'textiles',
    nameEn: 'Pure Combed Cotton Men’s Formal Shirts (Box of 12)',
    nameHi: 'प्योर कॉटन फॉर्मल शर्ट्स (12 पीस का सेट/बॉक्स)',
    descriptionEn: '60s count pure breathable cotton, tailored fit, double-stitched buttons, wrinkle-resistant finish. Assorted size sets (M, L, XL, XXL).',
    descriptionHi: '60s काउंट कॉटन, प्रीमियम सिलाई, रिंकल-रेसिस्टेंट, असोर्टेड साइज सेट (M-XXL)। रेडीमेड शोरूम के लिए सर्वोत्तम।',
    image: imgTextile,
    unit: 'Pc',
    unitHi: 'पीस',
    cartonPackSize: 24,
    cartonUnit: '24 Pcs Carton',
    cartonUnitHi: '24 पीस कार्टन',
    retailPrice: 799,
    retailMoq: 1,
    wholesaleMoq: 12,
    wholesaleTiers: [
      { minQty: 12, maxQty: 47, pricePerUnit: 390, labelEn: '12 - 47 Pcs', labelHi: '12 - 47 पीस' },
      { minQty: 48, maxQty: 119, pricePerUnit: 345, labelEn: '48 - 119 Pcs (2+ Box)', labelHi: '48 - 119 पीस' },
      { minQty: 120, pricePerUnit: 295, labelEn: '120+ Pcs (Master Bale)', labelHi: '120+ पीस (मास्टर गठरी)' }
    ],
    stockQuantity: 2800,
    weightPerUnitKg: 0.28,
    featured: true
  },
  {
    id: 'prod-05',
    sku: 'SBT-TX-102',
    hsnCode: '500720',
    gstRate: 5,
    category: 'textiles',
    nameEn: 'Handloom Chanderi Zari Border Silk Sarees',
    nameHi: 'हथकरघा चंदेरी ज़री बॉर्डर सिल्क साड़ियां',
    descriptionEn: 'Traditional zari work border, matching blouse piece included, colorfast vibrant shades packed in protective poly-zipper bags.',
    descriptionHi: 'पारंपरिक ज़री बॉर्डर, ब्लाउज पीस सहित, आकर्षक रंगों का बंडल पैक। शादी-विवाह और बुटीक रिटेलर्स हेतु।',
    image: imgTextile,
    unit: 'Pc',
    unitHi: 'पीस',
    cartonPackSize: 10,
    cartonUnit: '10 Pcs Bundle',
    cartonUnitHi: '10 पीस बंडल',
    retailPrice: 1699,
    retailMoq: 1,
    wholesaleMoq: 6,
    wholesaleTiers: [
      { minQty: 6, maxQty: 19, pricePerUnit: 890, labelEn: '6 - 19 Pcs', labelHi: '6 - 19 पीस' },
      { minQty: 20, maxQty: 49, pricePerUnit: 795, labelEn: '20 - 49 Pcs', labelHi: '20 - 49 पीस' },
      { minQty: 50, pricePerUnit: 720, labelEn: '50+ Pcs (Wholesale Pack)', labelHi: '50+ पीस (थोक पैक)' }
    ],
    stockQuantity: 1150,
    weightPerUnitKg: 0.55,
    featured: false
  },
  {
    id: 'prod-06',
    sku: 'SBT-EL-201',
    hsnCode: '850440',
    gstRate: 18,
    category: 'electronics',
    nameEn: '65W GaN Dual Type-C + USB Fast Wall Charger',
    nameHi: '65W GaN डुअल पोर्ट फास्ट वॉल चार्जर',
    descriptionEn: 'Next-gen Gallium Nitride (GaN) technology, PD 3.0 & PPS fast charging for laptops and smartphones. BIS certified with retail packaging.',
    descriptionHi: 'BIS प्रमाणित 65W GaN डुअल पोर्ट फास्ट चार्जर, ओवरहीट प्रोटेक्शन, हैंगिंग रिटेल बॉक्स पैकिंग सहित।',
    image: imgElectronics,
    unit: 'Pc',
    unitHi: 'पीस',
    cartonPackSize: 50,
    cartonUnit: '50 Pcs Carton',
    cartonUnitHi: '50 पीस मास्टर कार्टन',
    retailPrice: 1199,
    retailMoq: 1,
    wholesaleMoq: 20,
    wholesaleTiers: [
      { minQty: 20, maxQty: 99, pricePerUnit: 420, labelEn: '20 - 99 Pcs', labelHi: '20 - 99 पीस' },
      { minQty: 100, maxQty: 299, pricePerUnit: 360, labelEn: '100 - 299 Pcs', labelHi: '100 - 299 पीस' },
      { minQty: 300, pricePerUnit: 310, labelEn: '300+ Pcs (Direct Factory)', labelHi: '300+ पीस (फैक्ट्री रेट)' }
    ],
    stockQuantity: 5400,
    weightPerUnitKg: 0.14,
    featured: true
  },
  {
    id: 'prod-07',
    sku: 'SBT-EL-202',
    hsnCode: '854442',
    gstRate: 18,
    category: 'electronics',
    nameEn: 'Braided Heavy Duty 60W Type-C Cables (Jar of 50)',
    nameHi: 'ब्रेडेड हेवी ड्यूटी टाइप-C फास्ट केबल्स (50 पीस जार)',
    descriptionEn: '1.2m tangle-free nylon braided fast charging and data transfer cord. Packaged in transparent counter-display counter jars.',
    descriptionHi: '1.2 मीटर नायलॉन ब्रेडेड 60W फास्ट चार्जिंग केबल, काउंटर डिस्प्ले जार पैकिंग (50 पीस)। मोबाइल दुकानों का सबसे तेज बिकने वाला आइटम।',
    image: imgElectronics,
    unit: 'Jar',
    unitHi: 'जार (50 पीस)',
    cartonPackSize: 10,
    cartonUnit: '10 Jars (500 Pcs)',
    cartonUnitHi: '10 जार (500 पीस कार्टन)',
    retailPrice: 2499,
    retailMoq: 1,
    wholesaleMoq: 2,
    wholesaleTiers: [
      { minQty: 2, maxQty: 9, pricePerUnit: 1650, labelEn: '2 - 9 Jars (₹33/pc)', labelHi: '2 - 9 जार (₹33/पीस)' },
      { minQty: 10, maxQty: 24, pricePerUnit: 1450, labelEn: '10 - 24 Jars (₹29/pc)', labelHi: '10 - 24 जार (₹29/पीस)' },
      { minQty: 25, pricePerUnit: 1290, labelEn: '25+ Jars (₹25.8/pc)', labelHi: '25+ जार (₹25.8/पीस)' }
    ],
    stockQuantity: 840,
    weightPerUnitKg: 2.1,
    featured: false
  },
  {
    id: 'prod-08',
    sku: 'SBT-KT-301',
    hsnCode: '732393',
    gstRate: 12,
    category: 'kitchen',
    nameEn: 'Triply Stainless Steel Heavy Kadhai Set (2.5L & 3.5L)',
    nameHi: 'ट्राई-प्लाई स्टेनलेस स्टील हेवी कड़ाही सेट (लिड सहित)',
    descriptionEn: 'SAS technology 3-layer steel & aluminum core for even heat distribution. Induction and gas stove compatible. Cast steel riveted cool handles.',
    descriptionHi: '3-लेयर स्टेनलेस स्टील कड़ाही सेट, इंडक्शन व गैस कम्पैटिबल, 5 साल की वारंटी, आकर्षक गिफ्ट बॉक्स। बर्तन व्यापारियों के लिए।',
    image: imgWarehouse,
    unit: 'Set',
    unitHi: 'सेट',
    cartonPackSize: 8,
    cartonUnit: '8 Sets Carton',
    cartonUnitHi: '8 सेट कार्टन',
    retailPrice: 2250,
    retailMoq: 1,
    wholesaleMoq: 6,
    wholesaleTiers: [
      { minQty: 6, maxQty: 15, pricePerUnit: 1190, labelEn: '6 - 15 Sets', labelHi: '6 - 15 सेट' },
      { minQty: 16, maxQty: 39, pricePerUnit: 1050, labelEn: '16 - 39 Sets', labelHi: '16 - 39 सेट' },
      { minQty: 40, pricePerUnit: 940, labelEn: '40+ Sets (Wholesale Crates)', labelHi: '40+ सेट (थोक क्रेट)' }
    ],
    stockQuantity: 620,
    weightPerUnitKg: 2.4,
    featured: true
  }
];

export const CATEGORIES = [
  { id: 'all', labelEn: 'All Categories', labelHi: 'सभी श्रेणियां' },
  { id: 'spices', labelEn: 'Kirana & Dry Fruits', labelHi: 'किराना व मेवे' },
  { id: 'textiles', labelEn: 'Textiles & Garments', labelHi: 'कपड़ा व परिधान' },
  { id: 'electronics', labelEn: 'Electronics & Mobile Acc.', labelHi: 'इलेक्ट्रॉनिक्स व मोबाइल' },
  { id: 'kitchen', labelEn: 'Kitchen & Steelware', labelHi: 'किचन व स्टील सामग्री' }
];

export const COMPANY_INFO = {
  name: 'Shree Balaji Wholesale & Retail Traders',
  nameHi: 'श्री बालाजी ट्रेडर्स (थोक व खुदरा प्रतिष्ठान)',
  tagline: 'Direct Mandi & Factory Wholesale Supply Hub',
  taglineHi: 'सीधे फैक्ट्री एवं मंडी भाव - थोक व खुदरा व्यापार केंद्र',
  address: 'Shop No. 44-48, Wholesale Cloth & Grain Mandi, Phase-II, Commercial Hub',
  addressHi: 'दुकान नं. 44-48, थोक कपड़ा एवं अनाज मंडी, फेज-2, कमर्शियल हब',
  city: 'New Delhi - 110006',
  gstin: '07AAAAA2480B1Z8',
  pan: 'AAAAA2480B',
  phone: '+91 98765 43210',
  whatsapp: '+919876543210',
  email: 'orders@shreebalajitraders.in',
  bankName: 'State Bank of India (Current A/c)',
  accountNo: '389402910482',
  ifsc: 'SBIN0001245'
};
