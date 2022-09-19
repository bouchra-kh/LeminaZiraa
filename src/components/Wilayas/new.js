import {Link, Routes, Route, useNavigate} from 'react-router-dom';


import React, { useState } from "react";
//import { NavLink } from "react-router-dom";
import {useCreateWilayaMutation} from "./wilayas-services";

export default function WilayasNew() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const [newWilaya] = useCreateWilayaMutation();
  
  return (
    <div class="login d-flex flex-column">
      <h1>Ajout</h1>
      <form
        className=""
        onSubmit={(e) => {
          navigate('../../wilayas/');
         
          e.preventDefault();
          newWilaya({
            nom: username,
         
          });
        }}
      >
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required="required"
        />
        {/* <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required="required"
        /> */}
        {/* <input
          type="confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required="required"
        /> */}
         {/* <NavLink to={"../../wilayas/"}> */}
       <button class="btn btn-primary btn-block btn-large" type="submit">
        Ajouter wilaya</button>
        {/* </NavLink> */}
        {/* <button class="btn btn-primary btn-block btn-large" type="submit">
          Sign up
        </button> */}
        {/* <NavLink to="/login">
          <button class="btn btn-success btn-block btn-large  mt-3">
            Login
          </button>
        </NavLink> */}
      </form>
    </div>
  );
}
