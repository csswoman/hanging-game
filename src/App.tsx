import { useEffect, useState } from 'react'
import { letters } from './helpers/letters'
import { HangImage } from './components/HangImage'
import './App.css'

function App() {
  
  const [ word ]= useState('COMPUTADORA');
  const [ hiddenWord, setHiddenWord ] = useState( '_ '.repeat( word.length ) );
  const [ attemtps, setAttempts ] = useState(0);
  const [ lose, setLose ] = useState ( false );
  const [ won, setWon ] = useState ( false );

  // Determinar si la persona perdió
  useEffect ( () => {
    if ( attemtps >= 9 ) {
      setLose ( true );
    }
  }, [ attemtps ]);

  // Determinar si la persona ganó
  useEffect( ()=> {
    const currentHiddenWord = hiddenWord.split(' ').join('');
      if ( currentHiddenWord === word ) {
        setWon( true);
      }
  }, [ hiddenWord ]);

  const checkLetter = ( letter: string ) => {

    if ( lose ) return;

    if ( !word.includes(letter) ) {
      setAttempts ( Math.min ( attemtps + 1, 9 ) );
      return;
    }
    
    const hiddenWordArray = hiddenWord.split(' ');

    for( let i=0; i < word.length; i++) {
      if ( word[i] === letter ) {
        hiddenWordArray[i] = letter;
      }
    }

    setHiddenWord( hiddenWordArray.join(' ') );
  }

  return (
    <div className="App">
      <h1>Hanging game</h1>

      <HangImage imageNumber={ attemtps } />
      <h2>{ hiddenWord }</h2>

      <h3>Intentos: { attemtps }</h3>

      {
        ( lose ) 
        ? <h2>Perdió, la palabra correcta era {word}</h2>
        : ''
      }

{
        ( won ) 
        ? <h2>Felicidades, usted ganó</h2>
        : ''
      }

        {
          letters.map((letter) => (
            <button
              onClick={ () => checkLetter(letter) }
              key={ letter }
            >
              { letter }
              </button>
          ))
        }
    </div>
  )
}

export default App
