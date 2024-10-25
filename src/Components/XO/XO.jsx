import React, { useState } from "react";
import o from "../Assets/o.png";
import x from "../Assets/x.png";
import Scores from "../Scores/Scores";
import Square from "../Square/Square";
import "./XO.css";

const XO = ({
  gridSize,
  firstPlayer,
  secondPlayer,
  firstSymbol,
  secondSymbol,
  highScores,
  highScorePlayers
}) => {
  const [board, setBoard] = React.useState(
    Array(gridSize * gridSize).fill(null)
  );
  const [isGameOver, setIsGameOver] = React.useState(false);

  let data = Array(gridSize * gridSize).fill("");
  let [count, setCount] = useState(0);

  const toggle = (e, num) => {
    const updatedBoard = [...board];
    if (board[num] !== null) {
      return 0;
    }
    if (
      (count % 2 === 0 && firstSymbol === "x") ||
      (count % 2 !== 0 && secondSymbol === "x")
    ) {
      e.target.innerHTML = `<img src = '${x}'`;
      data[num] = "x";
      updatedBoard[num] = "x";
    } else {
      e.target.innerHTML = `<img src = '${o}'`;
      data[num] = "o";
      updatedBoard[num] = "o";
    }
    setBoard(updatedBoard);
    setCount(++count);
    isBoardFilled(updatedBoard);
  };

  const isBoardFilled = (board) => {
    if (!board.includes(null) && !board.includes("")) {
      setIsGameOver(true);
    }
  };

  if (isGameOver)
    return (
  <>
      {highScorePlayers} - {highScores}
      <Scores
        firstPlayer={firstPlayer}
        secondPlayer={secondPlayer}
        firstSymbol={firstSymbol}
        board={board}
        gridSize = {gridSize}
        highScores = {highScores}
        highScorePlayers = {highScorePlayers}
      />
      </>
    );

  return (
    <div className="container">
      <div className="title">
        <div>
          <h2>{firstPlayer}({firstSymbol}) </h2>
        </div>
        <h1> Vs </h1>
        <div>
          <h2>{secondPlayer}({secondSymbol}) </h2>
        </div>
      </div>

      <div
        className="board"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {board.map((value, index) => (
          <>
            <Square
              value={value}
              onClick={(e) => {
                toggle(e, index);
              }}
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default XO;
