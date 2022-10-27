import { Routes, Route } from "react-router-dom";

import FrontPage from "./FrontPage";
import MessageView from "./MessageView";
import LoginForm from "./LoginForm";

const Router = () => (
  <Routes>
    <Route path="/" element={<FrontPage />} />
    <Route path="/messages" element={<MessageView />} />
    <Route path="/login" element={<LoginForm />} />
  </Routes>
);

export default Router;
