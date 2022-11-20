
import {useNavigate} from 'react-router-dom';


import React, { useState } from "react";
import {useCreateMoughataaMutation} from "./moughataas-services";
import { useGetWilayasQuery } from '../Wilayas/wilayas-services';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import axios from "axios";
export default function MoughataasNew() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  const [wilaya, setWilaya] = useState("");
  const [newMoughataa] = useCreateMoughataaMutation();
  const responseInfo =useGetWilayasQuery();

  if (responseInfo.isLoading) {
    return <div>recherch....</div>
  }
  return (
    
    <div className="login d-flex flex-column">
      <h1>Ajout</h1>
      <form
        className=""
        onSubmit={(e) => {
          e.preventDefault();
           axios.post("moughataaa/save", {
               nom: username,
               wilaya:{"id":wilaya}
           })
            .then(() => {
                setShowMsg(true);
                setUsername('');
            })

        }}
      >
        <input
          type="text"
          className="form-control mb-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nom"
          required
        />
       

              <select placeholder="wilaya" required value={wilaya} name="wilaya" onChange={(e) => setWilaya(e.target.value)}  className="form-control mb-2">
                  {responseInfo.data.map((wilaya, position) => {
            return (
                <option  key={position} value={wilaya.id}>{wilaya.nom}</option>

            );
          })}
</select>

       <button className="btn btn-primary btn-block btn-large" type="submit">
        Ajouter moughataa</button>

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
                        Moughataa a été ajoutée avec succès
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={function (){
                            setShowMsg(false);
                            navigate("/moughataas");
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

 

