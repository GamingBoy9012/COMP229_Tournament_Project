import React, { createContext, useContext, useState } from "react";
import { api, EP } from "./api";

const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user") || "null"));

  const save = ({ token, user }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };
  const login = async (form) => save(await api(EP.login, { method: "POST", body: form }));
  const register = async (form) => save(await api(EP.register, { method: "POST", body: form }));
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };
  return <Ctx.Provider value={{ user, login, register, logout }}>{children}</Ctx.Provider>;
}