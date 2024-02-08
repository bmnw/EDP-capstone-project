import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";

const url = new URL("http://localhost:4000/login/");

function Login({userData, setUserData}) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const getUser = function async(username) {
    fetch(url + username)
      .then(async (response) => await response.json())
      .then(async (data) => {
        if(password === data.password){
          setUserData(data);
          navigate('/search');
        } else{
          alert('Invalid login credentials. Please try again.');
        }
      });
  };

  // const login = async () => {
  //   try {
  //     console.log("login");
  //   } catch (e) {
  //     alert(e);
  //   }
  // };

  return (
    <div className="login">
      <label>Username</label>
      <div>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <label>Password</label>
      <div>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={() => getUser(username)}>Login</button>
    </div>
  );
}
export default Login;
