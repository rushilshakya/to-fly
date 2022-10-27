import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Router from "./components/Router";
import { initializeUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <Router />
      <Footer />
    </>
  );
};

export default App;
