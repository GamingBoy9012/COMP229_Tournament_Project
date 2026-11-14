import React from "react";
import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import Auth from "./Auth";
import { TournamentList, TournamentDetail, TournamentForm } from "./Tournaments";
import Registrations from "./Registrations";
import "./styles.css";

function Nav() {
  const { user, logout } = useAuth();
  return (
    <header className="nav">
      <NavLink to="/" className="brand">Tournament Hub</NavLink>
      <nav>
        <NavLink to="/tournaments">Tournaments</NavLink>
        {user && <NavLink to="/registrations">My registrations</NavLink>}
        {user ? <button className="link" onClick={logout}>Log out ({user.name || user.email})</button>
              : <><NavLink to="/login">Log in</NavLink><NavLink to="/register">Register</NavLink></>}
      </nav>
    </header>
  );
}

const Private = ({ children }) => (useAuth().user ? children : <Navigate to="/login" />);

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename="/frontend.html">
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/tournaments" />} />
            <Route path="/login" element={<Auth mode="login" />} />
            <Route path="/register" element={<Auth mode="register" />} />
            <Route path="/tournaments" element={<TournamentList />} />
            <Route path="/tournaments/new" element={<Private><TournamentForm /></Private>} />
            <Route path="/tournaments/:tid" element={<TournamentDetail />} />
            <Route path="/tournaments/:tid/edit" element={<Private><TournamentForm /></Private>} />
            <Route path="/registrations" element={<Private><Registrations /></Private>} />
          </Routes>
        </main>
        <footer>COMP229 Tournament Project</footer>
      </BrowserRouter>
    </AuthProvider>
  );
}