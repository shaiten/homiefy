import React, { useState, useEffect, useContext } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(supabase.auth.user());

  useEffect(() => {
    return setCurrentUser(supabase.auth.user());
  }, []);

  function setcurruser(u) {
    setCurrentUser(u);
    console.log("curr user set to ", u);
  }

  const value = {
    currentUser,
    setcurruser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
