import React from 'react';

const Modal = ({isCorrect, turn, solution, crossClickHandler}) => {
    
  return (
    <div className='modal'>
        {isCorrect && (
            <div className='conatiner'>
                <span className='cross' onClick={crossClickHandler}>X</span>
                <h1>You Win!</h1>
                <p className='solution'>{solution}</p>
                <p>You found the solution in {turn} guesses :)</p>
            </div>
        )}
        {!isCorrect && (
            <div className='container'>
                <span className='cross' onClick={crossClickHandler}>X</span>
                <h1>Nevermind!</h1>
                <p className='solution'>{solution}</p>
                <p>Better Luck next time</p>
            </div>
        )}
    </div>
  )
}

export default Modal