import React from 'react';
import { Eye, Grid, Box, Monitor, Layers } from 'lucide-react';
import useStore from '../store/useStore';

function ViewportControls() {
  const { 
    viewMode, 
    setViewMode, 
    showGrid, 
    setShowGrid,
    showAxes,
    setShowAxes 
  } = useStore();

  const views = [
    { mode: 'perspective', label: '透视图' },
    { mode: 'top', label: '顶视图' },
    { mode: 'front', label: '前视图' },
    { mode: 'side', label: '侧视图' }
  ];

  return (
    <div className="flex items-center gap-2 ml-auto">
      <div className="flex items-center gap-1 mr-4">
        {views.map(({ mode, label }) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`px-3 py-1 text-xs rounded transition-colors ${
              viewMode === mode
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 border-l border-gray-700 pl-4">
        <label className="flex items-center gap-1 text-xs text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            checked={showGrid}
            onChange={(e) => setShowGrid(e.target.checked)}
            className="rounded"
          />
          <Grid size={14} />
          网格
        </label>
        <label className="flex items-center gap-1 text-xs text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            checked={showAxes}
            onChange={(e) => setShowAxes(e.target.checked)}
            className="rounded"
          />
          <Box size={14} />
          坐标轴
        </label>
      </div>
    </div>
  );
}

export default ViewportControls;
