import {useNavigate} from 'react-router-dom';

import "./style.css";
import React, {useEffect, useState} from "react";
import {
    useCreatepublicationMutation,
    usePhotopublicationMutation,
    useGetPublicationsQuery
} from "./publication-services";
import {useGetMoughataasQuery} from '../Moughataas/moughataas-services';
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export default function PublicationsNew() {
    const [image, setImage] = useState("");
    const [imagename, setImagename] = useState("");
    const [showMsg, setShowMsg] = useState(false);
    const navigate = useNavigate();
    const [titre, setTitre] = useState("");
    const [username, setUsername] = useState("");
    const [ts, setTs] = useState("");
    const [quantite, setQuantite] = useState("");
    const [semences, setSemences] = useState("");
    const [Superficies_agricoles, setSuperficie] = useState("");
    const [type_dirrigation, setType] = useState("");
    const [Typologies_agricoles, setTypologie] = useState("");
    const [date, setDate] = useState("");
    const [aff, setAff] = useState("");
    const [typologieAgricoles, setTypologieAgricoles] = useState([]);
    const [typeSoles, setTypeSoles] = useState([]);
    const [typeDirrigations, setTypeIrrigations] = useState([]);
    const [prix_semance, setPrixSemance] = useState(0);
    const [main_ouvre, setMainOver] = useState(0);
    const [prix_outils, setPrix_outils] = useState(0);


    useEffect(() => {
        axios.get("api/refs/typologieAgricoles").then((res) => {
                setTypologieAgricoles(res.data);
            }
        );
        axios.get("api/refs/typeSoles").then((res) => {
                setTypeSoles(res.data);
            }
        );
        axios.get("api/refs/typeIrrigations").then((res) => {
                setTypeIrrigations(res.data);
            }
        );
    }, []);


    function pad2(n) {
        return (n < 10 ? '0' : '') + n;
    }

// onFileChange= (event) => {
//   console.log()
//  setImage(event.target.files[0]  )
//  setImagename(image.name);
// }
    var date2 = new Date();
    var month = pad2(date2.getMonth() + 1);//months (0-11)
    var day = pad2(date2.getDate());//day (1-31)
    var year = date2.getFullYear();

    var formattedDate = year + "-" + month + "-" + day;
    // console.log("date", formattedDate.toString().substring(0, 10));
//alert(formattedDate);
    const [newpublication] = useCreatepublicationMutation();
    const [moughataa, setMoughataa] = useState("");
    const responseInfo = useGetMoughataasQuery();
    const [responseInfo4] = usePhotopublicationMutation();
    const getpulication = useGetPublicationsQuery();
    const affichage = [
        {
            id: true,
            nom: "Oui"
        },
        {
            id: false,
            nom: "Non"
        }
    ]
    if (responseInfo.isLoading) {
        return <div>recherch....</div>
    }
    return (
        <div className="login d-flex flex-column formulairep">
            <h1>Ajout</h1>
            <form
                className=""
                onSubmit={(e) => {
                    e.preventDefault();
                    axios.post("publication/save", {
                        description: username,
                        titre: titre,
                        date_publication: formattedDate,
                        typeSole: {"id": ts},
                        semences: semences,
                        quantite: quantite,
                        Suagr: Superficies_agricoles,
                        anneerecolte: date,
                        est_affiche: aff,
                        image: image.name,
                        typeIrrigation: {"id": type_dirrigation},
                        typologieAgricole: {"id": Typologies_agricoles},
                        moughataa: {"id": moughataa},
                        prix_semance: prix_semance,
                        main_ouvre: main_ouvre,
                        prix_outils: prix_outils,
                    }).then((res) => {
                        console.log(res.data);
                        var fd = new FormData();
                        fd.append("img", image);
                        axios.post("publication/photo/" + res.data.id_publication, fd)
                            .then(() => {
                                setShowMsg(true);
                            }).catch((err) => {
                            console.log(err);
                        });
                    });

                    // newpublication({
                    //     description: username,
                    //     date_publication: formattedDate,
                    //     typeSole: {"id":ts},
                    //     semences: semences,
                    //     quantite: quantite,
                    //     Suagr: Superficies_agricoles,
                    //     anneerecolte: date,
                    //     est_affiche: aff,
                    //     image: image.name,
                    //     typeIrrigation: {"id":type_dirrigation},
                    //     typologieAgricole: {"id":Typologies_agricoles},
                    //     moughataa: {"id": moughataa}
                    //
                    // });
                    //
                    // responseInfo4(image);
                    // getpulication.data.map((publication,key) => {});
                    // navigate('../../Publications/');

                    // responseInfo;
                }}
            >
                <input
                    type="text"
                    value={titre}
                    onChange={(e) => setTitre(e.target.value)}
                    placeholder="Titre"
                    required="required"
                    className="form-control my-1"
                />
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Description"
                    required="required" style={{height: "60px"}}
                    className="form-control my-1"
                />


                <div className="">

                    {/*<input className="inputp"*/}
                    {/*        type="text"*/}
                    {/*        value={ts}*/}
                    {/*        onChange={(e) => setTs(e.target.value)}*/}
                    {/*        placeholder="Type_Sol"*/}
                    {/*        required="required"*/}
                    {/*      />*/}

                    <select placeholder="Type Sole" className="form-control my-1"
                            onChange={(e) => setTs(e.target.value)}>
                        {
                            typeSoles.map((typeSole, key) => (
                                <option key={key} value={typeSole.id}>{typeSole.nom}</option>
                            ))
                        }
                    </select>

                    <input
                        type="text"
                        value={semences}
                        onChange={(e) => setSemences(e.target.value)}
                        placeholder="Semences"
                        required="required"
                        className="form-control my-1"
                    />
                </div>


                <div className="">
                    <input
                        type="number"
                        value={quantite}
                        onChange={(e) => setQuantite(e.target.value)}
                        placeholder="Quantite"
                        required="required"
                        className="form-control my-1"
                    />
                    <input
                        type="text"
                        value={Superficies_agricoles}
                        onChange={(e) => setSuperficie(e.target.value)}
                        placeholder="Superficies_agricoles"
                        required="required"
                        className="form-control"
                    />
                    <select placeholder={"Type D'irrigation"} className="form-control my-1"
                            onChange={(e) => setType(e.target.value)}>
                        {
                            typeDirrigations.map((typeir, key) => (
                                <option key={key} value={typeir.id}>{typeir.nom}</option>
                            ))
                        }
                    </select>
                    {/*<input*/}
                    {/* type="text"*/}
                    {/* value={type_dirrigation}*/}
                    {/* onChange={(e) => setType(e.target.value)}*/}
                    {/* placeholder="Types_d'irrigation"*/}
                    {/* required="required"*/}
                    {/* />*/}

                    {/*<input*/}
                    {/*type="text"*/}
                    {/*value={Typologies_agricoles}*/}
                    {/*onChange={(e) => setTypologie(e.target.value)}*/}
                    {/*placeholder="Typologies_agricoles"*/}
                    {/*required="required"*/}
                    {/*/>*/}
                    <select placeholder="Typologie d'Agricole" className="form-control my-1"
                            onChange={(e) => setTypologie(e.target.value)}>
                        {
                            typologieAgricoles.map((typologie, key) => (
                                <option key={key} value={typologie.id}>{typologie.nom}</option>
                            ))
                        }
                    </select>


                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="Annee_Recolte"
                        required="required"
                        className="form-control"
                    />
                    <input
                        type="number"
                        value={prix_semance}
                        onChange={(e) => setPrixSemance(parseFloat(e.target.value))}
                        placeholder="prix semance"
                        required="required"
                        className="form-control"
                    />
                    <input
                        type="number"
                        value={prix_outils}
                        onChange={(e) => setPrix_outils(parseFloat(e.target.value))}
                        placeholder="prix Outils"
                        required
                        className="form-control"
                    />
                    <input
                        type="number"
                        value={main_ouvre}
                        onChange={(e) => setMainOver(parseFloat(e.target.value))}
                        placeholder="Main d'Ouvre"
                        required
                        className="form-control"
                    />
                </div>

                <select placeholder={"est Affiche"} className="form-control my-1" value={aff} name={aff}
                        onChange={(e) => setAff(e.target.value)}
                >

                    {affichage.map((moughataa, position) => {
                        return (


                            <option key={position} value={moughataa.id} required="required">{moughataa.nom}</option>
                        );
                    })}
                </select>
                <select placeholder="Moughataa" className="form-control my-1" value={moughataa} name={moughataa}
                        onChange={(e) => setMoughataa(e.target.value)}>
                    {responseInfo.data.map((moughataa, position) => {
                        return (

                            <option key={position} value={moughataa.id} required="required">{moughataa.nom}</option>
                        );
                    })}
                </select>

                <input
                    className="form-control my-2"
                    type="file"
                    onChange={(e) => {
                        setImage(e.target.files[0]);
                        setImagename(image.name);
                    }}/>
                <button className="btn btn-primary btn-block btn-large" type="submit">
                    Ajouter publication
                </button>
            </form>
            <div>
                <Dialog
                    open={showMsg}
                    onClose={function (){
                        setShowMsg(false);
                    }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" className="centerdiv">
                        Alert
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            publication ajouté avec succés
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={function (){
                                setShowMsg(false);
                                navigate('/publications');
                            }}
                            autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

 


 

