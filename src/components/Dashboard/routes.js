import { Route, Routes } from "react-router-dom";

import WilayasImporter from "../Wilayas/importer";
import Publicationsmap from "./publicationsmap";
import PublicationsDetailMoughataa from "../Mpublications/pdetail";
import Dashboards from "./index";
const DashboardRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Wilayas />} />
      <Route path="/new" element={<WilayasNew />} />
      <Route path="/update/:id"  element={<WilayasUpdate/>} /> */}
      <Route path="/"  element={<Publicationsmap/>} />
      <Route path="/detailMoughataapublications/:id" element={<PublicationsDetailMoughataa />} />
      <Route path="/publicationsmoughataa/:id"  element={<WilayasImporter/>} />
      {/* <Route path="/publicationsmap/:id"  element={<Publicationsmap/>} /> */}
      
    </Routes>
  );
};
export default DashboardRoutes;