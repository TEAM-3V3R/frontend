import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/AppLayout.css";
import UserInfo from "./UserInfo";

const LoginPanel = () => {
  const [userId, setUserId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (userId.trim()) {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="login-panel">
      {isLoggedIn ? (
        <UserInfo userId={userId} setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <>
          <input
            type="text"
            placeholder="ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <button onClick={handleLogin}>LOGIN</button>
          <div
            className="signup"
            onClick={() => navigate("/register")}
            style={{ cursor: "pointer" }}
          >
            회원가입
          </div>
        </>
      )}
    </div>
  );
};

export default LoginPanel;
