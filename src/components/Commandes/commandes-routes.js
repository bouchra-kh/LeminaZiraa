import { Route, Routes } from "react-router-dom";
import CommandesNew from "./new";
import Commandes from "./index";

const CommandeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Commandes />} />
      <Route path="/new" element={<CommandesNew />} />
    </Routes>
  );
};
export default CommandeRoutes;
