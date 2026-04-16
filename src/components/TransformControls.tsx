import { useRef } from 'react';
import { TransformControls as DreiTransformControls } from '@react-three/drei';
import { useSceneStore } from '../store/useSceneStore';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const TransformControls = () => {
  const controlsRef = useRef<any>(null);
  const { selectedObjectId, transformMode, objects, updateObject } = useSceneStore();
  
  const selectedObject = objects.find((obj) => obj.id === selectedObjectId);

  useFrame(() => {
    if (controlsRef.current && controlsRef.current.object) {
      const object = controlsRef.current.object;
      if (selectedObject) {
        updateObject(selectedObject.id, {
          position: [object.position.x, object.position.y, object.position.z],
          rotation: [object.rotation.x, object.rotation.y, object.rotation.z],
          scale: [object.scale.x, object.scale.y, object.scale.z],
        });
      }
    }
  });

  if (!selectedObject) return null;

  return (
    <DreiTransformControls
      ref={controlsRef}
      mode={transformMode}
      object={
        new THREE.Mesh(
          new THREE.BoxGeometry(1, 1, 1),
          new THREE.MeshStandardMaterial()
        )
      }
      position={selectedObject.position}
      rotation={selectedObject.rotation}
      scale={selectedObject.scale}
    />
  );
};

export default TransformControls;
