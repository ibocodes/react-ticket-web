/* src/components/Layout.tsx */
import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated, signOut } from "../utils/auth";

export const Navbar: React.FC<{ onLogout?: ()=>void }> = ({ onLogout }) => {
  const auth = isAuthenticated();
  return (
    <header className="header">
      <div style={{display:"flex",alignItems:"center",gap:9, marginLeft:12}}>
        <strong style={{color:"#0f62ff"}}>TicketApp</strong>
        <nav className="nav-links" aria-label="Main navigation" >
          <Link to="/" style={{color:"#0f62ff", textDecoration:"none", marginLeft:10, }}>Home</Link>
          {auth && <Link to="/dashboard" style={{color:"#0f62ff", textDecoration:"none"}}>Dashboard</Link>}
          {auth && <Link to="/tickets" style={{color:"#0f62ff", textDecoration:"none"}}>Tickets</Link>}
        </nav>
      </div>
      <div>
        {!auth ? (
          <Link to="/auth/login" className="btn btn-ghost">Login</Link>
        ) : (
          <button
            className="btn btn-ghost"
            onClick={() => { signOut(); onLogout?.(); window.location.href="/"; }}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="site" role="main">
      <div className="decor-circle" aria-hidden="true"></div>
      <div>{children}</div>
      <footer className="site-footer">
        © {new Date().getFullYear()} TicketApp — Simple Ticket Manager
      </footer>
    </div>
  );
};
