import { Routes, Route } from "react-router-dom";
import Landing from "../Pages/Landing/Landing";
import Payment from "../Pages/Payment/Payment";
import Orders from "../Pages/Orders/Orders";
import Auth from "./Auth/Auth";
import Cart from "../Pages/Cart/Cart";
import Results from "./Results/Results";
import ProductDetail from "./ProductDetail/ProductDetail";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from "../Components/ProtectedRoute/ProtectedRoute";

const stripePromise = loadStripe('pk_test_51Q2MBJ02rI0eYWTGzCAWZzNLYsnXvJJ80Qof6mY8g6LTtqAXsod6JXLZYzjOgD6McVR7V1smIos6c7ZyAYcdU0ht00xmroHcpY');


function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/payments" element={
        <ProtectedRoute msg={"You must login in to pay"} redirect={"/payments"}>
        <Elements stripe={stripePromise}>        
        <Payment />
        </Elements>
        </ProtectedRoute>
        } 
        />
      <Route path="/orders"
       element={
        <ProtectedRoute
        msg={"You must login in to view your orders"}
         redirect={"/orders"}
        >
        <Orders />
        </ProtectedRoute>
        } 
        />
      <Route path="/category/:categoryName" element={<Results />} />
      <Route path="/products/:productId" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default Routing;
