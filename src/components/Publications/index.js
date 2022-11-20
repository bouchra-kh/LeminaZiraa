import React, {useState} from "react";
import "./style.css";

import {useDispatch} from "react-redux";
import {SwitchMode,} from "../../app/features/local-config";
import {NavLink} from "react-router-dom";
import {useGetPublicationsQuery} from "./publication-services";
// import Card from 'react-bootstrap/Card';
// import {Button} from "react-bootstrap";
// import moment from "moment";
import PubItem from "./PubItem";
import axios from "axios";

export default function Publications() {
    const dispatch = useDispatch();
    const show = () => {
        document.getElementById("slide").classList.remove("d-none");
    };
    const [inputText, setInputText] = useState("");

    const responseInfop = useGetPublicationsQuery();

    if (responseInfop.isLoading) {
        return (
            <div className="app-content  ">
                <div className="d-flex flex-row  justify-content-between mb-10">
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
                                    <line x1="3" y1="12" x2="21" y2="12"/>
                                    <line x1="3" y1="6" x2="21" y2="6"/>
                                    <line x1="3" y1="18" x2="21" y2="18"/>
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
    if (inputText != '') {
        responseInfop.data.map((moughataa, position) => {
                if (inputText == moughataa.nom) {
                    console.log("hhhhhhhhhh")

                    ;
                    responseInfop.push(moughataa);
                    //const wilaya=responseInfos[0];


                }

            }
        );
    }
   const onItemClick = (id) => {
        alert(id);
        axios.put('publication/validate/'+id).then((response) => {
            console.log(response);
        });
   }

    return (
        <>
            <div className="app-content ms-4">
                <div className="d-flex flex-row  justify-content-between mb-3 ml-3">
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
                                    <line x1="3" y1="12" x2="21" y2="12"/>
                                    <line x1="3" y1="6" x2="21" y2="6"/>
                                    <line x1="3" y1="18" x2="21" y2="18"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="app-content-header justify-content-end  fixed">
                    <NavLink to={"new"}>
                        <button className="app-content-headerButton">
                            Ajouter publication
                        </button>
                    </NavLink>
                </div>
                <div>
                    <div className="row gap-3">
                        {/*<div className="card" style={{width:'18rem'}}>*/}
                        {/*  <img src="https://via.placeholder.com/468x60" className="card-img-top" alt="..."/>*/}
                        {/*  <div className="card-body">*/}
                        {/*    <h5 className="card-title">Card title</h5>*/}
                        {/*    <p className="card-text">Some quick example text to build on the card title and make up the bulk of*/}
                        {/*      the card's content.</p>*/}
                        {/*    <a href="#" className="btn btn-primary">Go somewhere</a>*/}
                        {/*  </div>*/}
                        {/*</div>*/}
                        {
                            responseInfop.data.map((publication, position) => {
                                return(
                                 <PubItem onItemClick={onItemClick} key={position} pub={publication}/>
                                )
                            }
                            )
                        }

                        {/*{responseInfop.data.map((publication, key) => {*/}
                        {/*    console.log("dddddddd", publication.moughataa?.nom)*/}
                        {/*    return (*/}

                        {/*        <div key={key} className="col divb">*/}
                        {/*            <section className="product">*/}
                        {/*                <div className="product__photo">*/}
                        {/*                    <div className="photo-container">*/}

                        {/*                        <div className="photo-main">*/}

                        {/*                             src="https://res.cloudinary.com/john-mantas/image/upload/v1537291846/codepen/delicious-apples/green-apple-with-slice.png*/}

                        {/*                            <img*/}
                        {/*                                src={`http://localhost:8080/publication/sid/${publication.id_publication}`}*/}
                        {/*                                alt="green apple slice"/>*/}
                        {/*                        </div>*/}

                        {/*                    </div>*/}
                        {/*                </div>*/}
                        {/*                <div className="product__info">*/}
                        {/*                    <div className="price">*/}
                        {/*                        <p className="description">{publication.description}</p>*/}
                        {/*                        <span className="price">Publié le :</span> <span*/}
                        {/*                        className="bl">{moment(publication.date_publication).format('D/M/yyyy')}</span>*/}
                        {/*                        <div className="price">*/}
                        {/*                            <p className="type_d'irrigation">{publication.typeIrrigation?.nom}</p>*/}
                        {/*                        </div>*/}

                        {/*                    </div>*/}
                        {/*                    <div className="price">*/}
                        {/*                        <span className="price">pour le wilaya de : </span> <span*/}
                        {/*                        className="bl">{publication.moughataa?.nom}</span>*/}
                        {/*                    </div>*/}
                        {/*                    <NavLink to={"detail/" + publication.id_publication}>*/}
                        {/*                        <button className="buy--btn  btn-success">Lire la suite</button>*/}
                        {/*                    </NavLink>*/}
                        {/*                </div>*/}
                        {/*            </section>*/}
                        {/*            <br></br>*/}
                        {/*        </div>*/}


                        {/*    );*/}

                        {/*})*/}
                        {/*}*/}
                    </div>
                </div>
            </div>
        </>
    );
}
