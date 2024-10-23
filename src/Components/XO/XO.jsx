import React, { useState } from "react";
import Square from "../Square/Square";
import "./XO.css";

const XO = ({
  gridSize,
  firstPlayer,
  secondPlayer,
  firstSymbol,
  secondSymbol,
}) => {
  const [board, setBoard] = React.useState(
    Array(gridSize * gridSize).fill(null)
  );
  const [currentPlayer, setCurrentPlayer] = React.useState(firstPlayer);
  const [firsPlayerScore, setFirstPlayerScore] = useState(0);
  const [secondPlayerScore, setSecondPlayerScore] = useState(0);

  return (
    <div className="container">
      <div className="title">
        <div>
          <h2>{firstPlayer} </h2>
          <h2>{firstSymbol}</h2>
        </div>
          <h1> Vs </h1>
        <div>
          <h2>{secondPlayer} </h2>
          <h2>{secondSymbol}</h2>
        </div>
      </div>

      <div
        className="board"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {board.map((value, index) => (
          <Square value={value} />
        ))}
        ;
      </div>

      <button className="reset">Play Again</button>
    </div>
  );
};

export default XO;
