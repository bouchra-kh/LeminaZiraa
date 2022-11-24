import { Route, Routes } from "react-router-dom";
import MPublications from "./index";
import PublicationsDetail from "./pdetail";
import PublicationsDetailMoughataa from "./pdetail";
const MPublicationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MPublications />} />
      <Route path="/detailMoughataapublications/:id" element={<PublicationsDetailMoughataa />} />
     
      {/* <Route path="/moughp/:id/detail/:id" element={<PublicationsDetail />} /> */}
      {/* <Route path="/new" element={<PublicationsNew />} /> */}
      {/* <Route path="/moughataas/moughp/:id/detail2/:id" element={<PublicationsDetail2 />} /> */}
    </Routes>
  );
};
export default MPublicationRoutes;
