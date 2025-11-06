import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

export const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist, addToCart } = useApp();

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast.success('Added to cart!');
  };

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Heart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h2 className="mb-4">Your wishlist is empty</h2>
        <p className="text-gray-600 mb-6">Save your favorite items for later!</p>
        <Button asChild>
          <Link to="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8">My Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition">
            <div className="relative aspect-square overflow-hidden group">
              <Link to={`/product/${product.id}`}>
                <ImageWithFallback
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </Link>
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-lg hover:bg-red-50 transition"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
              {product.arAvailable && (
                <Badge className="absolute top-2 left-2 bg-blue-600">AR</Badge>
              )}
            </div>
            <CardContent className="p-4">
              <Link to={`/product/${product.id}`}>
                <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                <h3 className="mb-2 line-clamp-2 hover:underline">{product.name}</h3>
              </Link>
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-900">${product.price}</span>
                <span className="text-sm text-gray-500">⭐ {product.rating}</span>
              </div>
              <Button onClick={() => handleAddToCart(product)} className="w-full" size="sm">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
