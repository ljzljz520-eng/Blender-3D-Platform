import { useSceneStore } from '../store/useSceneStore';
import { GeometryType, TransformMode, EditMode, ViewMode } from '../types';

const Toolbar = () => {
  const {
    addObject,
    transformMode,
    setTransformMode,
    editMode,
    setEditMode,
    viewMode,
    setViewMode,
    exportScene,
  } = useSceneStore();

  const geometryButtons: { type: GeometryType; label: string }[] = [
    { type: 'box', label: '立方体' },
    { type: 'sphere', label: '球体' },
    { type: 'cylinder', label: '圆柱体' },
    { type: 'plane', label: '平面' },
    { type: 'cone', label: '圆锥体' },
    { type: 'torus', label: '圆环体' },
  ];

  const transformButtons: { mode: TransformMode; label: string }[] = [
    { mode: 'translate', label: '移动' },
    { mode: 'rotate', label: '旋转' },
    { mode: 'scale', label: '缩放' },
  ];

  const editModeButtons: { mode: EditMode; label: string }[] = [
    { mode: 'object', label: '物体' },
    { mode: 'vertex', label: '顶点' },
    { mode: 'edge', label: '边' },
    { mode: 'face', label: '面' },
  ];

  const viewModeButtons: { mode: ViewMode; label: string }[] = [
    { mode: 'perspective', label: '透视' },
    { mode: 'top', label: '顶视图' },
    { mode: 'front', label: '前视图' },
    { mode: 'side', label: '侧视图' },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 56,
        background: '#2d2d2d',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: 16,
        borderBottom: '1px solid #444',
        zIndex: 1000,
      }}
    >
      <div style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginRight: 24 }}>
        Blender 3D 平台
      </div>

      <div style={{ display: 'flex', gap: 8, borderRight: '1px solid #444', paddingRight: 16 }}>
        {geometryButtons.map((btn) => (
          <button
            key={btn.type}
            onClick={() => addObject(btn.type)}
            style={{
              padding: '8px 12px',
              background: '#3d3d3d',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              fontSize: 12,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#4d4d4d')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#3d3d3d')}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, borderRight: '1px solid #444', paddingRight: 16 }}>
        {transformButtons.map((btn) => (
          <button
            key={btn.mode}
            onClick={() => setTransformMode(btn.mode)}
            style={{
              padding: '8px 12px',
              background: transformMode === btn.mode ? '#4a9eff' : '#3d3d3d',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              fontSize: 12,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = transformMode === btn.mode ? '#3a8eef' : '#4d4d4d')}
            onMouseLeave={(e) => (e.currentTarget.style.background = transformMode === btn.mode ? '#4a9eff' : '#3d3d3d')}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, borderRight: '1px solid #444', paddingRight: 16 }}>
        {editModeButtons.map((btn) => (
          <button
            key={btn.mode}
            onClick={() => setEditMode(btn.mode)}
            style={{
              padding: '8px 12px',
              background: editMode === btn.mode ? '#4a9eff' : '#3d3d3d',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              fontSize: 12,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = editMode === btn.mode ? '#3a8eef' : '#4d4d4d')}
            onMouseLeave={(e) => (e.currentTarget.style.background = editMode === btn.mode ? '#4a9eff' : '#3d3d3d')}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, borderRight: '1px solid #444', paddingRight: 16 }}>
        {viewModeButtons.map((btn) => (
          <button
            key={btn.mode}
            onClick={() => setViewMode(btn.mode)}
            style={{
              padding: '8px 12px',
              background: viewMode === btn.mode ? '#4a9eff' : '#3d3d3d',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              fontSize: 12,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = viewMode === btn.mode ? '#3a8eef' : '#4d4d4d')}
            onMouseLeave={(e) => (e.currentTarget.style.background = viewMode === btn.mode ? '#4a9eff' : '#3d3d3d')}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <button
        onClick={exportScene}
        style={{
          padding: '8px 16px',
          background: '#2ecc71',
          color: 'white',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
          fontSize: 12,
          fontWeight: 'bold',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#27ae60')}
        onMouseLeave={(e) => (e.currentTarget.style.background = '#2ecc71')}
      >
        导出场景
      </button>
    </div>
  );
};

export default Toolbar;
