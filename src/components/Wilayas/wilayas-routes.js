import { Route, Routes } from "react-router-dom";
import WilayasNew from "./new";
import Wilayas from "./index";
import WilayasUpdate from "./update";
import WilayasImporter from "./importer";

const WilayasRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Wilayas />} />
      <Route path="/new" element={<WilayasNew />} />
      <Route path="/update/:id"  element={<WilayasUpdate/>} />
      <Route path="/importer"  element={<WilayasImporter/>} />
    </Routes>
  );
};
export default WilayasRoutes;
