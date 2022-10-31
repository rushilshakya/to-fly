import { Routes, Route, Navigate } from "react-router-dom";

import FrontPage from "./FrontPage";
import MessageView from "./MessageView";
import ProductDetail from "./ProductDetail";
import LoginForm from "./LoginForm";
import Signup from "./Signup";
import Cart from "./Cart";

const Router = () => (
  <Routes>
    <Route path="/" element={<FrontPage />} />
    <Route path="/products/:id" element={<ProductDetail />} />
    <Route path="/messages" element={<MessageView />} />
    <Route path="/login" element={<LoginForm />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default Router;
