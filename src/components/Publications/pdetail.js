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
import moment from "moment";
import {Card, CardActionArea, Divider} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Co2} from "@mui/icons-material";
import {Col} from "react-bootstrap";
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
    <div className="app-content">
    <div className="d-flex flex-row  justify-content-between mb-3">
      <h1 className="app-content-headerText">Publications</h1>
      <div className="action-buttons">
        <button
          className="mode-switch"
          title="Switch Theme"
          onClick={() => dispatch(SwitchMode())}
        >
          <svg
            className="moon"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <defs></defs>
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
          </svg>
        </button>
        <div className="action-buttons">
          <button className="menu-button" onClick={() => show()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="menu"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-menu"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div className="app-content-header justify-content-end  fixed">
      <NavLink to={"new"}>
        {" "}
        <button className="app-content-headerButton">
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
  if(inputText!==''){
    // eslint-disable-next-line array-callback-return
    responseInfop.data.map((moughataa) => {
      if (inputText===moughataa.nom) {
         responseInfop.push(moughataa);
         //const wilaya=responseInfos[0];


      }

    }

    );
  }


  return (
    <>
      <div className="app-content  mb-0">
        <div className="d-flex flex-row  justify-content-between mb-0">
          <h1 className="app-content-headerText">Détail de la Publication</h1>
          <div className="action-buttons">
            <button
              className="mode-switch"
              title="Switch Theme"
              onClick={() => dispatch(SwitchMode())}
            >
              <svg
                className="moon"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <defs></defs>
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
              </svg>
            </button>
            <div className="action-buttons">
              <button className="menu-button" onClick={() => show()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="menu"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-menu"
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <Card className="mx-4 px-4 my-4">
          <CardActionArea>
            <CardMedia
                component="img"
                style={{width:'100%',height:'150px',objectFit: 'contain'}}
                image={`http://localhost:8080/publication/sid/${responseInfop.data?.id_publication}`}
                alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {responseInfop.data?.titre?responseInfop.data?.titre:responseInfop.data?.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {responseInfop.data?.description}
              </Typography>
               <Col>
                 <span>Date Publication : <strong>{moment(responseInfop.data.date_publication).format("DD/MM/YY")}</strong></span>
               </Col>
              <Divider color="#BFBFBF" />
              <Col>
                 <span>Annee recolte : <strong>{moment(responseInfop.data.anneerecolte).format("DD/MM/YY")}</strong></span>
               </Col>
              <Divider color="#BFBFBF"/>
              <Col>
                 <span>Semences : <strong>{responseInfop.data.semences}</strong></span>
               </Col>
              <Divider color="#BFBFBF"/>
              <Col>
                 <span>Quantite : <strong>{responseInfop.data.quantite}</strong></span>
               </Col>
              <Divider color="#BFBFBF"/>
              <Col>
                 <span>Superficies agricoles : <strong>{responseInfop.data.Superficies_agricoles}</strong></span>
               </Col>

              <Divider color="#BFBFBF"/>
              <Col>
                 <span>Decrues : <strong>{responseInfop.data.decrues}</strong></span>
               </Col>
              <Divider color="#BFBFBF"/>
              <Col>
                 <span>Prix semance : <strong>{responseInfop.data.prix_semance}</strong></span>
               </Col>

              <Divider color="#BFBFBF"/>
              <Col>
                 <span>main ouvre : <strong>{responseInfop.data.main_ouvre}</strong></span>
               </Col>

              <Divider color="#BFBFBF"/>
              <Col>
                 <span>prix outils : <strong>{responseInfop.data.prix_outils}</strong></span>
               </Col>
              <Divider color="#BFBFBF"/>
              <Col>
                 <span>moughataa : <strong>{responseInfop.data.moughataa?.nom}</strong></span>
               </Col>
              <Divider color="#BFBFBF"/>
              <Col>
                 <span>type Sole : <strong>{responseInfop.data.typeSole?.nom}</strong></span>
               </Col>

              <Divider color="#BFBFBF"/>
              <Col>
                 <span>type Irrigation : <strong>{responseInfop.data.typeIrrigation?.nom}</strong></span>
               </Col>
              <Divider color="#BFBFBF"/>
              <Col>
                 <span>typologie Agricole : <strong>{responseInfop.data.typologieAgricole?.nom}</strong></span>
               </Col>

            </CardContent>
          </CardActionArea>
        </Card>
        {/*<div className="scr">

                <div className=" divb2">
              <section className="product2">
                <div className="product__photo">
                  <div className="photo-container">
                    <div className="photo-main">
                      <img
                      src={`http://localhost:8080/publication/sid/${responseInfop.data?.id_publication}`} height={300}
                      width={150}
                      style={{ alignSelf: 'center', marginLeft:"60px" }} alt="green apple slice"

                      />
                    </div>

                  </div>
                </div>
                <div className="product__info">


                  </div>

              </section>

              <section className="prod">

                <div className="product__info">
                <span className="des">{responseInfop.data.description}</span>
                <br></br><br></br>


                  <span className="price">Semences    : </span> <span className="bl">{responseInfop.data.semences}</span>
                  <br></br>

                  <span className="price">annee recolte   : </span> <span className="bl">{moment(responseInfop.data.anneerecolte).format('DD/MM/yy')}</span>
                  <br></br>
                  <span className="price"> quantite   : </span> <span className="bl">{responseInfop.data.quantite}</span>
                  <br></br>
                  <span className="price"> type d'irrigation : </span> <span className="bl">{responseInfop.data.typeIrrigation?.nom}</span>
                  <br></br>
                  <span className="price"> Typologies agricoles  : </span> <span className="bl">{responseInfop.typologieAgricole?.nom}</span>
                  <br></br>
                  <span className="price"> Superficies agricoles  : </span> <span className="bl">{responseInfop.superficies_agricoles}</span>
                  <br></br>
                  <span className="price"> Type Sol  : </span> <span className="bl">{responseInfop.typeSole?.nom}</span>
                  <br></br>



                  <span className="price">Publié le :</span> <span className="bl">{moment(responseInfop.data.date_publication).format('DD/MM/yy')}</span>
                  <br></br>
                  <span className="price">wilaya de : </span> <span className="bl">{responseInfop.data.moughataa?.nom}</span>

                  </div>

              </section>






             </div>
         </div>*/}
      </div>
    </>
  );
}
