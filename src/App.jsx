import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import RegisterAdmin from "./pages/RegisterAdmin";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashboardAdmin from "./pages/DashboardAdmin";
import Wrapper from "./pages/Wrapper";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registerAdmin" element={<RegisterAdmin />} />
        <Route path="/login" element={<Login />} />

        <Route 
          path="/Dashboard" 
          element={
            <Wrapper allowedRoles={["user"]}>
              <Dashboard />
            </Wrapper>
          } 
        />

        <Route 
          path="/DashboardAdmin" 
          element={
            <Wrapper allowedRoles={["admin"]}>
              <DashboardAdmin />
            </Wrapper>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
