import { Route, Routes } from "react-router-dom";
import TypeirrigationsNew from "./new";
import Typeirrigations from "./index";
// import WilayasUpdate from "./update";
// import WilayasImporter from "./importer";

const TypeirrigationsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Typeirrigations />}  />
      <Route path="/new" element={<TypeirrigationsNew />} />
      {/* <Route path="/update/:id"  element={<WilayasUpdate/>} /> */}
      {/* <Route path="/importer"  element={<WilayasImporter/>} /> */}
    </Routes>
  );
};
export default TypeirrigationsRoutes;
