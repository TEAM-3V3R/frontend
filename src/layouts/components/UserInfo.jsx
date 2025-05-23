// src/layouts/components/UserInfoPanel.jsx
import React from "react";

const UserInfo = ({ userId, setIsLoggedIn }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
      }}
    >
      {/* ✅ 원형 이미지 */}
      <div
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          overflow: "hidden",
          backgroundColor: "#eee",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "40px",
          color: "#aaa",
        }}
      >
        🙂
      </div>

      {/* ✅ 닉네임 텍스트 */}
      <p style={{ fontWeight: "bold", fontSize: "18px", margin: 0 }}>
        {userId} 님
      </p>

      {/* ✅ 활동 현황 */}
      <p style={{ margin: 0, color: "#555" }}>활동 현황</p>

      {/* ✅ 가입일 */}
      <p style={{ margin: 0, fontSize: "12px", color: "#999" }}>
        Since 2024-05-19
      </p>

      {/* ✅ 로그아웃 버튼 */}
      <button
        onClick={() => setIsLoggedIn(false)}
        style={{ padding: "8px 16px", marginTop: "12px" }}
      >
        LOGOUT
      </button>
    </div>
  );
};

export default UserInfo;
