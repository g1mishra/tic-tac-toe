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

const isBoardFull = (board) => {
  return board.every(cell => cell !== "");
};

const getEmptyCells = (board) => {
  return board.reduce((acc, cell, idx) => {
    if (!cell) acc.push(idx);
    return acc;
  }, []);
};

const minimax = (board, depth, isMaximizing) => {
  const winner = isWinner(board);
  
  if (winner === "computer") return 10 - depth;
  if (winner === "user") return depth - 10;
  if (isBoardFull(board)) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    getEmptyCells(board).forEach(idx => {
      board[idx] = option.comp;
      const score = minimax(board, depth + 1, false);
      board[idx] = "";
      bestScore = Math.max(score, bestScore);
    });
    return bestScore;
  } else {
    let bestScore = Infinity;
    getEmptyCells(board).forEach(idx => {
      board[idx] = option.user;
      const score = minimax(board, depth + 1, true);
      board[idx] = "";
      bestScore = Math.min(score, bestScore);
    });
    return bestScore;
  }
};

const getBestMove = (board) => {
  let bestScore = -Infinity;
  let bestMove = -1;

  getEmptyCells(board).forEach(idx => {
    board[idx] = option.comp;
    const score = minimax(board, 0, false);
    board[idx] = "";
    if (score > bestScore) {
      bestScore = score;
      bestMove = idx;
    }
  });

  return bestMove;
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

    // computer play - replace random move with optimal move
    const bestMove = getBestMove(tempArr);
    if (bestMove < 0) {
      setIsAlert("Game Draw");
      setStats((prev) => ({ ...prev, computer: prev.computer + 1, user: prev.user + 1 }));
      resetgame();
      return;
    }
    tempArr.splice(bestMove, 1, option.comp);
    setGameState(tempArr);
    setIsNextX(true);
    await delay();
    if (handleWinner(tempArr)) return;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="h-[90vh] w-full flex flex-col gap-6 justify-center items-center">
        {isAlert ? <Alert message={isAlert} close={() => setIsAlert(null)} /> : null}
        
        <div className="flex flex-col w-full max-w-xs rounded-xl bg-gray-700 shadow-lg overflow-hidden">
          <div className="flex border-b border-gray-600 p-3 justify-center bg-gray-800 text-white font-bold">
            Score Board
          </div>
          <div className="flex justify-between gap-2 w-full p-4 text-white">
            <p className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400"></span>
              Computer: {stats.computer}
            </p>
            <p className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-400"></span>
              You: {stats.user}
            </p>
          </div>
        </div>

        <div className="text-white text-lg mb-4">
          {isNextX ? "Your turn" : "Computer's turn..."}
        </div>

        <div className="grid grid-cols-3 gap-2 max-w-xs w-full text-xl font-bold p-4 bg-gray-700 rounded-xl">
          {gameState.map((box, idx) => (
            <Box key={idx} value={box} onClick={() => handleChange(idx)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;

// thanks for watching please keep supporting for more content
// bye bye :)
