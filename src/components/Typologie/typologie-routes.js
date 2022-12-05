import { Route, Routes } from "react-router-dom";
import TypologiesNew from "./new";
import Typologies from "./index";
// import WilayasUpdate from "./update";
// import WilayasImporter from "./importer";

const TypologiesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Typologies />}  />
      <Route path="/new" element={<TypologiesNew />} />
      {/* <Route path="/update/:id"  element={<WilayasUpdate/>} /> */}
      {/* <Route path="/importer"  element={<WilayasImporter/>} /> */}
    </Routes>
  );
};
export default TypologiesRoutes;
