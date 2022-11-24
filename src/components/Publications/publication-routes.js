import React from "react";
import { Route, Routes } from "react-router-dom";
import PublicationsNew from "./new";
import Publications from "./index";
import PublicationsDetail from "./pdetail";


const PublicationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Publications />} />
      <Route path="/new" element={<PublicationsNew />} />
     
      <Route path="/detailAllpublications/:id" element={<PublicationsDetail />} />
    </Routes>
  );
};
export default PublicationRoutes;
