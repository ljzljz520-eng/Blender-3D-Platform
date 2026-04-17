import ViewerScene from './scenes/ViewerScene';
import Toolbar from './components/Toolbar';
import PropertyPanel from './components/PropertyPanel';
import ProjectPanel from './components/ProjectPanel';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Toolbar />
      <ProjectPanel />
      <PropertyPanel />
      <div style={{ marginLeft: 250, marginRight: 300, marginTop: 56, height: 'calc(100vh - 56px)' }}>
        <ViewerScene />
      </div>
    </div>
  );
}

export default App;
