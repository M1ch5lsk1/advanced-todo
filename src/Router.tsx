import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importuj swoje komponenty stron
import { Login } from "./components/sites/Login/Login";
import { Index } from "./components/sites/Index/Index";
import { Navbar } from "./components/Navbar";
import { Register } from "./components/sites/Register/Register";

export const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 py-12"> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Index />} />
          {/* </div> */}
          {/* <Route path="/todos" element={<TodoList />} /> */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};
