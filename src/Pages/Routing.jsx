import { Routes, Route } from "react-router-dom";
import Landing from "../Pages/Landing/Landing";
import Payment from "../Pages/Payment/Payment";
import Orders from "../Pages/Orders/Orders";
import SignUp from "./Auth/SignUp";
import Cart from "../Pages/Cart/Cart";
import Results from "./Results/Results";
import ProductDetail from "./ProductDetail/ProductDetail";




function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<SignUp />} />
      <Route path="/payments" element={<Payment />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/category/:categoryName" element={<Results />} />
      <Route path="/products/:productId" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default Routing;
