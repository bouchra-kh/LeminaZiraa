import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import Alert from "../Alert";
import { ADMIN,CONSEILLER_AGRICOLE, UserHasAccess ,getUser} from "../extends/GlobalFunctions";

import React, { useState } from "react";
//import { NavLink } from "react-router-dom";
//import {useCreateWilayaMutation} from "./wilayas-services";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {usePhotopublicationMutation } from "../Publications/publication-services";
import {useCreateproduitMutation} from "./produits-services"
import { useGetMoughataasQuery} from '../Moughataas/moughataas-services';
export default function ProduitNew() {
  const navigate = useNavigate();
  const [nom, setNom] = useState('');
  const [quantite, setQuantite] = useState('');
  const [prix, setPrix] = useState('');
  const [type, setType] = useState(''); 
  const [numero, setNumero] = useState('');
  const [localisation, setLocalisation] = useState('');
  const [showMsg, setShowMsg] = useState(false);
  const [responseInfo4] =usePhotopublicationMutation();
  const [newproduit]=useCreateproduitMutation();
  // const [newWilaya] = useCreateWilayaMutation();
  const [image, setImage] = useState("");
  const [imagename, setImagename] = useState("");
  
  const responseInfo =useGetMoughataasQuery();
  if (responseInfo.isLoading) {
    return <div>recherch....</div>}
  console.log("user",getUser().telephone);
  
  return (
      <>
    <div className="login d-flex flex-column">
      <h1 class="mt-3">Ajout</h1>
      <form
        className=""
        onSubmit={(e) => {
          e.preventDefault();
          
newproduit({
  nom:nom,
  image:image.name,
  quantite:quantite,
  prix:prix,
  type:type,
  numero:getUser().telephone,
  localisation:localisation,
  utilisateur:{id:getUser().id}

})
            responseInfo4(image);
            setShowMsg(true);
        }}
      >
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Nom du produit"
          required="required"
        /><br></br>
<input
          type="number"
          value={quantite}
          onChange={(e) => setQuantite(e.target.value)}
          placeholder="Quantite du produit"
          required="required"
        /><br></br><input
        type="number"
        value={prix}
        onChange={(e) => setPrix(e.target.value)}
        placeholder="prix du produit"
        required="required"
      /><br></br>
      <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="type du produit"
          required="required"
        /><br></br>
    
           <div class="libele">localisation</div>
         <select  value={localisation} name={setLocalisation} onChange={(e) => setLocalisation(e.target.value)} component="select option" class="sel">
             <option></option>
             {responseInfo.data.map((moughataa, position) => {
            return (
              
              
                <>
               
                <option class="option" key={position} value={moughataa.nom}  required="required" >{moughataa.nom}</option>
                
                  </>
                    );
                  })}
        </select>
        <input type="file" onChange={(e) => {
              console.log("nammmmmmmmm",e.target.files[0].name)
              setImage(e.target.files[0]);setImagename(image.name);
              
              } }/>
       <button className="btn btn-primary btn-block btn-large" type="submit">
        Ajouter Produit</button>

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
                        La Produit a été ajoutée avec succès
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button
                        onClick={function (){
                            setShowMsg(false);
                            navigate('../../Produits/');
                            window.location.reload(false);
                        }}
                        autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    </div>
</>
  );
}
