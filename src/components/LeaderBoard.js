import React, { useEffect, useState } from "react";
import User from "../components/User";

const LeaderBoard = (props) => {
  const { name, score } = props;

  const [users, setUsers] = useState([]);

  const [currentID, setCurrentID]=useState(0);

  const [rank,setRank]=useState(0);

  let url = "http://localhost:4000/users";

  const getUsers = async () => {
    const usersFromServer = await fetchUsers();
    setCurrentID(usersFromServer[usersFromServer.length-1].id); 
    setUsers(usersFromServer);    
  };

  useEffect(()=>{
    findRank()
  },[users]);

  useEffect(() => {
    addUser();
  }, []);

  const addUser = async () => {
    const user = {name, score};
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    }); 
    await getUsers();
  };

  const fetchUsers = async () => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  };

  const newUsers = users
  .sort((a,b) => b.score - a.score)
  .map((user, index) => {
     return <User key={index} name={user.name} score={user.score} isCurrent={(user.id===currentID)} rank={index+1}/>
  });

  const findRank=()=>{
    const index=users.findIndex(user=>user.id===currentID);
    setRank(index+1);
  }

  return (
    <div>
      <div className="Result">
        <div>Well done {name}, you caught {score} Pokemon!</div>
        <div style={{fontSize:"25px"}}>You got {rank}{(rank%10===1) ? "st":(rank%10===2)?"nd":(rank%10===3)?"rd":"th"} of {users.length} total trainers</div>
      </div>
      <div style={{color:"yellow",fontSize:"50px"}}>HIGH SCORES</div>
      <div className="LeaderBoard">
        <User name="Name" score="Score" isCurrent={false} rank="Rank"/>
        {newUsers}
      </div>
    </div>
  );
};

export default LeaderBoard;
