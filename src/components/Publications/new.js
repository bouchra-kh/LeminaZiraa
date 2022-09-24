
import {Link, Routes, Route, useNavigate} from 'react-router-dom';

import "./style.css";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {useCreatepublicationMutation,usePhotopublicationMutation ,useGetPublicationsQuery} from "./publication-services";
import { useGetMoughataasQuery} from '../Moughataas/moughataas-services';


export default function PublicationsNew() {
  const [image, setImage] = useState("");
  const [imagename, setImagename] = useState("");
  
 
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [ts, setTs] = useState("");
  const [quantite, setQuantite] = useState("");
  const [semences, setSemences] = useState("");
  const [sa, setSa] = useState("");
  const [date, setDate] = useState("");
  const [aff,setAff ] = useState("");
  //const current = new Date();
  //const datep = `${current.getDate()}-${current.getMonth()+1}-${current.getFullYear()}`;

function pad2(n) {
  return (n < 10 ? '0' : '') + n;
}
// onFileChange= (event) => {
//   console.log()
//  setImage(event.target.files[0]  )
//  setImagename(image.name);
// }
var date2 = new Date();
var month = pad2(date2.getMonth()+1);//months (0-11)
var day = pad2(date2.getDate());//day (1-31)
var year= date2.getFullYear();

var formattedDate =  year+"-"+month+"-"+day;
console.log("date",formattedDate.toString().substring(0, 10));
//alert(formattedDate); 
  const [newpublication] = useCreatepublicationMutation();
  const [moughataa, setMoughataa] = useState("");
  const responseInfo =useGetMoughataasQuery();
  //usePhotopublicationMutation(image);
  const [responseInfo4] =usePhotopublicationMutation();
  const getpulication = useGetPublicationsQuery();
  const affichage = [
    {
      id: true,
      nom:"Oui"
    },
    {
      id: false,
      nom:"Non"
    }
  ]
  console.log("moughataa",responseInfo.data)
  if (responseInfo.isLoading) {
    return <div>recherch....</div>
  }
  return (
    <div class="login d-flex flex-column formulairep">
      <h1 >Ajout</h1>
      <form
        className=""
        onSubmit={(e) => {
         
       
          e.preventDefault();
          
          newpublication({
            description: username,
            date_publication:formattedDate,
            typesol:ts,
            semences:semences,
            quantite:quantite,
            Suagr:sa,
            anneerecolte:date,
            est_affiche:aff,
            image:image.name,
           moughataa:{"id":moughataa}
         
          });
          
          responseInfo4(image);
         // getpulication.data.map((publication,key) => {});
          navigate('../../Publications/');
          
         // responseInfo;
        }}
      >
       <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Description"
          required="required"style={{height: "60px"}}
        />
           
              
           
  <div className="side-by-side">
  <input class="inputp"
          type="text"
          value={ts}
          onChange={(e) => setTs(e.target.value)}
          placeholder="Type_Sol"
          required="required"
        />
          
          <input
          type="text"
          value={semences}
          onChange={(e) => setSemences(e.target.value)}
          placeholder="Semences"
          required="required"
        />
  </div>

       
         
         <div className="side-by-side"> 
        <input class="inputp"
          type="number"
          value={quantite}
          onChange={(e) => setQuantite(e.target.value)}
          placeholder="Quantite"
          required="required"
        />
         <input
          type="text"
          value={sa}
          onChange={(e) => setSa(e.target.value)}
          placeholder="Superficies_agricoles"
          required="required"
        />
        </div>
          <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Annee_Recolte"
          required="required"
        />
        <div class="libele">estAffiche</div>
         <select value={aff} name={aff} onChange={(e) => setAff(e.target.value)} component="select" class="sel">
             <option></option>
             
             {affichage.map((moughataa, position) => {
            return (
              
              
              <>
               
              <option  key={position} value={moughataa.id}  required="required" >{moughataa.nom}</option>
              
                </>
                  );
                })}
      </select>
        <div class="libele">Moughataa</div>
         <select value={moughataa} name={moughataa} onChange={(e) => setMoughataa(e.target.value)} component="select" class="sel">
             <option></option>
             {responseInfo.data.map((moughataa, position) => {
            return (
              
              
                <>
               
                <option  key={position} value={moughataa.id}  required="required" >{moughataa.nom}</option>
                
                  </>
                    );
                  })}
        </select>
               
        <input type="file" onChange={(e) => {
              console.log("nammmmmmmmm",e.target.files[0].name)
              setImage(e.target.files[0]);setImagename(image.name);
              
              } }/>
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

 


 

