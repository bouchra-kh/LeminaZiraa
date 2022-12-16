import React, { useState } from "react";
import { NavLink } from "react-router-dom";
//import { useRegisterMutation } from "../../app/auth/auth.service";
import { useGetRolesQuery } from '../Roles/roles-services';

import { useNavigate } from "react-router-dom";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function SignUp() {
  const baseURL = "http://localhost:8080/users/register";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState([]);
 // const responseInfo =useGetRolesQuery();
  //console.log("role",responseInfo.data)


  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [email, setEmail] = useState("");
  const [adresse, setAdresse] = useState("");
  const [telephone, setTelephone] = useState("");
  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const navigate = useNavigate();



  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleCloseInfo = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenInfo(false);
    navigate("/login");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        baseURL,
        {
          username,
          password,
          confirmedPassword,
          email,
          adresse,
          telephone,

        },

      )
      .then((res) => {
        console.log("data", res.data);
        setOpenInfo(true);

      })
      .catch((err) => {
        // setErrorAlert(true);
        setOpen(true);
        console.log(err);
      });
  };


  return (
    <div class="login d-flex flex-column">
      <h1>S'inscrire</h1>
      <form
        className=""
        onSubmit={handleSubmit}

      >
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required="required"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required="required"
        />
        <input
          type="password"
          value={confirmedPassword}
          onChange={(e) => setConfirmedPassword(e.target.value)}
          placeholder="Confirm Password"
          required="required"
        />
         <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required="required"
        />
         <input
          type="text"
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
          placeholder="Adresse"
          required="required"
        />
         <input
          type="number"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          placeholder="Telephone"
          required="required"
        />




        <button class="btn btn-primary btn-block btn-large" type="submit">
          S'inscrire
        </button>
        <NavLink to="/login">
          <button class="btn btn-success btn-block btn-large  mt-3">
            Connecter
          </button>
        </NavLink>
      </form>
      <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: "100%", fontFamily: "Calibri" }}
                  >
                       erreur lors de la creation
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={openInfo}
                  autoHideDuration={6000}
                  onClose={handleCloseInfo}
                >
                  <Alert
                    onClose={handleCloseInfo}
                    severity="success"
                    sx={{ width: "100%", fontFamily: "Calibri" }}
                  >
                    Compte crée avec succés
                  </Alert>
                </Snackbar>
    </div>
  );
}
