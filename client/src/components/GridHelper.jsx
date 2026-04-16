import React from 'react';
import { GridHelper as ThreeGridHelper, AxesHelper } from 'three';
import { extend, useThree } from '@react-three/fiber';

extend({ ThreeGridHelper, AxesHelper });

function GridHelper() {
  return (
    <>
      <threeGridHelper args={[20, 20, 0x444444, 0x333333]} />
      <axesHelper args={[5]} />
    </>
  );
}

export default GridHelper;
