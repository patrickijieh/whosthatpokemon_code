import React from "react";

const User = (props) => {
  const { name, score, isCurrent, rank} = props;

  return (
    <div className="user" style={{ "color": (score==="Score") ? "yellow" : "white", "background-color": (isCurrent) ? "green" : "#363636"}}>
      <div className="userRank">{rank}</div>
      <div className="userName">{name}</div>
      <div className="userScore">{score}</div> 
    </div>
  );
};

export default User;
