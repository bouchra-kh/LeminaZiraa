import {Link, Routes, Route, useNavigate} from 'react-router-dom';


import React, { useState } from "react";
//import { NavLink } from "react-router-dom";
//import {useCreateWilayaMutation} from "./wilayas-services";
import { wilayaSlice,useImportWilayaMutation,useGetWilayasQuery,useDeleteWilayaMutation } from "./wilayas-services";

export default function WilayasImporter() {
  const navigate = useNavigate();
 
  const [image, setImage] = useState("");
  const [responseInfo4] =useImportWilayaMutation();
 
  return (
    <div class="login d-flex flex-column">
      <h2>Importer</h2>
      <br></br>
      <form
        className=""
        onSubmit={(e) => {
         navigate('../../wilayas/');
         
          e.preventDefault();
          responseInfo4(image);
        }}
      >
<input type="file"  onChange={(e) => {
              console.log("nammmmmmmmm",e.target.files[0].name)
              setImage(e.target.files[0]);
              //setImagename(image.name);
            //  responseInfo4(e.target.files[0]);
              } }/>
                <button class="app-content-headerButton">Importer wilayas</button>
         
        </form> 
    </div>
  );
}