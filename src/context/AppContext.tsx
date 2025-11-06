import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Product, SavedDesign, User, Order } from '../types';

interface AppContextType {
  cart: CartItem[];
  wishlist: Product[];
  user: User | null;
  savedDesigns: SavedDesign[];
  orders: Order[];
  addToCart: (product: Product, quantity?: number, color?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  saveDesign: (design: SavedDesign) => void;
  deleteDesign: (designId: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (name: string, email: string, password: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>([]);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-001',
      date: '2025-10-25',
      status: 'Delivered',
      total: 1299,
      items: [],
    },
    {
      id: 'ORD-002',
      date: '2025-10-30',
      status: 'In Transit',
      total: 549,
      items: [],
    },
  ]);

  const addToCart = (product: Product, quantity = 1, color?: string) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedColor: color }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.find((p) => p.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  const saveDesign = (design: SavedDesign) => {
    setSavedDesigns((prev) => [...prev, design]);
  };

  const deleteDesign = (designId: string) => {
    setSavedDesigns((prev) => prev.filter((d) => d.id !== designId));
  };

  const login = (email: string, password: string) => {
    // Mock login
    setUser({
      id: '1',
      name: 'John Doe',
      email: email,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    });
  };

  const logout = () => {
    setUser(null);
  };

  const register = (name: string, email: string, password: string) => {
    // Mock register
    setUser({
      id: '1',
      name: name,
      email: email,
    });
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        wishlist,
        user,
        savedDesigns,
        orders,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        saveDesign,
        deleteDesign,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
