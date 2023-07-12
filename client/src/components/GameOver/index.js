import React, { useState } from 'react';
// import { useQuery, useMutation } from '@apollo/client';
// import { QUERY_USER } from '../../utils/queries';
// import { UPDATE_USER_PROGRESSION, UPDATE_PARTY_MEMBER_HP } from '../../utils/mutations';

export default function GameOver({ handleProgChange, loss }) {
  // const [gameOver, setGameOver] = useState(false);
  // const [win, setWin] = useState(false);

  // const handleGameOver = (result) => {
  //   setGameOver(true);
  //   setWin(result === 'win');
  // };

  // const startNewGame = () => {
  //   setGameOver(false);
  //   setWin(false);


    // handleProgChange()
    // Additional logic to reset the game can be added here
  // };

  return (
    <div>
        <div className="game-over-message">
          <h2>Good Game</h2>
          <p>{loss ? 'You Lose!' : 'You Win!'}</p>
          {/* <button onClick={startNewGame}>Start New Game</button> */}
        </div>
    </div>
  );
}

