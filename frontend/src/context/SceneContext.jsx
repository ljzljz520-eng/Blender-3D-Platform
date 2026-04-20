import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import * as THREE from 'three';

const SceneContext = createContext();

export function SceneProvider({ children }) {
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const transformControlRef = useRef(null);
  const objectsRef = useRef([]);
  
  const [selectedObject, setSelectedObject] = useState(null);
  const [objects, setObjects] = useState([]);
  const [currentView, setCurrentView] = useState('perspective');
  const [transformMode, setTransformMode] = useState('translate');
  const [lights, setLights] = useState({
    ambient: true,
    directional: true,
    point: false
  });

  const addObject = useCallback((mesh) => {
    setObjects(prev => {
      const newObjects = [...prev, mesh];
      objectsRef.current = newObjects;
      return newObjects;
    });
  }, []);

  const removeObject = useCallback((uuid) => {
    setObjects(prev => {
      const newObjects = prev.filter(obj => obj.uuid !== uuid);
      objectsRef.current = newObjects;
      return newObjects;
    });
    setSelectedObject(prev => prev && prev.uuid === uuid ? null : prev);
  }, []);

  const updateObjectProperty = useCallback((uuid, property, value) => {
    setObjects(prev => prev.map(obj => {
      if (obj.uuid === uuid) {
        if (property.startsWith('position.')) {
          const axis = property.split('.')[1];
          obj.position[axis] = value;
        } else if (property.startsWith('rotation.')) {
          const axis = property.split('.')[1];
          obj.rotation[axis] = THREE.MathUtils.degToRad(value);
        } else if (property.startsWith('scale.')) {
          const axis = property.split('.')[1];
          obj.scale[axis] = value;
        } else if (property === 'color') {
          obj.material.color.set(value);
        } else if (property === 'name') {
          obj.name = value;
        }
        return { ...obj };
      }
      return obj;
    }));
    setSelectedObject(prev => {
      if (prev && prev.uuid === uuid) {
        return { ...prev };
      }
      return prev;
    });
  }, []);

  const value = {
    sceneRef,
    cameraRef,
    rendererRef,
    controlsRef,
    transformControlRef,
    objectsRef,
    selectedObject,
    setSelectedObject,
    objects,
    addObject,
    removeObject,
    updateObjectProperty,
    currentView,
    setCurrentView,
    transformMode,
    setTransformMode,
    lights,
    setLights
  };

  return (
    <SceneContext.Provider value={value}>
      {children}
    </SceneContext.Provider>
  );
}

export function useScene() {
  return useContext(SceneContext);
}
