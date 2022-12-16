import React, { useEffect,useState } from "react";
import "./style.css";
import { jsPDF } from 'jspdf';
import { useRef } from 'react';
import domtoimage from 'dom-to-image';
//import Publications from "../data/data-publication";
import { BsCardList, BsFillGrid1X2Fill } from "react-icons/bs";
import { BiSort, BiDotsHorizontalRounded } from "react-icons/bi";
import { ADMIN,CONSEILLER_AGRICOLE, UserHasAccess ,getUser} from "../extends/GlobalFunctions";

import { useSelector, useDispatch } from "react-redux";
import { SwitchMode, toGrid, ToList } from "../../app/features/local-config";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {
    BrowserRouter as Router,

    useParams
  } from 'react-router-dom'
import { publicationSlice,useGetPublicationsQuery,useGetPublicationByIdQuery,useDeletepublicationMutation } from "./publication-services";
export default function PublicationsDetail() {
  var node = document.getElementById("node");
    const { id } = useParams();
    const pdfRef = useRef(null);
    const [showAlert, setShowAlert] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);
   // const responseInfop = useGetPublicationByIdQuery(id);
   // const [res, setRes] = useState("jj");
   const [loading, setLoading] = useState(false);

   const responseInfop=useGetPublicationByIdQuery(id);

   const MSG_DELETE = "Voulez-vous vraiment valider cette publication ?";
   const MSG_DELETE2 = "Voulez-vous rendre cette publication en Non_valide ?";
  const dispatch = useDispatch();
  const show = () => {
    document.getElementById("slide").classList.remove("d-none");
  };
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    setInputText( e.target.value);

  };
 const [idp,setIdp]=useState("")
//setIdp(responseInfop.data.id_publication);
  const onItemClick = () => {
   setShowAlert(false);
    axios.put('publication/validatepublication/'+id).then((response) => {
        console.log("la pubication a ete validé");
        setShowAlert(false);
        alert("la pubication a ete validé");
        window.location.reload(false);
      // setResponseInfop(responseInfop);
    });

}

const onItemClick2 = () => {
 setShowAlert2(false);
  axios.put('publication/nvalidatepublication/'+id).then((response) => {

      setShowAlert2(false);
      console.log("la pubication est non valide");
      alert("la pubication est maintenant non valide");
      window.location.reload(false);
    //  setResponseInfop(responseInfop);

  });

}
  var content = pdfRef.current;

  const downloadAsPDF= () => {

    let div = content;

    var img;
    var filename;
    var newImage;
    var name = document.getElementById('name').value;
console.log("vhhhhhhhhhhhhh")
    domtoimage.toPng(content, { bgcolor: '#fff' })
      .then(function(dataUrl) {
        console.log("dotu")
        img = new Image();
        img.src = dataUrl;
        newImage = img.src;

        img.onload = function(){
          console.log("loading")

          var pdfWidth = img.width;
          var pdfHeight = img.height;

          // FileSaver.saveAs(dataUrl, 'my-pdfimage.png'); // Save as Image

          var doc;

          if(pdfWidth > pdfHeight)
          {
            doc = new jsPDF('l', 'px', [pdfWidth , pdfHeight]);
          }
          else
          {
            doc = new jsPDF('p', 'px', [pdfWidth , pdfHeight]);
          }


          var width = doc.internal.pageSize.getWidth();
          var height = doc.internal.pageSize.getHeight();


          doc.addImage(newImage, 'PNG',  10, 10, width, height);
          filename = 'Publication' + '.pdf';
          console.log("kkkkkk")
          doc.save(filename);

        };


      })
      .catch(function(error) {

        // Error Handling

      });

  }

  //console.log("data publi",responseInfop.data)


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
  const etat = () => {
if(responseInfop.data.valide){
  return true;
}
return false;
  }
  const validep = () => {

        const v=responseInfop.data.valide
       // responseInfop;
    if(v){
        return true;

    }
    return false;
}
const nvalidep = () => {

  const v=responseInfop.data.valide
 // responseInfop;
if(v){
  return false;

}
return true;
}

