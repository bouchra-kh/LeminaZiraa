import "./App.css";
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
import React, { useState,useEffect, Component } from "react";
import Dashboards from "./components/Dashboard";
import { useSelector, useDispatch } from "react-redux";
import AuthService from "./components/Users/authservice";
import Login from "./components/Login";
import Home from "./components/home";
import { fontFamily } from "@mui/system";
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
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentRole, setCurrentrole] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);
  useEffect(() => {
    const role= AuthService.getCurrentrole();

    if (role) {
      setCurrentrole(role);
    }
   
  }, []);

  
   
  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div className="Appn" >
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {currentUser &&(
            <li className="nav-item">
              <Link to={"/dashboard"} className="nav-link">
                Dashboard
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Logout
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/signup"} className="nav-link">
                Sign up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboards />} />

          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
