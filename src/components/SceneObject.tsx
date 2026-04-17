import { useRef } from 'react';
import { Mesh } from 'three';
import { useSceneStore } from '../store/useSceneStore';
import { SceneObject as SceneObjectType } from '../types';

interface SceneObjectProps {
  object: SceneObjectType;
}

const SceneObject: React.FC<SceneObjectProps> = ({ object }) => {
  const meshRef = useRef<Mesh>(null);
  const { selectObject, selectedObjectId, materials } = useSceneStore();

  const getGeometry = () => {
    switch (object.type) {
      case 'box':
        return <boxGeometry args={[1, 1, 1]} />;
      case 'sphere':
        return <sphereGeometry args={[0.5, 32, 32]} />;
      case 'cylinder':
        return <cylinderGeometry args={[0.5, 0.5, 1, 32]} />;
      case 'plane':
        return <planeGeometry args={[2, 2]} />;
      case 'cone':
        return <coneGeometry args={[0.5, 1, 32]} />;
      case 'torus':
        return <torusGeometry args={[0.5, 0.2, 16, 32]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  const material = materials.find((m) => m.id === object.materialId) || materials[0];
  const isSelected = selectedObjectId === object.id;

  return (
    <mesh
      ref={meshRef}
      position={object.position}
      rotation={object.rotation}
      scale={object.scale}
      visible={object.visible}
      castShadow
      receiveShadow
      onClick={(e) => {
        e.stopPropagation();
        selectObject(object.id);
      }}
    >
      {getGeometry()}
      <meshStandardMaterial
        color={material.color}
        roughness={material.roughness}
        metalness={material.metalness}
        emissive={isSelected ? '#4a9eff' : '#000000'}
        emissiveIntensity={isSelected ? 0.3 : 0}
      />
    </mesh>
  );
};

export default SceneObject;
