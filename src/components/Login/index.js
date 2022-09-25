import React, { useState } from "react";
import qs from 'qs';
import "./index.css";
import { NavLink } from "react-router-dom";
import { useLoginMutation } from "../../app/auth/auth.service";
import axios from "axios";

import { useNavigate } from "react-router-dom";
const Login = () => {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const baseURL = "http://localhost:8080/login";
  const navigate = useNavigate();
 
const handleSubmit = (event) => {
  event.preventDefault();
  console.log(username)
  console.log(password)
  
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);
  axios({
    method: 'post',
    url: baseURL,
    data:params,
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      'No-Auth': 'True',
    }
  })

    .then((res) => {
      console.log("idci front")
      localStorage.setItem("token", res.data.user.jwtToken)
      localStorage.setItem('user', JSON.stringify(res.data.user.user));
      
      navigate("/home");
      window.location.reload();
      
    })
    .catch((err) => {
     
      console.log(err);
    });
};
  //const [login] = useLoginMutation();
  return (
    <div class="login d-flex flex-column">
      <h1>Login</h1>
      <form
        className=""
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required="required"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required="required"
        />
        <button class="btn btn-primary btn-block btn-large" type="submit">
          Connecter
        </button>
        <NavLink to="/signup">
          <button class="btn btn-success btn-block btn-large  mt-3">
            Sign up
          </button>
        </NavLink>
      </form>
    </div>
  );
};

export default Login;
