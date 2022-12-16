import React, {useEffect, useState} from "react";
import './home.css'
//import {Math} from 'mathjs';
import Typography from '@mui/material/Typography';
import {Paper} from "@mui/material";
import axios from "axios";
 import {useGetWilayasQuery,useDeleteWilayaMutation } from "../components/Wilayas/wilayas-services";
import {useGetProduitsQuery} from "../components/Produits/produits-services"
import { useGetMoughataasQuery } from "./Moughataas/moughataas-services";
import { useGetPublicationsQuery } from "./Publications/publication-services";
const Home = () => {
    const [publicationsv, setPublicationsv] = useState([]);
    const [publicationsnv, setPublicationsnv] = useState([]);
    const [loading, setLoading] = useState(true);
    const produits = useGetProduitsQuery();
    const wilayas=useGetWilayasQuery();
    const moughataas=useGetMoughataasQuery();
    const [publicationst,setPublicationst]=useState("");;;
    const [conseill,setConseill]=useState("");;
    const [agrict,setAgrict]=useState("");;
    const [lpv,setLpv]=useState("");
    const [sopp,setSopp]=useState("");
    useEffect(() => {
      axios.get("publication/list").then((res) => {
        setPublicationst(res)
                    })
        axios.get("users/listagr").then((res) => {
            setAgrict(res)
                        })
        axios.get("users/listcons").then((res) => {
            setConseill(res);

           // setLoading(false);

        }).finally(() => {
          // setLoading(false);
        });
        axios.get("publication/sommepnvalide").then((res) => {
            setPublicationsnv(res)
                        })
        axios.get("publication/sommepvalide").then((res) => {
            setPublicationsv(res);
            console.log("vaaaa",publicationsv);
           // setLpv(publicationsv.data.length);
            setLoading(false);

        }).finally(() => {
           setLoading(false);
        });

    }, []);
    if (wilayas.isLoading) {
      return <div>recherche....</div>
    }
    if (moughataas.isLoading) {
      return <div>recherche....</div>
    }
    if (produits.isLoading) {
      return <div>recherche....</div>
    }
    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }
 const boot=""+Math.floor((publicationsv.data.length/publicationst.data.length)*100)+","+100;
// "30,100"
    return (
        <div class="app-container">

<div class="app-name">

<div class="main-header-line">
       <h1 >Tableau de Bord Agriculture</h1>
        <div class="action-buttons">
          <button class="open-right-area">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-activity"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        </button>
        <button class="menu-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        </div>
      </div>

      <div class="chart-row three">
        <div class="chart-container-wrapper ml-2">
          <div class="chart-container wid he">
            <div class="chart-info-wrapper ">
              <h2>Wilayas</h2>
              <span>{wilayas.data.length}</span>
            </div>
            <div class="chart-svg">
              <svg viewBox="0 0 36 36" class="circular-chart pink">
        <path class="circle-bg" d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"></path>
        <path class="circle" stroke-dasharray="0,100" d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"></path>
        <text x="18" y="20.35" class="percentage"></text>
      </svg>
            </div>
          </div>
        </div>
        {/* deucieme chart */}
        <div class="chart-container-wrapper">
          <div class="chart-container wid he">
            <div class="chart-info-wrapper ">
              <h2>Moughataas</h2>
              <span>{moughataas.data.length}</span>
            </div>
            <div class="chart-svg">
              <svg viewBox="0 0 36 36" class="circular-chart pink">
        <path class="circle-bg" d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"></path>
        <path class="circle" stroke-dasharray="0, 100" d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"></path>
        <text x="18" y="20.35" class="percentage"></text>
      </svg>
            </div>
          </div>
        </div>
         {/* fin de la deicieme chart */}
         <div class="chart-container-wrapper">
          <div class="chart-container wid he">
            <div class="chart-info-wrapper ">
              <h2>Publications</h2>
              <span>{publicationst.data.length}</span>
            </div>
            <div class="chart-svg">
              <svg viewBox="0 0 36 36" class="circular-chart pink">
        <path class="circle-bg" d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"></path>
        <path class="circle" stroke-dasharray="100, 100" d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"></path>
        <text x="18" y="20.35" class="percentage">100%</text>
      </svg>
            </div>
          </div>
        </div>
      </div>
     {/* //deuciem row */}
     <div class="chart-row three">
        <div class="chart-container-wrapper ml-2">
          <div class="chart-container wid he">
            <div class="chart-info-wrapper ">
              <h2>Publications Valide</h2>
              <span>{publicationsv.data.length}</span>
            </div>
            <div class="chart-svg">
              <svg viewBox="0 0 36 36" class="circular-chart pink">
        <path class="circle-bg" d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"></path>
        <path class="circle" stroke-dasharray={boot} d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"></path>
        <text x="18" y="20.35" class="percentage">{Math.floor((publicationsv.data.length/publicationst.data.length)*100)}%</text>
        {/* Math.floor({(publicationsv.data.length/publicationst.data.length)*100})
      */}
      </svg>
            </div>
          </div>
        </div>
        {/* deucieme chart */}
        <div class="chart-container-wrapper">
          <div class="chart-container wid he">
            <div class="chart-info-wrapper ">
              <h2>Produits</h2>
              <span>{produits.data.length}</span>
            </div>
            <div class="chart-svg">
              <svg viewBox="0 0 36 36" class="circular-chart pink">
        <path class="circle-bg" d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"></path>
        <path class="circle" stroke-dasharray="0, 100" d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"></path>
        <text x="18" y="20.35" class="percentage"></text>
      </svg>
            </div>
          </div>
        </div>
         {/* fin de la deicieme chart */}
         <div class="chart-container-wrapper">
          <div class="chart-container wid he">
            <div class="chart-info-wrapper ">
              <h2>Agriculteurs</h2>
              <span>{agrict.data.length}</span>
            </div>
            <div class="chart-svg">
              <svg viewBox="0 0 36 36" class="circular-chart pink">
        <path class="circle-bg" d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"></path>
        <path class="circle" stroke-dasharray="0, 100" d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"></path>
        <text x="18" y="20.35" class="percentage"></text>
      </svg>
            </div>
          </div>
        </div>
      </div>
        {/* //32m2rowrow */}
     <div class="chart-row three">


         <div class="chart-container-wrapper ml-2">
          <div class="chart-container wid he">
            <div class="chart-info-wrapper ">
              <h2>Conseillers Agricoles</h2>
              <span>{conseill.data.length}</span>
            </div>
            <div class="chart-svg">
              <svg viewBox="0 0 36 36" class="circular-chart pink">
        <path class="circle-bg" d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"></path>
        <path class="circle" stroke-dasharray="0, 100" d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"></path>
        <text x="18" y="20.35" class="percentage"></text>
      </svg>
            </div>
          </div>
        </div>
      </div>
</div>
    </div>


    );
};

export default Home;