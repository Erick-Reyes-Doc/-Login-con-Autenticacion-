import React from "react";
import supabase from "../helper/supabaseClient";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const cerrarSesion = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    navigate("/login"); // Redirige a la página de inicio de sesión después de cerrar sesión
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span>Panel de Inicio</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <a href="#">
                <i className="bx bx-home"></i> Inicio
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bx bx-cog"></i> Configuraciones
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <div className="header-left">
            <button className="menu-trigger">
              <i className="bx bx-menu"></i>
            </button>
          </div>
          <div className="header-right">
            <div className="user-profile">
              <div className="avatar"></div>
              <span>Usuario</span>
            </div>
            <button onClick={cerrarSesion} className="sign-out-btn">Cerrar sesión</button>
          </div>
        </header>

        <div className="dashboard">
          <div className="dashboard-header">
            <h1 className="usuarioo">Bienvenido al Panel de Usuario</h1>
            <p>Administra tus proyectos y usuarios aquí.</p>
          </div>

          <div className="dashboard-content">
            <div className="metric-cards">
              <div className="metric-card">
                <h3>Total de Proyectos</h3>
                <p>12</p>
              </div>
              <div className="metric-card">
                <h3>Proyectos Activos</h3>
                <p>8</p>
              </div>
              <div className="metric-card">
                <h3>Proyectos Completados</h3>
                <p>4</p>
              </div>
            </div>

            <div className="actions">
              <button className="new-project-btn">Nuevo Proyecto</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;