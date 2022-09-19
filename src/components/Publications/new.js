
import {Link, Routes, Route, useNavigate} from 'react-router-dom';


import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {useCreatepublicationMutation} from "./publication-services";
import { useGetMoughataasQuery } from '../Moughataas/moughataas-services';


export default function PublicationsNew() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");


  const [newpublication] = useCreatepublicationMutation();
  const [moughataa, setmoughataa] = useState("");

  const responseInfo =useGetMoughataasQuery();
  console.log("moughataa",responseInfo.data)

  return (
    
    

     
  
  
    <div class="login d-flex flex-column">
      <h1>Ajout</h1>
      <form
        className=""
        onSubmit={(e) => {
          navigate('../../Publication/');
         
          e.preventDefault();
          newpublication({
            description: username,
           moughataa:{"id":6}
         
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
         <select value={moughataa} name={moughataa} onChange={(e) => setmoughataa(e.target.value)} component="select" class="sel">
             <option></option>
             {responseInfo.data.map((moughataa, position) => {
            return (
              
              
                <>
               
                <option  key={position} value={moughataa.id}  required="required" >{moughataa.nom}</option>
                
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
        Ajouter publication</button>
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

 


 

