import "./App.css";
import React from "react";
import PublicationsDetail from "./components/Mpublications/pdetail";
import PublicationsDetail2 from "./components/Mpublications/pdetail2";
import {  Routes, Route, Link, Navigate } from "react-router-dom";
import Main from "./components/Main";
import SignUp from "./components/SignUp";
import ProduitRoutes from "./components/Produits/produits-routes";
import CommandeRoutes from "./components/Commandes/commandes-routes";
import LigneCommandesRoutes from "./components/LigneCommande/ligneCommandes-routes";
import LivraisonRoutes from "./components/Livraison/livraison-routes";
import MoughataaRoutes from "./components/Moughataas/moughataas-routes";
import PaymentRoutes from "./components/Payments/payments-routes";
import PublicationRoutes from "./components/Publications/publication-routes";
import UsersRoutes from "./components/Users/users-routes";
import RolesRoutes from "./components/Roles/roles-routes";
import WilayasRoutes from "./components/Wilayas/wilayas-routes";
import MPublicationRoutes from "./components/Mpublications/publication-routes";
import  { useState,useEffect } from "react";
import Dashboards from "./components/Dashboard";
import { useSelector, useDispatch } from "react-redux";
import AuthService from "./components/Users/authservice";
import Login from "./components/Login";
import Home from "./components/home";

import Statistiques from "./components/statistiques";
import { ADMIN, UserHasAccess } from "./components/extends/GlobalFunctions";
import "../node_modules/leaflet/dist/leaflet.css";
import "../node_modules/leaflet/dist/images/marker-icon.png";
import { MdLogout } from 'react-icons/md';
import log from './log.png'
import axios from "axios";
//import { useState, useEffect } from "react";
// function App() {
//   const [clicked, setClicked] = useState(3);
//   const { isAuthenticated } = useSelector((state) => state.authentifications);



// const user= localStorage.getItem("roles");


//   return (
//     <div className="App  d-flex flex-row text-white">
//       {isAuthenticated ? (
//         <>
//           {/* <Main clicked={clicked} setClicked={setClicked} />
//           <Routes>
//             <Route path="/" element={<Dashboards />} />
//             <Route path="/produits/*" element={<ProduitRoutes />} />
//             <Route
//               path="/ligne_commande/*"
//               element={<LigneCommandesRoutes />}
//             />
//             <Route path="/livraison/*" element={<LivraisonRoutes />} />
//             <Route path="/commandes/*" element={<CommandeRoutes />} />
//             <Route path="/payments/*" element={<PaymentRoutes />} />
//             <Route path="/wilayas/*" element={<WilayasRoutes />} />
//             <Route path="/moughataas/*" element={<MoughataaRoutes />} />
//             <Route path="/publications/*" element={<PublicationRoutes />} />
//             <Route path="/users/*" element={<UsersRoutes />} />
//             <Route path="/roles/*" element={<RolesRoutes />} />
//           </Routes> */}
//         </>
//       ) : (
//         <>
//           {" "}
//           <Main clicked={clicked} setClicked={setClicked} />
//           <Routes>
//             {/* <Route path="/" element={<Dashboards />} /> */}
//             <Route path="/produits/*" element={<ProduitRoutes />} />
//             <Route
//               path="/ligne_commande/*"
//               element={<LigneCommandesRoutes />}
//             />
//             <Route path="/livraison/*" element={<LivraisonRoutes />} />
//             <Route path="/commandes/*" element={<CommandeRoutes />} />
//             <Route path="/payments/*" element={<PaymentRoutes />} />
//             <Route path="/wilayas/*" element={<WilayasRoutes />} />
//             <Route path="/moughataas/*" element={<MoughataaRoutes />} />
//             <Route path="/publications/*" element={<PublicationRoutes />} />
//             <Route path="/users/*" element={<UsersRoutes />} />
//             <Route path="/roles/*" element={<RolesRoutes />} />
//           </Routes>
//           <Routes>
//           <Route path="/publications/*" element={<PublicationRoutes />} />

//             {/* <Route path="/" element={<Dashboards />} /> */}
//             <Route path="/" element={<Dashboards />} roles={['ROLE_ADMIN']}/>
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<SignUp />} />
//             <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//         </>
//     )}
//     </div>
//   );
// }
function App() {
    const [clicked, setClicked] = useState(3);
    axios.defaults.baseURL = "http://localhost:8080/";
    const { isAuthenticated } = useSelector((state) => state.authentifications);

    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentRole, setCurrentrole] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }
    }, []);





    const logOut = () => {
        AuthService.logout();
    };

    return (
        <div className="Appn" >
            <li >
                <img src={log} alt="logo" className="logo" style={{ color: "white" ,height:"70px" , marginBottom:"30px",width:"80px", marginLeft:"110px" }}  />

            </li>


            <nav className="navbar navbar-expand  bg-white">





                <div className="navbar-nav ">




                    <li className="nav-item">
                        <Link to={"/home"} className="nav-link">
                            Accueil
                        </Link>
                    </li>

                    {currentUser &&(
                        <li className="nav-item">
                            <Link to={"/"} className="nav-link">
                                Dashboard
                            </Link>
                        </li>
                    )}
                </div>

                {currentUser ? (
                    <div className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={logOut}  style={{  color: "green",marginTop:"14px" , fontSize:"25px" , marginRight:"30px"  }} >
                                <MdLogout/>
                            </a>
                        </li>
                    </div>
                ) : (
                    <div className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                Se Connecter
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/signup"} className="nav-link">
                                S'inscrire
                            </Link>
                        </li>
                    </div>
                )}
            </nav>

            <div className="App  d-flex flex-row text-white">


                <Main clicked={clicked} setClicked={setClicked} />
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/" element={<Dashboards />} />
                    <Route path="/moughp/:id"  element={<MPublicationRoutes />} />
                    <Route path="/moughp/:id/detail/:id" element={<PublicationsDetail />} />
                    <Route path="/moughataas/moughp/:id/detail2/:id" element={<PublicationsDetail2 />} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/produits/*" element={<ProduitRoutes />} />
                    <Route
                        path="/ligne_commande/*"
                        element={<LigneCommandesRoutes />}
                    />
                    <Route path="/livraison/*" element={<LivraisonRoutes />} />
                    <Route path="/commandes/*" element={<CommandeRoutes />} />
                    <Route path="/payments/*" element={<PaymentRoutes />} />
                    <Route path="/wilayas/*" element={<WilayasRoutes />} />
                    <Route path="/moughataas/*" element={<MoughataaRoutes />} />
                    <Route path="/publications/*" element={<PublicationRoutes />} />
                    {
                        UserHasAccess(ADMIN) && <Route path="/users/*" element={<UsersRoutes />} />
                    }
                    <Route path="/roles/*" element={<RolesRoutes />} />
                    {
                        (UserHasAccess(ADMIN)) && <Route path="/statistiques" element={<Statistiques />}/>
                    }
                    {/* <Route path="/mp/:id" element={<MPublicationRoutes />} /> */}
                </Routes>


            </div>
        </div>
    );
}
export default App;