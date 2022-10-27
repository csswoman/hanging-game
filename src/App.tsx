import { useEffect, useState } from "react";
import { HangImage } from "./components/HangImage";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { letters } from "./helpers/letters";
import { getRandomWord } from "./helpers/getRandomWord";

function App() {
  const [word, setWord] = useState(getRandomWord());
  const [hiddenWord, setHiddenWord] = useState("_ ".repeat(word.length));
  const [attemtps, setAttempts] = useState(0);
  const [lose, setLose] = useState(false);
  const [won, setWon] = useState(false);

  // Determina si la persona perdió
  useEffect(() => {
    if (attemtps >= 9) {
      setLose(true);
    }
  }, [attemtps]);

  // Determina si la persona ganó
  useEffect(() => {
    const currentHiddenWord = hiddenWord.split(" ").join("");
    if (currentHiddenWord === word) {
      setWon(true);
    }
  }, [hiddenWord]);

  const checkLetter = (letter: string) => {
    if (lose) return;
    if (won) return;

    if (!word.includes(letter)) {
      setAttempts(Math.min(attemtps + 1, 9));
      return;
    }

    const hiddenWordArray = hiddenWord.split(" ");

    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        hiddenWordArray[i] = letter;
      }
    }

    setHiddenWord(hiddenWordArray.join(" "));
  };

  const newGame = () => {
    const newWord = getRandomWord();

    setWord(newWord);
    setHiddenWord("_ ".repeat(newWord.length));
    setLose(false);
    setWon(false);
    setAttempts(0);
  };

  return (
    <div className="App">
      <div className="bg-app">
        <AnimatedBackground />
        <main className="content">
          <h1 className="title">Juego del ahorcado</h1>
          <p>
            Intenta descubrir la palabra secreta haciendo clic en las letras
          </p>
          <HangImage imageNumber={attemtps} />

          <div className="attemps-box">
            <h2>{hiddenWord}</h2>
            <h3>Intentos: {attemtps}</h3>

            {lose ? <h3>Perdió, la palabra correcta era <span className="word">{word}</span> </h3> : ""}

            {won ? <h3>Felicidades, usted ganó</h3> : ""}
          </div>
          <div className="letter-box">
            {letters.map((letter) => (
              <button
                onClick={() => checkLetter(letter)}
                key={letter}
                className="letter-btn btn"
              >
                {letter}
              </button>
            ))}
          </div>

          <button onClick={newGame} className="new-game btn">
            ¿Nuevo juego?
          </button>
        </main>
      </div>
    </div>
  );
}

export default App;
