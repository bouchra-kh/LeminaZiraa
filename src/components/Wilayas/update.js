

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import {
    BrowserRouter as Router,

    useParams
  } from 'react-router-dom'
  import {useGetWilayasQuery,useGetWilayaByIdQuery,useUpdateWilayaMutation} from "./wilayas-services";

export default function WilayasUpdate() {
    const { id } = useParams();
    const responseInfo2 = useGetWilayaByIdQuery(id)
   // const [usern, setUsern] = useState(responseInfo2.data.id);

    const [username, setUsername] = useState("");



  const navigate = useNavigate();

  //console.log(responseInfo.data.map.get(id));
  const [updateWilaya] = useUpdateWilayaMutation();
  const [showMsg, setShowMsg] = useState(false);

  if (responseInfo2.isLoading) {
    return <div>recherche....</div>
  }
  if (responseInfo2.isError) {
    return <div>erreur :{responseInfo2.error}</div>
  }

//setUsername("kkk");

  return (
    <div className="login d-flex flex-column mt-4">
      <h1>Modifier</h1>


      <form
        className=""
        onSubmit={(e) => {

          e.preventDefault();
          updateWilaya({
            id:id,
            nom: username,

          });
          setShowMsg(true);
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

       <button className="btn btn-primary btn-block btn-large" type="submit">
        Modifier wilaya</button>

        {/* <button className="btn btn-primary btn-block btn-large" type="submit">
          Sign up
        </button> */}
        {/* <NavLink to="/login">
          <button className="btn btn-success btn-block btn-large  mt-3">
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
                        Le wilaya a été modifée avec succès
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={function (){
                            setShowMsg(false);
                           // navigate('../../Publications/');

                            navigate('../../wilayas/');
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