import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Box, Palette } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { products } from '../data/products';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export const HomePage: React.FC = () => {
  const featuredProducts = products.slice(0, 4);
  const bestsellers = products.filter((p) => p.rating >= 4.7);

  return (
    <div className="min-h-screen">
      <section className="relative h-[600px] bg-gradient-to-br from-gray-900 to-gray-700 text-white">
        <div className="absolute inset-0 opacity-30">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1591115906252-6d977fec0e34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcmlvciUyMGRlc2lnbiUyMHJvb218ZW58MXx8fHwxNzYyMzM5NTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-white text-gray-900">New Collection</Badge>
            <h1 className="mb-6">Transform Your Space with Modern Elegance</h1>
            <p className="mb-8 text-xl opacity-90">
              Discover premium furniture with AR visualization. See how it looks in your home before you buy.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link to="/products">
                  Shop Now <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20" asChild>
                <Link to="/ar-features">Try AR Experience</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-2 hover:border-gray-400 transition cursor-pointer">
            <CardContent className="p-6">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Box className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="mb-2">AR Visualization</h3>
              <p className="text-gray-600">
                See furniture in your space with augmented reality before making a purchase.
              </p>
              <Link to="/ar-features" className="text-blue-600 hover:underline mt-4 inline-flex items-center">
                Learn More <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-gray-400 transition cursor-pointer">
            <CardContent className="p-6">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Palette className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="mb-2">Design Workspace</h3>
              <p className="text-gray-600">
                Create and visualize complete room layouts with our interactive design tool.
              </p>
              <Link to="/workspace" className="text-purple-600 hover:underline mt-4 inline-flex items-center">
                Start Designing <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-gray-400 transition cursor-pointer">
            <CardContent className="p-6">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                Handpicked furniture from top manufacturers with quality guarantees.
              </p>
              <Link to="/products" className="text-green-600 hover:underline mt-4 inline-flex items-center">
                Browse Collection <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="mb-2">Featured Collection</h2>
              <p className="text-gray-600">Handpicked pieces to elevate your interior</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/products">View All</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <Card className="overflow-hidden hover:shadow-lg transition group">
                  <div className="relative aspect-square overflow-hidden">
                    <ImageWithFallback
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    {product.arAvailable && (
                      <Badge className="absolute top-2 right-2 bg-blue-600">AR Available</Badge>
                    )}
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="mb-2">Bestsellers</h2>
            <p className="text-gray-600">Customer favorites you'll love</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/products?sort=rating">View All</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <Card className="overflow-hidden hover:shadow-lg transition group">
                <div className="relative aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  {product.arAvailable && (
                    <Badge className="absolute top-2 right-2 bg-blue-600">AR Available</Badge>
                  )}
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
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-white">Ready to Transform Your Space?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Start designing your dream interior with our free workspace tool. No account required.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/workspace">
              Launch Design Workspace <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};
