import React from "react";
import { Outlet } from "react-router-dom";
import LeftPanel from "./components/LeftPanel";
import TopNav from "./components/TopNav";
import LoginPanel from "./components/LoginPanel";
import "../styles/AppLayout.css";

const AppLayout = () => {
  return (
    <div className="app-container">
      <LeftPanel />
      <div className="app-center">
        <TopNav />
        <div className="app-content">
          <Outlet /> {/* 여기에 각 페이지(Main, Sub)가 렌더링됨 */}
        </div>
      </div>
      <LoginPanel />
    </div>
  );
};

export default AppLayout;
