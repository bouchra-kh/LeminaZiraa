import React, {useCallback, useEffect, useRef, useState} from "react";
import "./dashboard.scss";
import { useSelector, useDispatch } from "react-redux";
import { SwitchMode } from "../../app/features/local-config";
import {  ADMIN, getUser, UserHasAccess } from "../extends/GlobalFunctions";
import { MapContainer, TileLayer, GeoJSON,Marker,Popup } from 'react-leaflet'
import axios from "axios";
import GoogleMapReact from 'google-map-react';
import markerIconPng from "leaflet/dist/images/marker-icon.png"

import { NavLink } from "react-router-dom"
import { MdPublish } from "react-icons/md";
import {useGetDashboardByIdQuery} from "./dashboard-services";
import { BsFillPersonFill } from 'react-icons/bs';
import {moughataasGeojson} from "./moughataas";
import L from "leaflet/dist/leaflet";

const Dashboards = (props) => {
    const geoJsonRef = useRef();
    
    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);
    const styleMoughataa = (feature) => {
        // console.log(feature.properties.code);
        return {
            fillColor: "#0548ab",
            weight: 2,
            opacity: 0.5,
            color: "white",
            dashArray: "3",
            fillOpacity: 0.5,
        };
    };

    const onEachFeature = (feature, layer) => {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: onMoughataaClick,
        });
    };
    const onMoughataaClick = (e) => {
        console.log("Moughataa: ", e.target.feature.properties);
        const moughataa = e.target.feature.properties;
    }

    const highlightFeature = (e) => {
        const layer = e.target;
        const mough = e.target.feature.properties;
        const id= mough.ID;
        const nomm= mough.nom;
        layer.setStyle({
            weight: 2,
            color: "#0434ab",
            dashArray: "",
            fillOpacity: 0.7,
        });
        let popupContent = `<div class="text-center">
            <div class="spinner-border text-primary spinner-border-sm" role="status">
                            <span class="sr-only">Loading...</span>
            </div>
                </div>`;
        axios.get(`publication/countByMoughataa/${nomm}`).then((res) => {
            axios.get(`moughataaa/findnom/${nomm}`).then((res2) => {
                
                console.log("asdfghjklasdfghjk moughataid",res2.data)
console.log("asdfghjklasdfghjk")
            popupContent=`Moughataa : <strong>
                    ${mough.nom}
                     </strong> <br>
                     <a href="publicationsmap/${res2.data}"> Publications : <strong>${res.data}</strong></a>
                   
    `;
            layer.bindPopup(popupContent).openPopup(); });
        });

    };

    const resetHighlight = (e) => {
       geoJsonRef.current.resetStyle(e.target);
       // close popup
        // e.target.closePopup();
       // mapRef.current.leafletElement.closePopup();
    };
    const listp=[]
    const user = getUser();
    const position = [21.0078589, -10.951734]
    const [moughataas,setMoutghataas] = useState()
    var [nombrep,setNombrep] = useState()
    var [idm,setIdm] = useState(34)
    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627
        },
        zoom: 11
    };

   
       



        const show = () => {
            document.getElementById("slide").classList.remove("d-none");
        };
        return (
            <>
                <div class="app-container ">
                    <div className="app-main p-3">
                        <MapContainer
                            style={{height: '100%'}}
                            onMapLoad={onMapLoad}
                            center={position}
                            zoom={6}
                            minZoom={6}
                            maxZoom={6}
                            scrollWheelZoom={true}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                           {/* {
                                moughataas?.map((mgt, i) => {

                                    //  publlist(mgt.id)
                                    console.log(i)
                                    if (mgt.latt !== null) {
                                        //publlist(mgt.id)
                                        console.log("eeeeeeeeeeeee", mgt.id)
                                        return (
                                            <Marker key={i}
                                                    position={[parseFloat(mgt.latt), parseFloat(mgt.longt)]}
                                                // position={position}
                                                    icon={new Icon({
                                                        iconUrl: markerIconPng,
                                                        iconSize: [35, 41],
                                                        iconAnchor: [12, 41]
                                                    })}
                                            >

                                                {" "}

                                                <Popup>

                                                    Wilaya : <b>{mgt.wilaya}</b>
                                                    &nbsp;
                                                    Moughataa : <b>{mgt.nom}</b>
                                                    &nbsp;
                                                    <NavLink to={"moughp/" + mgt.id}>
                                                        Publications : <b>{mgt.np}</b>
                                                    </NavLink>
                                                </Popup>

                                            </Marker>

                                        )
                                    }
                                })
                            }*/}
                            <GeoJSON
                                style={styleMoughataa()} data={moughataasGeojson}
                                onEachFeature={onEachFeature}
                                ref={geoJsonRef}
                            />
                        </MapContainer>
                    </div>

                    <div class="app-right   ">
                        <button class="close-right">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width=""
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-x"
                            >
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                        <div class="profile-box">

                            <div class="profile-photo-wrapper">
                                <BsFillPersonFill className="fa"/>

                            </div>


                            {user?.roles ?
                                <p class="profile-text">{user?.roles.length > 0 ? user?.roles[0]?.roleName : 'pas de role'} </p> : 'pas de role'}
                            <p class="profile-text">{user?.username} </p>
                        </div>

                    </div>
                </div>
            </>
        );
    };

export default Dashboards;