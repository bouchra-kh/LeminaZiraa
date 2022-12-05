import React, { useState } from "react";
//import "./style.css";
//import Publications from "../data/data-publication";
import { BsCardList, BsFillGrid1X2Fill } from "react-icons/bs";
import { BiSort, BiDotsHorizontalRounded } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { SwitchMode, toGrid, ToList } from "../../app/features/local-config";
import { NavLink ,useNavigate}  from "react-router-dom";

import {
  BrowserRouter as Router,

  useParams
} from 'react-router-dom'
import {useGetPvalideQuery} from "./dashboard-services"
import { publicationSlice,useGetPublicationsQuery,useDeletepublicationMutation } from "../Mpublications/publication-services";
export default function Publicationsmap() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const show = () => {
    document.getElementById("slide").classList.remove("d-none");
  };
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    setInputText( e.target.value);

  };


  const responseInfop = useGetPvalideQuery(id);
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
      <div class="app-content scr ">
        <div className="d-flex flex-row  justify-content-between mb-20">
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
                  width="12"
                  height="12"
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

        <div >
        <div class="row">
            {responseInfop.data.map((publication,key) => {
              console.log("dddddddd",publication.moughataa?.nom)
              return (

                <div class="coll divb">
              <section class="product">
                <div class="product__photo">
                  <div class="photo-container">
                    <div class="photo-main">


                      <img class="imindex"
                      src={`http://localhost:8080/publication/sid/${publication.image}`} />
                   
                    </div>

                  </div>
                </div>
                <div class="product__info">
                  <div class="price">
                    <p className="description">{publication.description}</p>
                    <span className="price">Publié le :</span> <span className="bl">{publication.date_publication.toString().substring(0, 10)}</span>

                  </div>
                  <div class="price">
                  <span className="price">pour le wilaya de : </span> <span className="bl">{publication.moughataa?.nom}</span><br></br><br></br>
                  </div>
                  <br></br>
                  <NavLink to={"detailMoughataapublications/"+publication.id_publication}>
                  <button class="buy--btn  btn-success"
                  >Lire la suite</button>
                  </NavLink>
                </div>-
              </section>
              <br></br>
            </div>



              );

            })
            }
             </div>
         </div>
      </div>
    </>
  );

}
