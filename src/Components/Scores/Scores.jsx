import React, { useEffect, useState } from "react";
import Start from "../Start/Start";
import "./Scores.css";

const Scores = ({
  firstPlayer,
  secondPlayer,
  firstSymbol,
  board,
  gridSize,
}) => {
  const [firsPlayerScore, setFirstPlayerScore] = useState(0);
  const [secondPlayerScore, setSecondPlayerScore] = useState(0);
  const [isReset, setIsReset] = useState(false);

  const resetGame = () => {
    setIsReset(true);
  };

useEffect ( () => {
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
          if (board[index] === board[i + 1] && (i + 1) % gridSize !== 0) {
            //!
            isInHorizontalScore[i+1] = true;
            countHorizontal++;
          } else {
            break;
          }
        }

     // for the vertical lines => index====index+gridSize
      if (!isInVerticalScore[index])
        for (let i = index; i < board.length - gridSize; i += gridSize) {
          if (board[index] === board[i + gridSize]) {
            isInVerticalScore[i + gridSize] = true;
            countVertical++;
          } else {
            break;
          }
        }

      //for the crosswise lines in the right direction   => index === index + gridSize+1
      if (!isInRightCrosswiseScore[index])
        for (
          let i = index;
          i < board.length - gridSize - 1;
          i += gridSize + 1
        ) {
          if (board[index] === board[i + gridSize + 1] && (i+1) % gridSize !== 0) {
            isInRightCrosswiseScore[i + gridSize + 1] = true;
            countRightCrosswise++;

          } else {
            break;
          }
         }
      //for the crosswise lines in the left direction   => index === index + gridSize-1
      if (!isInLeftCrosswiseScore[index])
        for (
          let i = index;
          i < board.length - gridSize + 1;
          i += gridSize - 1
        ) {
          if (board[index] === board[i + gridSize - 1] && i%gridSize!==0) {
            isInLeftCrosswiseScore[i + gridSize - 1] = true;
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







   if (isReset) return( <Start />);

  return (
    <div>
      <div className="scores">
        <h1>{firstPlayer} - {firsPlayerScore}</h1>
        <h1>{secondPlayer} - {secondPlayerScore} </h1>
      </div>

      <button className="reset" onClick={resetGame}>
        Play Again
      </button>
    </div>
  );
};

export default Scores;
