import React, { useState } from "react";
import qs from 'qs';
import "./index.css";
import { NavLink } from "react-router-dom";
import { useLoginMutation } from "../../app/auth/auth.service";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";
const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  const baseURL = "http://localhost:8080/login";
  const navigate = useNavigate();

const handleSubmit = (event) => {
  event.preventDefault();
  console.log(username)
  console.log(password)

  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);
  axios({
    method: 'post',
    url: baseURL,
    data:params,
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      'No-Auth': 'True',
    }
  })

    .then((res) => {
      console.log("idci front")
      localStorage.setItem("token", res.data.user.jwtToken)
      localStorage.setItem('user', JSON.stringify(res.data.user.user));

      navigate("/home");
      window.location.reload();

    })
    .catch((err) => {
      setShowMsg(true);
//alert("erreur:le nom ou mot de passe est incorrecte")
      console.log(err);
    });
};
  //const [login] = useLoginMutation();
  return (
    <div class="login d-flex flex-column">
      <h1>Se Connecter</h1>
      <form
        className=""
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nom"
          required="required"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          required="required"
        />
        <button class="btn btn-primary btn-block btn-large" type="submit">
         Se connecter
        </button>
        <NavLink to="/signup">
          <button class="btn btn-success btn-block btn-large  mt-3">
            S'inscrire
          </button>
        </NavLink>
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
                erreur
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                  le nom ou mot de passe est incorrecte
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={function (){
                            setShowMsg(false);
                            
                        }
                      }
                        autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    </div>

  );
};

export default Login;
