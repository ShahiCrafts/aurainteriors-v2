export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  images: string[];
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  material: string;
  style: string;
  inStock: boolean;
  arAvailable: boolean;
  rating: number;
  reviews: Review[];
  colors: string[];
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface SavedDesign {
  id: string;
  name: string;
  thumbnail: string;
  items: DesignItem[];
  createdAt: string;
}

export interface DesignItem {
  productId: string;
  product: Product;
  x: number;
  y: number;
  rotation: number;
}

export interface DesignItem3D {
  id: string;
  productId: string;
  product: Product;
  position: [number, number, number];
  rotation: number;
  color?: string;
}

export interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: CartItem[];
}
