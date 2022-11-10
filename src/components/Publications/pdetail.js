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
import { publicationSlice,useGetPublicationsQuery,useGetPublicationByIdQuery,useDeletepublicationMutation } from "./publication-services";
export default function PublicationsDetail() {
    const { id } = useParams();
  const dispatch = useDispatch();
  const show = () => {
    document.getElementById("slide").classList.remove("d-none");
  };
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    setInputText( e.target.value);

  };


  const responseInfop = useGetPublicationByIdQuery(id);
  console.log(responseInfop.data)
  const  [deletepublication]  =useDeletepublicationMutation();

  if (responseInfop.isLoading) {
    return (
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
    <div class="app-content-header justify-content-end  fixed">
      <NavLink to={"new"}>
        {" "}
        <button class="app-content-headerButton">
          Ajouter publication
        </button>
      </NavLink>
    </div>

    <div>recherche</div>

    </div>
    )

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
      <div class="app-content  mb-0">
        <div className="d-flex flex-row  justify-content-between mb-0">
          <h1 class="app-content-headerText">Détail de la Publication</h1>
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

        <div class="scr">




                <div class=" divb2">
              <section class="product2">
                <div class="product__photo">
                  <div class="photo-container">
                    <div class="photo-main">
                      {/* <div class="controls">
                        <i class="material-icons">share</i>
                        <i class="material-icons">favorite_border</i>
                      </div> */}
                      {/* src="https://res.cloudinary.com/john-mantas/image/upload/v1537291846/codepen/delicious-apples/green-apple-with-slice.png
                       */}
                      <img
                      src={`http://localhost:8080/publication/sid/${responseInfop.data.image}`} height={300}
                      width={500}
                      style={{ alignSelf: 'center', marginLeft:"60px" }} alt="green apple slice"

                      />
                    </div>

                  </div>
                </div>
                <div class="product__info">


                  </div>

              </section>

              <section class="prod">

                <div class="product__info">
                <span className="des">{responseInfop.data.description}</span>
                <br></br><br></br>


                  <span className="price">Semences    : </span> <span className="bl">{responseInfop.data.semences}</span>
                  <br></br>

                  <span className="price">anneerecolte   : </span> <span className="bl">{responseInfop.data.anneerecolte}</span>
                  <br></br>
                  <span className="price"> quantite   : </span> <span className="bl">{responseInfop.data.quantite}</span>
                  <br></br>
                  <span className="price"> type_dirrigation : </span> <span className="bl">{responseInfop.data.type_dirrigation}</span>
                  <br></br>
                  <span className="price"> Typologies_agricoles  : </span> <span className="bl">{responseInfop.typologies_agricoles}</span>
                  <br></br>
                  <span className="price"> Superficies_agricoles  : </span> <span className="bl">{responseInfop.superficies_agricoles}</span>
                  <br></br>
                  <span className="price"> Type_Sol  : </span> <span className="bl">{responseInfop.typesol}</span>
                  <br></br>



                  <span className="price">Publié le :</span> <span className="bl">{responseInfop.data.date_publication.toString().substring(0, 10)}</span>
                  <br></br>
                  <span className="price">wilaya de : </span> <span className="bl">{responseInfop.data.moughataa?.nom}</span>

                  </div>

              </section>






             </div>
         </div>
      </div>
    </>
  );
}
