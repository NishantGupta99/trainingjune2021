import './App.css';
import React, { useState } from 'react';

function App() {
  const [user, setUser] = useState({ firstName: "ram" , age:34});
  const [users, setUsers] = useState([]);
  console.log('rendering again');
  const handleEvent = e => {
    console.log(e.target.value);
    setUser(...user,{ [e.target.name]: e.target.value })
  }
  return (
    <div className="App">
      <input value={user.firstName} name='firstName' onChange={handleEvent}></input>
      <input value={user.age} name='age' onChange={handleEvent}></input>

      <button onClick={() => {
        console.log('saving');
        const promise = fetch('http://localhost:4200/users', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(user)

        });
        promise.then((response) => {
          console.log(response);
        })

      }}>save</button>

      <button onClick={() => {
        console.log('gettingUsers');
        const promise = fetch('http://localhost:4200/users')
        promise.then((response) => {
          response.json().then((body) => {
            console.log(body);
            setUsers(body);
          })


        })
      }}>

        get-users</button>


      <table><thead>
      </thead><th>Name</th>
        <tbody>{users.map((user) => {
          return <tr><td>{user.firstName}</td></tr>
        })} </tbody></table>
    </div>
  );
}

export default App;
