import React from 'react'
import o from "../Assets/o.png"
import x from "../Assets/x.png"
import './Square.css'

const Square = ({value, onClick}) => {
  return (
    <div className='square' onClick={onClick}>
    {value ? <img src={value === "x" ? x : o} alt={value} /> : null}
  </div>
  )
}

export default Square
