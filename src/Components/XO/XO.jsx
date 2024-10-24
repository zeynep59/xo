import React, { useState } from "react";
import o from "../Assets/o.png";
import x from "../Assets/x.png";
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

  let data = Array(gridSize * gridSize).fill("");
  let [lock, setLock] = useState(false);
  let [count, setCount] = useState(0);

const toggle = (e, num) => {
  const updatedBoard = [...board];
  if(lock || board[num]!==null){
    return 0;
  }
  if((count%2===0 && firstSymbol==="x") || (count%2!==0 && secondSymbol==="x")){
    e.target.innerHTML  = `<img src = '${x}'`;
    data[num] = "x";
    updatedBoard[num] = "x";
  }
  else{
    e.target.innerHTML  = `<img src = '${o}'`;
    data[num] = "o";
    updatedBoard[num] = "o";
  }
  setBoard(updatedBoard);
  setCount(++count);

}




  return (
    <div className="container">
      <div className="title">
        <div>
          <h2>{firstPlayer} </h2>
          {/* <h2>{firstSymbol}</h2> */}
        </div>
          <h1> Vs </h1>
        <div>
          <h2>{secondPlayer} </h2>
          {/* <h2>{secondSymbol}</h2> */}
        </div>
      </div>

      <div
        className="board"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {board.map((value, index) => (
          <>
         <Square value={value} onClick={(e)=>{toggle(e,index)}} />
          {console.log({value},{index})}
          </>
        ))}
        
      </div>
      <button className="reset">Play Again</button>
    </div>
  );
};

export default XO;
