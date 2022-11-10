




import React, { useState } from "react";
import moughataas from "../data/data-moughataa";
import { BsCardList, BsFillGrid1X2Fill } from "react-icons/bs";
import { BiSort, BiDotsHorizontalRounded } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { SwitchMode, toGrid, ToList } from "../../app/features/local-config";
import { NavLink ,Link} from "react-router-dom";
import { moughataaSlice,useGetMoughataasQuery,useDeleteMoughataaMutation} from "./moughataas-services";

import './style.css';
import { ADMIN, UserHasAccess } from "../extends/GlobalFunctions";
import { MdDelete } from 'react-icons/md';
import {MdModeEdit } from 'react-icons/md';
import {FcEditImage } from 'react-icons/fc';
  
export default function Moughataas() {
  const dispatch = useDispatch();
  const responseInfos=[];
  const show = () => {
    document.getElementById("slide").classList.remove("d-none");
  };
 
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    setInputText( e.target.value);
    
  };
  const responseInfo =useGetMoughataasQuery();
  const  [deleteMoughataa]  = useDeleteMoughataaMutation();



  console.log("Reponse: ", responseInfo)
  console.log("Data: ", responseInfo.data);

  
  if (responseInfo.isLoading) {
    return <div>recherch....</div>
  }
  if (responseInfo.isError) {
    return <div>erreur :{responseInfo.error.data}</div>
  }
  if(inputText!=''){
    responseInfo.data.map((wilaya, position) => {
      if (inputText==wilaya.nom) {
        console.log("hhhhhhhhhh")
        
         ;
         responseInfos.push(wilaya);
         //const wilaya=responseInfos[0];
        
      
      }
  
    }
  
    );
  }
  return (
    <>
      <div class="app-content  ">
        <div className="d-flex flex-row  justify-content-between mb-3">
          <h1 class="app-content-headerText">Moughataas</h1>
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
    
        <div class="row ">
        <div class="col  col-6">
        {/* <NavLink to={"importer"}>
            {" "}
            <button class="app-content-headerButton">Importer wilayas</button>
         
          </NavLink> */}
        </div>
        {
              UserHasAccess(ADMIN)  &&     <div class="col col-6  app-content-header justify-content-end  fixed">
        <NavLink to={"importer"}>
            {" "}
            <button class="m-2 app-content-headerButton">Importer moughataas</button>
         
          </NavLink>
          
          <NavLink to={"new"}>
            {" "}
            <button class="app-content-headerButton">Ajouter moughataa</button>
         
          </NavLink>
        </div>


        }
        </div>
        <div class="app-content-actions fixed">
          <input onChange={inputHandler} class="search-bar" placeholder="Search..." type="text" />
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
              Nom Moughataa
              <button class="sort-button">
                <BiSort />
              </button>
            </div>
            {
      UserHasAccess(ADMIN) &&         
      <div class="product-cell category">
            
             
            </div>}
            {
      UserHasAccess(ADMIN) &&          <div class="product-cell category" style={{    marginRight:"60px" }}>
             
              Actions
            </div>
            }
           {
      UserHasAccess(ADMIN) &&          <div class="product-cell category"style={{     marginRight:"30px" ,fontSize:"14px"}}>
             
              Publications
            </div>
            }
            
            
            
          </div>

          {
          responseInfos.length==0?responseInfo.data.map((moughataa, position) => {
       
           
            return (
              <div class="products-row" key={position}>
                <button class="cell-more-button">
                  <BiDotsHorizontalRounded />
                </button>
                <div class="product-cell category">
                  <span class="cell-label">Id :</span>
                  {moughataa.id}
                </div>
                <div class="product-cell category">
                  <span class="cell-label">Nom Moughataa :</span>
                  {moughataa.nom}
                </div>
                {
      UserHasAccess(ADMIN) &&             <div class="product-cell category">
    
    
 <MdDelete style={{   fontSize:"22px" , color:"red" , marginLeft:"200px" }} onClick={() => {deleteMoughataa(moughataa.id) }}/>
    </div>
  
                }
   {
     UserHasAccess(ADMIN) &&    <div class="product-cell category">
    <NavLink to={"update/"+moughataa.id}>
            {" "}
            <MdModeEdit style={{   fontSize:"22px" , color:"green"  }}/>
      </NavLink>
    </div>}
    <div class="product-cell category">
    <NavLink to={"moughp/"+moughataa.id}>
            {" "}
            < FcEditImage style={{     marginRight:"30px" ,fontSize:"22px"}}/>
      </NavLink>
    </div>
                

                
              </div>
            )
         
          }):
          
            <div class="products-row" >
              <button class="cell-more-button">
                <BiDotsHorizontalRounded />
              </button>
              <div class="product-cell category">
                <span class="cell-label">Id :</span>
                {responseInfos[0].id}
              </div>
              <div class="product-cell category">
                <span class="cell-label">Nom Moughataa :</span>
                {responseInfos[0].nom}
              </div>
              {
      UserHasAccess(ADMIN) &&          <div class="product-cell category">
  
    <button class="bc"onClick={() => {deleteMoughataa(responseInfos[0].id)}}><MdDelete/></button>
  </div>}

  {
      UserHasAccess(ADMIN) &&   
  <div class="product-cell category">
  <NavLink to={"update/"+responseInfos[0].id}>
          {" "}
    <button class="bc2">dd</button>
    </NavLink>
  </div>}
  <div class="product-cell category">
  
    <button class="bc3">Publication </button>
  

  </div>
         

              
            </div>
          
        }
        </div>
      </div>
    </>
  );
}
