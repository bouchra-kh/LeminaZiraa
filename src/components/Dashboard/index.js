import React, { useEffect ,useState} from "react";
import "./dashboard.scss";
import { useSelector, useDispatch } from "react-redux";
import { SwitchMode } from "../../app/features/local-config";
import {  ADMIN, getUser, UserHasAccess } from "../extends/GlobalFunctions";
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import axios from "axios";

const Dashboards = (props) => {
  const user = getUser();
  const dispatch = useDispatch();
  const position = [51.505, -0.09]
  const [moughataas,setMoutghataas] = useState()

  useEffect(() => {
    axios.get('http://localhost:8080/moughataaa/list')
    .then(res => {
      console.warn('res',res.data)
      setMoutghataas(res.data);
    })
    .catch(err => console.log(err))
  },[])


  const show = () => {
    document.getElementById("slide").classList.remove("d-none");
  };
  return (
    <>
      <div class="app-container ">
       <div className="app-main p-3">
       <MapContainer center={position} zoom={43} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
   
  </MapContainer>,
       </div>
      <div class="app-right   ">
          <button class="close-right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Breezeicons-actions-22-im-user.svg/1200px-Breezeicons-actions-22-im-user.svg.png"
                alt="profile"
              />
            </div>
            <p class="profile-text">{user?.username } </p>
            <p class="profile-subtext">{user?.roles[0].roleName} </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboards;
