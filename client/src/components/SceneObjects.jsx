import React from 'react';
import { shallow } from 'zustand/shallow';
import useStore from '../store/useStore';
import Object3D from './Object3D';

function SceneObjects() {
  const objectIds = useStore(
    (state) => state.objects.map((obj) => obj.id),
    shallow
  );
  const objects = useStore((state) => state.objects);

  return (
    <group>
      {objects.map((obj) => (
        <Object3D key={obj.id} objectData={obj} />
      ))}
    </group>
  );
}

export default SceneObjects;
