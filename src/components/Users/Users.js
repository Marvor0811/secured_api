import React, { useState } from 'react';
async function getUsers() {
  return fetch('http://localhost:8080/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(data => data.json())
}

export default function Users() {
  const [userNames, setUserNames]=useState();
  const handleGetUsers=async e=>{
    const data= await getUsers()
    .then(data=>{
      const list=[];
      for(let i=0;i<data.length;++i){
        list.push(data[i].name)
      }
      setUserNames(list)
    });
  }
  handleGetUsers()
  if(userNames===undefined){
    return(
    <div className="Users">
      <h2>Users</h2>
    </div>
    );
  }
  return(
    <div className="Users">
      <h2>Users</h2>
      <ol>
      {userNames.map(username => (
        <li key={username}>{username}</li>
      ))}
    </ol>
   </div>
  );
}
