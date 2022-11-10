import {Link, Routes, Route, useNavigate} from 'react-router-dom';


import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {useCreateMoughataaMutation,useImportMoughataaMutation} from "./moughataas-services";
import { useGetWilayasQuery } from '../Wilayas/wilayas-services';
export default function MoughataasImporter() {
  const navigate = useNavigate();
 
  const [image, setImage] = useState("");
  const [responseInfo4] =useImportMoughataaMutation();
 
  return (
    <div class="login d-flex flex-column">
      <h2>Importer</h2>
      <br></br>
      <form
        className=""
        onSubmit={(e) => {
            navigate('../../Moughataas/');
         
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
                <button class="app-content-headerButton">Importer moughataas</button>
         
        </form> 
    </div>
  );
}