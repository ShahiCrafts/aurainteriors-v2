import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

export const SavedDesignsPage: React.FC = () => {
  const { savedDesigns, deleteDesign, user } = useApp();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleDelete = (id: string) => {
    deleteDesign(id);
    toast.success('Design deleted');
  };

  if (savedDesigns.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Layout className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h2 className="mb-4">No Saved Designs</h2>
        <p className="text-gray-600 mb-6">Create room designs in the workspace!</p>
        <Button onClick={() => navigate('/workspace')}>Go to Workspace</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8">Saved Designs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedDesigns.map((design) => (
          <Card key={design.id} className="overflow-hidden hover:shadow-lg transition group">
            <div className="relative aspect-video overflow-hidden bg-gray-100">
              <ImageWithFallback
                src={design.thumbnail}
                alt={design.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <button
                onClick={() => handleDelete(design.id)}
                className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-lg hover:bg-red-50 transition opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
            <CardContent className="p-4">
              <h3 className="mb-2">{design.name}</h3>
              <p className="text-sm text-gray-600 mb-3">
                {design.items.length} items • Created {new Date(design.createdAt).toLocaleDateString()}
              </p>
              <Button variant="outline" className="w-full" size="sm">
                Open Design
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
