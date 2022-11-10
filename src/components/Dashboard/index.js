import React, { useEffect ,useState} from "react";
import "./dashboard.scss";
import { useSelector, useDispatch } from "react-redux";
import { SwitchMode } from "../../app/features/local-config";
import {  ADMIN, getUser, UserHasAccess } from "../extends/GlobalFunctions";
import { MapContainer, TileLayer, useMap,Marker,Popup } from 'react-leaflet'
import axios from "axios";
import GoogleMapReact from 'google-map-react';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import { NavLink } from "react-router-dom"
import { MdPublish } from "react-icons/md";
import {useGetDashboardByIdQuery} from "./dashboard-services";
import { BsFillPersonFill } from 'react-icons/bs';

const Dashboards = (props) => {
    const listp=[]
    const user = getUser();
    const dispatch = useDispatch();
    const position = [18.07988680008646, -15.96489325263382]
    const [moughataas,setMoutghataas] = useState()
    var [nombrep,setNombrep] = useState()
    var [idm,setIdm] = useState(34)
    var responseInfo2 = useGetDashboardByIdQuery(idm)
    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627
        },
        zoom: 11
    };
    
    useEffect(() => {
        axios.get('http://localhost:8080/moughataaa/listmap')
            .then(res => {
             //   console.warn('res',res.data)
                setMoutghataas(res.data);
               // console.log(res.data.length)
            })
            .catch(err => console.log(err))
    },[])
    
 
const publlist=(id)=>{
    
    axios.get('http://localhost:8080/publication/listpublication/'+id)
    .then(res => {
    //    console.log(id)
     //   console.warn('res',res.data)
       // setNombrep(res.data);
       console.log(res.data.length)
      setNombrep(id)
      listp.push(res.data.length)
    //  return res.data.length;
    })
    .catch(err => console.log(err))

    return id;
};


    const show = () => {
        document.getElementById("slide").classList.remove("d-none");
    };
    return (
        <>
            <div class="app-container ">
                <div className="app-main p-3">
                    <MapContainer
                        style={{ height: '100%' }}
                        center={position} zoom={5} scrollWheelZoom={true}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {
                            moughataas?.map((mgt,i) => {
                                
                              //  publlist(mgt.id)
                          console.log(i)
                                if(mgt.latt !== null){
                                    //publlist(mgt.id)
                                    console.log("eeeeeeeeeeeee",mgt.id)
                                    return (
                                        <Marker key={i}
                                                position={[parseFloat(mgt.latt),parseFloat(mgt.longt)]}
                                            // position={position}
                                                icon={new Icon({iconUrl: markerIconPng, iconSize: [35, 41], iconAnchor: [12, 41]})}
                                        >
                                              
            {" "} 
            
                                            <Popup>
    
                                                Wilaya : <b>{mgt.wilaya}</b>
                                                &nbsp;
                                                Moughataa : <b>{mgt.nom}</b>
                                                &nbsp;
                                                <NavLink to={"moughp/"+mgt.id}>
                                                Publications : <b>{mgt.np}</b>
                                                </NavLink> 
                                            </Popup>
                                           
                                        </Marker>
                                        
                                    )
                                }
                            })
                        }
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
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                    <div class="profile-box">
                    
                        <div class="profile-photo-wrapper">
                        <BsFillPersonFill  className="fa" />
                            
                        </div>
                       
                      

                        
                       
                        {user?.roles ? <p class="profile-text">{user?.roles.length > 0 ? user?.roles[0]?.roleName  : 'pas de role'} </p> : 'pas de role'}
                        <p class="profile-text">{user?.username } </p>
                    </div>
                    
                </div>
            </div>
        </>
    );
};

export default Dashboards;