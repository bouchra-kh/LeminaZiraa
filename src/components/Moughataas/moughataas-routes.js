import { Route, Routes } from "react-router-dom";
import MoughataasNew from "./new";
import Moughataas from "./index";
import MoughataasUpdate from "./update";
import MPublicationRoutes from "../Mpublications/publication-routes";
const MoughataaRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Moughataas />} />
      <Route path="/new" element={<MoughataasNew />} />
      <Route path="/update/:id"  element={<MoughataasUpdate/>} />
      <Route path="/moughp/:id"  element={<MPublicationRoutes />} />
    </Routes>
  );
};
export default MoughataaRoutes;
