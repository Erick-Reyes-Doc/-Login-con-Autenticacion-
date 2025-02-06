import React, { useState } from "react";
import supabase from "../helper/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleRegister(event) {
        event.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        role: "admin",
                    },
                },
            });

            if (error) throw error;
            setMessage("Registro exitoso. Revisa tu correo para confirmar tu cuenta.");
            setTimeout(() => navigate("/login"), 3000);
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container">
            <div className="form-box register">
                <h2>Registro Administrador</h2>
                <br />
                {message && <span className="message">{message}</span>}

                <form onSubmit={handleRegister}>
                    <div className="input-box">
                        <input
                            type="email"
                            name="email"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn" disabled={loading}>
                        {loading ? "Cargando..." : "Crear Cuenta"}
                    </button>
                </form>

                <p>¿Ya tienes una cuenta?</p>
                <Link to="/login">Iniciar sesión</Link>
            </div>
        </div>
    );
}

export default Register;
