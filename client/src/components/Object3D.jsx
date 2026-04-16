import React, { useRef, useMemo, memo } from 'react';
import * as THREE from 'three';
import useStore from '../store/useStore';
import EditModeHelper from './EditModeHelper';

function Object3D({ objectData }) {
  const meshRef = useRef();
  const setSelectedObjectId = useStore((state) => state.setSelectedObjectId);
  const selectedObjectId = useStore((state) => state.selectedObjectId);
  const mode = useStore((state) => state.mode);

  const isSelected = selectedObjectId === objectData.id;

  const handleClick = (e) => {
    e.stopPropagation();
    if (mode === 'object') {
      setSelectedObjectId(objectData.id);
    }
  };

  const geometry = useMemo(() => {
    const { type, geometry: geo } = objectData;
    switch (type) {
      case 'cube':
        return <boxGeometry args={[geo.width, geo.height, geo.depth]} />;
      case 'sphere':
        return <sphereGeometry args={[geo.radius, geo.widthSegments, geo.heightSegments]} />;
      case 'cylinder':
        return <cylinderGeometry args={[geo.radiusTop, geo.radiusBottom, geo.height, geo.radialSegments]} />;
      case 'cone':
        return <coneGeometry args={[geo.radius, geo.height, geo.radialSegments]} />;
      case 'torus':
        return <torusGeometry args={[geo.radius, geo.tube, geo.radialSegments, geo.tubularSegments]} />;
      case 'plane':
        return <planeGeometry args={[geo.width, geo.height]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  }, [objectData.type, objectData.geometry]);

  const material = useMemo(() => {
    const { color, material: matType } = objectData;
    const materialProps = {
      color: new THREE.Color(color),
      roughness: 0.5,
      metalness: 0.1,
      side: THREE.DoubleSide
    };

    switch (matType) {
      case 'standard':
        return <meshStandardMaterial {...materialProps} />;
      case 'phong':
        return <meshPhongMaterial {...materialProps} shininess={100} />;
      case 'lambert':
        return <meshLambertMaterial {...materialProps} />;
      case 'basic':
        return <meshBasicMaterial {...materialProps} />;
      default:
        return <meshStandardMaterial {...materialProps} />;
    }
  }, [objectData.color, objectData.material]);

  const edgesGeometry = useMemo(() => {
    if (!isSelected) return null;
    const { type, geometry: geo } = objectData;
    let tempGeo;
    switch (type) {
      case 'cube':
        tempGeo = new THREE.BoxGeometry(geo.width, geo.height, geo.depth);
        break;
      case 'sphere':
        tempGeo = new THREE.SphereGeometry(geo.radius, geo.widthSegments, geo.heightSegments);
        break;
      case 'cylinder':
        tempGeo = new THREE.CylinderGeometry(geo.radiusTop, geo.radiusBottom, geo.height, geo.radialSegments);
        break;
      case 'cone':
        tempGeo = new THREE.ConeGeometry(geo.radius, geo.height, geo.radialSegments);
        break;
      case 'torus':
        tempGeo = new THREE.TorusGeometry(geo.radius, geo.tube, geo.radialSegments, geo.tubularSegments);
        break;
      case 'plane':
        tempGeo = new THREE.PlaneGeometry(geo.width, geo.height);
        break;
      default:
        tempGeo = new THREE.BoxGeometry(1, 1, 1);
    }
    const edges = new THREE.EdgesGeometry(tempGeo);
    tempGeo.dispose();
    return edges;
  }, [isSelected, objectData.type, objectData.geometry]);

  if (!objectData.visible) return null;

  return (
    <group>
      <mesh
        ref={meshRef}
        position={objectData.position}
        rotation={objectData.rotation}
        scale={objectData.scale}
        onClick={handleClick}
        castShadow
        receiveShadow
        name={objectData.id}
      >
        {geometry}
        {material}
        {isSelected && edgesGeometry && (
          <lineSegments geometry={edgesGeometry}>
            <lineBasicMaterial color="#00ff00" linewidth={2} />
          </lineSegments>
        )}
      </mesh>
      {isSelected && <EditModeHelper objectData={objectData} />}
    </group>
  );
}

export default memo(Object3D, (prev, next) => {
  return (
    prev.objectData.id === next.objectData.id &&
    prev.objectData.position === next.objectData.position &&
    prev.objectData.rotation === next.objectData.rotation &&
    prev.objectData.scale === next.objectData.scale &&
    prev.objectData.color === next.objectData.color &&
    prev.objectData.material === next.objectData.material &&
    prev.objectData.visible === next.objectData.visible
  );
});
