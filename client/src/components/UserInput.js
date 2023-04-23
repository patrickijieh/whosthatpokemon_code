import React, { useState } from "react";

const UserInput = (props) => {
  const { tryGuess } = props;

  const [search, setSearch] = useState("");

  const [color,setColor]=useState("black");


  const onChange = (e) => {
    setSearch(e.target.value);
    setColor("black");
  };

  const onClick = () => {
    tryGuess(search);
    setColor("red");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      tryGuess(search);
      setColor("red");
    }
  };

  return (
    <div>
      <div>
        <input
          className="guessInput"
          placeholder="Enter Pokemon name..."
          onChange={onChange}
          onKeyUp={handleKeyDown}
          autoFocus
          style={{color: color}}
        />
      </div>
      <div>
        <button className="guessButton" onClick={onClick}>
          Guess!
        </button>
      </div>
    </div>
  );
};

export default UserInput;
