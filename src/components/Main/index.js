import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";

const Main = (props) => {
  const routes = [
    { name: "Dashboards", path: "/" },
    { name: "Produits", path: "/produits" },
    { name: "LigneCommandes", path: "/ligne_commande" },
    { name: "Livraison", path: "/livraison" },
    { name: "Commandes", path: "/commandes" },
    { name: "Payments", path: "/payments" },
    { name: "Wilayas", path: "/wilayas" },
    { name: "Moughataas", path: "/moughataas" },
    //{ name: "Communes", path: "/communes" },
    { name: "Publication", path: "/publications" },
    { name: "Users ", path: "/users" },
    { name: "Roles", path: "/roles" },

    { name: "Login", path: "/login-signup" },
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
            return (
              <Link
                clicked={props.clicked}
                setClicked={props.setClicked}
                name={route.name}
                number={i + 1}
                path={route.path}
              />
            );
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
