import React, { useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, TransformControls, Grid, Sky, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { DesignItem3D } from '../../types';
import {
  Sofa,
  DiningTable,
  Chair,
  Bed,
  CoffeeTable,
  Bookshelf,
  Desk,
  Armchair,
  Sideboard,
  Plant,
  Lamp,
} from './FurnitureModels';

interface Scene3DProps {
  items: DesignItem3D[];
  selectedItemId: string | null;
  onSelectItem: (id: string | null) => void;
  onUpdateItem: (id: string, position: [number, number, number], rotation: number) => void;
  mode: 'select' | 'transform';
}

const getFurnitureComponent = (productName: string, category: string) => {
  const nameLower = productName.toLowerCase();
  const categoryLower = category.toLowerCase();
  
  // Check product name first for more specific matching
  if (nameLower.includes('sofa')) return Sofa;
  if (nameLower.includes('dining table')) return DiningTable;
  if (nameLower.includes('dining chair') || nameLower.includes('dining chairs')) return Chair;
  if (nameLower.includes('bed')) return Bed;
  if (nameLower.includes('coffee table')) return CoffeeTable;
  if (nameLower.includes('bookshelf') || nameLower.includes('bookcase')) return Bookshelf;
  if (nameLower.includes('desk')) return Desk;
  if (nameLower.includes('armchair')) return Armchair;
  if (nameLower.includes('cabinet') || nameLower.includes('sideboard')) return Sideboard;
  if (nameLower.includes('plant')) return Plant;
  if (nameLower.includes('lamp')) return Lamp;
  
  // Fallback to category
  if (categoryLower.includes('bedroom')) return Bed;
  if (categoryLower.includes('office')) return Desk;
  if (categoryLower.includes('dining')) return DiningTable;
  if (categoryLower.includes('living')) return Sofa;
  
  return CoffeeTable; // Default
};

const FurnitureItem: React.FC<{
  item: DesignItem3D;
  isSelected: boolean;
  onSelect: () => void;
  onTransform: (position: [number, number, number], rotation: number) => void;
  transformMode: 'select' | 'transform';
}> = ({ item, isSelected, onSelect, onTransform, transformMode }) => {
  const transformRef = useRef<any>();
  const FurnitureComponent = getFurnitureComponent(item.product.name, item.product.category);

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    onSelect();
  };

  return (
    <>
      <group onPointerDown={handlePointerDown}>
        <FurnitureComponent
          position={item.position}
          rotation={item.rotation}
          color={item.color}
          isSelected={isSelected}
        />
      </group>
      {isSelected && transformMode === 'transform' && (
        <TransformControls
          ref={transformRef}
          position={item.position}
          mode="translate"
          onObjectChange={(e) => {
            if (transformRef.current) {
              const newPosition = transformRef.current.worldPosition.toArray() as [number, number, number];
              // Constrain to room bounds
              newPosition[0] = Math.max(-8, Math.min(8, newPosition[0]));
              newPosition[2] = Math.max(-8, Math.min(8, newPosition[2]));
              newPosition[1] = 0; // Keep on ground
              onTransform(newPosition, item.rotation);
            }
          }}
        />
      )}
    </>
  );
};

const Room: React.FC = () => {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#E5E7EB" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 2.5, -10]} receiveShadow>
        <planeGeometry args={[20, 5]} />
        <meshStandardMaterial color="#F9FAFB" side={THREE.DoubleSide} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-10, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 5]} />
        <meshStandardMaterial color="#F3F4F6" side={THREE.DoubleSide} />
      </mesh>

      {/* Right wall */}
      <mesh position={[10, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 5]} />
        <meshStandardMaterial color="#F3F4F6" side={THREE.DoubleSide} />
      </mesh>

      {/* Grid helper */}
      <Grid
        args={[20, 20]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#D1D5DB"
        sectionSize={2}
        sectionThickness={1}
        sectionColor="#9CA3AF"
        fadeDistance={30}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid={false}
      />
    </group>
  );
};

const SceneContent: React.FC<Scene3DProps> = ({
  items,
  selectedItemId,
  onSelectItem,
  onUpdateItem,
  mode,
}) => {
  const { camera, gl } = useThree();

  const handleBackgroundClick = () => {
    onSelectItem(null);
  };

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />
      <hemisphereLight intensity={0.3} groundColor="#888888" />

      {/* Sky/Environment */}
      <Sky sunPosition={[100, 20, 100]} />
      <Environment preset="apartment" />

      {/* Room */}
      <Room />

      {/* Furniture items */}
      {items.map((item) => (
        <FurnitureItem
          key={item.id}
          item={item}
          isSelected={selectedItemId === item.id}
          onSelect={() => onSelectItem(item.id)}
          onTransform={(position, rotation) => onUpdateItem(item.id, position, rotation)}
          transformMode={mode}
        />
      ))}

      {/* Camera controls */}
      <OrbitControls
        makeDefault
        maxPolarAngle={Math.PI / 2.1}
        minDistance={5}
        maxDistance={30}
        target={[0, 0, 0]}
        enabled={mode === 'select'}
      />

      {/* Background click handler */}
      <mesh position={[0, 0, 0]} onPointerDown={handleBackgroundClick} visible={false}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </>
  );
};

export const Scene3D: React.FC<Scene3DProps> = (props) => {
  return (
    <Canvas
      shadows
      camera={{ position: [8, 8, 8], fov: 50 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      style={{ background: '#87CEEB' }}
    >
      <SceneContent {...props} />
    </Canvas>
  );
};
