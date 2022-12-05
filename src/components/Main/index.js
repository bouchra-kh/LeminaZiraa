import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ADMIN, CONSEILLER_AGRICOLE, AGRIGULTEUR, UserRoles } from "../extends/GlobalFunctions";
import "./style.scss";
import { FaBeer } from 'react-icons/fa';
import { MdDashboardCustomize } from 'react-icons/md';
import { FaMapMarkerAlt } from 'react-icons/fa';
import {FcStackOfPhotos  } from 'react-icons/fc';
import { FaUserFriends } from 'react-icons/fa';
import { ImStatsDots } from 'react-icons/im';
import { FaCriticalRole } from 'react-icons/fa';
import log from '../../log.png'


const Main = (props) => {
  const routes = [
    { name: "Dashboard", path: "/home" , icon : <MdDashboardCustomize/> ,roles: [ADMIN,CONSEILLER_AGRICOLE,AGRIGULTEUR]},
    //{ name: "Produits", path: "/produits",roles: [ADMIN,CONSEILLER_AGRICOLE,USER] },
    //{ name: "LigneCommandes", path: "/ligne_commande",roles: [ADMIN,CONSEILLER_AGRICOLE,USER] },
    //{ name: "Livraison", path: "/livraison" ,roles: [ADMIN,CONSEILLER_AGRICOLE,USER]},
    //{ name: "Commandes", path: "/commandes",roles: [ADMIN,CONSEILLER_AGRICOLE,USER] },
    //{ name: "Payments", path: "/payments",roles: [ADMIN,CONSEILLER_AGRICOLE,USER] },
    { name: "Wilayas", path: "/wilayas" ,  icon : <FaMapMarkerAlt/> , roles: [ADMIN,CONSEILLER_AGRICOLE]},
    { name: "Moughataas", path: "/moughataas", icon : <FaMapMarkerAlt/>,roles: [ADMIN,CONSEILLER_AGRICOLE] },
    //{ name: "Communes", path: "/communes" },
    { name: "Publications", path: "/publications", icon : <FcStackOfPhotos/>, roles: [ADMIN,CONSEILLER_AGRICOLE] },
    { name: "Utilisateurs ", path: "/users" , icon : <FaUserFriends/>,roles: [ADMIN]},
    { name: "Roles", path: "/roles" , icon : <FaCriticalRole/>,roles: [ADMIN]},
    { name: "statistiques", path: "/statistiques" , icon : <ImStatsDots/>,roles: [ADMIN]},
    { name: "Se Connecter", path: "/login-signup", icon : <FaBeer/>,roles: [] },
    { name: "Typologie_Agr", path: "/typologi", icon : <FaBeer/>,roles: [ADMIN,CONSEILLER_AGRICOLE] },
    { name: "Type_Irrigation", path: "/typeirrigation", icon : <FaBeer/>,roles: [ADMIN,CONSEILLER_AGRICOLE] },
    { name: "produits", path: "/produits", icon : <FaBeer/>,roles: [ADMIN,AGRIGULTEUR] },
  
  ];
  return (
    <>
      <div
        className="sidebar fixed app-left"
        id="slide"
        style={{ height: "100vh", positionL: "fixed" }}
      >
        <ul className="sidebar-list  nav-list  ">
          {routes.map((route, i) => {
            const userroles= UserRoles();
            if(Array.isArray(userroles)){
              if(route.roles.includes(...userroles)){
                return (


                  <Link
                      key={i}
                    icon={route.icon}
                    clicked={props.clicked}
                    setClicked={props.setClicked}
                    name={route.name}
                    number={i + 1}
                    path={route.path}

                  />





                );
              }
            }
          })}
        </ul>
      </div>
    </>
  );
};


const Link = (props) => {
  return (

    <NavLink
      to={props.path}
      className={`sidebar-list-item ${props.clicked == props.number && "active"}`}
    >
      <li
        onClick={() => props.setClicked(props.number)}
        style={{ display: "flex", flexDirection: "row", marginLeft: "1rem"  }}
      >
         <span style={{  marginRight: "1rem" , marginTop:"14px" }}> {props.icon}</span>
        <span  style={{  color: "green",marginTop:"14px"  }}> {props.name}</span>
      </li>
    </NavLink>
  );
};
//     <div className="row ">
//     <div className="col  col-6">
//     <p>dfghjklm</p>
//     <div className="col  col-6">
//       <i className="bi bi-graph-up-arrow iconc"></i>
//     </div>
// </div>
// </div>


export default Main;