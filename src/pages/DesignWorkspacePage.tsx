import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Save, Download, Share2, Plus, Trash2, RotateCw, Grid3x3, Box } from 'lucide-react';
import { products } from '../data/products';
import { Product, DesignItem, SavedDesign } from '../types';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { ScrollArea } from '../components/ui/scroll-area';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface DraggableItemProps {
  item: DesignItem;
  onRemove: (id: string) => void;
  onRotate: (id: string) => void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ item, onRemove, onRotate }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'furniture',
    item: { id: item.productId, x: item.x, y: item.y },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        position: 'absolute',
        left: item.x,
        top: item.y,
        transform: `rotate(${item.rotation}deg)`,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
      className="group"
    >
      <div className="relative">
        <ImageWithFallback
          src={item.product.images[0]}
          alt={item.product.name}
          className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300 bg-white"
        />
        <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition flex gap-1">
          <button
            onClick={() => onRotate(item.productId)}
            className="bg-blue-600 text-white p-1 rounded-full hover:bg-blue-700"
          >
            <RotateCw className="w-3 h-3" />
          </button>
          <button
            onClick={() => onRemove(item.productId)}
            className="bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

const DesignCanvas: React.FC<{
  items: DesignItem[];
  onDrop: (productId: string, x: number, y: number) => void;
  onRemove: (id: string) => void;
  onRotate: (id: string) => void;
  showGrid: boolean;
}> = ({ items, onDrop, onRemove, onRotate, showGrid }) => {
  const [, drop] = useDrop(() => ({
    accept: ['furniture', 'new-furniture'],
    drop: (item: any, monitor) => {
      const offset = monitor.getClientOffset();
      const canvasRect = document.getElementById('canvas')?.getBoundingClientRect();
      if (offset && canvasRect) {
        const x = Math.max(0, Math.min(offset.x - canvasRect.left - 64, canvasRect.width - 128));
        const y = Math.max(0, Math.min(offset.y - canvasRect.top - 64, canvasRect.height - 128));
        onDrop(item.productId || item.id, x, y);
      }
    },
  }));

  return (
    <div
      ref={drop}
      id="canvas"
      className={`relative bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden ${
        showGrid ? 'bg-grid' : ''
      }`}
      style={{ height: '600px' }}
    >
      {items.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <Grid3x3 className="w-12 h-12 mx-auto mb-2" />
            <p>Drag furniture items here to start designing</p>
          </div>
        </div>
      )}
      {items.map((item) => (
        <DraggableItem key={item.productId} item={item} onRemove={onRemove} onRotate={onRotate} />
      ))}
    </div>
  );
};

export const DesignWorkspacePage: React.FC = () => {
  const { saveDesign } = useApp();
  const [designItems, setDesignItems] = useState<DesignItem[]>([]);
  const [showGrid, setShowGrid] = useState(true);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [designName, setDesignName] = useState('');

  const addToCanvas = (product: Product, x: number, y: number) => {
    const existingItem = designItems.find((item) => item.productId === product.id);
    if (existingItem) {
      setDesignItems(
        designItems.map((item) =>
          item.productId === product.id ? { ...item, x, y } : item
        )
      );
    } else {
      setDesignItems([
        ...designItems,
        {
          productId: product.id,
          product,
          x,
          y,
          rotation: 0,
        },
      ]);
    }
  };

  const removeFromCanvas = (productId: string) => {
    setDesignItems(designItems.filter((item) => item.productId !== productId));
  };

  const rotateItem = (productId: string) => {
    setDesignItems(
      designItems.map((item) =>
        item.productId === productId
          ? { ...item, rotation: (item.rotation + 45) % 360 }
          : item
      )
    );
  };

  const handleSave = () => {
    if (!designName.trim()) {
      toast.error('Please enter a design name');
      return;
    }

    const design: SavedDesign = {
      id: Date.now().toString(),
      name: designName,
      thumbnail: 'https://images.unsplash.com/photo-1591115906252-6d977fec0e34?w=400',
      items: designItems,
      createdAt: new Date().toISOString(),
    };

    saveDesign(design);
    toast.success('Design saved successfully!');
    setSaveDialogOpen(false);
    setDesignName('');
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(designItems, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'room-design.json';
    link.click();
    toast.success('Design exported!');
  };

  const ProductLibraryItem: React.FC<{ product: Product }> = ({ product }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'new-furniture',
      item: { productId: product.id, id: product.id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    return (
      <div
        ref={drag}
        className="cursor-move border rounded-lg overflow-hidden hover:shadow-lg transition"
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <div className="aspect-square overflow-hidden">
          <ImageWithFallback
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-2">
          <p className="text-sm truncate">{product.name}</p>
          <p className="text-xs text-gray-600">${product.price}</p>
        </div>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="mb-2">Interior Design Workspace</h1>
            <p className="text-gray-600">Drag and drop furniture to create your dream space</p>
          </div>
          <div className="flex gap-2">
            <Link to="/workspace">
              <Button variant="ghost" size="sm">
                <Box className="w-4 h-4 mr-2" />
                Switch to 3D
              </Button>
            </Link>
            <Button variant="outline" onClick={() => setShowGrid(!showGrid)}>
              <Grid3x3 className="w-4 h-4 mr-2" />
              {showGrid ? 'Hide' : 'Show'} Grid
            </Button>
            <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Save Design</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <Label htmlFor="designName">Design Name</Label>
                  <Input
                    id="designName"
                    value={designName}
                    onChange={(e) => setDesignName(e.target.value)}
                    placeholder="My Living Room"
                    className="mt-2"
                  />
                </div>
                <Button onClick={handleSave} className="w-full">
                  Save Design
                </Button>
              </DialogContent>
            </Dialog>
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <DesignCanvas
              items={designItems}
              onDrop={(productId, x, y) => {
                const product = products.find((p) => p.id === productId);
                if (product) addToCanvas(product, x, y);
              }}
              onRemove={removeFromCanvas}
              onRotate={rotateItem}
              showGrid={showGrid}
            />

            {designItems.length > 0 && (
              <Card className="mt-4">
                <CardContent className="p-4">
                  <h3 className="mb-3">Items in Design ({designItems.length})</h3>
                  <div className="flex flex-wrap gap-2">
                    {designItems.map((item) => (
                      <Badge key={item.productId} variant="secondary">
                        {item.product.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div>
            <Card className="sticky top-24">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3>Furniture Library</h3>
                  <Plus className="w-5 h-5 text-gray-400" />
                </div>
                <ScrollArea className="h-[600px]">
                  <div className="grid grid-cols-2 gap-3">
                    {products.map((product) => (
                      <ProductLibraryItem key={product.id} product={product} />
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <style>{`
        .bg-grid {
          background-image: 
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </DndProvider>
  );
};
