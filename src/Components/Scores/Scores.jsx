import React, { useEffect, useState } from "react";
import Start from "../Start/Start";
import "./Scores.css";

const Scores = ({
  firstPlayer,
  secondPlayer,
  firstSymbol,
  board,
  gridSize,
  highScores,
  highScorePlayers

}) => {
  const [firsPlayerScore, setFirstPlayerScore] = useState(0);
  const [secondPlayerScore, setSecondPlayerScore] = useState(0);
  const [isReset, setIsReset] = useState(false);
  const [allHighScores, setAllHighScores] = useState([...highScores]);
  const [winners, setWinners] = useState([...highScorePlayers]);
  const [sizeOfGrid, setSizeOfGrid] = useState(3);

  const resetGame = () => {
    setIsReset(true);
    let newHighScore = firsPlayerScore>secondPlayerScore ? firsPlayerScore:secondPlayerScore;
    let newWinner = firsPlayerScore>secondPlayerScore ? firstPlayer : secondPlayer;
    
    setAllHighScores((prevScores) => [...prevScores, newHighScore]);
    setWinners((prevWinners) => [...prevWinners, newWinner]);
  };

  useEffect(() => {
    setSizeOfGrid(Number(gridSize));
    handleScore();

  });

  const handleScore = () => {
    let isInHorizontalScore = Array(board.length).fill(false);
    let isInVerticalScore = Array(board.length).fill(false);
    let isInLeftCrosswiseScore = Array(board.length).fill(false);
    let isInRightCrosswiseScore = Array(board.length).fill(false);

    let firstScore = 0;
    let secondScore = 0;

    for (let index = 0; index < board.length; index++) {
      let countHorizontal = 1;
      let countVertical = 1;
      let countLeftCrosswise = 1;
      let countRightCrosswise = 1;
      let indexScore = 0;

      //for the horizontal lines => except the last column + 1 (i+1 % gridSize === 0)
      if (!isInHorizontalScore[index])
        for (let i = index; i < board.length - 1; i++) {
          if (board[index] === board[i + 1] && (i + 1) % sizeOfGrid !== 0) {
            isInHorizontalScore[i + 1] = true;
            countHorizontal++;
          } else {
            break;
          }
        }

      // for the vertical lines => index====index+gridSize
      if (!isInVerticalScore[index])
        for (let i = index; i < board.length - sizeOfGrid; i += sizeOfGrid) {
      const next = Number(i)+Number(gridSize);
          if (board[i] === board[next]) {
            isInVerticalScore[next] = true;
            countVertical++;
          } else {
            break;
          }
        }

      //for the crosswise lines in the right direction   => index === index + gridSize+1
      if (!isInRightCrosswiseScore[index])
        for (
          let i = index;
          i < board.length - sizeOfGrid - 1;
          i += sizeOfGrid + 1
        ) {
          if (
            board[index] === board[i + sizeOfGrid + 1] &&
            (i + 1) % sizeOfGrid !== 0
          ) {
            isInRightCrosswiseScore[i + sizeOfGrid + 1] = true;
            countRightCrosswise++;
          } else {
            break;
          }
        }


      //for the crosswise lines in the left direction   => index === index + gridSize-1
      if (!isInLeftCrosswiseScore[index])
        for (
          let i = index;
          i < board.length - sizeOfGrid + 1;
          i += sizeOfGrid - 1
        ) {
          if (board[index] === board[i + sizeOfGrid - 1] && i % sizeOfGrid !== 0) {
            isInLeftCrosswiseScore[i + sizeOfGrid - 1] = true;
            countLeftCrosswise++;
          } else {
            break;
          }
        }

      indexScore +=
        countHorizontal !== 1 ? countHorizontal * countHorizontal : 0;
      indexScore += countVertical !== 1 ? countVertical * countVertical : 0;
      indexScore +=
        countRightCrosswise !== 1
          ? countRightCrosswise * countRightCrosswise
          : 0;
      indexScore +=
        countLeftCrosswise !== 1 ? countLeftCrosswise * countLeftCrosswise : 0;
      if (firstSymbol === board[index]) {
        firstScore += indexScore;
      } else {
        secondScore += indexScore;
      }
    }

    setFirstPlayerScore(firstScore);
    setSecondPlayerScore(secondScore);
    
   
  };

  if (isReset) return <Start highScoresProp={allHighScores} highScorePlayersProp={winners}/>;

  return (
    <div>
        <div className="scores">
            <div className="score">
            <h1 className="username">{firstPlayer} </h1>
            <h1> {firsPlayerScore}</h1>

            </div>
            <div className="score">
                   <h1 className="username">{secondPlayer} </h1>
                   <h1> {secondPlayerScore}</h1>

            </div>
        </div>
        <button className="reset" onClick={resetGame}>Play Again</button>
    </div>
);

};

export default Scores;
