import React, { useEffect, useRef } from "react";

const Card = (props) => {
  const { clickNext, pokemon, onCorrectPokemon } = props;

  const btn = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      clickNext();
    }
  };

  useEffect(() => {
    if (!pokemon || onCorrectPokemon) {
      btn.current.focus();
    }
  }, [pokemon, onCorrectPokemon]);

  return (
    <div>
      <div>
        {pokemon ? (
          <img
            className="pokeImg"
            src={pokemon.sprites.front_default}
            alt=""
            style={{ filter: onCorrectPokemon ? "" : "brightness(0)" }}
          />
        ) : (
          <img
            className="loadingPokeImg"
            src="https://i.pinimg.com/originals/95/d5/cd/95d5cded00f3a3e8a98fb1eed568aa9f.png"
            alt=""
          />
        )}
      </div>
      <div>
        <button
          className="nextButton"
          onClick={clickNext}
          onKeyUp={handleKeyDown}
          ref={btn}
        >
          {pokemon ? (onCorrectPokemon ? "Next!" : "Skip") : "Start!"}
        </button>
      </div>
    </div>
  );
};

export default Card;
