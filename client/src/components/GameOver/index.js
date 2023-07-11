import React, { useState } from 'react';
import "./gameOver.css"

export default function GameOver({handleProgChange}) {
    const [gameOver, setGameOver] = useState(false);
 const [win, setWin] = useState(false);
 const handleGameOver = (result) => {
   if (result === 'lose') {
     setGameOver(true);
     setWin(false);
   } else if (result === 'win') {
     setGameOver(true);
     setWin(true);
   }
 };
    return (
        <div>
     {gameOver ? (
       <div>
         <h1>{win ? 'You Win!' : 'You Lose!'}</h1>
         <p>Try again!</p>
       </div>
     ) : (
       <div>
         <h1>Your Game Content</h1>
         {/* Your game content goes here */}
         <button onClick={() => handleGameOver('lose')}>Game Over - You Lose</button>
         <button onClick={() => handleGameOver('win')}>Game Over - You Win</button>
       </div>
     )}
   </div>
    )
}

