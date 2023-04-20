import { useState } from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import UserInput from "./components/UserInput";
import { getPokemon } from "./api";
import "./styles.css";
import UserEnter from "./components/UserEnter";
import Timer from "./components/Timer";
import LeaderBoard from "./components/LeaderBoard";

export default function App() {
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [score, setScore] = useState(0);
  const [onCorrectPokemon, setOnCorrectPokemon] = useState(false);
  const [used, setUsed] = useState([]);
  const [userName, setUserName] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  
  const max = 151;

  const enteredUserName = (name) => {
    setUserName(name);
  };

  const clickNext = async () => {
    await getRandomPokemon();
    setGameStarted(true);
    setOnCorrectPokemon(false);
  };

  const fillUsed = () => {
    for (var i = 1; i <= max; i++) {
      used.push(i);
    }
    used.sort(() => Math.random() - 0.5);
    setUsed(used);
  };

  const getRandomNum = () => {
    if (used.length === 0) {
      fillUsed();
    }
    const rand = used.pop();
    setUsed(used);
    return rand;
  };

  const getRandomPokemon = async () => {
    const randNum = getRandomNum(max, used);
    const pokemon = await getPokemon(randNum);
    setCurrentPokemon(pokemon);
  };

  const tryGuess = (nameGuess) => {
    if (currentPokemon.name === nameGuess) {
      setScore(score + 1);
      setOnCorrectPokemon(true);
    } else {
      //wrong
    }
  };

  const changeGameState = () => {
    setGameOver(true);
  };

  return (
    <div className="App">
      {!gameOver ? (
        <div>
          {userName ? (
            <div>
              <div className="Header">
                <Header score={score} />
              </div>
              <div>
                <Timer startTimer={gameStarted} gameOver={changeGameState} />
              </div>
              <div className="Card">
                <Card
                  clickNext={clickNext}
                  pokemon={currentPokemon}
                  onCorrectPokemon={onCorrectPokemon}
                />
              </div>
              {!onCorrectPokemon && currentPokemon ? (
                <div className="UserInput">
                  <UserInput tryGuess={tryGuess}/>
                </div>
              ) : (
                <div className="bottomStatusText">
                  {onCorrectPokemon ? "Perfect!" : "Ready?"}
                </div>
              )}
            </div>
          ) : (
            <div>
              <UserEnter onClick={enteredUserName} />
            </div>
          )}
        </div>
      ) : (
        <div>
          <LeaderBoard name={userName} score={score} />
        </div>
      )}
      <footer className="copyRight">Copyright &copy; Jose Yamin 2021</footer>
    </div>
  );
}
