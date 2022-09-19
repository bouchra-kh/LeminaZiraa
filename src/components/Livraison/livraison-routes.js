import { Route, Routes } from "react-router-dom";
import LivraisonNew from "./new";
import Livraison from "./index";

const LivraisonRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Livraison />} />
      <Route path="/new" element={<LivraisonNew />} />
    </Routes>
  );
};
export default LivraisonRoutes;
