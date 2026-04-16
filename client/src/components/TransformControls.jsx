import React, { useRef, useEffect, memo } from 'react';
import { useThree, extend } from '@react-three/fiber';
import { TransformControls as ThreeTransformControls } from 'three-stdlib';
import * as THREE from 'three';
import { shallow } from 'zustand/shallow';
import useStore from '../store/useStore';

extend({ TransformControls: ThreeTransformControls });

function TransformControls() {
  const transformRef = useRef();
  const { scene, camera, gl } = useThree();
  const { selectedObjectId, transformMode, updateObject } = useStore(
    (state) => ({
      selectedObjectId: state.selectedObjectId,
      transformMode: state.transformMode,
      updateObject: state.updateObject
    }),
    shallow
  );

  useEffect(() => {
    if (!transformRef.current || !selectedObjectId) return;

    const mesh = scene.getObjectByName(selectedObjectId);
    if (mesh) {
      transformRef.current.attach(mesh);
    } else {
      transformRef.current.detach();
    }

    const onMouseUp = () => {
      if (mesh && selectedObjectId) {
        updateObject(selectedObjectId, {
          position: [mesh.position.x, mesh.position.y, mesh.position.z],
          rotation: [mesh.rotation.x, mesh.rotation.y, mesh.rotation.z],
          scale: [mesh.scale.x, mesh.scale.y, mesh.scale.z]
        });
      }
    };

    transformRef.current.addEventListener('mouseUp', onMouseUp);
    transformRef.current.addEventListener('objectChange', onMouseUp);

    return () => {
      transformRef.current.removeEventListener('mouseUp', onMouseUp);
      transformRef.current.removeEventListener('objectChange', onMouseUp);
    };
  }, [selectedObjectId, scene, updateObject]);

  useEffect(() => {
    if (transformRef.current) {
      transformRef.current.setMode(transformMode);
    }
  }, [transformMode]);

  if (!selectedObjectId) return null;

  return (
    <transformControls
      ref={transformRef}
      args={[camera, gl.domElement]}
      mode={transformMode}
      size={0.8}
    />
  );
}

export default memo(TransformControls);
