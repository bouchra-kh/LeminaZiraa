import { Route, Routes } from "react-router-dom";
import RolesNew from "./new";
import Roles from "./index";

const RolesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Roles />} />
      <Route path="/new" element={<RolesNew />} />
    </Routes>
  );
};
export default RolesRoutes;
