import { Routes, Route } from "react-router-dom";

import FrontPage from "./FrontPage";
import MessageView from "./MessageView";
import LoginForm from "./LoginForm";
import Cart from "./Cart";

const Router = () => (
  <Routes>
    <Route path="/" element={<FrontPage />} />
    <Route path="/messages" element={<MessageView />} />
    <Route path="/login" element={<LoginForm />} />
    <Route path="/cart" element={<Cart />} />
  </Routes>
);

export default Router;
