import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Login } from "./components/sites/Login/Login";
import { Router } from "./Router.tsx";
import { Navbar } from "./components/Navbar.tsx";
// import App from './App.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    <Router />
  </StrictMode>
);
