import React from 'react';

export default function Menu({ onSelectMode }) {
    return (
        <div className="menu-container">
            <h1 className="game-title">Mind Mate: The Chess Brain</h1>
            <div className="menu-options">
                <button className="menu-card" onClick={() => onSelectMode('PVP')}>
                    <div className="card-icon">👥</div>
                    <h2>Play vs Friend</h2>
                    <p>Local 2-player game</p>
                </button>

                <button className="menu-card" onClick={() => onSelectMode('PVE')}>
                    <div className="card-icon">🤖</div>
                    <h2>Play vs AI</h2>
                    <p>Challenge the engine</p>
                </button>

                <button className="menu-card" onClick={() => onSelectMode('COACH')}>
                    <div className="card-icon">🎓</div>
                    <h2>Learn to Play</h2>
                    <p>AI Coach & Analysis</p>
                </button>
            </div>
        </div>
    );
}
