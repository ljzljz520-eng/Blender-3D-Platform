import React from 'react';
import { 
  Box, 
  Circle, 
  Cylinder, 
  Triangle, 
  Donut, 
  Square,
  Move,
  RotateCcw,
  Maximize2,
  Trash2,
  Copy,
  Download,
  Upload,
  Save,
  Plus,
  BoxSelect,
  Edit3,
  Point,
  Minus,
  Hexagon
} from 'lucide-react';
import useStore from '../store/useStore';
import { exportToGLB } from '../utils/exportUtils';

function Toolbar() {
  const { 
    addObject, 
    transformMode, 
    setTransformMode,
    selectedObjectId,
    deleteObject,
    duplicateObject,
    objects,
    mode,
    setMode,
    editMode,
    setEditMode
  } = useStore();

  const primitives = [
    { type: 'cube', icon: Box, label: '立方体' },
    { type: 'sphere', icon: Circle, label: '球体' },
    { type: 'cylinder', icon: Cylinder, label: '圆柱体' },
    { type: 'cone', icon: Triangle, label: '圆锥体' },
    { type: 'torus', icon: Donut, label: '圆环' },
    { type: 'plane', icon: Square, label: '平面' }
  ];

  const transforms = [
    { mode: 'translate', icon: Move, label: '移动' },
    { mode: 'rotate', icon: RotateCcw, label: '旋转' },
    { mode: 'scale', icon: Maximize2, label: '缩放' }
  ];

  const modeButtons = [
    { mode: 'object', icon: BoxSelect, label: '对象模式' },
    { mode: 'edit', icon: Edit3, label: '编辑模式' }
  ];

  const editModeButtons = [
    { mode: 'vertex', icon: Point, label: '顶点编辑' },
    { mode: 'edge', icon: Minus, label: '边编辑' },
    { mode: 'face', icon: Hexagon, label: '面编辑' }
  ];

  const handleExport = async () => {
    try {
      await exportToGLB(objects, 'model.glb');
      alert('模型导出成功！');
    } catch (error) {
      alert('导出失败：' + error.message);
    }
  };

  return (
    <div className="flex w-16 flex-col items-center border-r border-gray-700 bg-gray-800 py-4 gap-2">
      <div className="mb-4 text-xs text-gray-400 font-semibold">创建</div>
      
      {primitives.map(({ type, icon: Icon, label }) => (
        <button
          key={type}
          onClick={() => addObject(type)}
          className="flex h-10 w-10 items-center justify-center rounded bg-gray-700 hover:bg-gray-600 transition-colors"
          title={label}
        >
          <Icon size={20} />
        </button>
      ))}

      <div className="my-4 h-px w-10 bg-gray-700" />

      <div className="mb-2 text-xs text-gray-400 font-semibold">变换</div>
      
      {transforms.map(({ mode, icon: Icon, label }) => (
        <button
          key={mode}
          onClick={() => setTransformMode(mode)}
          className={`flex h-10 w-10 items-center justify-center rounded transition-colors ${
            transformMode === mode 
              ? 'bg-blue-600 hover:bg-blue-500' 
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
          title={label}
        >
          <Icon size={20} />
        </button>
      ))}

      <div className="my-4 h-px w-10 bg-gray-700" />

      <div className="mb-2 text-xs text-gray-400 font-semibold">模式</div>
      
      {modeButtons.map(({ mode: btnMode, icon: Icon, label }) => (
        <button
          key={btnMode}
          onClick={() => setMode(btnMode)}
          className={`flex h-10 w-10 items-center justify-center rounded transition-colors ${
            mode === btnMode 
              ? 'bg-purple-600 hover:bg-purple-500' 
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
          title={label}
        >
          <Icon size={20} />
        </button>
      ))}

      {mode === 'edit' && (
        <>
          <div className="my-2 h-px w-10 bg-gray-700" />
          
          {editModeButtons.map(({ mode: btnMode, icon: Icon, label }) => (
            <button
              key={btnMode}
              onClick={() => setEditMode(btnMode)}
              className={`flex h-10 w-10 items-center justify-center rounded transition-colors ${
                editMode === btnMode 
                  ? 'bg-orange-600 hover:bg-orange-500' 
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
              title={label}
            >
              <Icon size={20} />
            </button>
          ))}
        </>
      )}

      <div className="my-4 h-px w-10 bg-gray-700" />

      <div className="mb-2 text-xs text-gray-400 font-semibold">操作</div>
      
      <button
        onClick={() => selectedObjectId && duplicateObject(selectedObjectId)}
        disabled={!selectedObjectId}
        className={`flex h-10 w-10 items-center justify-center rounded transition-colors ${
          selectedObjectId 
            ? 'bg-gray-700 hover:bg-gray-600' 
            : 'bg-gray-800 text-gray-600 cursor-not-allowed'
        }`}
        title="复制"
      >
        <Copy size={20} />
      </button>
      
      <button
        onClick={() => selectedObjectId && deleteObject(selectedObjectId)}
        disabled={!selectedObjectId}
        className={`flex h-10 w-10 items-center justify-center rounded transition-colors ${
          selectedObjectId 
            ? 'bg-red-600 hover:bg-red-500' 
            : 'bg-gray-800 text-gray-600 cursor-not-allowed'
        }`}
        title="删除"
      >
        <Trash2 size={20} />
      </button>

      <div className="my-4 h-px w-10 bg-gray-700" />

      <button
        onClick={handleExport}
        className="flex h-10 w-10 items-center justify-center rounded bg-green-600 hover:bg-green-500 transition-colors"
        title="导出GLB"
      >
        <Download size={20} />
      </button>
    </div>
  );
}

export default Toolbar;
