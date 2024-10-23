import React, { useState } from "react";
import XO from "../XO/XO";
import "./Start.css";

const Start = () => {
  const [firstPlayer, setFirstPlayer] = useState("");
  const [secondPlayer, setSecondPlayer] = useState("");
  const [gridSize, setGridSize] = useState(3);
  const [isStarted, setIsStarted] = useState(false);
  const [firstSymbol, setFirstSymbol] = useState("X");
  const [secondSymbol, setSecondSymbol] = useState("O");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstPlayer && secondPlayer) {
      setIsStarted(true);
    } else {
      alert("fill the fields");
    }
  };
  if (isStarted)
    return (
      <XO
        firstPlayer={firstPlayer}
        secondPlayer={secondPlayer}
        gridSize={gridSize}
        firstSymbol={firstSymbol}
        secondSymbol={firstSymbol === "X" ? "O" : "X"}
      />
    );

  return (
    <div className="gameSetup">
      <h1>Game Setup</h1>
      <form onSubmit={handleSubmit}>
        <div className="playerInput">
          <label>Player 1:</label>
          <input
            type="text"
            value={firstPlayer}
            onChange={(e) => setFirstPlayer(e.target.value)}
          />
          <select 
           value={firstSymbol}
           onChange={(e) => setFirstSymbol(e.target.value)}
          
           >
            <option value="X">X</option>
            <option value="O">O</option>
          </select>
        </div>

        <div className="playerInput">
          <label>Player 2:</label>
          <input
            type="text"
            value={secondPlayer}
            onChange={(e) => setSecondPlayer(e.target.value)}
          />
        </div>

        <div className="gridSize">
          <label>Grid Size:</label>
          <input
            type="number"
            value={gridSize}
            onChange={(e) => setGridSize(e.target.value)}
          />
        </div>

        <button type="submit">Start Game</button>
      </form>
    </div>
  );
};

export default Start;
