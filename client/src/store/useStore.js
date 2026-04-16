import { create } from 'zustand';
import * as THREE from 'three';

const useStore = create((set, get) => ({
  currentProject: null,
  projects: [],
  selectedObjectId: null,
  objects: [],
  mode: 'object',
  editMode: 'vertex',
  selectedVertices: [],
  selectedEdges: [],
  selectedFaces: [],
  transformMode: 'translate',
  viewMode: 'perspective',
  showGrid: true,
  showAxes: true,
  
  setCurrentProject: (project) => set({ currentProject: project }),
  setProjects: (projects) => set({ projects }),
  setSelectedObjectId: (id) => set({ selectedObjectId: id }),
  setObjects: (objects) => set({ objects }),
  setMode: (mode) => set({ mode }),
  setTransformMode: (mode) => set({ transformMode: mode }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setShowGrid: (show) => set({ showGrid: show }),
  setShowAxes: (show) => set({ showAxes: show }),
  setEditMode: (mode) => set({ editMode: mode }),
  setSelectedVertices: (vertices) => set({ selectedVertices: vertices }),
  setSelectedEdges: (edges) => set({ selectedEdges: edges }),
  setSelectedFaces: (faces) => set({ selectedFaces: faces }),
  
  addObject: (type, position = [0, 0, 0]) => {
    const id = THREE.MathUtils.generateUUID();
    const newObject = {
      id,
      type,
      name: `${type}_${get().objects.length + 1}`,
      position,
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: '#4a90d9',
      material: 'standard',
      visible: true,
      geometry: getDefaultGeometry(type)
    };
    set((state) => ({
      objects: [...state.objects, newObject],
      selectedObjectId: id
    }));
    return id;
  },
  
  updateObject: (id, updates) => {
    set((state) => ({
      objects: state.objects.map((obj) =>
        obj.id === id ? { ...obj, ...updates } : obj
      )
    }));
  },
  
  deleteObject: (id) => {
    set((state) => ({
      objects: state.objects.filter((obj) => obj.id !== id),
      selectedObjectId: state.selectedObjectId === id ? null : state.selectedObjectId
    }));
  },
  
  duplicateObject: (id) => {
    const obj = get().objects.find((o) => o.id === id);
    if (obj) {
      const newId = THREE.MathUtils.generateUUID();
      const newObj = {
        ...obj,
        id: newId,
        name: `${obj.name}_copy`,
        position: [obj.position[0] + 1, obj.position[1], obj.position[2] + 1]
      };
      set((state) => ({
        objects: [...state.objects, newObj],
        selectedObjectId: newId
      }));
    }
  },
  
  clearObjects: () => set({ objects: [], selectedObjectId: null }),
  
  getSelectedObject: () => {
    const state = get();
    return state.objects.find((obj) => obj.id === state.selectedObjectId);
  }
}));

function getDefaultGeometry(type) {
  switch (type) {
    case 'cube':
      return { width: 1, height: 1, depth: 1 };
    case 'sphere':
      return { radius: 0.5, widthSegments: 32, heightSegments: 32 };
    case 'cylinder':
      return { radiusTop: 0.5, radiusBottom: 0.5, height: 1, radialSegments: 32 };
    case 'cone':
      return { radius: 0.5, height: 1, radialSegments: 32 };
    case 'torus':
      return { radius: 0.5, tube: 0.2, radialSegments: 16, tubularSegments: 100 };
    case 'plane':
      return { width: 10, height: 10 };
    default:
      return {};
  }
}

export default useStore;
