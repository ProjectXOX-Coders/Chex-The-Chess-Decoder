import { useState } from 'react'
import Board from './components/Board'
import Menu from './components/Menu'
import './App.css'

function App() {
  const [mode, setMode] = useState('MENU'); // MENU, PVP, PVE, COACH

  const handleBackToMenu = () => {
    setMode('MENU');
  };

  return (
    <div className="app-container">
      {mode === 'MENU' ? (
        <Menu onSelectMode={setMode} />
      ) : (
        <>
          <h1 className="game-title">
            {mode === 'PVP' && 'Friend vs Friend'}
            {mode === 'PVE' && 'You vs AI'}
            {mode === 'COACH' && 'Coach Mode'}
          </h1>
          <Board gameMode={mode} onBack={handleBackToMenu} />
        </>
      )}
    </div>
  )
}

export default App
