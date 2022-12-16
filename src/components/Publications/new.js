
import {Link, Routes, Route, useNavigate} from 'react-router-dom';

import "./style.css";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {useCreatepublicationMutation,usePhotopublicationMutation ,useGetPublicationsQuery} from "./publication-services";

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


export default function PublicationsNew() {
  const [image, setImage] = useState("");
  const [imagename, setImagename] = useState("");


  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [main_ouvre, setMain_ouvre] = useState("");
  const [quantite, setQuantite] = useState("");
  const [semences, setSemences] = useState("");
  const [superficies_agricoles, setSuperficie_agricoles] = useState("");
  const [type_dirrigation, setType] = useState("");
  const [Typologies_agricoles ,setTypologie] = useState("");
 const [prix_outils,setPrix_outils]=useState("");
const [prix_semance,setPrix_semance]=useState("")




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
  const [typeIrrigation,setTypeIrrigation]=useState("");
  const [typologieAgricole,setTypologieAgricole]=useState("");
  const responseInfo =useGetMoughataasQuery();
  const responseInfoI =useGetTypeirrigationsQuery();
  const responseInfoT =useGetTypologiesQuery();
  console.log("irrri",responseInfoI.data);
  console.log("typoo:",responseInfoT.data)
  //usePhotopublicationMutation(image);
  const [responseInfo4] =usePhotopublicationMutation();
  const getpulication = useGetPublicationsQuery();
  const [showMsg, setShowMsg] = useState(false);

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
  } if (responseInfoI.isLoading) {
    return <div>recherch....</div>
  } if (responseInfoT.isLoading) {
    return <div>recherch....</div>
  }
  return (

    <div class="login d-flex flex-column formulairep ">

      <h2 class="mt-3">Ajout</h2>
      <form
        className=""
        onSubmit={(e) => {


          e.preventDefault();

          newpublication({
            description: username,
            date_publication:formattedDate,
            main_ouvre:main_ouvre,
            prix_outils:prix_outils,
            semences:semences,
            quantite:quantite,
            superficies_agricoles:superficies_agricoles,
            anneerecolte:date,
            image:image.name,
            prix_semance:prix_semance,
            typeIrrigation:{"id":typeIrrigation},
            typologieAgricole:{"id":typologieAgricole},
            utilisateur:UserHasAccess(ADMIN)?null:{"id":getUser().id},

            moughataa:{"id":moughataa}

          });

          responseInfo4(image);
         // getpulication.data.map((publication,key) => {});
         setShowMsg(true);
        //  navigate('../../Publications/');
         //window.location.reload(false);
         // responseInfo;
        }}
      >
       <input class=""
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Description"
          required="required"style={{height: "60px"}}
        />



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
        <input class="inputp"
          type="number"
          value={quantite}
          onChange={(e) => setQuantite(e.target.value)}
          placeholder="Quantite (KG)"
          required="required"
        />
         <input
          type="text"
          value={superficies_agricoles}
          onChange={(e) => setSuperficie_agricoles(e.target.value)}
          placeholder="Superficies_agricoles(Ha)"
          required="required"
        />

        </div>
        <div className="side-by-side">
        <input
          type="number"
          value={prix_outils}
          onChange={(e) => setPrix_outils(e.target.value)}
          placeholder="prix_outils(MRU)"
          required="required"
          />

          <input
          type="number"
          value={prix_semance}
          onChange={(e) => setPrix_semance(e.target.value)}
          placeholder="Prix Semences(MRU)"
          required="required"
          />


          <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Annee_Récolte"
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
              setImage(e.target.files[0]);setImagename(image.name);

              } }/>

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
                        La publication a été ajoutée avec succès
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
