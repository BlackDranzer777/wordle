import React, { useEffect, useState } from 'react';
import useWordle from '../hooks/useWordle';
import Grid  from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';

const Wordle = ({solution}) => {
    const {currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys } = useWordle(solution);
    const [showModal, setShowModal] = useState(false);
    const [clickCloseModal, setClickCloseModal] = useState(false);
    var timer;
    
    function keyPress(key){
      // console.log(key);
      return handleKeyup({key});
    }

    function setTimerFunc(){
      timer = setTimeout(() => setShowModal(true), 2000,1);
    }

    function crossClickHandler(){
      setClickCloseModal(true);
      clearTimeout(timer);
      setShowModal(false);
      return;
    }

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup);
        if(isCorrect){
          if(!clickCloseModal){
            setTimerFunc();
          }
          window.removeEventListener('keyup', handleKeyup);
        }

        if(turn > 5){
          if(!clickCloseModal){
            setTimerFunc();
          }
          window.removeEventListener('keyup', handleKeyup);
        }

        return () => window.removeEventListener('keyup', handleKeyup);
    }, [handleKeyup, isCorrect, turn, keyPress]);


  return (
    <>
      {/* <div>{solution}</div>
      <div>current guess - {currentGuess}</div> */}
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn}/>
      <Keypad usedKeys={usedKeys} solution={solution} keyPress={keyPress}/>
      {showModal && <Modal crossClickHandler={crossClickHandler} isCorrect={isCorrect} solution={solution} turn={turn}/>} 
    </> 
  )
}

export default Wordle;
