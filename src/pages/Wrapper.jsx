import React, { useEffect, useState } from "react";
import supabase from "../helper/supabaseClient";
import { Navigate, useLocation } from "react-router-dom";

function Wrapper({ children, allowedRoles }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      }
      setLoading(false);
    };

    getSession();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  // Validar el rol del usuario
  const userRole = user?.user_metadata?.role; 

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to={userRole === "admin" ? "/DashboardAdmin" : "/Dashboard"} state={{ from: location }} />;
  }

  return <>{children}</>;
}

export default Wrapper;
