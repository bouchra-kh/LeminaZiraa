import React, { useEffect } from "react";
//import roles from "../data/data-roles";
import { BsCardList, BsFillGrid1X2Fill } from "react-icons/bs";
import { BiSort, BiDotsHorizontalRounded } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { SwitchMode, toGrid, ToList } from "../../app/features/local-config";
import { NavLink } from "react-router-dom";
import {useGetRolesQuery} from "./roles-services"
export default function Roles() {
  const dispatch = useDispatch();
  const show = () => {
    document.getElementById("slide").classList.remove("d-none");
  };
const roles=useGetRolesQuery();
if (roles.isLoading) {
  return (
  <div class="app-content  ">
  <div className="d-flex flex-row  justify-content-between mb-10">
    <h1 class="app-content-headerText">Publications</h1>
    <div class="action-buttons">
      <button
        class="mode-switch"
        title="Switch Theme"
        onClick={() => dispatch(SwitchMode())}
      >
        <svg
          class="moon"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <defs></defs>
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
        </svg>
      </button>
      <div class="action-buttons">
        <button class="menu-button" onClick={() => show()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="menu"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-menu"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  </div>
  <div class="app-content-header justify-content-end  fixed">
    <NavLink to={"new"}>
      {" "}
      <button class="app-content-headerButton">
        Ajouter role
      </button>
    </NavLink>
  </div>

  <div>recherche</div>
  
  </div>
  )
  
}
console.log("rrrrrrrr",roles)

  return (
    <>
      <div class="app-content  ">
        <div className="d-flex flex-row  justify-content-between mb-3">
          <h1 class="app-content-headerText">Roles</h1>
          <div class="action-buttons">
            <button
              class="mode-switch"
              title="Switch Theme"
              onClick={() => dispatch(SwitchMode())}
            >
              <svg
                class="moon"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <defs></defs>
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
              </svg>
            </button>
            <div class="action-buttons">
              <button class="menu-button" onClick={() => show()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="menu"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-menu"
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="app-content-header justify-content-end  fixed">
          <NavLink to={"new"}>
            {" "}
            <button class="app-content-headerButton">Ajouter Roless</button>
          </NavLink>
        </div>
        <div class="app-content-actions fixed">
          <input class="search-bar" placeholder="Search..." type="text" />
          <div class="app-content-actions-wrapper">
            <button
              class="action-button list active"
              title="List View"
              onClick={() => dispatch(ToList())}
            >
              <BsCardList />
            </button>
            <button
              class="action-button grid"
              title="Grid View"
              onClick={() => dispatch(toGrid())}
            >
              <BsFillGrid1X2Fill />
            </button>
          </div>
        </div>
        <div
          class="products-area-wrapper tableView  "
          style={{ overflow: "scroll", height: "80vh" }}
        >
          <div class="products-header">
            <div class="product-cell image">
              Id
              <button class="sort-button">
                <BiSort />
              </button>
            </div>
            <div class="product-cell category">
              Role
              <button class="sort-button">
                <BiSort />
              </button>
            </div>
          </div>

          {roles.data.map((role, position) => {
            return (
              <div class="products-row" key={position}>
                <button class="cell-more-button">
                  <BiDotsHorizontalRounded />
                </button>
                <div class="product-cell category">
                  <span class="cell-label">Id :</span>
                  {role.id}
                </div>
                <div class="product-cell category">
                  <span class="cell-label">Role :</span>
                  {role.roleName}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
