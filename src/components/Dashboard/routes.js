import { Route, Routes } from "react-router-dom";

import WilayasImporter from "../Wilayas/importer";
import MPublicationRoutes from "../Mpublications/publication-routes";
const DashboardRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Wilayas />} />
      <Route path="/new" element={<WilayasNew />} />
      <Route path="/update/:id"  element={<WilayasUpdate/>} /> */}
      <Route path="/publicationsmoughataa/:id"  element={<WilayasImporter/>} />
      <Route path="/moughp/:id"  element={<MPublicationRoutes />} />
    </Routes>
  );
};
export default DashboardRoutes;