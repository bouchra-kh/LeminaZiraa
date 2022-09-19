import { Route, Routes } from "react-router-dom";
import LignCommandesNew from "./new";
import LigneCommande from "./index";

const LigneCommandesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LigneCommande />} />
      <Route path="/new" element={<LignCommandesNew />} />
    </Routes>
  );
};
export default LigneCommandesRoutes;
