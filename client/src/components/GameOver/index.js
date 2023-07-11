import React, { useState } from 'react';
import './gameOver.css';

export default function GameOver({ handleProgChange }) {
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  const handleGameOver = (result) => {
    setGameOver(true);
    setWin(result === 'win');
  };

  const startNewGame = () => {
    setGameOver(false);
    setWin(false);
    // Additional logic to reset the game can be added here
  };

  return (
    <div>
      {gameOver ? (
        <div>
          <h1>{win ? 'You Win!' : 'You Lose!'}</h1>
          <p>Try again!</p>
          <button onClick={startNewGame}>Start New Game</button>
        </div>
      ) : (
        <div>
          <h1>Your Game Content</h1>
        
          <button onClick={() => handleGameOver('lose')}>Game Over - You Lose</button>
          <button onClick={() => handleGameOver('win')}>Game Over - You Win</button>
        </div>
      )}
    </div>
  );
}
