import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const blogPosts = [
  {
    id: '1',
    title: '10 Tips for Creating a Modern Living Room',
    excerpt:
      'Discover how to blend functionality with style in your living space. From furniture placement to color schemes.',
    image: 'https://images.unsplash.com/photo-1668365011614-9c4a49a0e89d?w=800',
    category: 'Living Room',
    author: 'Sarah Johnson',
    date: 'Oct 28, 2025',
  },
  {
    id: '2',
    title: 'The Rise of Sustainable Furniture Design',
    excerpt:
      'Explore how eco-friendly materials and ethical manufacturing are reshaping the furniture industry.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
    category: 'Sustainability',
    author: 'Michael Chen',
    date: 'Oct 25, 2025',
  },
  {
    id: '3',
    title: 'Maximizing Small Spaces: Smart Furniture Solutions',
    excerpt:
      'Learn clever tricks to make the most of limited space without compromising on style or comfort.',
    image: 'https://images.unsplash.com/photo-1591115906252-6d977fec0e34?w=800',
    category: 'Space Planning',
    author: 'Emily Roberts',
    date: 'Oct 22, 2025',
  },
  {
    id: '4',
    title: 'Color Psychology in Interior Design',
    excerpt:
      'Understanding how different colors affect mood and atmosphere in your home environment.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
    category: 'Design Tips',
    author: 'David Park',
    date: 'Oct 20, 2025',
  },
  {
    id: '5',
    title: 'AR Technology: The Future of Furniture Shopping',
    excerpt:
      'How augmented reality is revolutionizing the way we visualize and purchase furniture online.',
    image: 'https://images.unsplash.com/photo-1675528030415-dc82908eeb73?w=800',
    category: 'Technology',
    author: 'Lisa Anderson',
    date: 'Oct 18, 2025',
  },
  {
    id: '6',
    title: 'Mixing Old and New: Eclectic Interior Design',
    excerpt:
      'Create a unique space by combining vintage finds with contemporary pieces for a curated look.',
    image: 'https://images.unsplash.com/photo-1685644201646-9e836c398c92?w=800',
    category: 'Style Guide',
    author: 'James Wilson',
    date: 'Oct 15, 2025',
  },
];

export const BlogPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-white">Design Inspiration & Tips</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Expert advice, trends, and ideas to help you create your perfect space
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link to={`/blog/${post.id}`} key={post.id}>
              <Card className="overflow-hidden hover:shadow-lg transition h-full group">
                <div className="relative aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <Badge className="absolute top-3 left-3">{post.category}</Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-3 group-hover:underline">{post.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <div className="mt-4 text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest design trends and exclusive offers
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <button className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
