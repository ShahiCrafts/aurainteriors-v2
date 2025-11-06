import React, { useState, Suspense } from 'react';
import { Save, Download, Share2, Plus, Trash2, Move, Hand, RotateCw, Eye, Palette, Box } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { Product, DesignItem3D, SavedDesign } from '../types';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { ScrollArea } from '../components/ui/scroll-area';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner@2.0.3';
import { Scene3D } from '../components/3d/Scene3D';
import { Tutorial3D } from '../components/3d/Tutorial3D';
import { Skeleton } from '../components/ui/skeleton';

const colorOptions = [
  { name: 'Charcoal Gray', value: '#4A5568' },
  { name: 'Navy Blue', value: '#2C5282' },
  { name: 'Emerald Green', value: '#047857' },
  { name: 'Burgundy', value: '#7C2D12' },
  { name: 'Beige', value: '#D6BCAB' },
  { name: 'White', value: '#F3F4F6' },
  { name: 'Black', value: '#1F2937' },
  { name: 'Brown', value: '#92400E' },
];

export const DesignWorkspace3DPage: React.FC = () => {
  const { saveDesign } = useApp();
  const [designItems, setDesignItems] = useState<DesignItem3D[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [mode, setMode] = useState<'select' | 'transform'>('select');
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [designName, setDesignName] = useState('');

  const addToScene = (product: Product) => {
    const newItem: DesignItem3D = {
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      product,
      position: [0, 0, 0],
      rotation: 0,
      color: colorOptions[0].value,
    };
    setDesignItems([...designItems, newItem]);
    setSelectedItemId(newItem.id);
    toast.success(`${product.name} added to scene`);
  };

  const removeFromScene = (id: string) => {
    setDesignItems(designItems.filter((item) => item.id !== id));
    if (selectedItemId === id) {
      setSelectedItemId(null);
    }
    toast.success('Item removed');
  };

  const updateItem = (id: string, position: [number, number, number], rotation: number) => {
    setDesignItems(
      designItems.map((item) =>
        item.id === id ? { ...item, position, rotation } : item
      )
    );
  };

  const rotateSelectedItem = () => {
    if (selectedItemId) {
      setDesignItems(
        designItems.map((item) =>
          item.id === selectedItemId
            ? { ...item, rotation: (item.rotation + Math.PI / 4) % (Math.PI * 2) }
            : item
        )
      );
    }
  };

  const changeSelectedItemColor = (color: string) => {
    if (selectedItemId) {
      setDesignItems(
        designItems.map((item) =>
          item.id === selectedItemId ? { ...item, color } : item
        )
      );
    }
  };

  const handleSave = () => {
    if (!designName.trim()) {
      toast.error('Please enter a design name');
      return;
    }

    // Convert 3D items to 2D format for compatibility with existing save structure
    const design2D: SavedDesign = {
      id: Date.now().toString(),
      name: designName,
      thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
      items: designItems.map((item) => ({
        productId: item.productId,
        product: item.product,
        x: item.position[0] * 50 + 400,
        y: item.position[2] * 50 + 300,
        rotation: (item.rotation * 180) / Math.PI,
      })),
      createdAt: new Date().toISOString(),
    };

    saveDesign(design2D);
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
    link.download = '3d-room-design.json';
    link.click();
    toast.success('Design exported!');
  };

  const selectedItem = designItems.find((item) => item.id === selectedItemId);

  const ProductLibraryItem: React.FC<{ product: Product }> = ({ product }) => {
    return (
      <div
        className="cursor-pointer border rounded-lg overflow-hidden hover:shadow-lg transition hover:border-blue-400"
        onClick={() => addToScene(product)}
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
          <p className="text-xs text-gray-600">{product.category}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <Tutorial3D />
      <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="mb-2">3D Interior Design Workspace</h1>
          <p className="text-gray-600">Create your dream space with realistic 3D furniture models</p>
        </div>
        <div className="flex gap-2">
          <Link to="/workspace-2d">
            <Button variant="ghost" size="sm">
              <Box className="w-4 h-4 mr-2" />
              Switch to 2D
            </Button>
          </Link>
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
                  placeholder="My 3D Living Room"
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
        <div className="lg:col-span-3 space-y-4">
          {/* 3D Canvas */}
          <Card>
            <CardContent className="p-0">
              <div className="h-[600px] rounded-lg overflow-hidden relative">
                <Suspense
                  fallback={
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <div className="text-center space-y-4">
                        <Skeleton className="w-32 h-32 mx-auto rounded-full" />
                        <p className="text-gray-600">Loading 3D Workspace...</p>
                      </div>
                    </div>
                  }
                >
                  <Scene3D
                    items={designItems}
                    selectedItemId={selectedItemId}
                    onSelectItem={setSelectedItemId}
                    onUpdateItem={updateItem}
                    mode={mode}
                  />
                </Suspense>

                {/* Control buttons overlay */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <Button
                    size="sm"
                    variant={mode === 'select' ? 'default' : 'outline'}
                    onClick={() => setMode('select')}
                  >
                    <Hand className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant={mode === 'transform' ? 'default' : 'outline'}
                    onClick={() => setMode('transform')}
                    disabled={!selectedItemId}
                  >
                    <Move className="w-4 h-4 mr-2" />
                    Move
                  </Button>
                </div>

                {/* Instructions */}
                {designItems.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center bg-white/90 p-6 rounded-lg">
                      <Eye className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                      <p className="text-gray-600">Click on furniture items to add them to your 3D room</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Use View mode to rotate camera, Move mode to position furniture
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Item controls */}
          {selectedItem && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="mb-1">Selected: {selectedItem.product.name}</h3>
                    <p className="text-sm text-gray-600">{selectedItem.product.category}</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeFromScene(selectedItem.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Rotation</Label>
                      <Button size="sm" variant="outline" onClick={rotateSelectedItem}>
                        <RotateCw className="w-4 h-4 mr-2" />
                        Rotate 45°
                      </Button>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <Palette className="w-4 h-4 mr-2" />
                      <Label>Color</Label>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {colorOptions.map((color) => (
                        <button
                          key={color.value}
                          className="w-10 h-10 rounded-full border-2 transition hover:scale-110"
                          style={{
                            backgroundColor: color.value,
                            borderColor: selectedItem.color === color.value ? '#3B82F6' : '#D1D5DB',
                          }}
                          onClick={() => changeSelectedItemColor(color.value)}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Position</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <div>
                        <p className="text-xs text-gray-600">X</p>
                        <p className="text-sm">{selectedItem.position[0].toFixed(1)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Y</p>
                        <p className="text-sm">{selectedItem.position[1].toFixed(1)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Z</p>
                        <p className="text-sm">{selectedItem.position[2].toFixed(1)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Items list */}
          {designItems.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h3 className="mb-3">Items in Scene ({designItems.length})</h3>
                <div className="flex flex-wrap gap-2">
                  {designItems.map((item) => (
                    <Badge
                      key={item.id}
                      variant={selectedItemId === item.id ? 'default' : 'secondary'}
                      className="cursor-pointer"
                      onClick={() => setSelectedItemId(item.id)}
                    >
                      {item.product.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Furniture Library */}
        <div>
          <Card className="sticky top-24">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3>Furniture Library</h3>
                <Plus className="w-5 h-5 text-gray-400" />
              </div>

              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid grid-cols-3 w-full mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="living">Living</TabsTrigger>
                  <TabsTrigger value="dining">Dining</TabsTrigger>
                </TabsList>

                <ScrollArea className="h-[600px]">
                  <TabsContent value="all" className="mt-0">
                    <div className="grid grid-cols-2 gap-3">
                      {products.map((product) => (
                        <ProductLibraryItem key={product.id} product={product} />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="living" className="mt-0">
                    <div className="grid grid-cols-2 gap-3">
                      {products
                        .filter((p) => p.category === 'Living Room')
                        .map((product) => (
                          <ProductLibraryItem key={product.id} product={product} />
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="dining" className="mt-0">
                    <div className="grid grid-cols-2 gap-3">
                      {products
                        .filter((p) => p.category === 'Dining Room')
                        .map((product) => (
                          <ProductLibraryItem key={product.id} product={product} />
                        ))}
                    </div>
                  </TabsContent>
                </ScrollArea>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mt-6">
        <CardContent className="p-6">
          <h3 className="mb-3">Controls Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm">
                <span className="inline-block bg-gray-200 px-2 py-1 rounded mr-2">View Mode</span>
                Click and drag to rotate camera
              </p>
            </div>
            <div>
              <p className="text-sm">
                <span className="inline-block bg-gray-200 px-2 py-1 rounded mr-2">Move Mode</span>
                Select item then drag arrows to move
              </p>
            </div>
            <div>
              <p className="text-sm">
                <span className="inline-block bg-gray-200 px-2 py-1 rounded mr-2">Scroll</span>
                Zoom in and out
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </>
  );
};
