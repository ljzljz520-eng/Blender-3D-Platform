import { create } from 'zustand';
import { SceneState, SceneObject, GeometryType, TransformMode, EditMode, ViewMode, Material } from '../types';

const generateId = () => Math.random().toString(36).substring(2, 9);

const defaultMaterial: Material = {
  id: 'default',
  name: '默认材质',
  color: '#808080',
  roughness: 0.5,
  metalness: 0.1,
};

export const useSceneStore = create<SceneState & {
  addObject: (type: GeometryType) => void;
  deleteObject: (id: string) => void;
  updateObject: (id: string, updates: Partial<SceneObject>) => void;
  selectObject: (id: string | null) => void;
  setTransformMode: (mode: TransformMode) => void;
  setEditMode: (mode: EditMode) => void;
  setViewMode: (mode: ViewMode) => void;
  addMaterial: (material: Omit<Material, 'id'>) => void;
  updateMaterial: (id: string, updates: Partial<Material>) => void;
  exportScene: () => void;
  importScene: (data: SceneState) => void;
}>((set, get) => ({
  objects: [],
  selectedObjectId: null,
  transformMode: 'translate',
  editMode: 'object',
  viewMode: 'perspective',
  materials: [defaultMaterial],

  addObject: (type) => {
    const newObject: SceneObject = {
      id: generateId(),
      name: `${type}_${Date.now()}`,
      type,
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      materialId: 'default',
      visible: true,
    };
    set((state) => ({
      objects: [...state.objects, newObject],
      selectedObjectId: newObject.id,
    }));
  },

  deleteObject: (id) => {
    set((state) => ({
      objects: state.objects.filter((obj) => obj.id !== id),
      selectedObjectId: state.selectedObjectId === id ? null : state.selectedObjectId,
    }));
  },

  updateObject: (id, updates) => {
    set((state) => ({
      objects: state.objects.map((obj) =>
        obj.id === id ? { ...obj, ...updates } : obj
      ),
    }));
  },

  selectObject: (id) => {
    set({ selectedObjectId: id });
  },

  setTransformMode: (mode) => {
    set({ transformMode: mode });
  },

  setEditMode: (mode) => {
    set({ editMode: mode });
  },

  setViewMode: (mode) => {
    set({ viewMode: mode });
  },

  addMaterial: (material) => {
    const newMaterial = { ...material, id: generateId() };
    set((state) => ({
      materials: [...state.materials, newMaterial],
    }));
  },

  updateMaterial: (id, updates) => {
    set((state) => ({
      materials: state.materials.map((mat) =>
        mat.id === id ? { ...mat, ...updates } : mat
      ),
    }));
  },

  exportScene: () => {
    const state = get();
    const data = JSON.stringify(state, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scene_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  importScene: (data) => {
    set(data);
  },
}));
