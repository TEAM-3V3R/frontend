import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/AppLayout.css";

const TopNav = () => {
  return (
    <div className="top-nav">
      <div className="top-nav-container">
        <NavLink
          to="/main"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          MAIN
        </NavLink>
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          CHAT
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          HISTORY
        </NavLink>
        <NavLink
          to="/demo"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          DEMO
        </NavLink>
      </div>
    </div>
  );
};

export default TopNav;
