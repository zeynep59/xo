import React from 'react'
import './Square.css'

const Square = ({value, index}) => {
  return (
    <div className='square'>
      {value}
    </div>
  )
}

export default Square
