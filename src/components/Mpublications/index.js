import React, { useState } from "react";
import "./style.css";
//import Publications from "../data/data-publication";
import { BsCardList, BsFillGrid1X2Fill } from "react-icons/bs";
import { BiSort, BiDotsHorizontalRounded } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { SwitchMode, toGrid, ToList } from "../../app/features/local-config";
import { NavLink } from "react-router-dom";
import {
  BrowserRouter as Router,
  
  useParams
} from 'react-router-dom'
import { publicationSlice,useGetPublicationsQuery,useDeletepublicationMutation } from "./publication-services";
export default function MPublications() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const show = () => {
    document.getElementById("slide").classList.remove("d-none");
  };
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    setInputText( e.target.value);
    
  };


  const responseInfop = useGetPublicationsQuery(id);
  const  [deletepublication]  =useDeletepublicationMutation();
console.log("publiiiiiiiicmmmmough")
  console.log("ReponsePublicat: ", responseInfop)
  console.log("Data: ", responseInfop.data);
  console.log("Delete: ", deletepublication)
  console.log("success: ", responseInfop.isSuccess);
  
  if (responseInfop.isLoading) {
    return <div>recherch....</div>
  }
  if (responseInfop.data.length==0) {
    return <div class="centerdiv">Cette Moughataa n'as pas de publications</div>
  }
  if (responseInfop.isError) {
    return <div>erreur :{responseInfop.error.data}</div>
  }
  if(inputText!=''){
    responseInfop.data.map((moughataa, position) => {
      if (inputText==moughataa.nom) {
        console.log("hhhhhhhhhh")
        
         ;
         responseInfop.push(moughataa);
         //const wilaya=responseInfos[0];
        
      
      }
  
    }
  
    );
  }


  return (
    <>
      <div class="app-content  ">
        <div className="d-flex flex-row  justify-content-between mb-3">
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
        {/* <div class="app-content-header justify-content-end  fixed">
          <NavLink to={"new"}>
            {" "}
            <button class="app-content-headerButton">
              Ajouter publication
            </button>
          </NavLink>
        </div> */}
        <div class="card row ">
          <div className="blog-posts">
            {responseInfop.data.map((publication,key) => {
              return (
                <article class="blog-post">
                  <img 
                    class="blog-post-image sti"
                    src={`http://localhost:8080/publication/sid/${publication.image}`}
                    
                    alt="image"
                  />
                  <h2 class="blog-post-heading"> date de la recolte  : {publication.anneerecolte.toString().substring(0, 10)}</h2>
                  <h2 class="blog-post-subheading">
                  date de publication :  {publication.date_publication.toString().substring(0, 10)}
                  </h2>
                  <h2 class="blog-post-subheading">
                  Moughataa :  {publication.moughataa.nom}
                  </h2>
               
                  <p class="text">{publication.semences}</p>
                  <p class="text">{publication.typesol}</p>
                  <p class="text">{publication.description}</p>
                  
                   
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
