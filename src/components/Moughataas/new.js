
import {Link, Routes, Route, useNavigate} from 'react-router-dom';


import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {useCreateMoughataaMutation} from "./moughataas-services";
import { useGetWilayasQuery } from '../Wilayas/wilayas-services';
export default function MoughataasNew() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [zone_agricoles, setzone_agricoles] = useState("");
 
  const [wilaya, setWilaya] = useState("");
  const [newMoughataa] = useCreateMoughataaMutation();
  const responseInfo =useGetWilayasQuery();
  console.log("wilaya",responseInfo.data)
  if (responseInfo.isLoading) {
    return <div>recherch....</div>
  }
  return (
    
    <div class="login d-flex flex-column">
      <h1>Ajout</h1>
      <form
        className=""
        onSubmit={(e) => {
          navigate('../../Moughataas/');
         if (wilaya==null) {
          
         }
          e.preventDefault();
          newMoughataa({
            nom: username,
            wilaya:{"id":wilaya}
         
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
       
        
              <select value={wilaya} name={wilaya} onChange={(e) => setWilaya(e.target.value)} component="select" class="sel">
             <option></option>
             {responseInfo.data.map((wilaya, position) => {
            return (
              
              
                <>
               
                <option  key={position} value={wilaya.id}  required="required" >{wilaya.nom}</option>
                
                  </>
               
              
              

            );
          })}
</select>
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
        Ajouter moughataa</button>
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

 

