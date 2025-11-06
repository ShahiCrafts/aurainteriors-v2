import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

export const OrdersPage: React.FC = () => {
  const { orders, user } = useApp();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h2 className="mb-4">No Orders Yet</h2>
        <p className="text-gray-600 mb-6">Start shopping to see your orders here!</p>
        <Button onClick={() => navigate('/products')}>Browse Products</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8">My Orders</h1>

      <div className="max-w-4xl mx-auto space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="hover:shadow-lg transition">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="mb-1">Order #{order.id}</h3>
                  <p className="text-sm text-gray-600">Placed on {order.date}</p>
                </div>
                <Badge
                  className={
                    order.status === 'Delivered'
                      ? 'bg-green-100 text-green-700'
                      : order.status === 'In Transit'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }
                >
                  {order.status}
                </Badge>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                    <span className="text-xl">${order.total}</span>
                  </div>
                  <Button variant="outline">
                    View Details
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>

              {order.status === 'In Transit' && (
                <div className="mt-4 bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-900">
                    Your order is on its way! Expected delivery: Nov 8-10, 2025
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
