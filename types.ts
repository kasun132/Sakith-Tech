export interface Product {
  id: string;
  category: 'covers' | 'power' | 'audio';
  categoryLabel: string;
  title: string;
  tag: string;
  badge?: string;
  badgeColor?: string; // 'red' | 'amber' | 'blue' | 'slate' | 'green'
  rating: number;
  soldCount: number;
  price: number;
  originalPrice: number;
  image: string;
  brand: string;
  inStock: boolean;
  compatibleModels?: string[];
  specs?: string[];
  warranty?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedModel?: string;
  selectedColor?: string;
}

export type CategoryFilter = 'all' | 'covers' | 'power' | 'audio' | 'deals' | 'new';

export type PriceFilter = 'all' | 'under2k' | '2k-5k' | 'over5k';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'popular';

export interface TrackingStep {
  title: string;
  location: string;
  time: string;
  completed: boolean;
  current?: boolean;
}

export interface TrackingResult {
  orderId: string;
  customerName: string;
  phone: string;
  destination: string;
  estimatedDelivery: string;
  courier: string;
  status: 'Processing' | 'Dispatched' | 'Out for Delivery' | 'Delivered';
  steps: TrackingStep[];
  items: { name: string; qty: number; price: number }[];
  total: number;
}
