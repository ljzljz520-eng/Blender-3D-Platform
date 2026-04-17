import { useRef, useState, useEffect } from 'react';
import { TransformControls as DreiTransformControls } from '@react-three/drei';
import { useSceneStore } from '../store/useSceneStore';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const TransformControls = () => {
  const controlsRef = useRef<any>(null);
  const { scene } = useThree();
  const { selectedObjectId, transformMode, objects, updateObject } = useSceneStore();
  const [mesh, setMesh] = useState<THREE.Mesh | null>(null);
  
  const selectedObject = objects.find((obj) => obj.id === selectedObjectId);

  useEffect(() => {
    if (!selectedObject) {
      if (mesh) {
        scene.remove(mesh);
        setMesh(null);
      }
      return;
    }

    const newMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    newMesh.position.set(...selectedObject.position);
    newMesh.rotation.set(...selectedObject.rotation);
    newMesh.scale.set(...selectedObject.scale);
    scene.add(newMesh);
    setMesh(newMesh);

    return () => {
      scene.remove(newMesh);
    };
  }, [selectedObjectId, scene]);

  useEffect(() => {
    if (mesh && selectedObject) {
      mesh.position.set(...selectedObject.position);
      mesh.rotation.set(...selectedObject.rotation);
      mesh.scale.set(...selectedObject.scale);
    }
  }, [selectedObject?.position, selectedObject?.rotation, selectedObject?.scale]);

  const handleObjectChange = () => {
    if (controlsRef.current && mesh && selectedObject) {
      updateObject(selectedObject.id, {
        position: [mesh.position.x, mesh.position.y, mesh.position.z],
        rotation: [mesh.rotation.x, mesh.rotation.y, mesh.rotation.z],
        scale: [mesh.scale.x, mesh.scale.y, mesh.scale.z],
      });
    }
  };

  if (!selectedObject || !mesh) return null;

  return (
    <DreiTransformControls
      ref={controlsRef}
      mode={transformMode}
      object={mesh}
      onObjectChange={handleObjectChange}
    />
  );
};

export default TransformControls;
