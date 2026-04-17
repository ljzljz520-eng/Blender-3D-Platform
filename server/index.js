import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage });

const scenesDir = path.join(__dirname, 'scenes');
if (!fs.existsSync(scenesDir)) {
  fs.mkdirSync(scenesDir, { recursive: true });
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Blender 3D Platform API is running' });
});

app.post('/api/scenes', (req, res) => {
  try {
    const { name, sceneData } = req.body;
    const id = Date.now().toString();
    const filename = `${id}_${name || 'scene'}.json`;
    const filePath = path.join(scenesDir, filename);
    
    fs.writeFileSync(filePath, JSON.stringify(sceneData, null, 2));
    
    res.json({
      success: true,
      id,
      filename,
      message: 'Scene saved successfully'
    });
  } catch (error) {
    console.error('Save scene error:', error);
    res.status(500).json({ success: false, message: 'Failed to save scene' });
  }
});

app.get('/api/scenes', (req, res) => {
  try {
    const files = fs.readdirSync(scenesDir);
    const scenes = files
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const [id, ...nameParts] = file.split('_');
        const name = nameParts.join('_').replace('.json', '');
        const stats = fs.statSync(path.join(scenesDir, file));
        return {
          id,
          name,
          filename: file,
          createdAt: stats.birthtime,
          updatedAt: stats.mtime
        };
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    res.json({ success: true, scenes });
  } catch (error) {
    console.error('Get scenes error:', error);
    res.status(500).json({ success: false, message: 'Failed to get scenes' });
  }
});

app.get('/api/scenes/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(scenesDir, filename);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: 'Scene not found' });
    }
    
    const sceneData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.json({ success: true, sceneData });
  } catch (error) {
    console.error('Get scene error:', error);
    res.status(500).json({ success: false, message: 'Failed to get scene' });
  }
});

app.delete('/api/scenes/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(scenesDir, filename);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: 'Scene not found' });
    }
    
    fs.unlinkSync(filePath);
    res.json({ success: true, message: 'Scene deleted successfully' });
  } catch (error) {
    console.error('Delete scene error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete scene' });
  }
});

app.post('/api/upload/texture', upload.single('texture'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    
    res.json({
      success: true,
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`,
      message: 'Texture uploaded successfully'
    });
  } catch (error) {
    console.error('Upload texture error:', error);
    res.status(500).json({ success: false, message: 'Failed to upload texture' });
  }
});

app.get('/api/export/gltf/:sceneId', (req, res) => {
  try {
    res.json({
      success: true,
      message: 'GLTF export functionality will be implemented soon'
    });
  } catch (error) {
    console.error('Export GLTF error:', error);
    res.status(500).json({ success: false, message: 'Failed to export GLTF' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Blender 3D Platform API server running on http://localhost:${PORT}`);
  console.log(`📁 Scenes directory: ${scenesDir}`);
  console.log(`📤 Uploads directory: ${path.join(__dirname, 'uploads')}`);
});

export default app;
