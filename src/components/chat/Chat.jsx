// src/pages/Chat.jsx
import React from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";

const Chat = () => {
  return (
    <div
      style={{
        width: "1050px",
        height: "650px",
        // backgroundColor: "rgba(231, 231, 231, 0.8)",
        borderRadius: "16px",
        // padding: "24px",
        margin: "40px auto",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.05)",
        display: "flex",
      }}
    >
      {/* 왼쪽 채팅 목록 */}
      <div style={{ width: "220px", marginRight: "16px" }}>
        <ChatList />
      </div>

      {/* 중앙 채팅 본문 + 입력창 */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <ChatWindow />
        <ChatInput />
      </div>
    </div>
  );
};

export default Chat;
