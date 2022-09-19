import { Route, Routes } from "react-router-dom";
import ProduitNew from "./new";
import Produits from "./index";

const ProduitRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Produits />} />
      <Route path="/new" element={<ProduitNew />} />
    </Routes>
  );
};
export default ProduitRoutes;
