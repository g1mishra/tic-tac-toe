import React from "react";
import { useState } from "react";
import Box from "./box";

const win_Arr = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const option = {
  user: "X",
  comp: "0",
};

const delay = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 300);
  });
};

const getComputerIndex = (arr) => {
  // filter X,0 value index
  let tempArr = [...arr];
  tempArr = tempArr.map((val, index) => (val === option.comp || val === option.user ? -1 : index));
  tempArr = tempArr.filter((val) => val !== -1);
  const randIndex = Math.floor(Math.random() * tempArr.length);
  return tempArr.length ? tempArr[randIndex] : -1;
};

const isWinner = (tempArr) => {
  //  there are fixed index to win
  for (const arr of win_Arr) {
    const [idx1, idx2, idx3] = arr;
    if (tempArr[idx1] && tempArr[idx1] === tempArr[idx2] && tempArr[idx2] === tempArr[idx3]) {
      return tempArr[idx1] === option.user ? "You" : "Computer";
    }
  }

  return null;
};

const Board = () => {
  const [gameState, setGameState] = useState(Array(9).fill(""));
  const [isNextX, setIsNextX] = useState(true);

  const resetgame = () => {
    setGameState(new Array(9).fill(null));
    setIsNextX(true);
  };

  const handleChange = async (index) => {
    if (!isNextX || gameState[index]) return;
    // user play
    const tempArr = [...gameState];
    tempArr.splice(index, 1, option.user);
    setGameState(tempArr);
    setIsNextX(false);

    await delay();

    let winner = isWinner(tempArr);
    if (winner) {
      alert(`The Winner is : ${winner}`);
      resetgame();
      return;
    }

    // computer play
    const randomAvailableIndex = getComputerIndex(tempArr);
    if (randomAvailableIndex < 0) {
      alert("Game Draw");
      resetgame();
      return;
    }

    tempArr.splice(randomAvailableIndex, 1, option.comp);
    setGameState(tempArr);
    setIsNextX(true);

    await delay();

    winner = isWinner(tempArr);
    if (winner) {
      alert(`The Winner is : ${winner}`);
      resetgame();
      return;
    }
  };

  return (
    <div className="h-[90vh] w-full flex justify-center items-center">
      <div className="grid grid-cols-3 gap-1">
        {gameState.map((box, idx) => (
          <Box key={idx} value={box} onClick={() => handleChange(idx)} />
        ))}
      </div>
    </div>
  );
};

export default Board;

// thanks for watching please keep supporting for more content
// bye bye :)