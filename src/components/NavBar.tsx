import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";

interface Props {
  onLogout: () => void;
  dark: boolean;
  onThemeToggle: () => void;
}

const NavBar: React.FC<Props> = ({ onLogout, dark, onThemeToggle }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-logo" aria-hidden="true" />
        <h1>Employee Management</h1>
      </div>

      <ul className="navbar-links">
        <li>
          <Link
            to="/employees"
            className={`nav-link ${isActive("/employees") ? "active" : ""}`}
          >
            👩‍💼 Employees
          </Link>
        </li>
        <li>
          <Link
            to="/departments"
            className={`nav-link ${isActive("/departments") ? "active" : ""}`}
          >
            🏢 Departments
          </Link>
        </li>
        <li>
          <Link
            to="/salaries"
            className={`nav-link ${isActive("/salaries") ? "active" : ""}`}
          >
            💰 Salaries
          </Link>
        </li>
        <li>
          <Link
            to="/reports"
            className={`nav-link ${isActive("/reports") ? "active" : ""}`}
          >
            📊 Reports
          </Link>
        </li>
      </ul>

      <div className="navbar-actions">
        <button
          className="btn-theme-toggle"
          onClick={onThemeToggle}
          title={dark ? "Switch to light mode" : "Switch to dark mode"}
          aria-pressed={dark}
        >
          {dark ? "🌙" : "☀️"}
        </button>
        <button
          className="btn-logout"
          onClick={onLogout}
          title="Logout"
        >
          🚪 Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
