import React from 'react';

export default function App() {
  const handleProgressChange = (progress) => {
    console.log('Game progress:', progress);
  };

  const startNewGame = () => {
    console.log('Starting a new game...');
  };

  return (
    <div>
      <h1>Your Game Content</h1>
      <button onClick={() => handleProgressChange('lose')}>Game Over - You Lose</button>
      <button onClick={() => handleProgressChange('win')}>Game Over - You Win</button>

      <GameOver
        handleProgChange={handleProgressChange}
        startNewGame={startNewGame}
      />
    </div>
  );
}

export function GameOver({ handleProgChange, startNewGame }) {
  const handleGameOver = (result) => {
    handleProgChange(result);
  };

  return (
    <div>
      <h1>{'Game Over'}</h1>
      <p>{'Try again!'}</p>
      <button onClick={startNewGame}>Start New Game</button>
    </div>
  );
}
