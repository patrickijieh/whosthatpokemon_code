import React, { useEffect, useState } from "react";
import User from "../components/User";

const LeaderBoard = (props) => {
  const { name, score } = props;

  const [users, setUsers] = useState([]);

  const [currentID, setCurrentID]=useState(0);

  const [rank,setRank]=useState(0);

  let url = "/users";

  const getUsers = async () => {
    const usersFromServer = await fetchUsers();
    setCurrentID(usersFromServer[usersFromServer.length-1]._id); 
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
    try {

      const res = await fetch((url + "/" + user.name), {
        method: "GET",
        headers: {
          "Content-type": "application/json"
        },
      });

      var id, ranking;
      const data = await res.json().then((pers) => {id = pers.userName; ranking = pers.userRank;});

      /*if (data.length === 0) {
        throw new Error("User not found");
      }*/

      const response = await fetch((url + "/" + id), {
        method: "PATCH",
        headers: { 
          Accept: "application/json",
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          userName: id,
          userScore: user.score,
          userRank: ranking
        })
      }).then((response) => {

        return response.json();

      }).then((data) => {
          
          console.log("Success:", data);
  
      });

    } catch (err) {
      console.log(err);
    }

    await getUsers();
  };

  const fetchUsers = async () => {
    try {

      const res = await fetch(url);
      const data = await res.json();

      return data;

    } catch (err) {
      console.log(err);
    }
  };

  const newUsers = users
  .sort((a,b) => b.userScore - a.userScore)
  .map((user, index) => {
     return <User key={index} name={user.userName} score={user.userScore} isCurrent={(user._id===currentID)} rank={index+1}/>
  });

  const findRank=()=>{
    const index=users.findIndex(user=>user._id===currentID);
    console.log(index);
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
