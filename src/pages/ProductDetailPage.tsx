import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Share2, Ruler, Package, ShieldCheck, Star, QrCode } from 'lucide-react';
import { products } from '../data/products';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, wishlist } = useApp();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>();
  const [quantity, setQuantity] = useState(1);
  const [showARDialog, setShowARDialog] = useState(false);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="mb-4">Product Not Found</h2>
        <Button onClick={() => navigate('/products')}>Back to Products</Button>
      </div>
    );
  }

  const isInWishlist = wishlist.some((p) => p.id === product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
    toast.success('Added to cart!');
  };

  const handleWishlist = () => {
    if (!isInWishlist) {
      addToWishlist(product);
      toast.success('Added to wishlist!');
    }
  };

  const averageRating =
    product.reviews.length > 0
      ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
      : product.rating;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-gray-100">
            <ImageWithFallback
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.arAvailable && (
              <Button
                onClick={() => setShowARDialog(true)}
                className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700"
              >
                <QrCode className="w-4 h-4 mr-2" />
                View in AR
              </Button>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition ${
                  selectedImage === index ? 'border-gray-900' : 'border-gray-200'
                }`}
              >
                <ImageWithFallback
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <Badge className="mb-2">{product.category}</Badge>
              <h1 className="mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(averageRating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {averageRating.toFixed(1)} ({product.reviews.length} reviews)
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleWishlist}
                className={isInWishlist ? 'text-red-500' : ''}
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <span className="text-gray-900">${product.price}</span>
          </div>

          <p className="text-gray-600 mb-6">{product.description}</p>

          {product.colors.length > 0 && (
            <div className="mb-6">
              <label className="block mb-2">Color</label>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-md hover:border-gray-900 transition ${
                      selectedColor === color ? 'border-gray-900 bg-gray-50' : 'border-gray-300'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <label className="block mb-2">Quantity</label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>

          <div className="flex gap-3 mb-8">
            <Button onClick={handleAddToCart} className="flex-1" size="lg">
              Add to Cart
            </Button>
            <Button
              onClick={() => {
                handleAddToCart();
                navigate('/cart');
              }}
              variant="outline"
              className="flex-1"
              size="lg"
            >
              Buy Now
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Package className="w-6 h-6 mx-auto mb-2 text-gray-600" />
              <p className="text-sm text-gray-600">Free Shipping</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <ShieldCheck className="w-6 h-6 mx-auto mb-2 text-gray-600" />
              <p className="text-sm text-gray-600">2 Year Warranty</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Ruler className="w-6 h-6 mx-auto mb-2 text-gray-600" />
              <p className="text-sm text-gray-600">Easy Returns</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="description" className="mb-12">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({product.reviews.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
              <div className="mt-4">
                <h3 className="mb-2">Features:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Premium {product.material}</li>
                  <li>{product.style} design aesthetic</li>
                  <li>Durable construction</li>
                  <li>Easy assembly with included instructions</li>
                  {product.arAvailable && <li>AR visualization available</li>}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specifications" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="mb-3">Dimensions</h3>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Width:</dt>
                      <dd>{product.dimensions.width} cm</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Height:</dt>
                      <dd>{product.dimensions.height} cm</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Depth:</dt>
                      <dd>{product.dimensions.depth} cm</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h3 className="mb-3">Details</h3>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Material:</dt>
                      <dd>{product.material}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Style:</dt>
                      <dd>{product.style}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Available Colors:</dt>
                      <dd>{product.colors.length}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">In Stock:</dt>
                      <dd>{product.inStock ? 'Yes' : 'No'}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          {product.reviews.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-gray-600">
                No reviews yet. Be the first to review this product!
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {product.reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p>{review.user}</p>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={showARDialog} onOpenChange={setShowARDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>View in AR</DialogTitle>
          </DialogHeader>
          <div className="py-6">
            <div className="bg-white p-4 rounded-lg border-2 border-gray-200 mb-4">
              <div className="aspect-square bg-gray-900 rounded-lg flex items-center justify-center">
                <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center">
                  <QrCode className="w-32 h-32" />
                </div>
              </div>
            </div>
            <div className="text-center space-y-3">
              <p>
                Scan this QR code with your mobile device to visualize this furniture in your space using
                AR
              </p>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-900">
                  AR Code: {product.id.toUpperCase()}-AR-{Date.now().toString(36)}
                </p>
              </div>
              <p className="text-sm text-gray-600">
                Supports iOS (ARKit) and Android (ARCore) devices
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
