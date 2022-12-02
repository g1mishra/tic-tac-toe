import React, { useState } from "react";
import Alert from "./alert";
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
      return tempArr[idx1] === option.user ? "user" : "computer";
    }
  }

  return null;
};

const Board = () => {
  const [isAlert, setIsAlert] = useState(null);
  const [stats, setStats] = useState({ computer: 0, user: 0 });
  const [gameState, setGameState] = useState(Array(9).fill(""));
  const [isNextX, setIsNextX] = useState(true);

  const resetgame = () => {
    setGameState(new Array(9).fill(null));
    setIsNextX(true);
  };

  const handleWinner = (tempArr) => {
    let winner = isWinner(tempArr);
    if (winner) {
      setIsAlert(`The Winner is : ${winner === "user" ? "You" : "Computer"}`);
      setStats((prev) => {
        return { ...prev, [winner]: prev[winner] + 1 };
      });
      resetgame();
      return true;
    }
    return false;
  };

  const handleChange = async (index) => {
    if (!isNextX || gameState[index]) return;
    // user play
    const tempArr = [...gameState];
    tempArr.splice(index, 1, option.user);
    setGameState(tempArr);
    setIsNextX(false);

    await delay();
    if (handleWinner(tempArr)) return;
    // computer play
    const randomAvailableIndex = getComputerIndex(tempArr);
    if (randomAvailableIndex < 0) {
      setIsAlert("Game Draw");
      setStats((prev) => ({ ...prev, computer: prev.computer + 1, user: prev.user + 1 }));
      resetgame();
      return;
    }
    tempArr.splice(randomAvailableIndex, 1, option.comp);
    setGameState(tempArr);
    setIsNextX(true);
    await delay();
    if (handleWinner(tempArr)) return;
  };

  return (
    <div className="h-[90vh] w-full flex flex-col gap-4 justify-center items-center uppercase text-sm">
      {isAlert ? <Alert message={isAlert} close={() => setIsAlert(null)} /> : null}
      <div className="flex flex-col w-full max-w-xs border rounded-md bg-gray-800 text-white">
        <div className="flex border-b p-2 justify-center">Score Board</div>
        <div className="flex justify-between gap-2 w-full p-2">
          <p>Computer : {stats.computer}</p>
          <p>You : {stats.user}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-0.5 max-w-xs w-full text-xl font-bold">
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
