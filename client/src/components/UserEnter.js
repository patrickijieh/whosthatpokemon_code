import React, { useState } from "react";

const UserEnter = (props) => {
  const { onClick } = props;

  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  const welcomeText = `Who's That Pokemon Quiz`;

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      enteredName();
    }
  };

  const onChange = (evt) => {
    setUserName(evt.target.value);
  };

  const enteredName = () => {
    if (userName.length > 2 && userName.length < 16) {

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: userName, userRank: 0, userScore: 0 })
      };

        fetch("/users", requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Username already taken");
          }
          return response.json();
        })
        .then((jsonString) => {onClick(userName); setUserId(jsonString._id); console.log(userId);}, (err) => 
        {
          alert("Username is already taken!")
        }
        );


    } else {
      alert("Name must be 3-15 characters!");
    }
  };

  return (
    <div className="userEnter">
      <div>
        <img
          className="headerEnterImg"
          src="https://www.freepnglogos.com/uploads/black-pokemon-logo-transparent-27.png"
        />
        <img
          className="enterPokemonImg"
          src="https://i.pinimg.com/originals/95/d5/cd/95d5cded00f3a3e8a98fb1eed568aa9f.png"
          alt=""
        />
        <div className="introText">{welcomeText}</div>
      </div>
      <div>
        <input
          className="userEnterInput"
          placeholder="Enter your name to begin..."
          onChange={onChange}
          onKeyUp={handleKeyDown}
          autoFocus
        />
      </div>
      <div>
        <button className="userEnterButton" onClick={enteredName}>
          Start!
        </button>
      </div>
    </div>
  );
};

export default UserEnter;
