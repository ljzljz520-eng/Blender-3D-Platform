import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Check, HelpCircle } from 'lucide-react';

function WelcomeGuide() {
  const [showGuide, setShowGuide] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const hasSeenGuide = localStorage.getItem('hasSeenGuide');
    if (!hasSeenGuide) {
      setTimeout(() => setShowGuide(true), 1000);
    }
  }, []);

  const steps = [
    {
      title: '欢迎使用3D建模平台！',
      content: '这是一个功能强大的在线3D建模工具，支持创建、编辑和导出3D模型。让我们快速了解一下基本功能。',
      icon: '🎉'
    },
    {
      title: '创建几何体',
      content: '点击左侧工具栏的几何体按钮，可以创建立方体、球体、圆柱体、圆锥体、圆环和平面等基本形状。',
      icon: '📦'
    },
    {
      title: '选择与变换',
      content: '点击场景中的对象可以选中它。使用移动、旋转、缩放工具来调整对象的位置和大小。也可以直接在右侧属性面板输入精确数值。',
      icon: '✋'
    },
    {
      title: '视图控制',
      content: '使用鼠标左键拖动旋转视图，滚轮缩放，右键平移。顶部工具栏可以切换不同的视图模式（透视图、顶视图、前视图、侧视图）。',
      icon: '👁️'
    },
    {
      title: '属性编辑',
      content: '在右侧属性面板中，您可以修改对象的名称、颜色、材质类型，以及精确控制位置、旋转、缩放等参数。',
      icon: '⚙️'
    },
    {
      title: '项目管理',
      content: '左侧项目面板可以保存和加载项目，随时保存您的工作进度。场景对象列表显示当前场景中的所有对象。',
      icon: '💾'
    },
    {
      title: '导出模型',
      content: '完成建模后，点击工具栏的导出按钮，可以将您的3D模型导出为GLB格式，在其他3D软件中使用。',
      icon: '📤'
    },
    {
      title: '开始创作吧！',
      content: '现在您已经了解了基本功能，开始创建您的第一个3D作品吧！如果需要帮助，随时点击右上角的帮助按钮。',
      icon: '🚀'
    }
  ];

  const handleClose = () => {
    setShowGuide(false);
    localStorage.setItem('hasSeenGuide', 'true');
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!showGuide) {
    return (
      <button
        onClick={() => setShowGuide(true)}
        className="fixed bottom-4 right-4 p-3 bg-blue-600 rounded-full shadow-lg hover:bg-blue-500 transition-colors z-50"
        title="帮助"
      >
        <HelpCircle size={24} />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">使用指南</h2>
          <button
            onClick={handleClose}
            className="p-1 rounded hover:bg-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <span className="text-5xl">{steps[currentStep].icon}</span>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-center">
            {steps[currentStep].title}
          </h3>
          <p className="text-gray-300 text-center leading-relaxed">
            {steps[currentStep].content}
          </p>
        </div>

        <div className="flex justify-center gap-1 mb-4">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStep ? 'bg-blue-500' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center justify-between p-4 border-t border-gray-700">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`flex items-center gap-1 px-4 py-2 rounded transition-colors ${
              currentStep === 0
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <ChevronLeft size={18} />
            上一步
          </button>

          <span className="text-sm text-gray-400">
            {currentStep + 1} / {steps.length}
          </span>

          <button
            onClick={handleNext}
            className="flex items-center gap-1 px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 transition-colors"
          >
            {currentStep === steps.length - 1 ? (
              <>
                <Check size={18} />
                完成
              </>
            ) : (
              <>
                下一步
                <ChevronRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeGuide;
