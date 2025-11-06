import React from 'react';
import { Link } from 'react-router-dom';
import { QrCode, Smartphone, Eye, Box, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { products } from '../data/products';

export const ARFeaturesPage: React.FC = () => {
  const arProducts = products.filter((p) => p.arAvailable);

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 text-white">Experience Furniture in Your Space</h1>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Use augmented reality to visualize how our furniture will look in your home before you buy.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/products">
              Browse AR Products <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-center mb-4">How AR Visualization Works</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          See furniture in your actual space with just your smartphone
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="mb-2">1. Browse</h3>
              <p className="text-gray-600 text-sm">
                Find furniture with the AR badge on product pages
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <QrCode className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="mb-2">2. Scan QR</h3>
              <p className="text-gray-600 text-sm">
                Click "View in AR" and scan the QR code with your phone
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="mb-2">3. Place</h3>
              <p className="text-gray-600 text-sm">
                Position the furniture in your actual room space
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Box className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="mb-2">4. Visualize</h3>
              <p className="text-gray-600 text-sm">
                View the furniture from all angles in real-time
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-4">AR-Ready Furniture</h2>
          <p className="text-center text-gray-600 mb-12">
            All these products support augmented reality visualization
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {arProducts.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <Card className="overflow-hidden hover:shadow-lg transition group">
                  <div className="relative aspect-square overflow-hidden">
                    <ImageWithFallback
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                      <QrCode className="w-3 h-3" />
                      AR
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                    <h3 className="mb-2 line-clamp-1">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900">${product.price}</span>
                      <span className="text-sm text-gray-500">⭐ {product.rating}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-gray-900 to-gray-700 text-white">
          <CardContent className="p-12 text-center">
            <h2 className="mb-4 text-white">Device Requirements</h2>
            <div className="max-w-2xl mx-auto">
              <p className="mb-6 opacity-90">
                AR features work on modern smartphones and tablets with AR capabilities
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h3 className="mb-3 text-white">iOS Devices</h3>
                  <ul className="space-y-2 text-sm opacity-90">
                    <li>• iPhone 6s and later</li>
                    <li>• iPad Pro (all models)</li>
                    <li>• iPad (5th generation and later)</li>
                    <li>• iOS 11.0 or later required</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-3 text-white">Android Devices</h3>
                  <ul className="space-y-2 text-sm opacity-90">
                    <li>• ARCore supported devices</li>
                    <li>• Android 7.0 or later</li>
                    <li>• Camera with sufficient resolution</li>
                    <li>• Motion sensors required</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
