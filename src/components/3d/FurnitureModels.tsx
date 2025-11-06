import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FurnitureProps {
  position: [number, number, number];
  rotation: number;
  scale?: number;
  color?: string;
  isSelected?: boolean;
}

// Modern Sofa
export const Sofa: React.FC<FurnitureProps> = ({ position, rotation, scale = 1, color = '#4A5568', isSelected }) => {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef} position={position} rotation={[0, rotation, 0]} scale={scale}>
      {/* Main body */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.6, 0.95]} />
        <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.9, -0.35]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.8, 0.25]} />
        <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} />
      </mesh>
      {/* Left armrest */}
      <mesh position={[-1, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.25, 0.6, 0.95]} />
        <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} />
      </mesh>
      {/* Right armrest */}
      <mesh position={[1, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.25, 0.6, 0.95]} />
        <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} />
      </mesh>
      {/* Legs */}
      {[-0.9, 0.9].map((x, i) =>
        [-0.35, 0.35].map((z, j) => (
          <mesh key={`leg-${i}-${j}`} position={[x, 0.05, z]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.1, 8]} />
            <meshStandardMaterial color="#2D3748" />
          </mesh>
        ))
      )}
      {isSelected && (
        <mesh position={[0, 0.01, 0]}>
          <ringGeometry args={[1.4, 1.6, 32]} />
          <meshBasicMaterial color="#3B82F6" side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
};

// Dining Table
export const DiningTable: React.FC<FurnitureProps> = ({ position, rotation, scale = 1, color = '#8B4513', isSelected }) => {
  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      {/* Table top */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.08, 0.9]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.1} />
      </mesh>
      {/* Legs */}
      {[-0.75, 0.75].map((x, i) =>
        [-0.35, 0.35].map((z, j) => (
          <mesh key={`leg-${i}-${j}`} position={[x, 0.37, z]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.75, 8]} />
            <meshStandardMaterial color={color} roughness={0.6} />
          </mesh>
        ))
      )}
      {isSelected && (
        <mesh position={[0, 0.01, 0]}>
          <ringGeometry args={[1.1, 1.3, 32]} />
          <meshBasicMaterial color="#3B82F6" side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
};

// Chair
export const Chair: React.FC<FurnitureProps> = ({ position, rotation, scale = 1, color = '#6B7280', isSelected }) => {
  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      {/* Seat */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.45, 0.08, 0.45]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.75, -0.18]} castShadow receiveShadow>
        <boxGeometry args={[0.45, 0.5, 0.08]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      {/* Legs */}
      {[-0.15, 0.15].map((x, i) =>
        [-0.15, 0.15].map((z, j) => (
          <mesh key={`leg-${i}-${j}`} position={[x, 0.2, z]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
            <meshStandardMaterial color="#2D3748" />
          </mesh>
        ))
      )}
      {isSelected && (
        <mesh position={[0, 0.01, 0]}>
          <ringGeometry args={[0.35, 0.45, 32]} />
          <meshBasicMaterial color="#3B82F6" side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
};

// Bed
export const Bed: React.FC<FurnitureProps> = ({ position, rotation, scale = 1, color = '#E5E7EB', isSelected }) => {
  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      {/* Mattress */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.3, 1.8]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      {/* Headboard */}
      <mesh position={[0, 0.8, -0.85]} castShadow receiveShadow>
        <boxGeometry args={[2.1, 0.9, 0.1]} />
        <meshStandardMaterial color="#6B7280" roughness={0.6} />
      </mesh>
      {/* Base */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.15, 1.8]} />
        <meshStandardMaterial color="#4B5563" />
      </mesh>
      {isSelected && (
        <mesh position={[0, 0.01, 0]}>
          <ringGeometry args={[1.5, 1.7, 32]} />
          <meshBasicMaterial color="#3B82F6" side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
};

// Coffee Table
export const CoffeeTable: React.FC<FurnitureProps> = ({ position, rotation, scale = 1, color = '#92400E', isSelected }) => {
  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      {/* Table top */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.05, 0.6]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Legs */}
      {[-0.5, 0.5].map((x, i) =>
        [-0.2, 0.2].map((z, j) => (
          <mesh key={`leg-${i}-${j}`} position={[x, 0.2, z]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
            <meshStandardMaterial color={color} roughness={0.6} />
          </mesh>
        ))
      )}
      {isSelected && (
        <mesh position={[0, 0.01, 0]}>
          <ringGeometry args={[0.75, 0.85, 32]} />
          <meshBasicMaterial color="#3B82F6" side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
};

// Bookshelf
export const Bookshelf: React.FC<FurnitureProps> = ({ position, rotation, scale = 1, color = '#78350F', isSelected }) => {
  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      {/* Frame */}
      <mesh position={[0, 1, -0.15]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 2, 0.3]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      {/* Shelves */}
      {[0.2, 0.7, 1.2, 1.7].map((y, i) => (
        <mesh key={`shelf-${i}`} position={[0, y, -0.15]} castShadow receiveShadow>
          <boxGeometry args={[1.15, 0.03, 0.28]} />
          <meshStandardMaterial color={color} roughness={0.4} />
        </mesh>
      ))}
      {isSelected && (
        <mesh position={[0, 0.01, -0.15]}>
          <ringGeometry args={[0.7, 0.8, 32]} />
          <meshBasicMaterial color="#3B82F6" side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
};

// Desk
export const Desk: React.FC<FurnitureProps> = ({ position, rotation, scale = 1, color = '#713F12', isSelected }) => {
  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      {/* Desktop */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.05, 0.7]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      {/* Legs */}
      {[-0.6, 0.6].map((x, i) =>
        [-0.25, 0.25].map((z, j) => (
          <mesh key={`leg-${i}-${j}`} position={[x, 0.37, z]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.75, 8]} />
            <meshStandardMaterial color={color} roughness={0.6} />
          </mesh>
        ))
      )}
      {/* Drawer */}
      <mesh position={[0.4, 0.55, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.15, 0.6]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      {isSelected && (
        <mesh position={[0, 0.01, 0]}>
          <ringGeometry args={[0.9, 1, 32]} />
          <meshBasicMaterial color="#3B82F6" side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
};

// Armchair
export const Armchair: React.FC<FurnitureProps> = ({ position, rotation, scale = 1, color = '#7C2D12', isSelected }) => {
  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      {/* Seat */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.4, 0.8]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.75, -0.3]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.6, 0.2]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      {/* Left armrest */}
      <mesh position={[-0.35, 0.55, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.3, 0.8]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      {/* Right armrest */}
      <mesh position={[0.35, 0.55, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.3, 0.8]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      {isSelected && (
        <mesh position={[0, 0.01, 0]}>
          <ringGeometry args={[0.65, 0.75, 32]} />
          <meshBasicMaterial color="#3B82F6" side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
};

// Sideboard/Cabinet
export const Sideboard: React.FC<FurnitureProps> = ({ position, rotation, scale = 1, color = '#92400E', isSelected }) => {
  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      {/* Main body */}
      <mesh position={[0, 0.5, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.8, 0.4]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      {/* Legs */}
      {[-0.7, 0.7].map((x, i) =>
        [-0.35, 0.05].map((z, j) => (
          <mesh key={`leg-${i}-${j}`} position={[x, 0.05, z]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.1, 8]} />
            <meshStandardMaterial color="#2D3748" />
          </mesh>
        ))
      )}
      {isSelected && (
        <mesh position={[0, 0.01, -0.2]}>
          <ringGeometry args={[1, 1.1, 32]} />
          <meshBasicMaterial color="#3B82F6" side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
};

// Plant
export const Plant: React.FC<FurnitureProps> = ({ position, rotation, scale = 1, isSelected }) => {
  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      {/* Pot */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.15, 0.12, 0.3, 16]} />
        <meshStandardMaterial color="#78350F" roughness={0.7} />
      </mesh>
      {/* Plant body */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#059669" roughness={0.9} />
      </mesh>
      {/* Leaves */}
      {[0, Math.PI / 3, (2 * Math.PI) / 3, Math.PI, (4 * Math.PI) / 3, (5 * Math.PI) / 3].map((angle, i) => (
        <mesh
          key={`leaf-${i}`}
          position={[Math.cos(angle) * 0.2, 0.5 + Math.sin(i) * 0.1, Math.sin(angle) * 0.2]}
          rotation={[Math.PI / 4, angle, 0]}
          castShadow
        >
          <coneGeometry args={[0.08, 0.25, 8]} />
          <meshStandardMaterial color="#10B981" roughness={0.8} />
        </mesh>
      ))}
      {isSelected && (
        <mesh position={[0, 0.01, 0]}>
          <ringGeometry args={[0.3, 0.4, 32]} />
          <meshBasicMaterial color="#3B82F6" side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
};

// Lamp
export const Lamp: React.FC<FurnitureProps> = ({ position, rotation, scale = 1, isSelected }) => {
  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      {/* Base */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.12, 0.15, 0.05, 16]} />
        <meshStandardMaterial color="#2D3748" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Stem */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.9, 8]} />
        <meshStandardMaterial color="#374151" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Lampshade */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.15, 0.25, 16]} />
        <meshStandardMaterial color="#F3F4F6" roughness={0.9} />
      </mesh>
      {/* Light */}
      <pointLight position={[0, 0.95, 0]} intensity={0.5} distance={3} color="#FFF8DC" />
      {isSelected && (
        <mesh position={[0, 0.01, 0]}>
          <ringGeometry args={[0.25, 0.35, 32]} />
          <meshBasicMaterial color="#3B82F6" side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
};
