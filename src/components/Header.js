import React from "react";

const Header = (props) => {
  const { score } = props;

  return (
    <div>
      <img
        className="headerImg"
        src="https://www.freepnglogos.com/uploads/black-pokemon-logo-transparent-27.png"
      />
      <div className="headerScore">Score: {score}</div>
    </div>
  );
};

export default Header;
