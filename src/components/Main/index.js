import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ADMIN, CONSEILLER_AGRICOLE, USER, UserRoles } from "../extends/GlobalFunctions";
import "./style.scss";

const Main = (props) => {
  const routes = [
    { name: "Dashboards", path: "/" ,roles: [ADMIN,CONSEILLER_AGRICOLE,USER]},
    //{ name: "Produits", path: "/produits",roles: [ADMIN,CONSEILLER_AGRICOLE,USER] },
    //{ name: "LigneCommandes", path: "/ligne_commande",roles: [ADMIN,CONSEILLER_AGRICOLE,USER] },
    //{ name: "Livraison", path: "/livraison" ,roles: [ADMIN,CONSEILLER_AGRICOLE,USER]},
    //{ name: "Commandes", path: "/commandes",roles: [ADMIN,CONSEILLER_AGRICOLE,USER] },
    //{ name: "Payments", path: "/payments",roles: [ADMIN,CONSEILLER_AGRICOLE,USER] },
    { name: "Wilayas", path: "/wilayas" ,roles: [ADMIN,CONSEILLER_AGRICOLE]},
    { name: "Moughataas", path: "/moughataas",roles: [ADMIN,CONSEILLER_AGRICOLE] },
    //{ name: "Communes", path: "/communes" },
    { name: "Publication", path: "/publications",roles: [ADMIN,CONSEILLER_AGRICOLE,USER] },
    { name: "Users ", path: "/users" ,roles: [ADMIN,CONSEILLER_AGRICOLE,USER]},
    { name: "Roles", path: "/roles" ,roles: [ADMIN,CONSEILLER_AGRICOLE,USER]},
    { name: "statistique", path: "/statistiques" ,roles: [ADMIN]},
    { name: "Login", path: "/login-signup",roles: [] },
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
    <li
      class={`sidebar-list-item ${props.clicked == props.number && "active"}`}
      onClick={() => props.setClicked(props.number)}
    >
      <NavLink to={props.path}>
        <span> {props.name}</span>
      </NavLink>
    </li>
  );
};

export default Main;
