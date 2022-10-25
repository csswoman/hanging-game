import { letters } from './helpers/letters'
import { HangImage } from './components/HangImage'
import './App.css'


function App() {
  return (
    <div className="App">
      <h1>Hanging game</h1>
        <HangImage imageNumber={ 9 } />
    <h3>_ _ _ _ _ _</h3>
      {
        letters.map((letter) => (
          <button key={ letter }>
            { letter }
            </button>
        ))
      }

    </div>
  )
}

export default App
