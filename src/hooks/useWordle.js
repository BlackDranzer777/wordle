import React, { useState } from 'react'

const useWordle = (solution) => {

    // console.log(solution);

    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([...Array(6)]); // each guess is an array
    const [history, setHistory] = useState([]); // each guess is a string
    const [isCorrect, setIsCorrect]  = useState(false);
    const [usedKeys, setUsedKeys] = useState({});
  
    //format a guess into an array of letter objects
    //e.g. [{key : 'a', color : 'yellow'}]
    const formatGuess = () => {
        
        let solutionArray = [...solution];
        let formattedGuess = [...currentGuess].map((l) => {
            return {key : l, color : 'grey'}
        });

        //find green letters
        formattedGuess.forEach((l,i) => {
            if(solutionArray[i] === l.key){
                formattedGuess[i].color = 'green';
                solutionArray[i] = null;
            }
        });

        //find yellow letters
        formattedGuess.forEach((l,i) => {
            if(solutionArray.includes(l.key) && (l.color !== 'green')){
                formattedGuess[i].color = 'yellow';
                solutionArray[solutionArray.indexOf(l.key)] = null;
            }
        });

        return formattedGuess;
        

        // console.log('Guess is correct and is in format function');
    }


    //add a new guess to the guesses state
    //update the isCorrect state if the guess is correct
    //add one to the turn state
    const addNewGuess = (formattedGuess) => {
        if(currentGuess === solution){
            setIsCorrect(true);
        }
        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses];
            newGuesses[turn] = formattedGuess;
            return newGuesses;
        });

        setHistory((prevHistory) => {
            prevHistory.push(currentGuess);
            return prevHistory;
        });

        setUsedKeys((prevUsedKeys) => {
            let newKeys = {...prevUsedKeys}
            formattedGuess.forEach((l) => {
                const currentColor = prevUsedKeys[l.key];

                if(l.color === 'green'){
                    prevUsedKeys[l.key] = 'green';
                    return
                }
                if(l.color === 'yellow' && currentColor !== 'green'){
                    prevUsedKeys[l.key] = 'yellow';
                    return;
                }
                if(l.color === 'grey' && currentColor !== ('green' || 'yellow')){
                    prevUsedKeys[l.key] = 'grey';
                    return;
                }
            });

            return prevUsedKeys;
        })

        setTurn((prevTurn) => prevTurn + 1 );
        setCurrentGuess('');
    }

    //handle keyup event & track current guess
    //if user presses enter, add the new guess
    const handleKeyup = ({key}) => {
        // console.log("key pressed : ", key);
        if(key === 'Enter'){
            //only add guess if turn is less than 6
            if(turn > 5){
                console.log('Sorry!, you are out of turn');
                return;
            }
            //do not allow duplicate words
            if(history.includes(currentGuess)){
                console.log('You already entered this word');
                return;
            }
            //check word is 5 chars long
            if(currentGuess.length !== 5){
                console.log('word length must be 5.');
                return;
            }
            const formatted = formatGuess();
            addNewGuess(formatted);
        }
        if(key === 'Backspace'){
            setCurrentGuess((prev) => {
                return prev.slice(0,-1);
            })
        }
        if(/^[A-Za-z]$/.test(key) && currentGuess.length < 5){
            setCurrentGuess((prev) => {
                return prev + key;
            });
        }
    }

    return {turn, currentGuess, guesses, isCorrect, usedKeys,handleKeyup};

}

export default useWordle;