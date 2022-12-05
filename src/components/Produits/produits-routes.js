import { Route, Routes } from "react-router-dom";
import ProduitNew from "./new";
import Produits from "./index";
import ProduitUpdate from "./update";

const ProduitRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Produits />} />
      <Route path="/new" element={<ProduitNew />} />
      <Route path="/update" element={<ProduitUpdate />} />
    </Routes>
  );
};
export default ProduitRoutes;
