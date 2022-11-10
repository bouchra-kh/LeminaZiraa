import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ADMIN, CONSEILLER_AGRICOLE, USER, UserRoles } from "../extends/GlobalFunctions";
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
    { name: "Dashboard", path: "/" , icon : <MdDashboardCustomize/> ,roles: [ADMIN,CONSEILLER_AGRICOLE,USER]},
    //{ name: "Produits", path: "/produits",roles: [ADMIN,CONSEILLER_AGRICOLE,USER] },
    //{ name: "LigneCommandes", path: "/ligne_commande",roles: [ADMIN,CONSEILLER_AGRICOLE,USER] },
    //{ name: "Livraison", path: "/livraison" ,roles: [ADMIN,CONSEILLER_AGRICOLE,USER]},
    //{ name: "Commandes", path: "/commandes",roles: [ADMIN,CONSEILLER_AGRICOLE,USER] },
    //{ name: "Payments", path: "/payments",roles: [ADMIN,CONSEILLER_AGRICOLE,USER] },
    { name: "Wilayas", path: "/wilayas" ,  icon : <FaMapMarkerAlt/> , roles: [ADMIN,CONSEILLER_AGRICOLE]},
    { name: "Moughataas", path: "/moughataas", icon : <FaMapMarkerAlt/>,roles: [ADMIN,CONSEILLER_AGRICOLE] },
    //{ name: "Communes", path: "/communes" },
    { name: "Publications", path: "/publications", icon : <FcStackOfPhotos/>, roles: [ADMIN,CONSEILLER_AGRICOLE,USER] },
    { name: "Utilisateurs ", path: "/users" , icon : <FaUserFriends/>,roles: [ADMIN,CONSEILLER_AGRICOLE,USER]},
    { name: "Roles", path: "/roles" , icon : <FaCriticalRole/>,roles: [ADMIN,CONSEILLER_AGRICOLE,USER]},
    { name: "statistiques", path: "/statistiques" , icon : <ImStatsDots/>,roles: [ADMIN]},
    { name: "Se Connecter", path: "/login-signup", icon : <FaBeer/>,roles: [] },
  ];
  return (
    <>
      <div
        class="   sidebar   fixed   app-left "
        id="slide"
        style={{ height: "100vh", positionL: "fixed" }}
      >
        <ul class="sidebar-list  nav-list  ">
          {routes.map((route, i) => {
            const userroles= UserRoles();
            if(Array.isArray(userroles)){
              if(route.roles.includes(...userroles)){
                return (


                  <Link
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
      class={`sidebar-list-item ${props.clicked == props.number && "active"}`}
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
//     <div class="row ">
//     <div class="col  col-6">
//     <p>dfghjklm</p>
//     <div class="col  col-6">
//       <i class="bi bi-graph-up-arrow iconc"></i>
//     </div>
// </div>
// </div>


export default Main;