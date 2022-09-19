

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {Link, Routes, Route, useNavigate} from 'react-router-dom';

import {
    BrowserRouter as Router,
    
    useParams
  } from 'react-router-dom'
  import {useGetWilayasQuery,useGetWilayaByIdQuery,useUpdateWilayaMutation} from "./wilayas-services";

export default function WilayasUpdate() {
    const { id } = useParams();
    const responseInfo2 = useGetWilayaByIdQuery(id)
    const responseInfo =useGetWilayasQuery();
 //  console.log("findbyerrr",responseInfo2)
  // const nom=responseInfo2.currentData.nom;
  var nom;

  const navigate = useNavigate();
  responseInfo.data.map((wilaya, position) => {
    if (wilaya.id==id) {
      console.log("hhhhhhhhhh")
       nom=wilaya.nom;
    }
 
  }
  //console.log(responseInfo.data.map.get(id));
  );
  const [username, setUsername] = useState(nom);
console.log(nom)

//setUsername("kkk");
  const [updateWilaya] = useUpdateWilayaMutation();
  if (responseInfo2.isLoading) {
    return <div>recherche....</div>
  }
  if (responseInfo2.isError) {
    return <div>erreur :{responseInfo2.error}</div>
  }
  return (
    <div class="login d-flex flex-column">
      <h1>Modifier</h1>
    
     
      <form
        className=""
        onSubmit={(e) => {
           navigate('../../wilayas/');
          e.preventDefault();
          updateWilaya({
            id:id,
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
         
       <button class="btn btn-primary btn-block btn-large" type="submit">
        Modifier wilaya</button>
      
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
