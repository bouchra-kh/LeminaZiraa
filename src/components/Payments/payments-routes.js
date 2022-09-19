import { Route, Routes } from "react-router-dom";
import PaymentsNew from "./new";
import Payments from "./index";

const PaymentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Payments />} />
      <Route path="/new" element={<PaymentsNew />} />
    </Routes>
  );
};
export default PaymentRoutes;
