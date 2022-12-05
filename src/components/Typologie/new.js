import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import Alert from "../Alert";

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

export default function TypologiesNew() {
  const navigate = useNavigate();
  const [nom, setNom] = useState('');
  const [showMsg, setShowMsg] = useState(false);

  // const [newWilaya] = useCreateWilayaMutation();
  
  return (
      <>
    <div className="login d-flex flex-column">
      <h1>Ajout</h1>
      <form
        className=""
        onSubmit={(e) => {
          e.preventDefault();
           axios.post("Typologie/save", {nom})
            .then(() => {
                setShowMsg(true);
                setNom('');

            })



        }}
      >
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Nom de la typologie"
          required="required"
        />

       <button className="btn btn-primary btn-block btn-large" type="submit">
        Ajouter Typologie</button>

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
                        La Typologie a été ajoutée avec succès
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={function (){
                            setShowMsg(false);
                            navigate('../../typologi/');
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
