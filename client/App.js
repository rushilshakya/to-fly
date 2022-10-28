import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Router from "./components/Router";
import { initializeUser } from "./reducers/userReducer";
import { initializeProducts } from "./reducers/productReducer";
import { initializeCart } from "./reducers/cartReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeUser());
    dispatch(initializeProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeCart(user));
  }, [user, dispatch]);

  return (
    <>
      <NavBar />
      <Router />
      <Footer />
    </>
  );
};

export default App;
