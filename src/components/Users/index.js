
import users from "../data/data-users";
import './style.css';
import { BsCardList, BsFillGrid1X2Fill } from "react-icons/bs";
import { BiSort, BiDotsHorizontalRounded } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { SwitchMode, toGrid, ToList } from "../../app/features/local-config";
import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import { userSlice,useGetUsersQuery,useDeleteUserMutation } from "./users-services";

export default function Users() {
  const dispatch = useDispatch();
  const show = () => {
    document.getElementById("slide").classList.remove("d-none");
  };
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    setInputText( e.target.value);
    
  };

  const responseInfo =useGetUsersQuery();
 const  [deleteUser]  =useDeleteUserMutation();


 console.log("Reponse: ", responseInfo)
  console.log("Data: ", responseInfo.data);
  // console.log("Delete: ", deleteWilaya)
  // console.log("success: ", responseInfo.isSuccess);
  console.log("inputtext:",inputText);
  
  if (responseInfo.isLoading) {
    return <div>recherch....</div>
  }
  if (responseInfo.isError) {
    return <div>erreur :{responseInfo.error.data}</div>
  }
  if(inputText!=''){
    responseInfo.data.map((user, position) => {
      if (inputText==user.nom) {
        console.log("hhhhhhhhhh")
        
         ;
         responseInfo.push(user);
         //const wilaya=responseInfos[0];
        
      
      }
  
    }
  
    );
  }
 
  
  

  return (
    <>
      <div class="app-content  ">
        <div className="d-flex flex-row  justify-content-between mb-3">
          <h1 class="app-content-headerText">Users</h1>
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
            <button class="app-content-headerButton">Ajouter user</button>
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
          </div>
        </div>
        <div
          class="products-area-wrapper tableView  "
          style={{ overflow: "scroll", height: "80vh" }}
        >
          <div class="products-header">
            <div class="product-cell category">
              Id
              <button class="sort-button">
                <BiSort />
              </button>
            </div>
            <div class="product-cell image">
              User nom et prenom
              <button class="sort-button">
                <BiSort />
              </button>
            </div>
            <div class="product-cell category">
              Supprimer
             
            </div>
            <div class="product-cell category">
              Modifier
          </div>
          </div>
          {responseInfo.length==0?
          responseInfo.data.map((user, position) => {
            return (
              <div class="products-row" key={position}>
                <button class="cell-more-button">
                  <BiDotsHorizontalRounded />
                </button>

                <div class="product-cell category">
                  <span class="cell-label">Id :</span>
                  {user.id}
                </div>
                <div class="product-cell image  t ">
                  <img src={user.image} />
                  <span>
                    {" "}
                    {user.nom} {user.prenom}
                  </span>
                </div>
                <div class="product-cell category">
    
      <button class="bc"onClick={() => {deleteUser(user.id)}}>Suprimer</button>
    </div>
  

    <div class="product-cell category">
    <NavLink to={"update/"+user.id}>
            {" "}
      <button class="bc2">Modifier</button>
      </NavLink>
    </div>
   
              </div>
            );
            }):
          <div class="products-row" >
          <button class="cell-more-button">
            <BiDotsHorizontalRounded />
          </button>
          <div class="product-cell category">
            <span class="cell-label">Id :</span>
            {responseInfo[0].id}
          </div>
          <div class="product-cell category">
            <span class="cell-label">Nom et prenom user :</span>
            {responseInfo[0].nom}
          </div>
         
     
<div class="product-cell category">

<button class="bc"onClick={() => {deleteUser(responseInfo[0].id)}}>Suprimer</button>
</div>


<div class="product-cell category">
<NavLink to={"update/"+responseInfo[0].id}>
      {" "}
<button class="bc2">Modifier</button>
</NavLink>
</div>

        </div>
}
            
         

        

        </div>
      </div>
    </>
  );
        


          }