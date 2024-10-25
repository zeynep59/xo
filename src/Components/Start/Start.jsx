import React, { useEffect, useState } from "react";
import XO from "../XO/XO";
import "./Start.css";

const Start = ({highScorePlayersProp,  highScoresProp }) => {
  const [firstPlayer, setFirstPlayer] = useState("");
  const [secondPlayer, setSecondPlayer] = useState("");
  const [gridSize, setGridSize] = useState(3);
  const [isStarted, setIsStarted] = useState(false);
  const [firstSymbol, setFirstSymbol] = useState("x");
 const [highScores, setHighScores] = useState([]);
 const [highScorePlayers, setHighScorePlayers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstPlayer && secondPlayer) {
      setIsStarted(true);
    } else {
      alert("fill the fields");
    }
  };


  useEffect(()=>{
    if(highScorePlayers!==null){
      setHighScorePlayers(highScorePlayersProp);
      setHighScores(highScoresProp);
    }
   
  }, [highScorePlayersProp, highScorePlayers, highScoresProp, highScores])


  if (isStarted)
    return (
      <XO
        firstPlayer={firstPlayer}
        secondPlayer={secondPlayer}
        gridSize={gridSize}
        firstSymbol={firstSymbol}
        secondSymbol={firstSymbol === "x" ? "o" : "x"}
        highScores = {highScores}
        highScorePlayers = {highScorePlayers}
      />
    );

  return (
  <>
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
            <option value="x">X</option>
            <option value="o">O</option>
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

    <div className="bestPlayers">
      <h2>High Scores</h2>
      
      {highScores.map((value, index) => (
  <h4 key={index}>{value} - {highScorePlayers[index]}</h4>
))}

    </div>
    </>
  );
};

export default Start;
