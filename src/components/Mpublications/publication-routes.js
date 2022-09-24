import { Route, Routes } from "react-router-dom";
import MPublications from "./index";


const MPublicationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MPublications />} />
      {/* <Route path="/new" element={<PublicationsNew />} /> */}
    </Routes>
  );
};
export default MPublicationRoutes;
