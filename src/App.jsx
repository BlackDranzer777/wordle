import './App.css';
import React, {useState, useEffect} from 'react';
import Wordle from './components/Wordle';



function App() {

  const [solution, setSolution] = useState(null);
  useEffect(() => {
    fetch('http://localhost:3000/db.json')
    .then(res => res.json())
    .then(json => {
      const solutions = json.solutions;
      const randomSolution = solutions[Math.floor(Math.random()*solutions.length)];
      setSolution(randomSolution.word)
    });
    
  }, [setSolution])

  console.log('Solution: ', solution)
  return (
    <div className="App">
      <h1>Hurdle</h1>
      {solution && <Wordle solution={solution}/>}
    </div>
  );
}

export default App;
