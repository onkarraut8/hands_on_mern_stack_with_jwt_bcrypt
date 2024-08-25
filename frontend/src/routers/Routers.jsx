import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/HomePage";
import About from "../pages/AboutUs";
import Contact from "../pages/ContactUs";
import Login from "../pages/UserLoginForm";
import Register from "../pages/AddUserForm";
import Header from "../pages/Header";




const Routers = () => {
  return (
   <>
    <Header/>
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

    </Routes>
   </>
  );
};

export default Routers;
