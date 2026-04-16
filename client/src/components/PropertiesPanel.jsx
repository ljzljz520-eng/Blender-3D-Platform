import React from 'react';
import useStore from '../store/useStore';

function PropertiesPanel() {
  const selectedObject = useStore((state) => state.getSelectedObject());
  const updateObject = useStore((state) => state.updateObject);
  const objects = useStore((state) => state.objects);

  if (!selectedObject) {
    return (
      <div className="w-72 border-l border-gray-700 bg-gray-800 p-4">
        <h2 className="mb-4 text-lg font-semibold">属性面板</h2>
        <p className="text-gray-400 text-sm">选择一个对象以查看属性</p>
        <div className="mt-4 p-3 bg-gray-700 rounded">
          <p className="text-sm text-gray-300">场景对象: {objects.length}</p>
        </div>
      </div>
    );
  }

  const handlePositionChange = (axis, value) => {
    const newPosition = [...selectedObject.position];
    newPosition[axis] = parseFloat(value) || 0;
    updateObject(selectedObject.id, { position: newPosition });
  };

  const handleRotationChange = (axis, value) => {
    const newRotation = [...selectedObject.rotation];
    newRotation[axis] = parseFloat(value) || 0;
    updateObject(selectedObject.id, { rotation: newRotation });
  };

  const handleScaleChange = (axis, value) => {
    const newScale = [...selectedObject.scale];
    newScale[axis] = parseFloat(value) || 1;
    updateObject(selectedObject.id, { scale: newScale });
  };

  const handleColorChange = (color) => {
    updateObject(selectedObject.id, { color });
  };

  const handleNameChange = (name) => {
    updateObject(selectedObject.id, { name });
  };

  const handleMaterialChange = (material) => {
    updateObject(selectedObject.id, { material });
  };

  const axisLabels = ['X', 'Y', 'Z'];

  return (
    <div className="w-72 border-l border-gray-700 bg-gray-800 p-4 overflow-y-auto">
      <h2 className="mb-4 text-lg font-semibold">属性面板</h2>
      
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-1">名称</label>
        <input
          type="text"
          value={selectedObject.name}
          onChange={(e) => handleNameChange(e.target.value)}
          className="w-full rounded bg-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-1">类型</label>
        <div className="rounded bg-gray-700 px-3 py-2 text-sm">
          {selectedObject.type}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">位置</label>
        {axisLabels.map((label, i) => (
          <div key={label} className="flex items-center mb-1">
            <span className="w-6 text-sm text-gray-400">{label}</span>
            <input
              type="number"
              step="0.1"
              value={selectedObject.position[i]}
              onChange={(e) => handlePositionChange(i, e.target.value)}
              className="flex-1 rounded bg-gray-700 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">旋转 (弧度)</label>
        {axisLabels.map((label, i) => (
          <div key={label} className="flex items-center mb-1">
            <span className="w-6 text-sm text-gray-400">{label}</span>
            <input
              type="number"
              step="0.1"
              value={selectedObject.rotation[i].toFixed(2)}
              onChange={(e) => handleRotationChange(i, e.target.value)}
              className="flex-1 rounded bg-gray-700 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">缩放</label>
        {axisLabels.map((label, i) => (
          <div key={label} className="flex items-center mb-1">
            <span className="w-6 text-sm text-gray-400">{label}</span>
            <input
              type="number"
              step="0.1"
              min="0.1"
              value={selectedObject.scale[i]}
              onChange={(e) => handleScaleChange(i, e.target.value)}
              className="flex-1 rounded bg-gray-700 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-1">颜色</label>
        <input
          type="color"
          value={selectedObject.color}
          onChange={(e) => handleColorChange(e.target.value)}
          className="w-full h-10 rounded cursor-pointer"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-1">材质</label>
        <select
          value={selectedObject.material}
          onChange={(e) => handleMaterialChange(e.target.value)}
          className="w-full rounded bg-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="standard">Standard</option>
          <option value="phong">Phong</option>
          <option value="lambert">Lambert</option>
          <option value="basic">Basic</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedObject.visible}
            onChange={(e) => updateObject(selectedObject.id, { visible: e.target.checked })}
            className="rounded"
          />
          可见
        </label>
      </div>
    </div>
  );
}

export default PropertiesPanel;
