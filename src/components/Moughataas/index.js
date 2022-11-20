import React, {useEffect, useState} from "react";
import moughataas from "../data/data-moughataa";
import {BsCardList, BsFillGrid1X2Fill} from "react-icons/bs";
import {BiSort, BiDotsHorizontalRounded} from "react-icons/bi";
import {useSelector, useDispatch} from "react-redux";
import {SwitchMode, toGrid, ToList} from "../../app/features/local-config";
import {NavLink, Link} from "react-router-dom";
import {moughataaSlice, useGetMoughataasQuery, useDeleteMoughataaMutation} from "./moughataas-services";

import './style.css';
import {ADMIN, UserHasAccess} from "../extends/GlobalFunctions";
import {MdDelete} from 'react-icons/md';
import {MdModeEdit} from 'react-icons/md';
import {FcEditImage} from 'react-icons/fc';
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export default function Moughataas() {
    const dispatch = useDispatch();
    // const responseInfos=[];
    const [moughataas, setMoughatas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const show = () => {
        document.getElementById("slide").classList.remove("d-none");
    };
    useEffect(() => {
        setLoading(true);
        axios.get("moughataaa/list").then((response) => {
            setMoughatas(response.data);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    function deleteMoughataa(id) {
        setShowAlert(true);
        axios.delete("moughataaa/delete/" + selectedId).then((res) => {
            setMoughatas(moughataas.filter((wilaya) => wilaya.id !== selectedId));
            setShowAlert(false);
        }).catch((err) => {
            setShowAlert(false);
            console.log("delete moughataa error", err);
        });
    }
    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
        setInputText(e.target.value);

    };
    // const responseInfo =useGetMoughataasQuery();
    // const  [deleteMoughataa]  = useDeleteMoughataaMutation();
    // console.log("Reponse: ", responseInfo)
    // console.log("Data: ", responseInfo.data);


    if (loading) {
        return <div>recherch....</div>
    }
    // if (responseInfo.isError) {
    //   return <div>erreur :{responseInfo.error.data}</div>
    // }
    // if(inputText!=''){
    //   responseInfo.data.map((wilaya, position) => {
    //     if (inputText==wilaya.nom) {
    //       console.log("hhhhhhhhhh")
    //
    //        ;
    //        responseInfos.push(wilaya);
    //        //const wilaya=responseInfos[0];
    //
    //
    //     }
    //
    //   }
    //
    //   );


    // }
    return (
        <>
            <div className="app-content  ">
                <div className="d-flex flex-row  justify-content-between mb-3">
                    <h1 className="app-content-headerText">Moughataas</h1>
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

                <div className="row ">
                    <div className="col  col-6">
                        {/* <NavLink to={"importer"}>
            {" "}
            <button className="app-content-headerButton">Importer wilayas</button>
         
          </NavLink> */}
                    </div>
                    {
                        UserHasAccess(ADMIN) && <div className="col col-6  app-content-header justify-content-end  fixed">
                            <NavLink to={"importer"}>
                                {" "}
                                <button className="m-2 app-content-headerButton">Importer moughataas</button>

                            </NavLink>

                            <NavLink to={"new"}>
                                {" "}
                                <button className="app-content-headerButton">Ajouter moughataa</button>

                            </NavLink>
                        </div>


                    }
                </div>
                <div className="app-content-actions fixed">
                    <input onChange={inputHandler} className="search-bar" placeholder="Search..." type="text"/>
                    <div className="app-content-actions-wrapper">
                        <button
                            className="action-button list active"
                            title="List View"
                            onClick={() => dispatch(ToList())}
                        >
                            <BsCardList/>
                        </button>
                        <button
                            className="action-button grid"
                            title="Grid View"
                            onClick={() => dispatch(toGrid())}
                        >
                            <BsFillGrid1X2Fill/>
                        </button>
                    </div>
                </div>
                <div
                    className="products-area-wrapper tableView  "
                    style={{overflow: "scroll", height: "80vh"}}
                >
                    <div className="products-header">
                        <div className="product-cell image">
                            Id
                            <button className="sort-button">
                                <BiSort/>
                            </button>
                        </div>
                        <div className="product-cell category">
                            Nom Moughataa
                            <button className="sort-button">
                                <BiSort/>
                            </button>
                        </div>
                        {
                            UserHasAccess(ADMIN) &&
                            <div className="product-cell category">


                            </div>}
                        {
                            UserHasAccess(ADMIN) && <div className="product-cell category" style={{marginRight: "60px"}}>

                                Actions
                            </div>
                        }
                        {
                            UserHasAccess(ADMIN) &&
                            <div className="product-cell category" style={{marginRight: "30px", fontSize: "14px"}}>

                                Publications
                            </div>
                        }


                    </div>

                    {

                            moughataas.map((moughataa, position) => {


                                return (
                                    <div className="products-row" key={position}>
                                        <button className="cell-more-button">
                                            <BiDotsHorizontalRounded/>
                                        </button>
                                        <div className="product-cell category">
                                            <span className="cell-label">Id :</span>
                                            {moughataa.id}
                                        </div>
                                        <div className="product-cell category">
                                            <span className="cell-label">Nom Moughataa :</span>
                                            {moughataa.nom}
                                        </div>
                                        {
                                            UserHasAccess(ADMIN) && <div className="product-cell category">


                                                <MdDelete style={{fontSize: "22px", color: "red", marginLeft: "200px"}}
                                                          onClick={() => {
                                                              setSelectedId(moughataa.id)
                                                              setShowAlert(true);
                                                          }}/>
                                            </div>

                                        }
                                        {
                                            UserHasAccess(ADMIN) && <div className="product-cell category">
                                                <NavLink to={"update/" + moughataa.id}>
                                                    {" "}
                                                    <MdModeEdit style={{fontSize: "22px", color: "green"}}/>
                                                </NavLink>
                                            </div>}
                                        <div className="product-cell category">
                                            <NavLink to={"moughp/" + moughataa.id}>
                                                {" "}
                                                < FcEditImage style={{marginRight: "30px", fontSize: "22px"}}/>
                                            </NavLink>
                                        </div>


                                    </div>
                                )

                            })


                    }
                </div>
            </div>
            <div>
                <Dialog
                    open={showAlert}
                    onClose={() => setShowAlert(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" className="centerdiv">
                        Alert
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            etes vous sur de vouloir supprimer cette moughataa ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color={"error"} onClick={()=>setShowAlert(false)} autoFocus>
                            Annuler
                        </Button>
                        <Button onClick={deleteMoughataa} autoFocus>
                            Confirmer
                        </Button>
                    </DialogActions>


                </Dialog>
            </div>
        </>
    );
}
