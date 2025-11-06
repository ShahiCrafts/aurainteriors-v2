import React, { useState, useEffect } from 'react';
import { X, MousePointer2, Move3d, Palette, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export const Tutorial3D: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('3d-workspace-tutorial-seen');
    if (!hasSeenTutorial) {
      setShow(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('3d-workspace-tutorial-seen', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Welcome to 3D Design Workspace</CardTitle>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Design your perfect space with realistic 3D furniture models. Here's how to get started:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <MousePointer2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm">
                  <strong>Add Furniture</strong>
                </p>
                <p className="text-xs text-gray-600">
                  Click on any item from the furniture library to add it to your room
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Eye className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm">
                  <strong>View Mode</strong>
                </p>
                <p className="text-xs text-gray-600">
                  Drag to rotate camera, scroll to zoom in/out
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Move3d className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm">
                  <strong>Move Mode</strong>
                </p>
                <p className="text-xs text-gray-600">
                  Select an item, switch to Move mode, then drag arrows to reposition
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                <Palette className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm">
                  <strong>Customize</strong>
                </p>
                <p className="text-xs text-gray-600">
                  Change colors and rotate selected furniture items
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button onClick={handleClose} className="w-full">
              Got it, let's start designing!
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
