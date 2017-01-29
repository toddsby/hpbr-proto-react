const dollData = [
  { id: 1,
    type: 'side-pony',
    name: 'Side Pony',
    gender: 'girl', 
    imageUrl: 'dist/assets/images/side-pony.jpg',
    price: 70.00,
    tags: [
      { id: 1, name: 'Sale', type: 'sale' },
      { id: 2, name: 'Limited', type: 'limited' },
      { id: 3, name: 'Top-Seller', type: 'top' }
    ],
    sale: {
      price: 60.00,
      qty: 5
    }
  },
  { id: 2,
    type: 'high-pigtail',
    name: 'High Pigtail', 
    gender: 'girl',
    imageUrl: 'dist/assets/images/pigtails.jpg',
    price: 60.00
  },
  { id: 3,
    type: 'top-bun',
    name: 'Top Bun', 
    gender: 'girl',
    imageUrl: 'dist/assets/images/top-bun.jpg',
    price: 60.00,
    sale: {
      price: 45.00,
      qty: 2
    },
    tags: [
      { id: 4, name: '25% Off', type: 'sale' }
    ]
  },
  { id: 4,
    type: 'pixie-cut',
    name: 'Pixie Cut',
    gender: 'girl', 
    imageUrl: 'dist/assets/images/pixie-cut.jpg',
    price: 60.00
  }
];