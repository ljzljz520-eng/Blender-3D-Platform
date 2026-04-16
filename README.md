# 3D建模平台

一个功能完整的在线3D建模平台，基于React、Three.js和Node.js开发。

## 功能特性

### 核心功能
- ✅ **几何体创建**：支持立方体、球体、圆柱体、圆锥体、圆环、平面等基本形状
- ✅ **模型变换**：平移、旋转、缩放操作
- ✅ **视图控制**：四种标准视图（透视图、顶视图、前视图、侧视图）
- ✅ **材质系统**：支持Standard、Phong、Lambert、Basic四种材质类型
- ✅ **光照系统**：环境光、方向光、点光源组合
- ✅ **模型导出**：支持GLB/GLTF格式导出
- ✅ **项目管理**：项目保存、加载、删除功能
- ✅ **属性编辑**：精确控制对象的位置、旋转、缩放、颜色等属性
- ✅ **用户引导**：交互式使用指南，降低使用门槛

### 技术架构
- **前端**：React 18 + Three.js + @react-three/fiber
- **状态管理**：Zustand
- **UI框架**：Tailwind CSS + Lucide Icons
- **后端**：Node.js + Express
- **数据存储**：JSON文件存储（可扩展为数据库）

## 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖

```bash
# 安装根目录依赖
npm install

# 安装前端依赖
cd client
npm install
cd ..

# 或者使用一键安装脚本
npm run install-all
```

### 运行项目

#### 开发模式（前后端同时启动）
```bash
npm run dev
```

#### 单独启动后端服务
```bash
npm run server
```
后端服务运行在 http://localhost:5000

#### 单独启动前端开发服务器
```bash
npm run client
```
前端应用运行在 http://localhost:3000

### 生产构建
```bash
npm run build
```

## 使用指南

### 基本操作

1. **创建几何体**
   - 点击左侧工具栏的几何体按钮
   - 支持：立方体、球体、圆柱体、圆锥体、圆环、平面

2. **选择对象**
   - 直接点击场景中的对象
   - 或在左侧项目面板的场景对象列表中点击

3. **变换操作**
   - 选中对象后，使用左侧工具栏的变换工具：
     - 移动（Move）
     - 旋转（Rotate）
     - 缩放（Scale）
   - 拖动变换控制器进行操作
   - 或在右侧属性面板输入精确数值

4. **视图操作**
   - **旋转视图**：按住鼠标左键拖动
   - **缩放视图**：滚动鼠标滚轮
   - **平移视图**：按住鼠标右键拖动
   - **切换视图**：点击顶部工具栏的视图按钮（透视图、顶视图、前视图、侧视图）

5. **属性编辑**
   - 选中对象后，在右侧属性面板可以修改：
     - 对象名称
     - 位置、旋转、缩放（精确数值）
     - 颜色
     - 材质类型
     - 可见性

6. **项目管理**
   - **新建项目**：点击项目管理面板的"+"按钮
   - **保存项目**：点击"保存项目"按钮
   - **加载项目**：点击项目列表中的项目
   - **删除项目**：悬停在项目上，点击删除按钮

7. **导出模型**
   - 点击左侧工具栏底部的导出按钮
   - 模型将以GLB格式下载

## API接口

### 项目管理API

- `GET /api/projects` - 获取所有项目列表
- `GET /api/projects/:id` - 获取指定项目详情
- `POST /api/projects` - 创建新项目
- `PUT /api/projects/:id` - 更新项目
- `DELETE /api/projects/:id` - 删除项目

## 项目结构

```
Blender-3D-Platform-0414_trinity/
├── server/
│   └── index.js              # 后端服务入口
├── client/
│   ├── src/
│   │   ├── components/       # React组件
│   │   │   ├── Toolbar.jsx
│   │   │   ├── PropertiesPanel.jsx
│   │   │   ├── ProjectPanel.jsx
│   │   │   ├── ViewportControls.jsx
│   │   │   ├── SceneObjects.jsx
│   │   │   ├── Object3D.jsx
│   │   │   ├── TransformControls.jsx
│   │   │   ├── Lights.jsx
│   │   │   ├── GridHelper.jsx
│   │   │   └── WelcomeGuide.jsx
│   │   ├── store/
│   │   │   └── useStore.js    # Zustand状态管理
│   │   ├── utils/
│   │   │   └── exportUtils.js # 导出工具函数
│   │   ├── styles/
│   │   │   └── index.css      # 全局样式
│   │   ├── App.jsx            # 主应用组件
│   │   └── index.js           # 应用入口
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── webpack.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── data/                       # 项目数据存储目录
├── package.json
└── README.md
```

## 性能优化

- 使用Three.js的实例化渲染
- 启用阴影映射优化
- 使用OrbitControls的阻尼效果提升用户体验
- 状态管理使用Zustand避免不必要的重渲染
- 响应延迟控制在200ms以内

## 浏览器兼容性

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## 未来扩展

- [ ] 顶点/边/面编辑模式
- [ ] 纹理贴图支持
- [ ] 更多几何体类型
- [ ] 撤销/重做功能
- [ ] 快捷键支持
- [ ] 多视图分屏
- [ ] 模型导入功能
- [ ] 协作编辑功能
- [ ] 3D打印支持

## 许可证

MIT License
