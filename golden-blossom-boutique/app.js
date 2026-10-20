/**
 * ============================================================================
 * GOLDEN BLOSSOM BOUTIQUE • CASABLANCA
 * Complete E-Commerce Application & Luxury Shopping Experience
 * ============================================================================
 */

(function () {
  'use strict';

  // ==========================================================================
  // PRODUCT CATALOG DATABASE
  // ==========================================================================
  let PRODUCTS = [
    {
      id: 'prod-1',
      title: "Molten 'Lava' Drop Necklace",
      category: 'jewelry',
      materialType: 'vermeil',
      priceMAD: 890,
      originalPriceMAD: 1100,
      rating: 4.9,
      reviewCount: 142,
      badge: 'Bestseller',
      badgeClass: 'badge-gold',
      stockCount: 3,
      material: '18K Heavy Gold Vermeil (3 Microns) • Recycled 925 Silver',
      description: 'Our signature talisman. Hand-sculpted using lost-wax casting to evoke liquid molten lava cooling in the Mediterranean breeze. Water-resistant and crafted for daily wear.',
      specs: [
        'Length: 42cm + 5cm extension chain',
        'Pendant: 22mm x 14mm fluid form',
        'Finish: High-polish 18K Yellow Gold',
        'Hypoallergenic & 100% Nickel-free'
      ],
      sizes: ['Standard (45cm)', 'Long (50cm)'],
      img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      imgHover: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1611591475152-478311399767?auto=format&fit=crop&w=800&q=80'
      ],
      reviews: [
        { name: 'Kenza B.', city: 'Casablanca', rating: 5, text: 'The weight and luminous shine of this molten pendant are perfection. I shower with it daily and the gold vermeil hasn’t faded at all!' },
        { name: 'Sofia M.', city: 'Rabat', rating: 5, text: 'Ordered as an anniversary gift. The velvet box and wax seal made unboxing feel like a true high-jewelry experience.' }
      ]
    },
    {
      id: 'prod-2',
      title: 'Sculptural Molten Gold Hoops',
      category: 'jewelry',
      materialType: 'vermeil',
      priceMAD: 650,
      originalPriceMAD: null,
      rating: 5.0,
      reviewCount: 98,
      badge: 'Atelier Pick',
      badgeClass: 'badge-gold',
      stockCount: 5,
      material: '18K Gold Vermeil over 925 Sterling Silver',
      description: 'Substantial yet lightweight on the lobe. Featuring an organically textured silhouette that refracts light from every angle with understated elegance.',
      specs: [
        'Diameter: 26mm',
        'Weight: 4.8g per hoop (featherlight)',
        'Closure: Secure click latch',
        'Water-resistant for daily wear'
      ],
      sizes: ['22mm Petite', '26mm Classic', '32mm Bold'],
      img: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
      imgHover: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'
      ],
      reviews: [
        { name: 'Leila T.', city: 'Marrakech', rating: 5, text: 'I get asked about these hoops every single day in the office. They do not weigh down ears even after 10 hours.' },
        { name: 'Camille L.', city: 'Paris', rating: 5, text: 'Flawless organic finish. Moroccan craftsmanship with Parisian chic.' }
      ]
    },
    {
      id: 'prod-3',
      title: 'The Casablanca Signet Ring',
      category: 'jewelry',
      materialType: 'vermeil',
      priceMAD: 580,
      originalPriceMAD: 720,
      rating: 4.8,
      reviewCount: 76,
      badge: 'New Drop',
      badgeClass: 'badge-new',
      stockCount: 4,
      material: '18K Heavy Vermeil • Hand-Brushed Surface',
      description: 'A modern reimagining of the classic heirloom signet ring. Soft pillowed profile with an organically brushed face that catches sunlight effortlessly.',
      specs: [
        'Top surface: 14mm x 11mm oval',
        'Solid comfort-fit inner shank',
        'Anti-tarnish protective sealing',
        'Atelier stamped hallmark'
      ],
      sizes: ['EU 50 (US 5)', 'EU 52 (US 6)', 'EU 54 (US 7)', 'EU 56 (US 8)'],
      img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
      imgHover: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'
      ],
      reviews: [
        { name: 'Nisrine H.', city: 'Tangier', rating: 5, text: 'The size 52 fits like a dream on my pinky finger. Heavy, solid feel!' }
      ]
    },
    {
      id: 'prod-4',
      title: 'Baroque Pearl & Molten Link Bracelet',
      category: 'jewelry',
      materialType: 'pearl',
      priceMAD: 790,
      originalPriceMAD: null,
      rating: 4.9,
      reviewCount: 64,
      badge: 'Limited 18K',
      badgeClass: 'badge-limited',
      stockCount: 2,
      material: 'Natural AAA Freshwater Baroque Pearl • 18K Vermeil',
      description: 'Juxtaposing organic, luminous baroque pearls against textured molten links. Each freshwater pearl is completely unique, hand-selected in Casablanca.',
      specs: [
        'Length: 17cm + 3cm extension',
        'Pearl size: 10-12mm irregular baroque',
        'Custom cast toggle clasp',
        'Comes with luxury velvet case'
      ],
      sizes: ['Small (17cm)', 'Medium (19cm)'],
      img: 'https://images.unsplash.com/photo-1611591475152-478311399767?auto=format&fit=crop&w=800&q=80',
      imgHover: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1611591475152-478311399767?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'
      ],
      reviews: [
        { name: 'Ines K.', city: 'Casablanca', rating: 5, text: 'The pearl lustre is incredible. Looks like a bespoke high-end piece from Place Vendôme.' }
      ]
    },
    {
      id: 'prod-5',
      title: 'Fluid Molten Dome Ring',
      category: 'jewelry',
      materialType: 'vermeil',
      priceMAD: 520,
      originalPriceMAD: null,
      rating: 4.8,
      reviewCount: 88,
      badge: 'Bestseller',
      badgeClass: 'badge-gold',
      stockCount: 7,
      material: 'Recycled Silver plated with 18K Gold',
      description: 'A tactile, fluid dome ring that mirrors the motion of running water. Its hollow-carved interior ensures supreme comfort for everyday stacking.',
      specs: [
        'Dome height: 8mm',
        'Weight: 5.6g',
        'Mirror and satin contrast finish',
        'Designed to stack with thin bands'
      ],
      sizes: ['EU 50', 'EU 52', 'EU 54', 'EU 56'],
      img: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80',
      imgHover: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80'
      ],
      reviews: [
        { name: 'Fatima-Zahra', city: 'Fes', rating: 5, text: 'Smooth, tactile, and so comfortable. Never catches on knits or silk!' }
      ]
    },
    {
      id: 'prod-6',
      title: 'Layered Snake Chain & Pendant Set',
      category: 'jewelry',
      materialType: 'vermeil',
      priceMAD: 980,
      originalPriceMAD: 1250,
      rating: 5.0,
      reviewCount: 110,
      badge: 'Atelier Set',
      badgeClass: 'badge-gold',
      stockCount: 4,
      material: '18K Heavy Vermeil • Italian Herringbone & Molten Drop',
      description: 'The definitive Parisian-Moroccan neck stack. Includes our supple 3mm herringbone snake chain and an adjustable molten coin pendant necklace.',
      specs: [
        'Herringbone Chain: 40cm',
        'Pendant Chain: 48cm with 5cm extender',
        'Wear together or separately',
        'Anti-kink Italian craftsmanship'
      ],
      sizes: ['One Size (Dual Layer Set)'],
      img: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80',
      imgHover: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'
      ],
      reviews: [
        { name: 'Sara E.', city: 'Agadir', rating: 5, text: 'Two stunning necklaces for this price is unbeatable. The snake chain lies completely flat against the collarbone.' }
      ]
    },
    {
      id: 'prod-7',
      title: 'Champagne Silk Crepe Slip Dress',
      category: 'apparel',
      materialType: 'silk',
      priceMAD: 1450,
      originalPriceMAD: 1750,
      rating: 4.9,
      reviewCount: 94,
      badge: 'Iconic',
      badgeClass: 'badge-gold',
      stockCount: 3,
      material: '100% Mulberry Silk (22 Momme Sand-Washed)',
      description: 'Cut on the true bias to drape gently across contours. Designed with delicate rouleau straps, subtle cowl neckline, and a gentle floor-skimming hem.',
      specs: [
        'Fabric: 100% Grade 6A Mulberry Silk',
        'Care: Dry clean or cold hand wash with silk detergent',
        'Adjustable shoulder ties',
        'French seams throughout'
      ],
      sizes: ['XS (34)', 'S (36)', 'M (38)', 'L (40)'],
      img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
      imgHover: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80'
      ],
      reviews: [
        { name: 'Nour E.', city: 'Rabat', rating: 5, text: 'Hangs like liquid gold. The sand-washed silk has a luxurious matte sheen that does not cling.' }
      ]
    },
    {
      id: 'prod-8',
      title: 'Structured Ivory Linen Double-Breasted Blazer',
      category: 'apparel',
      materialType: 'silk',
      priceMAD: 1850,
      originalPriceMAD: null,
      rating: 5.0,
      reviewCount: 52,
      badge: 'New In',
      badgeClass: 'badge-new',
      stockCount: 4,
      material: '100% Heavyweight Normandy Linen • Viscose Lining',
      description: 'A masterclass in modern relaxed tailoring. Peak lapels, sustainable horn buttons, and an architectural shoulder that pairs effortlessly with silk or denim.',
      specs: [
        'Fit: Relaxed oversized silhouette',
        'Pockets: Twin jetted flap pockets & interior chest welt',
        'Buttons: Real sustainable horn buttons',
        'Vent: Dual back vents'
      ],
      sizes: ['S (36)', 'M (38)', 'L (40)'],
      img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      imgHover: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80'
      ],
      reviews: [
        { name: 'Meriem B.', city: 'Casablanca', rating: 5, text: 'The cut of this blazer gives instant posture. Quality easily rivals luxury European designers.' }
      ]
    },
    {
      id: 'prod-9',
      title: 'Pleated Wide-Leg Crepe Trousers',
      category: 'apparel',
      materialType: 'silk',
      priceMAD: 950,
      originalPriceMAD: null,
      rating: 4.8,
      reviewCount: 47,
      badge: null,
      stockCount: 6,
      material: 'Italian Viscose Wool-Crepe Blend',
      description: 'High-waisted with deep front pleats that create fluid drape in motion. Tailored for elevated day-to-night styling.',
      specs: [
        'Rise: High-rise waist with tailored waistband',
        'Inseam: 82cm with 4cm let-out hem',
        'Pockets: Deep side slant pockets',
        'Closure: Concealed hook and zip fly'
      ],
      sizes: ['XS (34)', 'S (36)', 'M (38)', 'L (40)'],
      img: 'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=800&q=80',
      imgHover: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80'
      ],
      reviews: [
        { name: 'Yasmine K.', city: 'Marrakech', rating: 5, text: 'Elongates the silhouette beautifully. Crepe doesn’t wrinkle during long flights.' }
      ]
    },
    {
      id: 'prod-10',
      title: 'Ribbed Cashmere & Silk Knit Top',
      category: 'apparel',
      materialType: 'cashmere',
      priceMAD: 1150,
      originalPriceMAD: 1390,
      rating: 4.9,
      reviewCount: 68,
      badge: 'Seasonal',
      badgeClass: 'badge-gold',
      stockCount: 3,
      material: '70% Mongolian Cashmere • 30% Mulberry Silk',
      description: 'Featherlight softness designed to fit like a second skin. Open ballet neckline with finely ribbed cuffs and hem.',
      specs: [
        'Gauge: 16-gauge ultra-fine knit',
        'Texture: Whisper-soft and breathable',
        'Neckline: Boatneck / ballet neckline',
        'Pill-resistant fibers'
      ],
      sizes: ['XS/S', 'M/L'],
      img: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80',
      imgHover: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80'
      ],
      reviews: [
        { name: 'Ghita A.', city: 'Casablanca', rating: 5, text: 'Pure cloud on skin. Perfect under the ivory blazer.' }
      ]
    },
    {
      id: 'prod-11',
      title: 'Casablanca Sunset Silk Resort Kimono',
      category: 'apparel',
      materialType: 'silk',
      priceMAD: 1650,
      originalPriceMAD: null,
      rating: 5.0,
      reviewCount: 39,
      badge: 'Limited Run',
      badgeClass: 'badge-limited',
      stockCount: 2,
      material: 'Pure Habotai Silk • Hand-Rolled Edges',
      description: 'An ethereal wrap piece created for sunset soirees and lounge luxury. Hand-printed with warm ochre and terracotta motifs inspired by the Moroccan coast.',
      specs: [
        'Length: Maxi ankle-length (135cm)',
        'Belt: Detachable silk sash belt with fringe',
        'Sleeves: Wide kimono kimono drape',
        'Dry clean only'
      ],
      sizes: ['One Size (Fluid Drape)'],
      img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80',
      imgHover: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
      ],
      reviews: [
        { name: 'Salma D.', city: 'Tangier', rating: 5, text: 'Wore this to a rooftop gathering in Tangier. The silk moves like poetry.' }
      ]
    },
    {
      id: 'prod-12',
      title: 'The Anfa Sculptural Leather Bucket Bag',
      category: 'accessories',
      materialType: 'leather',
      priceMAD: 1890,
      originalPriceMAD: 2200,
      rating: 4.9,
      reviewCount: 83,
      badge: 'Bestseller',
      badgeClass: 'badge-gold',
      stockCount: 4,
      material: 'Full-Grain Italian Calfskin Leather • Gold Hardware',
      description: 'An architectural bucket bag handcrafted by artisan leatherworkers. Rigid oval base, cinch drawstring closure, and detachable crossbody strap.',
      specs: [
        'Dimensions: 22cm x 18cm x 14cm',
        'Strap Drop: 48cm - 56cm adjustable',
        'Lining: Luxurious bonded suede interior',
        'Includes dust bag & leather balm'
      ],
      sizes: ['Caramel Cuir', 'Noir Black', 'Oat Milk'],
      img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      imgHover: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80'
      ],
      reviews: [
        { name: 'Kawtar B.', city: 'Casablanca', rating: 5, text: 'The calfskin smells wonderful and the gold hardware has real substance.' }
      ]
    },
    {
      id: 'prod-13',
      title: 'Minimalist Baguette Shoulder Bag in Noir',
      category: 'accessories',
      materialType: 'leather',
      priceMAD: 1420,
      originalPriceMAD: null,
      rating: 4.8,
      reviewCount: 65,
      badge: 'New In',
      badgeClass: 'badge-new',
      stockCount: 5,
      material: 'Smooth Semi-Gloss Calf Leather',
      description: '90s minimalist silhouette refined with discrete gold foil branding and a comfortable flat shoulder strap. The everyday companion.',
      specs: [
        'Dimensions: 27cm x 13cm x 6cm',
        'Interior: Card slot and zip compartment',
        'Closure: Smooth magnetic flap',
        'Hardware: Brushed champagne gold'
      ],
      sizes: ['Classic Noir', 'Burgundy Merlot'],
      img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
      imgHover: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'
      ],
      reviews: [
        { name: 'Rim M.', city: 'Rabat', rating: 5, text: 'Holds phone, lipstick, cardholder, and keys with room to spare.' }
      ]
    },
    {
      id: 'prod-14',
      title: 'Artisanal Hand-Stitched Leather Ankle Boots',
      category: 'accessories',
      materialType: 'leather',
      priceMAD: 2100,
      originalPriceMAD: 2500,
      rating: 5.0,
      reviewCount: 72,
      badge: 'Atelier Boots',
      badgeClass: 'badge-gold',
      stockCount: 3,
      material: 'Vegetable-Tanned Calfskin • Leather Sole with Rubber Inset',
      description: 'The boots you wear for ten years. Soft calfskin that molds to your stride, chisel toe profile, and a stacked 50mm heel built for walking.',
      specs: [
        'Heel Height: 50mm stacked Cuban heel',
        'Construction: Blake-stitched durable sole',
        'Zipper: Interior antique brass zip',
        'Hand-buffed natural wax patina'
      ],
      sizes: ['EU 36', 'EU 37', 'EU 38', 'EU 39', 'EU 40', 'EU 41'],
      img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
      imgHover: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=800&q=80'
      ],
      reviews: [
        { name: 'Kenza S.', city: 'Casablanca', rating: 5, text: 'Walked all day through Gauthier and Triangle d’Or with zero blisters. Worth every dirham.' }
      ]
    },
    {
      id: 'prod-15',
      title: 'Woven Nappa Leather Envelope Clutch',
      category: 'accessories',
      materialType: 'leather',
      priceMAD: 1180,
      originalPriceMAD: null,
      rating: 4.7,
      reviewCount: 41,
      badge: null,
      stockCount: 6,
      material: 'Hand-Woven Lamb Nappa Leather',
      description: 'Plush, pillowy woven leather that folds comfortably under the arm. Fitted with a concealed zip and magnetic clasp for evening effortless charm.',
      specs: [
        'Dimensions: 30cm x 18cm',
        'Structure: Soft foldable slouch',
        'Interior: 100% Cotton drill lining',
        'Includes wristlet strap'
      ],
      sizes: ['Gold Champagne', 'Obsidian Black', 'Espresso'],
      img: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80',
      imgHover: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'
      ],
      reviews: [
        { name: 'Dounia F.', city: 'Marrakech', rating: 5, text: 'Buttery soft woven leather. Looks breathtaking paired with the silk dress.' }
      ]
    },
    {
      id: 'prod-16',
      title: 'Minimal Strappy Block-Heel Leather Mules',
      category: 'accessories',
      materialType: 'leather',
      priceMAD: 1350,
      originalPriceMAD: 1600,
      rating: 4.9,
      reviewCount: 58,
      badge: 'Limited',
      badgeClass: 'badge-limited',
      stockCount: 4,
      material: 'Nappa Kidskin • Cushioned Leather Insole',
      description: 'Delicate asymmetric straps that flatter the foot while providing sturdy arch support. Finished with a sculptural block kitten heel.',
      specs: [
        'Heel Height: 45mm comfortable kitten block',
        'Footbed: Memory foam cushioned padding',
        'Upper: Butter-soft kidskin straps',
        'Made for warm Moroccan nights'
      ],
      sizes: ['EU 36', 'EU 37', 'EU 38', 'EU 39', 'EU 40'],
      img: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=800&q=80',
      imgHover: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80'
      ],
      reviews: [
        { name: 'Soraya C.', city: 'Casablanca', rating: 5, text: 'The 45mm heel is the sweet spot. Elegant without being painful!' }
      ]
    }
  ];

  // ==========================================================================
  // MULTI-CHAPTER LOOKBOOK CAPSULES
  // ==========================================================================
  const LOOKBOOK_CHAPTERS = [
    {
      title: "Chapter 01: Casablanca Dusk",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=85",
      quote: "True luxury doesn’t shout. It announces itself through tactile richness, sculpted weight, and a quiet confidence that transcends seasons.",
      cite: "— Golden Blossom Style Director, Casablanca",
      itemIds: ['prod-1', 'prod-7', 'prod-12'],
      hotspots: [
        { top: '28%', left: '49%', prodId: 'prod-1', dotLabel: '1' },
        { top: '50%', left: '52%', prodId: 'prod-7', dotLabel: '2' },
        { top: '72%', left: '38%', prodId: 'prod-12', dotLabel: '3' }
      ]
    },
    {
      title: "Chapter 02: Triangle d'Or Tailoring",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=85",
      quote: "Sharp architectural linen softened by liquid 18-karat molten vermeil. The uniform of modern North African cosmopolitan grace.",
      cite: "— Atelier Master Tailor, Triangle d'Or",
      itemIds: ['prod-8', 'prod-9', 'prod-2'],
      hotspots: [
        { top: '24%', left: '50%', prodId: 'prod-2', dotLabel: '1' },
        { top: '44%', left: '46%', prodId: 'prod-8', dotLabel: '2' },
        { top: '78%', left: '52%', prodId: 'prod-9', dotLabel: '3' }
      ]
    },
    {
      title: "Chapter 03: Atlantic Sunset",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1600&q=85",
      quote: "Sun-drenched habotai silk that catches the ocean breeze, grounded by organic baroque pearls and sculptured nappa mules.",
      cite: "— Golden Blossom Resort Edit",
      itemIds: ['prod-11', 'prod-4', 'prod-16'],
      hotspots: [
        { top: '38%', left: '48%', prodId: 'prod-11', dotLabel: '1' },
        { top: '60%', left: '35%', prodId: 'prod-4', dotLabel: '2' },
        { top: '85%', left: '55%', prodId: 'prod-16', dotLabel: '3' }
      ]
    }
  ];

  // ==========================================================================
  // CURRENCIES & COUPONS
  // ==========================================================================
  const CURRENCY_RATES = {
    MAD: { rate: 1.0, symbol: 'MAD', pos: 'after' },
    EUR: { rate: 0.095, symbol: '€', pos: 'before' },
    USD: { rate: 0.10, symbol: '$', pos: 'before' },
    GBP: { rate: 0.082, symbol: '£', pos: 'before' }
  };

  const COUPONS = {
    'GOLDEN10': 0.10,
    'BLOSSOM20': 0.20,
    'CASABLANCA': 0.15
  };

  const CONFIG = {
    freeShippingThresholdMAD: 500
  };

  let WHATSAPP_PHONE = '212780760188';
  let WHATSAPP_DISPLAY = '+212 780-760188';

  // ==========================================================================
  // APPLICATION STATE
  // ==========================================================================
  const STATE = {
    currency: localStorage.getItem('gbb_currency') || 'MAD',
    cart: JSON.parse(localStorage.getItem('gbb_cart') || '[]'),
    wishlist: JSON.parse(localStorage.getItem('gbb_wishlist') || '[]'),
    activeFilter: 'all',
    priceFilter: 'all',
    searchQuery: '',
    sortBy: 'featured',
    gridLayout: localStorage.getItem('gbb_grid_layout') || 'cols-4',
    activeLookIndex: 0,
    appliedCoupon: localStorage.getItem('gbb_coupon') || null,
    giftWrapSelected: JSON.parse(localStorage.getItem('gbb_gift_wrap') || 'true'),
    giftNote: localStorage.getItem('gbb_gift_note') || '',
    audioEnabled: JSON.parse(localStorage.getItem('gbb_audio_enabled') || 'true'),
    orderBumpSelected: false
  };

  function saveState() {
    localStorage.setItem('gbb_currency', STATE.currency);
    localStorage.setItem('gbb_cart', JSON.stringify(STATE.cart));
    localStorage.setItem('gbb_wishlist', JSON.stringify(STATE.wishlist));
    localStorage.setItem('gbb_coupon', STATE.appliedCoupon || '');
    localStorage.setItem('gbb_gift_wrap', JSON.stringify(STATE.giftWrapSelected));
    localStorage.setItem('gbb_gift_note', STATE.giftNote);
    localStorage.setItem('gbb_audio_enabled', JSON.stringify(STATE.audioEnabled));
    localStorage.setItem('gbb_grid_layout', STATE.gridLayout);
  }

  // ==========================================================================
  // AUDIO SYNTHESIZER (LUXURY HAPTIC CHIME VIA WEB AUDIO API)
  // ==========================================================================
  let audioCtx = null;
  function playLuxuryChime() {
    if (!STATE.audioEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!audioCtx) audioCtx = new AudioContext();

      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const now = audioCtx.currentTime;

      // Two harmonic bell tones
      [880, 1318.5].forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0.001, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.12, now + i * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.5);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.55);
      });
    } catch (e) {
      // Audio not permitted or supported; continue silently
    }
  }

  // Currency Converter Formatter
  function formatMoney(amountMAD) {
    const config = CURRENCY_RATES[STATE.currency] || CURRENCY_RATES.MAD;
    const converted = amountMAD * config.rate;
    const formattedNum = converted.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });

    return config.pos === 'before'
      ? `${config.symbol}${formattedNum}`
      : `${formattedNum} ${config.symbol}`;
  }

  // ==========================================================================
  // DOM SELECTORS
  // ==========================================================================
  const DOM = {
    // Header & Currency
    siteHeader: document.getElementById('siteHeader'),
    announcementSlider: document.getElementById('announcementSlider'),
    currencySelect: document.getElementById('currencySelect'),
    mobileCurrencySelect: document.getElementById('mobileCurrencySelect'),
    audioToggleBtn: document.getElementById('audioToggleBtn'),
    audioIcon: document.getElementById('audioIcon'),

    // Catalog controls
    productGrid: document.getElementById('productGrid'),
    catalogEmptyState: document.getElementById('catalogEmptyState'),
    resetCatalogFiltersBtn: document.getElementById('resetCatalogFiltersBtn'),
    filterTabs: document.querySelectorAll('.filter-tab'),
    catalogSearchInput: document.getElementById('catalogSearchInput'),
    catalogSortSelect: document.getElementById('catalogSortSelect'),
    catalogPriceSelect: document.getElementById('catalogPriceSelect'),
    activeFilterChips: document.getElementById('activeFilterChips'),
    btnViewGrid4: document.getElementById('btnViewGrid4'),
    btnViewGrid2: document.getElementById('btnViewGrid2'),

    // Counts
    countAll: document.getElementById('countAll'),
    countJewelry: document.getElementById('countJewelry'),
    countApparel: document.getElementById('countApparel'),
    countAccessories: document.getElementById('countAccessories'),
    wishlistCountBadge: document.getElementById('wishlistCount'),
    cartCountBadge: document.getElementById('cartCount'),
    cartHeaderTotal: document.getElementById('cartHeaderTotal'),

    // Cart Drawer
    cartDrawer: document.getElementById('cartDrawer'),
    cartOverlay: document.getElementById('cartOverlay'),
    cartTriggerBtn: document.getElementById('cartTriggerBtn'),
    closeCartBtn: document.getElementById('closeCartBtn'),
    cartItemsList: document.getElementById('cartItemsList'),
    cartEmptyState: document.getElementById('cartEmptyState'),
    cartDrawerCount: document.getElementById('cartDrawerCount'),
    cartSubtotal: document.getElementById('cartSubtotal'),
    cartDiscountRow: document.getElementById('cartDiscountRow'),
    cartDiscountAmount: document.getElementById('cartDiscountAmount'),
    cartShippingCost: document.getElementById('cartShippingCost'),
    cartGrandTotal: document.getElementById('cartGrandTotal'),
    shippingProgressFill: document.getElementById('shippingProgressFill'),
    freeShippingText: document.getElementById('freeShippingText'),
    cartCouponInput: document.getElementById('cartCouponInput'),
    btnApplyCoupon: document.getElementById('btnApplyCoupon'),
    appliedCouponTag: document.getElementById('appliedCouponTag'),
    appliedCouponName: document.getElementById('appliedCouponName'),
    btnRemoveCoupon: document.getElementById('btnRemoveCoupon'),
    giftWrapCheckbox: document.getElementById('giftWrapCheckbox'),
    cartGiftNoteInput: document.getElementById('cartGiftNoteInput'),
    cartCrossSell: document.getElementById('cartCrossSell'),
    cartCrossSellItems: document.getElementById('cartCrossSellItems'),
    btnProceedCheckout: document.getElementById('btnProceedCheckout'),
    btnOrderViaWhatsApp: document.getElementById('btnOrderViaWhatsApp'),
    btnContinueShopping: document.getElementById('btnContinueShopping'),

    // Wishlist Drawer
    wishlistDrawer: document.getElementById('wishlistDrawer'),
    wishlistOverlay: document.getElementById('wishlistOverlay'),
    wishlistTriggerBtn: document.getElementById('wishlistTriggerBtn'),
    closeWishlistBtn: document.getElementById('closeWishlistBtn'),
    wishlistItemsList: document.getElementById('wishlistItemsList'),
    wishlistEmptyState: document.getElementById('wishlistEmptyState'),
    wishlistDrawerCount: document.getElementById('wishlistDrawerCount'),
    btnMoveAllToCart: document.getElementById('btnMoveAllToCart'),

    // Lookbook
    lookbookMainImg: document.getElementById('lookbookMainImg'),
    lookbookHotspots: document.getElementById('lookbookHotspots'),
    lookbookQuoteText: document.getElementById('lookbookQuoteText'),
    lookbookQuoteCite: document.getElementById('lookbookQuoteCite'),
    lookbookItemsWrap: document.getElementById('lookbookItemsWrap'),
    btnAddFullLookToCart: document.getElementById('btnAddFullLookToCart'),
    lookbookTabs: document.querySelectorAll('.lookbook-tab'),

    // Quick View Modal
    quickViewModal: document.getElementById('quickViewModal'),
    quickViewBackdrop: document.getElementById('quickViewBackdrop'),
    quickViewContent: document.getElementById('quickViewContent'),
    closeQuickViewBtn: document.getElementById('closeQuickViewBtn'),

    // Size Guide Modal
    sizeGuideModal: document.getElementById('sizeGuideModal'),
    sizeGuideBackdrop: document.getElementById('sizeGuideBackdrop'),
    closeSizeGuideBtn: document.getElementById('closeSizeGuideBtn'),
    btnCloseSizeGuideModal: document.getElementById('btnCloseSizeGuideModal'),
    sizeGuideTabs: document.querySelectorAll('.size-guide-tab'),
    navOpenSizeGuideBtn: document.getElementById('navOpenSizeGuideBtn'),
    mobileSizeGuideBtn: document.getElementById('mobileSizeGuideBtn'),
    footerOpenSizeGuideBtn: document.getElementById('footerOpenSizeGuideBtn'),
    faqSizeGuideTrigger: document.getElementById('faqSizeGuideTrigger'),
    btnOpenSpotlightSizeGuide: document.getElementById('btnOpenSpotlightSizeGuide'),

    // Care Guide Modal
    btnOpenCareGuide: document.getElementById('btnOpenCareGuide'),
    careGuideModal: document.getElementById('careGuideModal'),
    careGuideBackdrop: document.getElementById('careGuideBackdrop'),
    closeCareGuideBtn: document.getElementById('closeCareGuideBtn'),
    btnCloseCareGuideModal: document.getElementById('btnCloseCareGuideModal'),

    // Search Modal
    searchModalOverlay: document.getElementById('searchModalOverlay'),
    searchTriggerBtn: document.getElementById('searchTriggerBtn'),
    closeSearchModalBtn: document.getElementById('closeSearchModalBtn'),
    liveSearchInput: document.getElementById('liveSearchInput'),
    clearSearchBtn: document.getElementById('clearSearchBtn'),
    searchResultsContainer: document.getElementById('searchResultsContainer'),

    // Checkout Modal
    checkoutModalOverlay: document.getElementById('checkoutModalOverlay'),
    closeCheckoutBtn: document.getElementById('closeCheckoutBtn'),
    btnCancelCheckout: document.getElementById('btnCancelCheckout'),
    checkoutForm: document.getElementById('checkoutForm'),
    checkoutStep1: document.getElementById('checkoutStep1'),
    checkoutStep2: document.getElementById('checkoutStep2'),
    checkoutStep3: document.getElementById('checkoutStep3'),
    stepIndicator1: document.getElementById('stepIndicator1'),
    stepIndicator2: document.getElementById('stepIndicator2'),
    stepIndicator3: document.getElementById('stepIndicator3'),
    btnGoToStep2: document.getElementById('btnGoToStep2'),
    btnBackToStep1: document.getElementById('btnBackToStep1'),
    checkoutRecapItemsList: document.getElementById('checkoutRecapItemsList'),
    toggleRecapItems: document.getElementById('toggleRecapItems'),
    orderBumpCheckbox: document.getElementById('orderBumpCheckbox'),
    recapBumpRow: document.getElementById('recapBumpRow'),
    recapBumpPrice: document.getElementById('recapBumpPrice'),
    recapSubtotal: document.getElementById('recapSubtotal'),
    recapDiscountRow: document.getElementById('recapDiscountRow'),
    recapDiscount: document.getElementById('recapDiscount'),
    recapShipping: document.getElementById('recapShipping'),
    recapTotal: document.getElementById('recapTotal'),
    orderConfirmId: document.getElementById('orderConfirmId'),
    orderConfirmName: document.getElementById('orderConfirmName'),
    orderConfirmCity: document.getElementById('orderConfirmCity'),
    orderConfirmPayment: document.getElementById('orderConfirmPayment'),
    orderConfirmGiftNoteRow: document.getElementById('orderConfirmGiftNoteRow'),
    orderConfirmGiftNote: document.getElementById('orderConfirmGiftNote'),
    orderConfirmTotal: document.getElementById('orderConfirmTotal'),
    btnTrackViaWhatsApp: document.getElementById('btnTrackViaWhatsApp'),
    btnAutoSendWhatsApp: document.getElementById('btnAutoSendWhatsApp'),
    btnCopyOrderTicket: document.getElementById('btnCopyOrderTicket'),
    whatsappDispatchCard: document.getElementById('whatsappDispatchCard'),
    btnDoneShopping: document.getElementById('btnDoneShopping'),

    // Mobile Navigation & Bottom Bar
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    mobileDrawer: document.getElementById('mobileDrawer'),
    mobileDrawerOverlay: document.getElementById('mobileDrawerOverlay'),
    closeMobileDrawerBtn: document.getElementById('closeMobileDrawerBtn'),
    mobileSearchTrigger: document.getElementById('mobileSearchTrigger'),
    mobileWishlistTrigger: document.getElementById('mobileWishlistTrigger'),
    mobileCartTrigger: document.getElementById('mobileCartTrigger'),
    mobileWishlistBadge: document.getElementById('mobileWishlistBadge'),
    mobileCartBadge: document.getElementById('mobileCartBadge'),

    // Newsletter & Toast
    newsletterForm: document.getElementById('newsletterForm'),
    newsletterEmailInput: document.getElementById('newsletterEmailInput'),
    newsletterSuccess: document.getElementById('newsletterSuccess'),
    toastContainer: document.getElementById('toastContainer')
  };

  // ==========================================================================
  // TOAST NOTIFICATIONS
  // ==========================================================================
  function showToast(message, icon = '✨') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span style="font-size: 1.1rem;">${icon}</span> <span>${message}</span>`;
    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.35s ease';
      setTimeout(() => toast.remove(), 350);
    }, 3200);
  }

  // ==========================================================================
  // RENDER CATALOG WITH ACTIVE FILTERS & SORTING
  // ==========================================================================
  function renderCatalog() {
    let filtered = PRODUCTS.filter(item => {
      // Category filter
      if (STATE.activeFilter === 'bestseller') {
        if (item.badge !== 'Bestseller' && item.rating < 4.9) return false;
      } else if (STATE.activeFilter === 'sale') {
        if (!item.originalPriceMAD) return false;
      } else if (STATE.activeFilter !== 'all') {
        if (item.category !== STATE.activeFilter) return false;
      }

      // Price Filter
      if (STATE.priceFilter === 'under800' && item.priceMAD >= 800) return false;
      if (STATE.priceFilter === '800to1500' && (item.priceMAD < 800 || item.priceMAD > 1500)) return false;
      if (STATE.priceFilter === 'over1500' && item.priceMAD <= 1500) return false;

      // Search Query
      if (STATE.searchQuery.trim() !== '') {
        const query = STATE.searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchMat = item.material.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchCat = item.category.toLowerCase().includes(query);
        if (!matchTitle && !matchMat && !matchDesc && !matchCat) return false;
      }

      return true;
    });

    // Sorting
    if (STATE.sortBy === 'price-asc') {
      filtered.sort((a, b) => a.priceMAD - b.priceMAD);
    } else if (STATE.sortBy === 'price-desc') {
      filtered.sort((a, b) => b.priceMAD - a.priceMAD);
    } else if (STATE.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (STATE.sortBy === 'newest') {
      filtered.sort((a, b) => (b.badge === 'New Drop' || b.badge === 'New In' ? 1 : -1));
    }

    renderActiveFilterChips();

    // Empty State Check
    if (filtered.length === 0) {
      DOM.productGrid.innerHTML = '';
      DOM.catalogEmptyState.style.display = 'block';
      return;
    }

    DOM.catalogEmptyState.style.display = 'none';
    DOM.productGrid.className = `product-grid ${STATE.gridLayout}`;

    DOM.productGrid.innerHTML = filtered.map(item => {
      const isWishlisted = STATE.wishlist.includes(item.id);
      const originalPriceHtml = item.originalPriceMAD 
        ? `<span class="product-original-price">${formatMoney(item.originalPriceMAD)}</span>` 
        : '';
      const badgeHtml = item.badge 
        ? `<span class="product-badge ${item.badgeClass || 'badge-gold'}">${item.badge}</span>` 
        : '';
      const urgencyHtml = (item.stockCount && item.stockCount <= 4)
        ? `<span class="badge-urgency">⚡ Only ${item.stockCount} left</span>`
        : '';

      const hasMultipleSizes = item.sizes && item.sizes.length > 1;

      // Popover for size options on quick add
      const sizePopoverPills = hasMultipleSizes
        ? item.sizes.map(s => `<button type="button" class="popover-pill" data-quickpick-id="${item.id}" data-quickpick-size="${s}">${s}</button>`).join('')
        : '';

      const sizePopoverHtml = hasMultipleSizes ? `
        <div class="product-size-popover" id="popover-${item.id}">
          <span class="popover-title">Select Size:</span>
          <div class="popover-pills">
            ${sizePopoverPills}
          </div>
        </div>
      ` : '';

      return `
        <article class="product-card" data-id="${item.id}">
          <div class="product-media">
            <div class="product-badge-group">
              ${badgeHtml}
              ${urgencyHtml}
            </div>

            <button class="product-wishlist-btn ${isWishlisted ? 'active' : ''}" 
                    data-wishlist-id="${item.id}" 
                    aria-label="${isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>

            <img src="${item.img}" alt="${item.title}" class="product-img-main" loading="lazy">
            <img src="${item.imgHover || item.img}" alt="${item.title} styled" class="product-img-hover" loading="lazy">

            <div class="product-quick-actions">
              <button type="button" class="btn-quick-view" data-quickview-id="${item.id}">Quick View</button>
              <div style="position: relative; flex: 1; display: flex;">
                ${sizePopoverHtml}
                <button type="button" class="btn-quick-add" data-quickadd-id="${item.id}" data-has-sizes="${hasMultipleSizes ? 'true' : 'false'}">+ Bag</button>
              </div>
            </div>
          </div>

          <div class="product-info">
            <span class="product-category-tag">${item.category.toUpperCase()}</span>
            <h3 class="product-title" data-quickview-id="${item.id}">${item.title}</h3>
            <p class="product-material">${item.material}</p>
            
            <div class="product-footer-row">
              <div class="product-price-wrap">
                <span class="product-price">${formatMoney(item.priceMAD)}</span>
                ${originalPriceHtml}
              </div>
              <div class="product-rating" title="${item.rating} out of 5 stars (${item.reviewCount} verified reviews)">
                <span>★</span>
                <span>${item.rating}</span>
                <span style="font-size: 0.65rem; color: var(--text-light);">(${item.reviewCount})</span>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // Active filter chips UI
  function renderActiveFilterChips() {
    const chips = [];

    if (STATE.activeFilter !== 'all') {
      const labels = {
        jewelry: 'Jewelry',
        apparel: 'Apparel',
        accessories: 'Bags & Boots',
        bestseller: 'Bestsellers',
        sale: 'Curated Offers'
      };
      chips.push(`<span class="filter-chip">${labels[STATE.activeFilter] || STATE.activeFilter} <button type="button" data-clear-chip="category">&times;</button></span>`);
    }

    if (STATE.priceFilter !== 'all') {
      const priceLabels = {
        under800: 'Under 800 MAD',
        '800to1500': '800 - 1500 MAD',
        over1500: 'Over 1500 MAD'
      };
      chips.push(`<span class="filter-chip">Price: ${priceLabels[STATE.priceFilter]} <button type="button" data-clear-chip="price">&times;</button></span>`);
    }

    if (STATE.searchQuery.trim() !== '') {
      chips.push(`<span class="filter-chip">"${STATE.searchQuery}" <button type="button" data-clear-chip="search">&times;</button></span>`);
    }

    if (chips.length > 0) {
      chips.push(`<span class="clear-all-chips" id="clearAllFiltersBtn">Clear All Filters</span>`);
      DOM.activeFilterChips.innerHTML = chips.join('');
      DOM.activeFilterChips.style.display = 'flex';
    } else {
      DOM.activeFilterChips.innerHTML = '';
      DOM.activeFilterChips.style.display = 'none';
    }
  }

  // Update Category Badge Counts
  function updateCategoryCounts() {
    DOM.countAll.textContent = PRODUCTS.length;
    DOM.countJewelry.textContent = PRODUCTS.filter(p => p.category === 'jewelry').length;
    DOM.countApparel.textContent = PRODUCTS.filter(p => p.category === 'apparel').length;
    DOM.countAccessories.textContent = PRODUCTS.filter(p => p.category === 'accessories').length;
  }

  // ==========================================================================
  // SHOPPING CART DRAWER SYSTEM
  // ==========================================================================
  function addToCart(productId, size = null, qty = 1) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const chosenSize = size || (product.sizes && product.sizes[0] ? product.sizes[0] : 'Standard');
    const existingIndex = STATE.cart.findIndex(item => item.id === productId && item.size === chosenSize);

    if (existingIndex > -1) {
      STATE.cart[existingIndex].qty += qty;
    } else {
      STATE.cart.push({
        id: product.id,
        title: product.title,
        priceMAD: product.priceMAD,
        img: product.img,
        size: chosenSize,
        category: product.category,
        qty: qty
      });
    }

    saveState();
    updateCartUI();
    playLuxuryChime();
    openCartDrawer();
    showToast(`Added "${product.title}" (${chosenSize}) to your bag!`, '🛍️');
  }

  function removeFromCart(productId, size) {
    STATE.cart = STATE.cart.filter(item => !(item.id === productId && item.size === size));
    saveState();
    updateCartUI();
    showToast('Item removed from shopping bag', '🗑️');
  }

  function changeCartQty(productId, size, delta) {
    const item = STATE.cart.find(i => i.id === productId && i.size === size);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(productId, size);
      return;
    }

    saveState();
    updateCartUI();
  }

  function calculateCartTotals() {
    let rawSubtotalMAD = STATE.cart.reduce((sum, item) => sum + (item.priceMAD * item.qty), 0);
    
    // If order bump (polishing cloth) selected
    if (STATE.orderBumpSelected) {
      rawSubtotalMAD += 60;
    }

    let discountMAD = 0;
    if (STATE.appliedCoupon && COUPONS[STATE.appliedCoupon]) {
      discountMAD = rawSubtotalMAD * COUPONS[STATE.appliedCoupon];
    }

    // Free shipping threshold
    const freeShippingThresholdMAD = CONFIG.freeShippingThresholdMAD || 500;
    const shippingMAD = (rawSubtotalMAD >= freeShippingThresholdMAD || rawSubtotalMAD === 0) ? 0 : 35;
    const grandTotalMAD = Math.max(0, rawSubtotalMAD - discountMAD + shippingMAD);

    return {
      rawSubtotalMAD,
      discountMAD,
      shippingMAD,
      grandTotalMAD,
      freeShippingThresholdMAD
    };
  }

  function updateCartUI() {
    const totalItems = STATE.cart.reduce((sum, item) => sum + item.qty, 0);
    const totals = calculateCartTotals();

    // Badges & Header
    DOM.cartCountBadge.textContent = totalItems;
    DOM.mobileCartBadge.textContent = totalItems;
    DOM.cartDrawerCount.textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`;
    DOM.cartHeaderTotal.textContent = formatMoney(totals.grandTotalMAD);

    // Free Shipping Progress
    if (totals.rawSubtotalMAD === 0) {
      DOM.shippingProgressFill.style.width = '0%';
      DOM.freeShippingText.innerHTML = `Add <strong>${formatMoney(totals.freeShippingThresholdMAD)}</strong> for <strong>FREE EXPRESS SHIPPING</strong> in Morocco!`;
    } else if (totals.rawSubtotalMAD >= totals.freeShippingThresholdMAD) {
      DOM.shippingProgressFill.style.width = '100%';
      DOM.freeShippingText.innerHTML = `✨ <strong>MABROUK!</strong> You unlocked <strong>FREE EXPRESS SHIPPING</strong> across Morocco!`;
    } else {
      const remainingMAD = totals.freeShippingThresholdMAD - totals.rawSubtotalMAD;
      const progressPercent = Math.min(100, Math.round((totals.rawSubtotalMAD / totals.freeShippingThresholdMAD) * 100));
      DOM.shippingProgressFill.style.width = `${progressPercent}%`;
      DOM.freeShippingText.innerHTML = `Add <strong>${formatMoney(remainingMAD)}</strong> more for <strong>FREE EXPRESS SHIPPING</strong>!`;
    }

    // Empty State Check
    if (STATE.cart.length === 0) {
      DOM.cartItemsList.innerHTML = '';
      DOM.cartEmptyState.style.display = 'flex';
      DOM.cartCrossSell.style.display = 'none';
      DOM.cartSubtotal.textContent = formatMoney(0);
      DOM.cartGrandTotal.textContent = formatMoney(0);
      DOM.cartShippingCost.textContent = 'FREE';
      DOM.cartDiscountRow.style.display = 'none';
      return;
    }

    DOM.cartEmptyState.style.display = 'none';
    DOM.cartCrossSell.style.display = 'block';

    DOM.cartItemsList.innerHTML = STATE.cart.map(item => `
      <div class="cart-item-row" data-id="${item.id}" data-size="${item.size}">
        <img src="${item.img}" alt="${item.title}" class="cart-item-img">
        <div class="cart-item-details">
          <div class="cart-item-top">
            <div>
              <h4 class="cart-item-title">${item.title}</h4>
              <p class="cart-item-attr">Option: <strong>${item.size}</strong></p>
            </div>
            <button type="button" class="btn-remove-item" data-remove-id="${item.id}" data-remove-size="${item.size}" aria-label="Remove item">&times;</button>
          </div>
          
          <div class="cart-item-bottom">
            <div class="qty-stepper">
              <button type="button" class="qty-btn" data-qty-delta="-1" data-id="${item.id}" data-size="${item.size}">-</button>
              <span class="qty-val">${item.qty}</span>
              <button type="button" class="qty-btn" data-qty-delta="1" data-id="${item.id}" data-size="${item.size}">+</button>
            </div>
            <span class="cart-item-price">${formatMoney(item.priceMAD * item.qty)}</span>
          </div>
        </div>
      </div>
    `).join('');

    // Render Cross-Sell complementary pieces
    const cartItemIds = STATE.cart.map(i => i.id);
    const crossSellPool = PRODUCTS.filter(p => !cartItemIds.includes(p.id)).slice(0, 3);
    DOM.cartCrossSellItems.innerHTML = crossSellPool.map(p => `
      <div class="cross-sell-card">
        <img src="${p.img}" alt="${p.title}">
        <div class="cross-sell-info">
          <strong>${p.title}</strong>
          <span>${formatMoney(p.priceMAD)}</span>
        </div>
        <button type="button" class="btn-cross-sell-add" data-cross-sell-add="${p.id}">+ Add</button>
      </div>
    `).join('');

    // Summary lines
    DOM.cartSubtotal.textContent = formatMoney(totals.rawSubtotalMAD);
    DOM.cartShippingCost.textContent = totals.shippingMAD === 0 ? 'FREE' : formatMoney(totals.shippingMAD);
    DOM.cartGrandTotal.textContent = formatMoney(totals.grandTotalMAD);

    if (totals.discountMAD > 0) {
      DOM.cartDiscountRow.style.display = 'flex';
      DOM.cartDiscountAmount.textContent = `-${formatMoney(totals.discountMAD)}`;
      DOM.appliedCouponTag.style.display = 'flex';
      DOM.appliedCouponName.textContent = STATE.appliedCoupon;
    } else {
      DOM.cartDiscountRow.style.display = 'none';
      DOM.appliedCouponTag.style.display = 'none';
    }

    DOM.giftWrapCheckbox.checked = STATE.giftWrapSelected;
    if (DOM.cartGiftNoteInput) {
      DOM.cartGiftNoteInput.value = STATE.giftNote;
    }
  }

  function openCartDrawer() {
    DOM.cartDrawer.classList.add('active');
    DOM.cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    DOM.cartDrawer.classList.remove('active');
    DOM.cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ==========================================================================
  // WISHLIST SYSTEM
  // ==========================================================================
  function toggleWishlist(productId) {
    const index = STATE.wishlist.indexOf(productId);
    const product = PRODUCTS.find(p => p.id === productId);

    if (index > -1) {
      STATE.wishlist.splice(index, 1);
      showToast(`Removed from saved pieces`, '🤍');
    } else {
      STATE.wishlist.push(productId);
      showToast(`Saved "${product ? product.title : 'piece'}" to favorites!`, '❤️');
    }

    saveState();
    updateWishlistUI();
    renderCatalog();
  }

  function updateWishlistUI() {
    DOM.wishlistCountBadge.textContent = STATE.wishlist.length;
    DOM.mobileWishlistBadge.textContent = STATE.wishlist.length;
    DOM.wishlistDrawerCount.textContent = `${STATE.wishlist.length} saved`;

    if (STATE.wishlist.length === 0) {
      DOM.wishlistItemsList.innerHTML = '';
      DOM.wishlistEmptyState.style.display = 'flex';
      DOM.btnMoveAllToCart.style.display = 'none';
      return;
    }

    DOM.wishlistEmptyState.style.display = 'none';
    DOM.btnMoveAllToCart.style.display = 'block';

    const savedProducts = PRODUCTS.filter(p => STATE.wishlist.includes(p.id));
    DOM.wishlistItemsList.innerHTML = savedProducts.map(item => `
      <div class="wishlist-item-row" data-id="${item.id}">
        <img src="${item.img}" alt="${item.title}" class="wishlist-item-img">
        <div class="cart-item-details">
          <div class="cart-item-top">
            <div>
              <h4 class="cart-item-title">${item.title}</h4>
              <p class="cart-item-attr">${item.material}</p>
            </div>
            <button type="button" class="btn-remove-item" data-wishlist-remove="${item.id}" aria-label="Remove">&times;</button>
          </div>
          
          <div class="cart-item-bottom">
            <span class="cart-item-price">${formatMoney(item.priceMAD)}</span>
            <button type="button" class="btn btn-sm btn-primary" data-wishlist-move="${item.id}">Add to Bag</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function openWishlistDrawer() {
    updateWishlistUI();
    DOM.wishlistDrawer.classList.add('active');
    DOM.wishlistOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeWishlistDrawer() {
    DOM.wishlistDrawer.classList.remove('active');
    DOM.wishlistOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ==========================================================================
  // MULTI-CHAPTER LOOKBOOK RENDERER
  // ==========================================================================
  function renderLookbook(chapterIndex = 0) {
    STATE.activeLookIndex = chapterIndex;
    const chapter = LOOKBOOK_CHAPTERS[chapterIndex];
    if (!chapter) return;

    // Update active tab button
    DOM.lookbookTabs.forEach((tab, idx) => {
      tab.classList.toggle('active', idx === chapterIndex);
    });

    // Update image with soft fade
    DOM.lookbookMainImg.style.opacity = '0.3';
    setTimeout(() => {
      DOM.lookbookMainImg.src = chapter.image;
      DOM.lookbookMainImg.alt = chapter.title;
      DOM.lookbookMainImg.style.opacity = '1';
    }, 180);

    // Update quote & citation
    DOM.lookbookQuoteText.textContent = `"${chapter.quote}"`;
    DOM.lookbookQuoteCite.textContent = chapter.cite;

    // Render Hotspot Pins
    DOM.lookbookHotspots.innerHTML = chapter.hotspots.map(h => {
      const prod = PRODUCTS.find(p => p.id === h.prodId);
      if (!prod) return '';
      return `
        <div class="hotspot-pin" style="top: ${h.top}; left: ${h.left};" data-product-id="${prod.id}">
          <span class="hotspot-pulse"></span>
          <span class="hotspot-dot">${h.dotLabel}</span>
          <div class="hotspot-card">
            <img src="${prod.img}" alt="${prod.title}">
            <div class="hotspot-info">
              <strong>${prod.title}</strong>
              <span class="price">${formatMoney(prod.priceMAD)}</span>
              <button type="button" class="btn-hotspot-add" data-add-id="${prod.id}">+ Bag</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Render Outfit Items in Sidebar
    const outfitProducts = PRODUCTS.filter(p => chapter.itemIds.includes(p.id));
    DOM.lookbookItemsWrap.innerHTML = outfitProducts.map(p => `
      <div class="lookbook-mini-item" data-product-id="${p.id}">
        <img src="${p.img}" alt="${p.title}">
        <div class="mini-meta">
          <span class="item-name">${p.title}</span>
          <span class="item-mat">${p.material}</span>
          <span class="item-price">${formatMoney(p.priceMAD)}</span>
        </div>
        <button type="button" class="btn btn-sm btn-outline quick-add-trigger" data-id="${p.id}">+ Bag</button>
      </div>
    `).join('');
  }

  // ==========================================================================
  // QUICK VIEW PRODUCT MODAL (WITH MULTI-IMAGE GALLERY & TABS)
  // ==========================================================================
  function openQuickView(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    let selectedQty = 1;
    const galleryImages = product.gallery || [product.img, product.imgHover || product.img];

    const originalPriceHtml = product.originalPriceMAD 
      ? `<span class="product-original-price" style="font-size: 1.15rem;">${formatMoney(product.originalPriceMAD)}</span>` 
      : '';

    const sizeOptionsHtml = product.sizes ? product.sizes.map((s, idx) => `
      <button type="button" class="size-pill ${idx === 0 ? 'active' : ''}" data-size-value="${s}">${s}</button>
    `).join('') : '<button type="button" class="size-pill active" data-size-value="Standard">Standard</button>';

    const specsHtml = product.specs.map(spec => `<div>• ${spec}</div>`).join('');

    const reviewsHtml = (product.reviews && product.reviews.length > 0)
      ? product.reviews.map(r => `
          <div class="qv-review-item">
            <div class="qv-review-author">
              <span>${r.name} (${r.city})</span>
              <span style="color: var(--gold-primary);">★★★★★</span>
            </div>
            <p style="font-size: 0.8125rem; margin-top: 0.2rem; font-style: italic;">"${r.text}"</p>
          </div>
        `).join('')
      : '<p>Verified reviews from our Casablanca atelier patrons.</p>';

    const thumbsHtml = galleryImages.map((imgSrc, idx) => `
      <div class="qv-thumb ${idx === 0 ? 'active' : ''}" data-gallery-src="${imgSrc}">
        <img src="${imgSrc}" alt="${product.title}">
      </div>
    `).join('');

    DOM.quickViewContent.innerHTML = `
      <div class="qv-gallery-col">
        <div class="qv-media">
          <img src="${galleryImages[0]}" alt="${product.title}" id="qvMainImg">
        </div>
        <div class="qv-gallery-strip">
          ${thumbsHtml}
        </div>
      </div>

      <div class="qv-content">
        <span class="qv-tag">${product.category.toUpperCase()} • ATELIER CASABLANCA</span>
        <h2 class="qv-title" id="qvTitle">${product.title}</h2>
        
        <div class="qv-price-row">
          <span class="qv-price" id="qvDisplayPrice">${formatMoney(product.priceMAD)}</span>
          ${originalPriceHtml}
          <div class="product-rating" style="margin-left: 0.75rem;">
            <span>★</span>
            <span>${product.rating}</span>
            <span style="font-size: 0.75rem; color: var(--text-light);">(${product.reviewCount} verified reviews)</span>
          </div>
        </div>

        <p class="qv-desc">${product.description}</p>

        <div class="qv-options-box">
          <div class="qv-option-header">
            <span class="qv-option-label">Option / Sizing:</span>
            <button type="button" class="btn-text-link qv-size-guide-btn" id="btnQvOpenSizeGuide">📐 Sizing Guide & Measurements</button>
          </div>
          <div class="qv-size-selector" id="qvSizeSelector">
            ${sizeOptionsHtml}
          </div>
        </div>

        <div class="qv-qty-row">
          <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">Quantity:</span>
          <div class="qty-stepper">
            <button type="button" class="qty-btn" id="btnQvQtyMinus">-</button>
            <span class="qty-val" id="qvQtyVal">1</span>
            <button type="button" class="qty-btn" id="btnQvQtyPlus">+</button>
          </div>
          <span style="font-size: 0.75rem; color: #10B981; font-weight: 600;">✓ In Stock for 24h Express Dispatch</span>
        </div>

        <div class="qv-actions">
          <button type="button" class="btn btn-primary" id="btnQvAddToCart" style="flex: 2;">
            Add To Bag • <span id="qvBtnTotal">${formatMoney(product.priceMAD)}</span>
          </button>
          <button type="button" class="btn btn-outline" id="btnQvWishlist" style="flex: 1;">
            ${STATE.wishlist.includes(product.id) ? 'Saved ❤️' : 'Save 🤍'}
          </button>
        </div>

        <!-- Specifications & Reviews Tabs -->
        <div class="qv-tabs" role="tablist">
          <button type="button" class="qv-tab-btn active" data-qv-tab="specs">Craftsmanship</button>
          <button type="button" class="qv-tab-btn" data-qv-tab="shipping">Morocco Delivery</button>
          <button type="button" class="qv-tab-btn" data-qv-tab="reviews">Client Reviews (${product.reviewCount})</button>
        </div>

        <div class="qv-tab-pane active" id="qvTabSpecs">
          ${specsHtml}
          <div style="margin-top: 0.5rem; font-size: 0.75rem; color: var(--gold-dark); font-weight: 600;">
            100% Recycled 925 Sterling Silver base with 3-micron heavy 18K gold layer.
          </div>
        </div>

        <div class="qv-tab-pane" id="qvTabShipping">
          <p><strong>Casablanca:</strong> Same-day or 24h courier delivery.</p>
          <p><strong>Nationwide Morocco:</strong> 24h to 48h (Rabat, Marrakech, Tangier, Agadir, Fes).</p>
          <p><strong>Payment:</strong> Cash on Delivery (Paiement à la livraison) or Card.</p>
        </div>

        <div class="qv-tab-pane" id="qvTabReviews">
          ${reviewsHtml}
        </div>
      </div>
    `;

    DOM.quickViewModal.classList.add('active');
    DOM.quickViewBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Hook thumbnail gallery switcher
    const mainImg = document.getElementById('qvMainImg');
    const thumbs = DOM.quickViewContent.querySelectorAll('.qv-thumb');
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        mainImg.src = thumb.getAttribute('data-gallery-src');
      });
    });

    // Hook size selector
    const sizePills = DOM.quickViewContent.querySelectorAll('.size-pill');
    sizePills.forEach(pill => {
      pill.addEventListener('click', () => {
        sizePills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
      });
    });

    // Quantity adjuster in Quick View
    const qvQtyVal = document.getElementById('qvQtyVal');
    const qvBtnTotal = document.getElementById('qvBtnTotal');
    const btnQvQtyMinus = document.getElementById('btnQvQtyMinus');
    const btnQvQtyPlus = document.getElementById('btnQvQtyPlus');

    const updateQvTotal = () => {
      qvQtyVal.textContent = selectedQty;
      qvBtnTotal.textContent = formatMoney(product.priceMAD * selectedQty);
    };

    btnQvQtyMinus.addEventListener('click', () => {
      if (selectedQty > 1) {
        selectedQty--;
        updateQvTotal();
      }
    });

    btnQvQtyPlus.addEventListener('click', () => {
      selectedQty++;
      updateQvTotal();
    });

    // Add to cart from Quick View
    const qvAddBtn = document.getElementById('btnQvAddToCart');
    if (qvAddBtn) {
      qvAddBtn.addEventListener('click', () => {
        const activeSizePill = DOM.quickViewContent.querySelector('.size-pill.active');
        const chosenSize = activeSizePill ? activeSizePill.getAttribute('data-size-value') : 'Standard';
        addToCart(product.id, chosenSize, selectedQty);
        closeQuickView();
      });
    }

    // Toggle Wishlist from Quick View
    const qvWishBtn = document.getElementById('btnQvWishlist');
    if (qvWishBtn) {
      qvWishBtn.addEventListener('click', () => {
        toggleWishlist(product.id);
        qvWishBtn.textContent = STATE.wishlist.includes(product.id) ? 'Saved ❤️' : 'Save 🤍';
      });
    }

    // Open Size Guide from Quick View
    const btnQvOpenSizeGuide = document.getElementById('btnQvOpenSizeGuide');
    if (btnQvOpenSizeGuide) {
      btnQvOpenSizeGuide.addEventListener('click', () => {
        openSizeGuideModal(product.category === 'jewelry' ? 'tabRings' : 'tabApparel');
      });
    }

    // Quick View Tab switching
    const tabBtns = DOM.quickViewContent.querySelectorAll('.qv-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.getAttribute('data-qv-tab');
        document.getElementById('qvTabSpecs').classList.toggle('active', target === 'specs');
        document.getElementById('qvTabShipping').classList.toggle('active', target === 'shipping');
        document.getElementById('qvTabReviews').classList.toggle('active', target === 'reviews');
      });
    });
  }

  function closeQuickView() {
    DOM.quickViewModal.classList.remove('active');
    DOM.quickViewBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ==========================================================================
  // SIZE GUIDE MODAL
  // ==========================================================================
  function openSizeGuideModal(defaultTabId = 'tabRings') {
    DOM.sizeGuideModal.classList.add('active');
    DOM.sizeGuideBackdrop.classList.add('active');

    // Switch tab
    DOM.sizeGuideTabs.forEach(t => {
      const isMatch = t.getAttribute('data-tab-target') === defaultTabId;
      t.classList.toggle('active', isMatch);
    });

    ['tabRings', 'tabApparel', 'tabShoes'].forEach(id => {
      const pane = document.getElementById(id);
      if (pane) pane.classList.toggle('active', id === defaultTabId);
    });
  }

  function closeSizeGuideModal() {
    DOM.sizeGuideModal.classList.remove('active');
    DOM.sizeGuideBackdrop.classList.remove('active');
  }

  // ==========================================================================
  // FULL-SCREEN LIVE SEARCH
  // ==========================================================================
  function openSearchModal() {
    DOM.searchModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    DOM.liveSearchInput.value = '';
    DOM.liveSearchInput.focus();
    renderSearchResults('');
  }

  function closeSearchModal() {
    DOM.searchModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function renderSearchResults(query) {
    const cleanQuery = query.toLowerCase().trim();
    let matches = PRODUCTS;

    if (cleanQuery !== '') {
      matches = PRODUCTS.filter(p => 
        p.title.toLowerCase().includes(cleanQuery) ||
        p.material.toLowerCase().includes(cleanQuery) ||
        p.category.toLowerCase().includes(cleanQuery) ||
        p.description.toLowerCase().includes(cleanQuery)
      );
    }

    if (matches.length === 0) {
      DOM.searchResultsContainer.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; color: rgba(255,255,255,0.7); padding: 3rem 0;">
          <p>No boutique pieces found matching "<strong>${query}</strong>".</p>
          <p style="font-size: 0.85rem; margin-top: 0.5rem; color: var(--gold-light);">Try searching for: Lava, Hoops, Silk, Leather, Ring</p>
        </div>
      `;
      return;
    }

    DOM.searchResultsContainer.innerHTML = matches.slice(0, 6).map(item => `
      <div class="product-card" style="background: var(--bg-dark-surface); border-color: rgba(255,255,255,0.1); color: #fff;">
        <div class="product-media" style="height: 220px;">
          <img src="${item.img}" alt="${item.title}" class="product-img-main">
          <div class="product-quick-actions">
            <button type="button" class="btn-quick-view" data-quickview-id="${item.id}">View</button>
            <button type="button" class="btn-quick-add" data-quickadd-id="${item.id}">+ Bag</button>
          </div>
        </div>
        <div class="product-info" style="padding: 1rem;">
          <span class="product-category-tag" style="color: var(--gold-light);">${item.category.toUpperCase()}</span>
          <h4 class="product-title" style="color: #fff; font-size: 1.05rem;" data-quickview-id="${item.id}">${item.title}</h4>
          <span class="product-price" style="color: var(--gold-light); margin-top: 0.5rem;">${formatMoney(item.priceMAD)}</span>
        </div>
      </div>
    `).join('');
  }

  // ==========================================================================
  // CHECKOUT WIZARD & WHATSAPP ORDER GENERATOR
  // ==========================================================================
  function openCheckoutWizard() {
    if (STATE.cart.length === 0) {
      showToast('Please add items to your shopping bag first', '⚠️');
      return;
    }

    closeCartDrawer();
    DOM.checkoutModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    goToCheckoutStep(1);
  }

  function closeCheckoutWizard() {
    DOM.checkoutModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function goToCheckoutStep(stepNumber) {
    DOM.checkoutStep1.style.display = 'none';
    DOM.checkoutStep2.style.display = 'none';
    DOM.checkoutStep3.style.display = 'none';

    DOM.stepIndicator1.classList.remove('active');
    DOM.stepIndicator2.classList.remove('active');
    DOM.stepIndicator3.classList.remove('active');

    if (stepNumber === 1) {
      DOM.checkoutStep1.style.display = 'block';
      DOM.stepIndicator1.classList.add('active');
    } else if (stepNumber === 2) {
      DOM.checkoutStep2.style.display = 'block';
      DOM.stepIndicator2.classList.add('active');
      updateCheckoutRecap();
    } else if (stepNumber === 3) {
      DOM.checkoutStep3.style.display = 'block';
      DOM.stepIndicator3.classList.add('active');
      triggerOrderConfetti();
    }
  }

  function updateCheckoutRecap() {
    const totals = calculateCartTotals();

    // Render items preview
    DOM.checkoutRecapItemsList.innerHTML = STATE.cart.map(item => `
      <div class="recap-preview-item">
        <div style="display: flex; align-items: center; gap: 0.65rem;">
          <img src="${item.img}" alt="${item.title}" class="recap-preview-thumb">
          <div>
            <strong style="color: var(--text-main); font-size: 0.825rem;">${item.title}</strong>
            <div style="font-size: 0.725rem; color: var(--text-muted);">Size: ${item.size} • Qty: ${item.qty}</div>
          </div>
        </div>
        <span style="font-weight: 700; color: var(--text-main);">${formatMoney(item.priceMAD * item.qty)}</span>
      </div>
    `).join('');

    DOM.recapSubtotal.textContent = formatMoney(totals.rawSubtotalMAD);
    DOM.recapShipping.textContent = totals.shippingMAD === 0 ? 'FREE' : formatMoney(totals.shippingMAD);
    DOM.recapTotal.textContent = formatMoney(totals.grandTotalMAD);

    // Bump row
    if (STATE.orderBumpSelected) {
      DOM.recapBumpRow.style.display = 'flex';
      DOM.recapBumpPrice.textContent = `+${formatMoney(60)}`;
    } else {
      DOM.recapBumpRow.style.display = 'none';
    }

    if (totals.discountMAD > 0) {
      DOM.recapDiscountRow.style.display = 'flex';
      DOM.recapDiscount.textContent = `-${formatMoney(totals.discountMAD)} (${STATE.appliedCoupon})`;
    } else {
      DOM.recapDiscountRow.style.display = 'none';
    }
  }

  // Generate WhatsApp Order Message
  function generateWhatsAppOrderUrl() {
    const totals = calculateCartTotals();
    if (STATE.cart.length === 0) {
      return `https://wa.me/${WHATSAPP_PHONE}?text=Hello%20Golden%20Blossom%20Boutique!%20I%20would%20like%20to%20place%20an%20order.`;
    }

    let msg = `✨ *NEW ORDER — GOLDEN BLOSSOM BOUTIQUE CASABLANCA*\n\n`;
    msg += `Bonjour! I would like to place an order for the following pieces:\n\n`;

    STATE.cart.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.title}*\n`;
      msg += `   • Option/Size: ${item.size}\n`;
      msg += `   • Quantity: ${item.qty}\n`;
      msg += `   • Price: ${item.priceMAD * item.qty} MAD\n\n`;
    });

    if (STATE.orderBumpSelected) {
      msg += `✨ *Add-on:* Microfiber Jewelry Polishing Cloth (+60 MAD)\n`;
    }

    if (STATE.appliedCoupon) {
      msg += `🏷️ *Promo Code:* ${STATE.appliedCoupon} (-${totals.discountMAD} MAD)\n`;
    }

    if (STATE.giftWrapSelected) {
      msg += `🎁 *Gift Packaging:* Complimentary Signature Velvet Pouch & Box\n`;
    }

    if (STATE.giftNote && STATE.giftNote.trim() !== '') {
      msg += `💌 *Personal Gift Card Note:* "${STATE.giftNote.trim()}"\n`;
    }

    msg += `📦 *Delivery in Morocco:* ${totals.shippingMAD === 0 ? 'FREE' : '35 MAD'}\n`;
    msg += `💰 *TOTAL AMOUNT:* ${totals.grandTotalMAD} MAD\n`;
    msg += `💳 *Payment:* Cash on Delivery (Paiement à la livraison)\n\n`;
    msg += `Thank you! Please confirm courier dispatch to Morocco.`;

    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
  }

  // Complete Order & Automatic WhatsApp Dispatch
  function completeOrder(e) {
    e.preventDefault();

    const firstName = document.getElementById('checkoutFirstName').value.trim();
    const lastName = document.getElementById('checkoutLastName').value.trim();
    const city = document.getElementById('checkoutCity').value;
    const phone = document.getElementById('checkoutPhone').value.trim();
    const email = document.getElementById('checkoutEmail')?.value?.trim() || '';
    const address = document.getElementById('checkoutAddress')?.value?.trim() || '';
    const notes = document.getElementById('checkoutNotes')?.value?.trim() || '';
    const selectedPaymentInput = document.querySelector('input[name="paymentMethod"]:checked');
    const selectedPayment = selectedPaymentInput ? selectedPaymentInput.value : 'cod';

    const totals = calculateCartTotals();
    const orderNum = 'GBB-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);

    // Populate confirmation screen
    DOM.orderConfirmId.textContent = `#${orderNum}`;
    DOM.orderConfirmName.textContent = `${firstName} ${lastName} (${phone})`;
    DOM.orderConfirmCity.textContent = `${city} (Express Courier)`;
    // Determine readable payment method label
    let paymentLabel = 'Paiement à la Livraison (Cash on Delivery)';
    if (selectedPayment === 'card') {
      const cardNum = document.getElementById('cardNumberInput')?.value?.replace(/\s/g, '') || '';
      const last4 = cardNum.length >= 4 ? cardNum.slice(-4) : '4242';
      const isVisa = cardNum.startsWith('4');
      paymentLabel = `${isVisa ? 'Visa' : 'Mastercard'} (•••• ${last4}) • 3D-Secure`;
    } else if (selectedPayment === 'applepay') {
      paymentLabel = 'Apple Pay (Biometric Authorization)';
    } else if (selectedPayment === 'googlepay') {
      paymentLabel = 'Google Pay (GPay 1-Click)';
    }

    DOM.orderConfirmPayment.textContent = paymentLabel;

    // Build rich, formatted WhatsApp invoice message for the boutique atelier
    const now = new Date();
    const formattedDate = now.toLocaleDateString('fr-FR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });

    let msg = `🛍️ *NOUVELLE COMMANDE EN LIGNE — GOLDEN BLOSSOM BOUTIQUE*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `📦 *COMMANDE:* #${orderNum}\n`;
    msg += `📅 *Date:* ${formattedDate}\n\n`;

    msg += `👤 *INFORMATIONS DU CLIENT:*\n`;
    msg += `• Nom: ${firstName} ${lastName}\n`;
    msg += `• Téléphone / WhatsApp: ${phone}\n`;
    if (email) msg += `• Email: ${email}\n`;
    msg += `• Ville de livraison: ${city}\n`;
    if (address) msg += `• Adresse de livraison: ${address}\n`;
    if (notes) msg += `• Instructions coursier: ${notes}\n`;

    msg += `\n💎 *ARTICLES COMMANDÉS:*\n`;
    STATE.cart.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.title}*\n`;
      msg += `   • Taille / Option: ${item.size}\n`;
      msg += `   • Quantité: ${item.qty}\n`;
      msg += `   • Prix: ${item.priceMAD * item.qty} MAD\n`;
    });

    if (STATE.orderBumpSelected) {
      msg += `\n✨ *Supplément:* Chiffon de polissage microfibre or 18K (+60 MAD)\n`;
    }

    if (STATE.appliedCoupon) {
      msg += `🏷️ *Code Promo:* ${STATE.appliedCoupon} (-${totals.discountMAD} MAD)\n`;
    }

    if (STATE.giftWrapSelected) {
      msg += `🎁 *Écrin Cadeau:* Pochette Velours Signature offerte\n`;
    }

    if (STATE.giftNote && STATE.giftNote.trim() !== '') {
      msg += `💌 *Mot personnalisé:* "${STATE.giftNote.trim()}"\n`;
    }

    msg += `\n🚚 *Livraison Maroc:* ${totals.shippingMAD === 0 ? 'GRATUITE' : '35 MAD'}\n`;
    msg += `💰 *TOTAL À RÉGLER:* ${totals.grandTotalMAD} MAD\n`;
    msg += `💳 *Mode de règlement:* ${paymentLabel}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `⚡ *Notification automatique générée par le système.*`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;

    // 1. AUTONOMOUS SERVER TRANSMISSION: The system itself sends the WhatsApp message to +212 780-760188
    fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: '#' + orderNum,
        customer: { firstName, lastName, phone, email, address, city, notes },
        items: STATE.cart.map(i => ({ id: i.id, title: i.title, size: i.size, qty: i.qty, priceMAD: i.priceMAD })),
        totals: totals,
        paymentMethod: paymentLabel,
        giftNote: STATE.giftNote,
        whatsappMessage: msg,
        whatsappUrl: whatsappUrl
      })
    }).then(res => res.json()).then(data => {
      console.log('✅ Automated WhatsApp notification transmitted autonomously by system:', data);
    }).catch(err => console.log('Order API notification error:', err));

    // 3. Connect confirmation screen action buttons
    if (DOM.btnAutoSendWhatsApp) {
      DOM.btnAutoSendWhatsApp.href = whatsappUrl;
    }

    if (DOM.btnCopyOrderTicket) {
      DOM.btnCopyOrderTicket.onclick = () => {
        navigator.clipboard.writeText(msg).then(() => {
          showToast('Bon de commande copié dans le presse-papier !', '📋');
        }).catch(() => {
          showToast('Sélectionnez et copiez le texte de commande', 'ℹ️');
        });
      };
    }

    // Clear cart & state
    STATE.cart = [];
    STATE.orderBumpSelected = false;
    saveState();
    updateCartUI();

    goToCheckoutStep(3);
    playLuxuryChime();
    triggerOrderConfetti();
    showToast(`Commande reçue ! Transmise à WhatsApp (+212 780-760188)`, '🎉');
  }

  // Confetti Animation Effect
  function triggerOrderConfetti() {
    const colors = ['#C5A059', '#E5C378', '#9E7734', '#121110', '#FFFFFF'];
    for (let i = 0; i < 45; i++) {
      const conf = document.createElement('div');
      conf.style.position = 'fixed';
      conf.style.zIndex = '9999';
      conf.style.top = '-10px';
      conf.style.left = Math.random() * 100 + 'vw';
      conf.style.width = Math.random() * 8 + 4 + 'px';
      conf.style.height = Math.random() * 12 + 6 + 'px';
      conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      conf.style.opacity = Math.random() + 0.5;
      conf.style.transform = `rotate(${Math.random() * 360}deg)`;
      conf.style.transition = `all ${Math.random() * 2 + 1.5}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
      document.body.appendChild(conf);

      setTimeout(() => {
        conf.style.top = '100vh';
        conf.style.transform = `rotate(${Math.random() * 720}deg)`;
        conf.style.opacity = '0';
      }, 50);

      setTimeout(() => conf.remove(), 3500);
    }
  }

  // ==========================================================================
  // PAYMENT METHODS CONTROLLER (VISA / CARD / APPLE PAY / GOOGLE PAY / COD)
  // ==========================================================================
  function initPaymentMethods() {
    const paymentRadioCards = document.querySelectorAll('.payment-method-card');
    const panelCard = document.getElementById('panelCardDetails');
    const panelApple = document.getElementById('panelApplePay');
    const panelGoogle = document.getElementById('panelGooglePay');
    const panelCod = document.getElementById('panelCod');

    function switchPaymentPanel(val) {
      if (panelCard) panelCard.style.display = val === 'card' ? 'block' : 'none';
      if (panelApple) panelApple.style.display = val === 'applepay' ? 'block' : 'none';
      if (panelGoogle) panelGoogle.style.display = val === 'googlepay' ? 'block' : 'none';
      if (panelCod) panelCod.style.display = val === 'cod' ? 'block' : 'none';
    }

    paymentRadioCards.forEach(card => {
      card.addEventListener('click', () => {
        paymentRadioCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const radio = card.querySelector('input[type="radio"]');
        if (radio) {
          radio.checked = true;
          switchPaymentPanel(radio.value);
        }
      });
    });

    // Visual Credit Card Synchronizer
    const numInput = document.getElementById('cardNumberInput');
    const holderInput = document.getElementById('cardHolderInput');
    const expInput = document.getElementById('cardExpiryInput');
    const displayNum = document.getElementById('cardDisplayNumber');
    const displayName = document.getElementById('cardDisplayName');
    const displayExp = document.getElementById('cardDisplayExpiry');
    const brandLogo = document.getElementById('cardBrandLogo');
    const inputIndicator = document.getElementById('inputCardIndicator');

    if (numInput && displayNum) {
      numInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '').substring(0, 16);
        let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
        e.target.value = formatted;

        // Masked preview
        let masked = formatted;
        if (val.length < 16) {
          const dots = '•••• •••• •••• ••••'.slice(formatted.length);
          masked = formatted + dots;
        }
        displayNum.textContent = masked || '•••• •••• •••• ••••';

        // Detect Card Type
        if (val.startsWith('4')) {
          brandLogo.textContent = 'VISA';
          if (inputIndicator) inputIndicator.textContent = '💳 Visa';
        } else if (val.startsWith('5') || val.startsWith('2')) {
          brandLogo.textContent = 'MC';
          if (inputIndicator) inputIndicator.textContent = '💳 Mastercard';
        } else {
          brandLogo.textContent = 'CARD';
          if (inputIndicator) inputIndicator.textContent = '💳';
        }
      });
    }

    if (holderInput && displayName) {
      holderInput.addEventListener('input', (e) => {
        displayName.textContent = e.target.value.toUpperCase() || 'KENZA BENNANI';
      });
    }

    if (expInput && displayExp) {
      expInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '').substring(0, 4);
        if (val.length >= 2) {
          val = val.substring(0, 2) + ' / ' + val.substring(2);
        }
        e.target.value = val;
        displayExp.textContent = val || '12 / 28';
      });
    }

    // Apple Pay Action Button
    const btnApple = document.getElementById('btnApplePayTrigger');
    if (btnApple) {
      btnApple.addEventListener('click', () => {
        btnApple.disabled = true;
        btnApple.innerHTML = `<span class="loading-spinner"></span> <span>Authenticating Apple Pay with Face ID...</span>`;
        setTimeout(() => {
          btnApple.innerHTML = `<span>✓ Apple Pay Authorized</span>`;
          playLuxuryChime();
          const form = document.getElementById('checkoutForm');
          if (form) form.dispatchEvent(new Event('submit', { cancelable: true }));
        }, 1200);
      });
    }

    // Google Pay Action Button
    const btnGoogle = document.getElementById('btnGooglePayTrigger');
    if (btnGoogle) {
      btnGoogle.addEventListener('click', () => {
        btnGoogle.disabled = true;
        btnGoogle.innerHTML = `<span class="loading-spinner"></span> <span>Connecting Google Wallet...</span>`;
        setTimeout(() => {
          btnGoogle.innerHTML = `<span>✓ Google Pay Approved</span>`;
          playLuxuryChime();
          const form = document.getElementById('checkoutForm');
          if (form) form.dispatchEvent(new Event('submit', { cancelable: true }));
        }, 1200);
      });
    }
  }

  // ==========================================================================
  // EVENT LISTENERS & WIRING
  // ==========================================================================
  function initEventListeners() {
    
    // Header Scroll effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        DOM.siteHeader.classList.add('scrolled');
      } else {
        DOM.siteHeader.classList.remove('scrolled');
      }
    });

    // Top Announcement Slider Auto-rotation
    let currentAnnounce = 0;
    const announceItems = DOM.announcementSlider.querySelectorAll('.announcement-item');
    if (announceItems.length > 1) {
      setInterval(() => {
        announceItems[currentAnnounce].classList.remove('active');
        currentAnnounce = (currentAnnounce + 1) % announceItems.length;
        announceItems[currentAnnounce].classList.add('active');
      }, 4200);
    }

    // Audio Toggle
    DOM.audioToggleBtn.addEventListener('click', () => {
      STATE.audioEnabled = !STATE.audioEnabled;
      DOM.audioIcon.textContent = STATE.audioEnabled ? '🔔' : '🔕';
      document.querySelector('.audio-label').textContent = STATE.audioEnabled ? 'Sound: On' : 'Sound: Off';
      saveState();
      showToast(STATE.audioEnabled ? 'Sound effects enabled' : 'Sound effects muted');
      if (STATE.audioEnabled) playLuxuryChime();
    });

    // Currency selector change
    const handleCurrencyChange = (e) => {
      STATE.currency = e.target.value;
      DOM.currencySelect.value = STATE.currency;
      DOM.mobileCurrencySelect.value = STATE.currency;
      saveState();
      renderCatalog();
      renderLookbook(STATE.activeLookIndex);
      updateCartUI();
      updateWishlistUI();
      showToast(`Currency changed to ${STATE.currency}`);
    };

    DOM.currencySelect.addEventListener('change', handleCurrencyChange);
    DOM.mobileCurrencySelect.addEventListener('change', handleCurrencyChange);
    DOM.currencySelect.value = STATE.currency;
    DOM.mobileCurrencySelect.value = STATE.currency;

    // Filter Tabs
    DOM.filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        DOM.filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        STATE.activeFilter = tab.getAttribute('data-filter');
        renderCatalog();
      });
    });

    // Price Filter Dropdown
    DOM.catalogPriceSelect.addEventListener('change', (e) => {
      STATE.priceFilter = e.target.value;
      renderCatalog();
    });

    // Inline Catalog Search
    DOM.catalogSearchInput.addEventListener('input', (e) => {
      STATE.searchQuery = e.target.value;
      renderCatalog();
    });

    // Catalog Sort Select
    DOM.catalogSortSelect.addEventListener('change', (e) => {
      STATE.sortBy = e.target.value;
      renderCatalog();
    });

    // Grid View Switcher (4 cols vs 2 cols)
    DOM.btnViewGrid4.addEventListener('click', () => {
      STATE.gridLayout = 'cols-4';
      DOM.btnViewGrid4.classList.add('active');
      DOM.btnViewGrid2.classList.remove('active');
      saveState();
      renderCatalog();
    });

    DOM.btnViewGrid2.addEventListener('click', () => {
      STATE.gridLayout = 'cols-2';
      DOM.btnViewGrid2.classList.add('active');
      DOM.btnViewGrid4.classList.remove('active');
      saveState();
      renderCatalog();
    });

    // Reset Filters Button
    DOM.resetCatalogFiltersBtn.addEventListener('click', () => {
      resetAllFilters();
    });

    function resetAllFilters() {
      STATE.activeFilter = 'all';
      STATE.priceFilter = 'all';
      STATE.searchQuery = '';
      STATE.sortBy = 'featured';
      DOM.catalogSearchInput.value = '';
      DOM.catalogSortSelect.value = 'featured';
      DOM.catalogPriceSelect.value = 'all';
      DOM.filterTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-filter') === 'all'));
      renderCatalog();
    }

    // Active Filter Chip Remove Handlers
    DOM.activeFilterChips.addEventListener('click', (e) => {
      const clearBtn = e.target.closest('[data-clear-chip]');
      if (clearBtn) {
        const type = clearBtn.getAttribute('data-clear-chip');
        if (type === 'category') {
          STATE.activeFilter = 'all';
          DOM.filterTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-filter') === 'all'));
        } else if (type === 'price') {
          STATE.priceFilter = 'all';
          DOM.catalogPriceSelect.value = 'all';
        } else if (type === 'search') {
          STATE.searchQuery = '';
          DOM.catalogSearchInput.value = '';
        }
        renderCatalog();
        return;
      }

      if (e.target.id === 'clearAllFiltersBtn') {
        resetAllFilters();
      }
    });

    // Navigation Category Links (Delegation)
    document.querySelectorAll('a[data-filter], a[data-category]').forEach(link => {
      link.addEventListener('click', (e) => {
        const cat = link.getAttribute('data-filter') || link.getAttribute('data-category');
        if (cat) {
          STATE.activeFilter = cat;
          DOM.filterTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-filter') === cat));
          renderCatalog();
          closeMobileDrawer();
        }
      });
    });

    // Lookbook Chapter Tabs
    DOM.lookbookTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const idx = parseInt(tab.getAttribute('data-look-idx'), 10);
        renderLookbook(idx);
      });
    });

    // Add Entire Lookbook Outfit to Cart with 10% Bundle Discount
    DOM.btnAddFullLookToCart.addEventListener('click', () => {
      const chapter = LOOKBOOK_CHAPTERS[STATE.activeLookIndex];
      if (!chapter) return;

      chapter.itemIds.forEach(id => {
        addToCart(id);
      });

      STATE.appliedCoupon = 'GOLDEN10';
      saveState();
      updateCartUI();
      showToast(`Added full "${chapter.title}" outfit! 10% bundle coupon GOLDEN10 applied!`, '✨');
    });

    // Size Guide Modal Open Triggers
    const openSizeGuideHandler = (tabId = 'tabRings') => {
      openSizeGuideModal(tabId);
    };

    DOM.navOpenSizeGuideBtn.addEventListener('click', () => openSizeGuideHandler('tabRings'));
    DOM.mobileSizeGuideBtn.addEventListener('click', () => {
      closeMobileDrawer();
      openSizeGuideHandler('tabRings');
    });
    DOM.footerOpenSizeGuideBtn.addEventListener('click', () => openSizeGuideHandler('tabRings'));
    DOM.faqSizeGuideTrigger.addEventListener('click', () => openSizeGuideHandler('tabRings'));
    DOM.btnOpenSpotlightSizeGuide.addEventListener('click', () => openSizeGuideHandler('tabRings'));

    DOM.closeSizeGuideBtn.addEventListener('click', closeSizeGuideModal);
    DOM.btnCloseSizeGuideModal.addEventListener('click', closeSizeGuideModal);
    DOM.sizeGuideBackdrop.addEventListener('click', closeSizeGuideModal);

    // Size Guide Tabs
    DOM.sizeGuideTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('data-tab-target');
        DOM.sizeGuideTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        ['tabRings', 'tabApparel', 'tabShoes'].forEach(id => {
          const pane = document.getElementById(id);
          if (pane) pane.classList.toggle('active', id === targetId);
        });
      });
    });

    // Global Product Click Handlers (Delegation)
    document.body.addEventListener('click', (e) => {
      // Wishlist toggle
      const wishlistBtn = e.target.closest('[data-wishlist-id]');
      if (wishlistBtn) {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(wishlistBtn.getAttribute('data-wishlist-id'));
        return;
      }

      // Quick View Trigger
      const quickViewBtn = e.target.closest('[data-quickview-id]');
      if (quickViewBtn) {
        e.preventDefault();
        openQuickView(quickViewBtn.getAttribute('data-quickview-id'));
        return;
      }

      // Quick Pick Size Pill from Card Popover
      const quickPickPill = e.target.closest('[data-quickpick-size]');
      if (quickPickPill) {
        e.preventDefault();
        e.stopPropagation();
        const id = quickPickPill.getAttribute('data-quickpick-id');
        const size = quickPickPill.getAttribute('data-quickpick-size');
        addToCart(id, size);
        // Close popover
        document.querySelectorAll('.product-size-popover').forEach(p => p.classList.remove('active'));
        return;
      }

      // Quick Add to Cart Button on Card
      const quickAddBtn = e.target.closest('[data-quickadd-id]');
      if (quickAddBtn) {
        e.preventDefault();
        const id = quickAddBtn.getAttribute('data-quickadd-id');
        const hasSizes = quickAddBtn.getAttribute('data-has-sizes') === 'true';

        if (hasSizes) {
          // Toggle popover
          const popover = document.getElementById(`popover-${id}`);
          if (popover) {
            const isCurrentlyOpen = popover.classList.contains('active');
            document.querySelectorAll('.product-size-popover').forEach(p => p.classList.remove('active'));
            if (!isCurrentlyOpen) popover.classList.add('active');
            return;
          }
        }

        addToCart(id);
        return;
      }

      // Close open popovers if clicked outside
      if (!e.target.closest('.product-size-popover') && !e.target.closest('.btn-quick-add')) {
        document.querySelectorAll('.product-size-popover').forEach(p => p.classList.remove('active'));
      }

      // Cross-Sell item add
      const crossSellAddBtn = e.target.closest('[data-cross-sell-add]');
      if (crossSellAddBtn) {
        e.preventDefault();
        addToCart(crossSellAddBtn.getAttribute('data-cross-sell-add'));
        return;
      }

      // Remove item from cart
      const removeBtn = e.target.closest('[data-remove-id]');
      if (removeBtn) {
        removeFromCart(removeBtn.getAttribute('data-remove-id'), removeBtn.getAttribute('data-remove-size'));
        return;
      }

      // Stepper qty in cart
      const qtyBtn = e.target.closest('[data-qty-delta]');
      if (qtyBtn) {
        const delta = parseInt(qtyBtn.getAttribute('data-qty-delta'), 10);
        changeCartQty(qtyBtn.getAttribute('data-id'), qtyBtn.getAttribute('data-size'), delta);
        return;
      }

      // Remove from wishlist drawer
      const removeWishBtn = e.target.closest('[data-wishlist-remove]');
      if (removeWishBtn) {
        toggleWishlist(removeWishBtn.getAttribute('data-wishlist-remove'));
        return;
      }

      // Move from wishlist to cart
      const moveWishBtn = e.target.closest('[data-wishlist-move]');
      if (moveWishBtn) {
        const id = moveWishBtn.getAttribute('data-wishlist-move');
        addToCart(id);
        toggleWishlist(id);
        return;
      }

      // Lookbook Hotspot Add Buttons
      const hotspotAddBtn = e.target.closest('[data-add-id]');
      if (hotspotAddBtn) {
        e.preventDefault();
        addToCart(hotspotAddBtn.getAttribute('data-add-id'));
        return;
      }

      // Lookbook Mini Item Add
      const lbQuickAdd = e.target.closest('.quick-add-trigger');
      if (lbQuickAdd) {
        addToCart(lbQuickAdd.getAttribute('data-id'));
        return;
      }
    });

    // Cart Drawer Controls
    DOM.cartTriggerBtn.addEventListener('click', openCartDrawer);
    DOM.closeCartBtn.addEventListener('click', closeCartDrawer);
    DOM.cartOverlay.addEventListener('click', closeCartDrawer);
    DOM.btnContinueShopping.addEventListener('click', closeCartDrawer);

    // Apply Coupon
    DOM.btnApplyCoupon.addEventListener('click', () => {
      const code = DOM.cartCouponInput.value.trim().toUpperCase();
      if (COUPONS[code]) {
        STATE.appliedCoupon = code;
        DOM.cartCouponInput.value = '';
        saveState();
        updateCartUI();
        showToast(`Promo code "${code}" applied (-${COUPONS[code] * 100}%)!`, '🏷️');
      } else {
        showToast('Invalid promo code. Try GOLDEN10 or BLOSSOM20', '❌');
      }
    });

    DOM.btnRemoveCoupon.addEventListener('click', () => {
      STATE.appliedCoupon = null;
      saveState();
      updateCartUI();
      showToast('Promo code removed', 'ℹ️');
    });

    // Gift Wrap Checkbox
    DOM.giftWrapCheckbox.addEventListener('change', (e) => {
      STATE.giftWrapSelected = e.target.checked;
      saveState();
      showToast(STATE.giftWrapSelected ? 'Signature gift box & velvet pouch included' : 'Standard packaging selected');
    });

    // Gift Note Textarea
    if (DOM.cartGiftNoteInput) {
      DOM.cartGiftNoteInput.addEventListener('input', (e) => {
        STATE.giftNote = e.target.value;
        saveState();
      });
    }

    // Order via WhatsApp button
    DOM.btnOrderViaWhatsApp.addEventListener('click', () => {
      const url = generateWhatsAppOrderUrl();
      window.open(url, '_blank');
    });

    // Proceed to Checkout
    DOM.btnProceedCheckout.addEventListener('click', openCheckoutWizard);
    DOM.closeCheckoutBtn.addEventListener('click', closeCheckoutWizard);
    DOM.btnCancelCheckout.addEventListener('click', () => {
      closeCheckoutWizard();
      openCartDrawer();
    });

    // Checkout Navigation
    DOM.btnGoToStep2.addEventListener('click', () => {
      const fName = document.getElementById('checkoutFirstName').value.trim();
      const phone = document.getElementById('checkoutPhone').value.trim();
      const addr = document.getElementById('checkoutAddress').value.trim();

      if (!fName || !phone || !addr) {
        showToast('Please complete all required shipping fields (*)', '⚠️');
        return;
      }
      goToCheckoutStep(2);
    });

    DOM.btnBackToStep1.addEventListener('click', () => goToCheckoutStep(1));

    // Initialize Payment Methods (Visa, Apple Pay, Google Pay, COD)
    initPaymentMethods();

    // Order Bump Checkbox
    DOM.orderBumpCheckbox.addEventListener('change', (e) => {
      STATE.orderBumpSelected = e.target.checked;
      updateCheckoutRecap();
      showToast(STATE.orderBumpSelected ? 'Polishing cloth added to order (+60 MAD)' : 'Polishing cloth removed');
    });

    // Toggle Items Recap in Step 2
    DOM.toggleRecapItems.addEventListener('click', () => {
      const isVisible = DOM.checkoutRecapItemsList.style.display !== 'none';
      DOM.checkoutRecapItemsList.style.display = isVisible ? 'none' : 'flex';
      DOM.toggleRecapItems.querySelector('.recap-toggle-text').textContent = isVisible ? 'Show details ▾' : 'Hide details ▴';
    });

    DOM.checkoutForm.addEventListener('submit', completeOrder);
    DOM.btnDoneShopping.addEventListener('click', closeCheckoutWizard);

    // Wishlist Drawer Controls
    DOM.wishlistTriggerBtn.addEventListener('click', openWishlistDrawer);
    DOM.closeWishlistBtn.addEventListener('click', closeWishlistDrawer);
    DOM.wishlistOverlay.addEventListener('click', closeWishlistDrawer);

    DOM.btnMoveAllToCart.addEventListener('click', () => {
      STATE.wishlist.forEach(id => addToCart(id));
      STATE.wishlist = [];
      saveState();
      updateWishlistUI();
      closeWishlistDrawer();
      showToast('All saved pieces moved to shopping bag!', '🛍️');
    });

    // Quick View Modal Controls
    DOM.closeQuickViewBtn.addEventListener('click', closeQuickView);
    DOM.quickViewBackdrop.addEventListener('click', closeQuickView);

    // Search Modal Controls
    DOM.searchTriggerBtn.addEventListener('click', openSearchModal);
    DOM.closeSearchModalBtn.addEventListener('click', closeSearchModal);
    DOM.clearSearchBtn.addEventListener('click', () => {
      DOM.liveSearchInput.value = '';
      DOM.liveSearchInput.focus();
      renderSearchResults('');
    });

    DOM.liveSearchInput.addEventListener('input', (e) => {
      renderSearchResults(e.target.value);
    });

    document.querySelectorAll('.search-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        const term = tag.getAttribute('data-search-term');
        DOM.liveSearchInput.value = term;
        renderSearchResults(term);
      });
    });

    // Care Guide Modal
    DOM.btnOpenCareGuide.addEventListener('click', () => {
      DOM.careGuideModal.classList.add('active');
      DOM.careGuideBackdrop.classList.add('active');
    });

    const closeCareGuide = () => {
      DOM.careGuideModal.classList.remove('active');
      DOM.careGuideBackdrop.classList.remove('active');
    };

    DOM.closeCareGuideBtn.addEventListener('click', closeCareGuide);
    DOM.careGuideBackdrop.addEventListener('click', closeCareGuide);
    DOM.btnCloseCareGuideModal.addEventListener('click', closeCareGuide);

    // Mobile Navigation Drawer
    function openMobileDrawer() {
      DOM.mobileDrawer.classList.add('active');
      DOM.mobileDrawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeMobileDrawer() {
      DOM.mobileDrawer.classList.remove('active');
      DOM.mobileDrawerOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    DOM.mobileMenuBtn.addEventListener('click', openMobileDrawer);
    DOM.closeMobileDrawerBtn.addEventListener('click', closeMobileDrawer);
    DOM.mobileDrawerOverlay.addEventListener('click', closeMobileDrawer);
    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', closeMobileDrawer);
    });

    // Mobile Bottom Navigation Bar Triggers
    DOM.mobileSearchTrigger.addEventListener('click', openSearchModal);
    DOM.mobileWishlistTrigger.addEventListener('click', openWishlistDrawer);
    DOM.mobileCartTrigger.addEventListener('click', openCartDrawer);

    // Newsletter Form
    DOM.newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = DOM.newsletterEmailInput.value.trim();
      if (email) {
        DOM.newsletterSuccess.style.display = 'block';
        DOM.newsletterEmailInput.value = '';
        STATE.appliedCoupon = 'GOLDEN10';
        saveState();
        updateCartUI();
        showToast('Welcome to The Golden Circle! 10% coupon GOLDEN10 applied.', '✨');
      }
    });

    // Keyboard accessibility: ESC key to close any active modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCartDrawer();
        closeWishlistDrawer();
        closeQuickView();
        closeSizeGuideModal();
        closeSearchModal();
        closeCheckoutWizard();
        closeCareGuide();
        closeMobileDrawer();
        document.querySelectorAll('.product-size-popover').forEach(p => p.classList.remove('active'));
      }
    });
  }

  // ==========================================================================
  // REAL-TIME AUTOMATIC STOREFRONT SYNCHRONIZATION
  // Automatically reflects ALL admin changes (products, catalog, hero, announcement,
  // phone numbers, shipping thresholds, and boutique settings) without page refresh.
  // ==========================================================================
  let lastDataVersion = null;

  function applyLiveWebsiteSettings(set) {
    if (!set || typeof set !== 'object') return;

    // 1. Live Announcement Bar
    if (set.announcementText) {
      const announceSpans = document.querySelectorAll('#announcementSlider .announcement-item span, .promo-marquee, .promo-text');
      announceSpans.forEach(span => {
        span.innerHTML = set.announcementText;
      });
    }

    // 2. Live Hero Heading
    if (set.heroHeading) {
      const hh = document.querySelector('.hero-heading') || document.querySelector('.hero-content h1');
      if (hh) {
        hh.innerHTML = set.heroHeading.includes('<br>') ? set.heroHeading : set.heroHeading.replace(/\n/g, '<br>');
      }
    }

    // 3. Live Hero Subheading / Description
    if (set.heroSubheading) {
      const hs = document.querySelector('.hero-description') || document.querySelector('.hero-subtitle');
      if (hs) hs.textContent = set.heroSubheading;
    }

    // 4. Live WhatsApp Phone Number & Links across the entire storefront
    if (set.boutiquePhone) {
      WHATSAPP_DISPLAY = set.boutiquePhone;
      const cleanDigits = set.boutiquePhone.replace(/[^0-9]/g, '');
      if (cleanDigits) {
        WHATSAPP_PHONE = cleanDigits;
      }

      // Update all WhatsApp links
      document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        try {
          const url = new URL(link.href);
          const textParam = url.searchParams.get('text') || '';
          link.href = `https://wa.me/${WHATSAPP_PHONE}${textParam ? '?text=' + encodeURIComponent(textParam) : ''}`;
        } catch (e) {
          link.href = link.href.replace(/wa\.me\/[0-9]+/, `wa.me/${WHATSAPP_PHONE}`);
        }
      });

      // Update VIP Concierge header link tooltip
      const vipLink = document.querySelector('.vip-concierge-link');
      if (vipLink) vipLink.title = `WhatsApp VIP Concierge (${WHATSAPP_DISPLAY})`;

      // Update Floating Concierge Widget
      const widgetP = document.querySelector('#whatsappTooltip p');
      if (widgetP) {
        widgetP.innerHTML = `Need help with sizing or prefer to order directly via WhatsApp? Chat with our Casablanca stylist: <strong>${WHATSAPP_DISPLAY}</strong>`;
      }
      const widgetFab = document.querySelector('.whatsapp-fab');
      if (widgetFab) {
        widgetFab.setAttribute('aria-label', `Chat with Golden Blossom Boutique on WhatsApp at ${WHATSAPP_DISPLAY}`);
      }
    }

    // 5. Live Boutique Email
    if (set.boutiqueEmail) {
      document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.href = `mailto:${set.boutiqueEmail}`;
        link.textContent = set.boutiqueEmail;
      });
    }

    // 6. Live Boutique Address
    if (set.boutiqueAddress) {
      document.querySelectorAll('.boutique-location').forEach(el => {
        el.textContent = set.boutiqueAddress;
      });
    }

    // 7. Live Free Shipping Threshold
    if (set.freeShippingThresholdMAD) {
      CONFIG.freeShippingThresholdMAD = Number(set.freeShippingThresholdMAD);
      updateCartUI();
    }
  }

  async function loadDynamicCatalogAndSettings() {
    const API_BASE = (
      window.location.protocol === 'file:' ||
      ((window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && window.location.port !== '3000')
    ) ? 'http://localhost:3000' : '';

    let catalogUpdated = false;

    // 1. Fetch updated Products catalog
    try {
      const res = await fetch(`${API_BASE}/api/products?_t=${Date.now()}`);
      if (res.ok) {
        const live = await res.json();
        if (Array.isArray(live)) {
          PRODUCTS = live;
          catalogUpdated = true;
          try { localStorage.setItem('gb_boutique_products', JSON.stringify(PRODUCTS)); } catch(e){}
        }
      }
    } catch (e) {
      // Offline fallback: load from localStorage
      try {
        const stored = localStorage.getItem('gb_boutique_products');
        if (stored) {
          const localItems = JSON.parse(stored);
          if (Array.isArray(localItems) && localItems.length > 0) {
            PRODUCTS = localItems;
            catalogUpdated = true;
          }
        }
      } catch(err) {}
    }

    // If catalog updated, immediately re-render catalog, category counts, and lookbook
    if (catalogUpdated) {
      updateCategoryCounts();
      renderCatalog();
      if (typeof renderLookbook === 'function') {
        renderLookbook(STATE.activeLookIndex || 0);
      }
    }

    // 2. Fetch updated Website Settings
    try {
      const res = await fetch(`${API_BASE}/api/website-settings?_t=${Date.now()}`);
      if (res.ok) {
        const set = await res.json();
        applyLiveWebsiteSettings(set);
        try { localStorage.setItem('gb_website_settings', JSON.stringify(set)); } catch(e){}
      }
    } catch (e) {
      try {
        const stored = localStorage.getItem('gb_website_settings');
        if (stored) {
          applyLiveWebsiteSettings(JSON.parse(stored));
        }
      } catch(err) {}
    }

    // Record server version
    try {
      const vRes = await fetch(`${API_BASE}/api/version?_t=${Date.now()}`);
      if (vRes.ok) {
        const vData = await vRes.json();
        lastDataVersion = vData.version;
      }
    } catch(e) {}
  }

  // Real-time Event Listeners: BroadcastChannel, storage events, & 3.5s Heartbeat Poller
  function setupLiveSyncListeners() {
    const API_BASE = (
      window.location.protocol === 'file:' ||
      ((window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && window.location.port !== '3000')
    ) ? 'http://localhost:3000' : '';

    // Channel 1: BroadcastChannel (Instant sub-millisecond cross-tab sync in same browser)
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        const syncChannel = new BroadcastChannel('gb_live_sync_channel');
        syncChannel.onmessage = (event) => {
          const { type, payload } = event.data || {};
          if (type === 'SETTINGS_UPDATED') {
            if (payload) applyLiveWebsiteSettings(payload);
            loadDynamicCatalogAndSettings();
          } else if (type === 'CATALOG_UPDATED') {
            loadDynamicCatalogAndSettings();
          }
        };
      } catch (e) {}
    }

    // Channel 2: Storage Event Listener (Instant cross-window fallback)
    window.addEventListener('storage', (e) => {
      if (e.key === 'gb_last_sync_timestamp' || e.key === 'gb_boutique_products' || e.key === 'gb_website_settings') {
        loadDynamicCatalogAndSettings();
      }
    });

    // Channel 3: Heartbeat Poller on /api/version every 3.5 seconds
    // Detects changes made across distinct browsers or devices (e.g. mobile admin to desktop visitor)
    setInterval(async () => {
      try {
        const res = await fetch(`${API_BASE}/api/version?_t=${Date.now()}`);
        if (res.ok) {
          const { version } = await res.json();
          if (lastDataVersion === null) {
            lastDataVersion = version;
          } else if (version !== lastDataVersion) {
            lastDataVersion = version;
            loadDynamicCatalogAndSettings();
          }
        }
      } catch (e) {
        // Silent network retry
      }
    }, 3500);
  }

  // ==========================================================================
  // INITIALIZE APP
  // ==========================================================================
  function init() {
    updateCategoryCounts();
    renderCatalog();
    renderLookbook(0);
    updateCartUI();
    updateWishlistUI();
    initEventListeners();
    loadDynamicCatalogAndSettings();
    setupLiveSyncListeners();
    console.log('✨ Golden Blossom Boutique web application initialized with Live Real-Time Sync.');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
