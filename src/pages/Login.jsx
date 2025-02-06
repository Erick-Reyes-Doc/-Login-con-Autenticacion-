import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../helper/supabaseClient";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    // Verificar si el usuario ya está autenticado
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) navigate("/dashboard");
    };
    checkUser();

    // Revisar intentos fallidos en localStorage
    const storedAttempts = parseInt(localStorage.getItem("loginAttempts")) || 0;
    const blockedUntil = parseInt(localStorage.getItem("blockedUntil")) || 0;
    const now = Date.now();

    if (storedAttempts >= 5 && now < blockedUntil) {
      setIsBlocked(true);
      setTimeout(() => {
        setIsBlocked(false);
        localStorage.setItem("loginAttempts", "0"); // Reiniciar intentos después del bloqueo
      }, blockedUntil - now);
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!email || !password) {
      setMessage("Por favor, completa todos los campos.");
      return;
    }

    if (isBlocked) {
      setMessage("Demasiados intentos fallidos. Intenta nuevamente en 30 segundos.");
      return;
    }

    setLoading(true);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      localStorage.setItem("loginAttempts", newAttempts.toString());

      if (newAttempts >= 5) {
        const blockTime = Date.now() + 30000; // Bloqueo por 30 segundos
        localStorage.setItem("blockedUntil", blockTime.toString());
        setIsBlocked(true);

        setTimeout(() => {
          setIsBlocked(false);
          localStorage.setItem("loginAttempts", "0"); // Reiniciar intentos después del bloqueo
        }, 30000);
      }

      setMessage(`Error: ${error.message}. Intento ${newAttempts} de 5.`);
      setPassword(""); 
      return;
    }

    if (data) {
      localStorage.setItem("loginAttempts", "0"); // Reiniciar intentos al iniciar sesión exitosamente
      navigate("/dashboard");
    }
  };

  return (
    <div className="container">
      <div className="form-box login">
        <form onSubmit={handleSubmit}>
          <h1>Iniciar Sesión</h1>
          {message && <span className="error-message" role="alert">{message}</span>}
          <div className="input-box">
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Correo Electrónico"
              disabled={isBlocked}
            />
            <i className='bx bxs-user'></i>
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Contraseña"
              disabled={isBlocked}
            />
            <i className='bx bxs-lock-alt'></i>
          </div>
          <button type="submit" className="btn" disabled={loading || isBlocked}>
            {loading ? "Cargando..." : isBlocked ? "Bloqueado..." : "Ingresar"}
          </button>
          <p>¿No tienes una cuenta?</p>
          <div className="register-buttons">
            <Link to="/register" className="btn-register user">Registrarse como Usuario</Link>
            <Link to="/registerAdmin" className="btn-register admin">Registrarse como Administrador</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
