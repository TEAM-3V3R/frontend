// src/components/ChatWindow.jsx
import React from "react";

const ChatWindow = () => {
  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "rgba(231, 231, 231, 0.8)",
        borderRadius: "16px",
        padding: "12px",
        marginBottom: "12px",
        overflowY: "auto",
      }}
    >
      <div>유저1: 안녕하세요!</div>
      <div>유저2: 반갑습니다 :)</div>
    </div>
  );
};

export default ChatWindow;
