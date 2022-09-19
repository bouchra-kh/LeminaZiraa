import { Route, Routes } from "react-router-dom";
import UserNew from "./new";
import Users from "./index";
import UserUpdate from "./update";

const UsersRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/new" element={<UserNew />} />
      <Route path="/update/:id"  element={<UserUpdate/>} />
      

    </Routes>
  );
};
export default UsersRoutes;
