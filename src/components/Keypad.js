import React, { useEffect } from 'react';
import { useState } from 'react';
import useWordle from '../hooks/useWordle';

const Keypad = ({usedKeys, solution, keyPress}) => {
    const [letters, setLetters] = useState(null);
    useEffect(() => {
        fetch('http://localhost:3000/db.json')
        .then(res => res.json())
        .then(json => {
            return setLetters(json.letters);
        })
    }, [])
  return (
    <div className="keypad">
        <div className='row-1'>
            {letters && letters.map((l) => {
                const color = usedKeys[l.key];
                if(l.row === 1){
                    return (
                        <div key={l.key} onClick={() => keyPress(l.key)} className={color}>{l.key}</div>
                    )
                }
            })}
        </div>
        <div className='row-2'>
            {letters && letters.map((l) => {
                const color = usedKeys[l.key];
                if(l.row === 2){
                    return (
                        <div key={l.key} onClick={() => keyPress(l.key)} className={color}>{l.key}</div>
                    )
                }
            })}
        </div>
        <div className='row-3'>
            {letters && letters.map((l) => {
                const color = usedKeys[l.key];
                if(l.key === 'Enter'){
                    return (
                        <div key={l.key} onClick={() => keyPress(l.key)} className={'enter'}>{l.key}</div>
                    )
                }
                if(l.key === 'BS'){
                    return (
                        <div key={l.key} onClick={() => keyPress('Backspace')} className={'enter'}>{l.key}</div>
                    )
                }
                if(l.row === 3){
                    return (
                        <div key={l.key} onClick={() => keyPress(l.key)} className={color}>{l.key}</div>
                    )
                }
            })}
        </div>
    </div>
  )
}

export default Keypad