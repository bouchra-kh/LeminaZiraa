import React from "react";
import { Route, Routes } from "react-router-dom";
import PublicationsNew from "./new";
import Publications from "./index";


const PublicationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Publications />} />
      <Route path="/new" element={<PublicationsNew />} />
    </Routes>
  );
};
export default PublicationRoutes;
