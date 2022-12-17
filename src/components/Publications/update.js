
import {Link, Routes, Route, useNavigate} from 'react-router-dom';

import "./style.css";
import React, { useState } from "react";
import { NavLink,useParams } from "react-router-dom";
import {useGetPublicationByIdQuery,useUpdatepublicationMutation,useCreatepublicationMutation,usePhotopublicationMutation ,useGetPublicationsQuery} from "./publication-services";

import { useGetMoughataasQuery} from '../Moughataas/moughataas-services';
import { useGetTypologiesQuery } from '../Typologie/typologie-service';
import { useGetTypeirrigationsQuery } from '../Typeirrigation/typeirrigations-service';
import { ADMIN,CONSEILLER_AGRICOLE, UserHasAccess ,getUser} from "../extends/GlobalFunctions";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";


export default function PublicationsUpdate() {

  const { id } = useParams();
  const responseInfo2 = useGetPublicationByIdQuery(id)
  const [image, setImage] = useState("");
  const [imagename, setImagename] = useState(responseInfo2.data.image);
  
 
  const navigate = useNavigate();
  const [username, setUsername] = useState(responseInfo2.data.description);
  const [main_ouvre, setMain_ouvre] = useState(responseInfo2.data.main_ouvre);
  const [quantite, setQuantite] = useState(responseInfo2.data.quantite);
  const [semences, setSemences] = useState(responseInfo2.data.semences);
  const [valide, setValide] = useState(responseInfo2.data.valide);
  
  const [superficies_agricoles, setSuperficie_agricoles] = useState(responseInfo2.data.superficies_agricoles);
  const [type_dirrigation, setType] = useState("");
  const [Typologies_agricoles ,setTypologie] = useState("");
 const [prix_outils,setPrix_outils]=useState(responseInfo2.data.prix_outils);
const [prix_semance,setPrix_semance]=useState(responseInfo2.data.prix_semance)



  
  const [date, setDate] = useState(responseInfo2.data.anneerecolte);
  const [aff,setAff ] = useState("");
  const [showMsg, setShowMsg] = useState(false);

function pad2(n) {
  return (n < 10 ? '0' : '') + n;
}

var date2 = new Date();
var month = pad2(date2.getMonth()+1);//months (0-11)
var day = pad2(date2.getDate());//day (1-31)
var year= date2.getFullYear();

var formattedDate =  year+"-"+month+"-"+day;
console.log("date",formattedDate.toString().substring(0, 10));
//alert(formattedDate); 
  const [newpublication] = useCreatepublicationMutation();
  const [updatePubli] = useUpdatepublicationMutation();
  const [moughataa, setMoughataa] = useState(responseInfo2.data.moughataa.id);
  const [typeIrrigation,setTypeIrrigation]=useState(responseInfo2.data.typeIrrigation.id);
  const [typologieAgricole,setTypologieAgricole]=useState(responseInfo2.data.typologieAgricole.id);
  const responseInfo =useGetMoughataasQuery();
  const responseInfoI =useGetTypeirrigationsQuery();
  const responseInfoT =useGetTypologiesQuery();
  console.log("irrri",responseInfoI.data);
  console.log("immmmmmmmmmmmmmmmm:",image)
  //usePhotopublicationMutation(image);
  const [responseIn] =usePhotopublicationMutation();
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
  console.log("moughataa",responseInfo.data);
  
  if (responseInfo.isLoading) {
    return <div>recherch....</div>
  } if (responseInfoI.isLoading) {
    return <div>recherch....</div>
  } if (responseInfoT.isLoading) {
    return <div>recherch....</div>
  }

  return (
  
    <div class="login d-flex flex-column formulairep ">
        
      <h2 class="mt-3">Modifier</h2>
      <form
        className=""
        onSubmit={(e) => {
         
       
          e.preventDefault();
          
          updatePubli({
            id:id,
            description: username,
            date_publication:formattedDate,
            main_ouvre:main_ouvre,
            prix_outils:prix_outils,
            semences:semences,
            quantite:quantite,
            superficies_agricoles:superficies_agricoles,
            anneerecolte:date,
            image:image==""?responseInfo2.data.image:image.name,
            prix_semance:prix_semance,
            typeIrrigation:{"id":typeIrrigation},
            typologieAgricole:{"id":typologieAgricole},
            utilisateur:UserHasAccess(ADMIN)?null:{"id":getUser().id},
            moughataa:{"id":moughataa},
            valide:valide
         
          });
          
          responseIn(image);
         // getpulication.data.map((publication,key) => {});
         setShowMsg(true);
         
        // window.location.reload(false);
         // responseInfo;
        }}
      >
        <div class="libele">description</div>
       <input class=""
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Description"
          required="required"style={{height: "60px"}}
        />
           
           <div className="side-by-side">

           <div class="libele la">main_ouvre</div>
           <div class="libele">Semances</div>
           </div>
           
  <div className="side-by-side">
  
  <input class="inputp"
          type="number"
          value={main_ouvre}
          onChange={(e) => setMain_ouvre(e.target.value)}
          placeholder="main-d'œuvre"
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
  
  <div class="libele la">quantite</div>
  <div class="libele">superficies_agricoles</div></div>
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
          value={superficies_agricoles}
          onChange={(e) => setSuperficie_agricoles(e.target.value)}
          placeholder="Superficies_agricoles"
          required="required"
        />
      
        </div>
        <div className="side-by-side">
  
        <div class="libele la2">prix_outils</div>
        <div class="libele la2">Prix_Semances</div>
        <div class="libele">Annee_Recolte</div>
        </div>
        <div className="side-by-side">
       
        <input
          type="number"
          value={prix_outils}
          onChange={(e) => setPrix_outils(e.target.value)}
          placeholder="prix_outils"
          required="required"
          />
       
          <input
          type="number"
          value={prix_semance}
          onChange={(e) => setPrix_semance(e.target.value)}
          placeholder="Prix de Semances"
          required="required"
          />

       
          <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Annee_Recolte"
          required="required"
        /> </div>
        {/* <div class="libele">estAffiche</div>
         <select value={aff} name={aff} onChange={(e) => setAff(e.target.value)} component="select" class="sel">
             <option></option>
             
             {affichage.map((moughataa, position) => {
            return (
              
              
              <>
               
              <option  key={position} value={moughataa.id}  required="required" >{moughataa.nom}</option>
              
                </>
                  );
                })}
      </select> */}
        <div class="libele">Moughataa</div>
         <select  value={moughataa} name={moughataa} onChange={(e) => setMoughataa(e.target.value)} component="select option" class="sel">
             <option></option>
             {responseInfo.data.map((moughataa, position) => {
            return (
              
              
                <>
               
                <option class="option" key={position} value={moughataa.id}  required="required" >{moughataa.nom}</option>
                
                  </>
                    );
                  })}
        </select>
        
        <div class="libele">type Irrigation</div>
         <select  value={typeIrrigation} name={typeIrrigation} onChange={(e) => setTypeIrrigation(e.target.value)} component="select option" class="sel">
             <option></option>
             {responseInfoI.data.map((ti, posti) => {
            return (
              
              
                <>
               
                <option class="option" key={posti} value={ti.id}  required="required" >{ti.nom}</option>
                
                  </>
                    );
                  })}
        </select>  
        <div class="libele">typologie Agricole</div>
         <select  value={typologieAgricole} name={typologieAgricole} onChange={(e) => setTypologieAgricole(e.target.value)} component="select option" class="sel">
             <option></option>
             {responseInfoT.data.map((typo, postypo) => {
            return (
              
              
                <>
               
                <option class="option" key={postypo} value={typo.id}  required="required" >{typo.nom}</option>
                
                  </>
                    );
                  })}
        </select> 
        <input type="file" onChange={(e) => {
              console.log("nammmmmmmmm",e.target.files[0].name)
              setImage(e.target.files[0]);setImagename(e.target.files[0]);
              
              } }/>
  
       <button class="btn btn-primary btn-block btn-large" type="submit">
        Update publication</button>
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
      <div>
            <Dialog
                open={showMsg}
                onClose={function (){
                    setShowMsg(false);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className="centerdiv">
                    Alert
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        La publication a été modifée avec succès
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={function (){
                            setShowMsg(false);
                            navigate('../../Publications/');
                            window.location.reload(false);
                        }}
                        autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    </div>
  );
}

 


 

