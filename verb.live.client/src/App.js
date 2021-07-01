import './App.css';
import Chat from './Components/Chat';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ margin: '0 30%' }}>
          <h2>Verb Live Client</h2>
          <Chat />
        </div>
      </header>
    </div>
  );
}

export default App;