function refreshPage() {
  window.location.reload(false);
}
  return (
    <>
      <div   class="app-content  mb-0 ">
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

        <div class="scr"  >




                <div class=" divb2">

                  <div ref={pdfRef} class="node" id="name">
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
                      <img class="imdetail"
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

              <section class="prod" >

                <div class="product__info">
                <span className="des">{responseInfop.data.description}</span>
                <br></br><br></br>


                  <span className="price">Semences    : </span> <span className="bl">{responseInfop.data.semences}</span>
                  <br></br>
                  {
etat() &&
                  <><span className="price ">etat: </span><span className="bl valide">Validée</span><br></br></>


                  }    {
                    !etat() &&
                                      <><span className="price ">etat: </span><span className="bl nvalide">Non Validée</span><br></br></>


                                      }
                  <span className="price">anneerecolte   : </span> <span className="bl">{responseInfop.data.anneerecolte.toString().substring(0, 10)}</span>
                  <br></br>

                  <span className="price">moughataa de : </span> <span className="bl">{responseInfop.data.moughataa?.nom}</span>
                  <br></br>

                  <span className="price"> type_dirrigation : </span> <span className="bl">{responseInfop.data.typeIrrigation.nom}</span>
                  <br></br>
                  <span className="price"> Typologies_agricoles  : </span> <span className="bl">{responseInfop.data.typologieAgricole?.nom}</span>
                  <br></br>
                  <span className="price"> Superficies_agricoles  : </span> <span className="bl">{responseInfop.data.superficies_agricoles}</span>
                  <br></br>
                  <span className="price"> quantite   : </span> <span className="bl">{responseInfop.data.quantite}KG</span>
                  <br></br>
                  <span className="price"> cout de main_ouvre  : </span> <span className="bl">{responseInfop.data.main_ouvre}</span>
                  <br></br>
                  <span className="price"> cout des outils : </span> <span className="bl">{responseInfop.data.prix_outils}</span>
                  <br></br><span className="price">cout de semances  : </span> <span className="bl">{responseInfop.data.prix_semance}</span>
                <br></br><span className="price">cout Totales  : </span> <span className="bl">{responseInfop.data.prix_semance +responseInfop.data.prix_outils+responseInfop.data.main_ouvre}</span>
                  <br></br>


                  <span className="price">Publié le :</span> <span className="bl">{responseInfop.data.date_publication.toString().substring(0, 10)}</span>

                  </div>

              </section>
              </div>
<br></br>
              <button onClick={
 downloadAsPDF
  } class=" button4 " ><svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" fill="currentColor" class="bi bi-arrow-down-circle" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
</svg></button>
{
                        nvalidep() && UserHasAccess(ADMIN) &&
<button  onClick={() => {
                                                            //  setSelectedId(wilaya.id);
                                                              setShowAlert(true);
                                                          }} class=" button5 " ><svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
</svg></button>
}

{
                        validep() && UserHasAccess(ADMIN) && <button  onClick={() => {
                          //  setSelectedId(wilaya.id);
                            setShowAlert2(true);
                        }} class=" buttond " ><svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" fill="currentColor" class="bi bi-file-excel-fill" viewBox="0 0 16 16">
                        <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5.884 4.68 8 7.219l2.116-2.54a.5.5 0 1 1 .768.641L8.651 8l2.233 2.68a.5.5 0 0 1-.768.64L8 8.781l-2.116 2.54a.5.5 0 0 1-.768-.641L7.349 8 5.116 5.32a.5.5 0 1 1 .768-.64z"/>
                      </svg></button>

                        }

{
                         UserHasAccess(ADMIN) &&
                         <NavLink to={"../update/"+responseInfop.data.id_publication}>
                         {" "}
                         <button  class=" button5 " ><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                      </svg></button></NavLink>

                        }
                        {
                         UserHasAccess(CONSEILLER_AGRICOLE) &&
                         <NavLink to={"../update/"+responseInfop.data.id_publication}>
                         {" "}
                         <button  class=" button5 " ><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                      </svg></button></NavLink>

                        }


             </div>
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
                      {MSG_DELETE}
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
                  <Button color={"error"} onClick={()=>setShowAlert(false)} autoFocus>
                      Annuler
                  </Button>
                  <Button onClick={onItemClick} autoFocus>
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
                  Alert
              </DialogTitle>
              <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                      {MSG_DELETE2}
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
                  <Button color={"error"} onClick={()=>setShowAlert2(false)} autoFocus>
                      Annuler
                  </Button>
                  <Button onClick={onItemClick2} autoFocus>
                      Confirmer
                  </Button>
              </DialogActions>


          </Dialog>
</div>
    </>
  );



}
