import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Package, Heart, Layout, Settings, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

export const AccountPage: React.FC = () => {
  const { user, logout, orders, wishlist, savedDesigns } = useApp();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-2xl">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="mb-1">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link to="/account/orders">
            <Card className="hover:shadow-lg transition cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1">Orders</h3>
                    <p className="text-gray-600 text-sm">{orders.length} total orders</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/wishlist">
            <Card className="hover:shadow-lg transition cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1">Wishlist</h3>
                    <p className="text-gray-600 text-sm">{wishlist.length} saved items</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/account/designs">
            <Card className="hover:shadow-lg transition cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Layout className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1">Saved Designs</h3>
                    <p className="text-gray-600 text-sm">{savedDesigns.length} room designs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/account/settings">
            <Card className="hover:shadow-lg transition cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Settings className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1">Settings</h3>
                    <p className="text-gray-600 text-sm">Account preferences</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4">Recent Orders</h2>
            {orders.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No orders yet</p>
            ) : (
              <div className="space-y-4">
                {orders.slice(0, 3).map((order) => (
                  <div key={order.id} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p>Order #{order.id}</p>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="mb-1">${order.total}</p>
                      <span
                        className={`text-sm px-2 py-1 rounded ${
                          order.status === 'Delivered'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
                {orders.length > 3 && (
                  <Link to="/account/orders" className="text-blue-600 hover:underline text-sm">
                    View all orders
                  </Link>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
