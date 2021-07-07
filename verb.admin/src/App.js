import './App.css';
import Chat from './Components/Chat';
import Overlays from './Components/Overlays';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ margin: '0 30%' }}>
          <h2>Verb Admin</h2>
          <Chat />
          <Overlays />
        </div>
      </header>
    </div>
  );
}

export default App;
