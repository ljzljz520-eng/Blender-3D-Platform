export type GeometryType = 'box' | 'sphere' | 'cylinder' | 'plane' | 'cone' | 'torus';

export type TransformMode = 'translate' | 'rotate' | 'scale';

export type EditMode = 'object' | 'vertex' | 'edge' | 'face';

export type ViewMode = 'perspective' | 'top' | 'front' | 'side';

export interface Material {
  id: string;
  name: string;
  color: string;
  roughness: number;
  metalness: number;
}

export interface SceneObject {
  id: string;
  name: string;
  type: GeometryType;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  materialId: string;
  visible: boolean;
}

export interface SceneState {
  objects: SceneObject[];
  selectedObjectId: string | null;
  transformMode: TransformMode;
  editMode: EditMode;
  viewMode: ViewMode;
  materials: Material[];
}
