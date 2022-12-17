import React, { useEffect ,useState } from "react";

//import produits from "../data/data-produits";
import './style.css';
//import {ADMIN, UserHasAccess} from "../extends/GlobalFunctions";
import {useGetProduitsQuery} from "./produits-services"
import { BsCardList, BsFillGrid1X2Fill } from "react-icons/bs";
import { BiSort, BiDotsHorizontalRounded } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import {ADMIN,AGRIGULTEUR, UserHasAccess,getUser} from "../extends/GlobalFunctions";
import { SwitchMode, toGrid, ToList } from "../../app/features/local-config";
import { NavLink } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import axios from "axios";
//import {useDispatch} from "react-redux";
//import {SwitchMode, toGrid, ToList} from "../../app/features/local-config";
const Produits = () => {
  const dispatch = useDispatch();
  const show = () => {
    document.getElementById("slide").classList.remove("d-none");
  };
  const MSG_DELETE = "Voulez-vous vraiment supprimer cette produit ?";
  const MSG_DELETE_SUCCESS = "La wilaya a été supprimée avec succès";
  const MSG_ADD_SUCCESS = "La wilaya a été ajoutée avec succès";

 const produits = useGetProduitsQuery();
 const [showAlert, setShowAlert] = useState(false);
 const [showAlert2, setShowAlert2] = useState(false);
 const [selectedId, setSelectedId] = useState(null);
 const [quantite, setQuantite] = useState('');
 const [usernom, setUsernom] = useState('');
 const [nom, setNom] = useState('');
 //const [prix, setPrix] = useState('');
 const [type, setType] = useState('');
 const [localisation, setLocalisation] = useState('');
 //const [numero, setNumero] = useState('');
 
 const deleteWilaya = () => {
  setShowAlert(true);
axios.delete("produit/delete/" + selectedId).then((res) => {
 // setListWilayas(listWilayas.filter((wilaya) => wilaya.id !== selectedId));
 window.location.reload(false);
  setShowAlert(false);
}).catch((err) => {
  setShowAlert(false);
  console.log("delete wilaya error", err);
});
}
 console.log("prrrr",produits)
  if (produits.isLoading) {
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
          Ajouter publication
        </button>
      </NavLink>
    </div>

    <div>recherche</div>

    </div>
    )

  }
  return (
    <>

        <div class="container-fluid pt-5 pb-3">
        {
                      UserHasAccess(AGRIGULTEUR) &&
        <div className="ajout"><h1><NavLink to={"new"}>
            {" "}
            <div class=" icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-bag-plus-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z"/>
</svg>
            </div>
          </NavLink></h1></div>
}
        <h2 class="section-title position-relative text-uppercase mx-xl-5 mb-3"><span class="bg-secondary pr-3">List des Produits</span></h2>
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

                  <div class="row px-xl-5">
          {produits.data.map((produit, position) => {
            return (




                      <div class="col-lg-3 col-md-3 col-sm-6 pb-1 " >
                          <div class="product-item bg-light mb-1">
                              <div class="product-img position-relative overflow-hidden largeur">
                             <img  class="img-fluid w-100 " src={`http://localhost:8080/publication/sid/${produit.image}`} alt="lllllllllll"/>


                              </div>
                              <div class="text-center py-4">
                                  <a class="h6 text-decoration-none text-truncate">{produit.nom}</a>
                                  <div class="d-flex align-items-center justify-content-center mt-0">
                                      <h5>{produit.prix} MRU</h5><h6 class="text-muted ml-2"></h6>
                                  </div>
                                  <div class="d-flex align-items-center justify-content-center mt-0">
                                     <span><h5>{produit.numero} </h5><h6 class="text-muted ml-2"></h6></span>
                                  </div>
                                  {/* <div class="d-flex align-items-center justify-content-center ">
                                      <h5>Nouackchott</h5>
                                  </div> */}

                                  <div  class="  d-flex align-items-center justify-content-center mb-0">
                                  <svg onClick={() => {
                        setQuantite(produit.quantite);
                        setType(produit.type);
                        setNom(produit.nom);
                        setLocalisation(produit.localisation)

                        setUsernom(produit.utilisateur.username)
                        setShowAlert2(true);
                    }} xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="icon bi bi-info-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
</svg>
{
                        UserHasAccess(AGRIGULTEUR) &&

                       <svg onClick={() => {
                        setSelectedId(produit.id_produit);
                        setShowAlert(true);
                    }} xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="icon2 bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>
          } {
            UserHasAccess(AGRIGULTEUR) &&
            <NavLink to={"update"}>
            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="icon3 bi bi-pencil-fill" viewBox="0 0 16 16">
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
</svg>       </NavLink>

}
                                  </div>



                              </div>
                          </div>
                      </div>






            )
          })}  </div>
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
                            {MSG_DELETE}


                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color={"error"} onClick={()=>setShowAlert(false)} autoFocus>
                            Annuler
                        </Button>
                        <Button onClick={deleteWilaya} autoFocus>
                            Confirmer
                        </Button>
                    </DialogActions>


                </Dialog>
            </div>
            <div>
                <Dialog
                    open={showAlert2}
                    onClose={() => setShowAlert2(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" className="centerdiv">
                        détail sur le produit:"{nom}"
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">

                            <br></br>
                            <div> <span class="pr">quantite: </span>{quantite} KG</div>
                           <div><span class="pr">type: </span> {type}</div>
                            <div><span class="pr">localisation: </span>{localisation}</div>
                            <div><span class="pr">AGRICULTEUR: </span>{usernom}</div>

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {/* <Button color={"error"} onClick={()=>setShowAlert(false)} autoFocus>
                            Annuler
                        </Button>
                        <Button onClick={deleteWilaya} autoFocus>
                            Confirmer
                        </Button> */}
                    </DialogActions>


                </Dialog>
            </div>
    </>
  );
};

export default Produits;
