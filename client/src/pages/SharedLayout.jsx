import React from "react";
import Navbar from "../components/Navbar.jsx";
import {Outlet} from 'react-router-dom';

const SharedLayout = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
};

export default SharedLayout;