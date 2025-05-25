// src/components/ChatList.jsx
import React from "react";

const ChatList = () => {
  return (
    <div
      style={{
        height: "100%",
        backgroundColor: "rgba(231, 231, 231, 0.8)",
        borderRadius: "16px",
        padding: "16px",
        boxSizing: "border-box",
        overflowY: "auto",
      }}
    >
      <h4>채팅 목록</h4>
      <ul>
        <li>방 1</li>
        <li>방 2</li>
        <li>방 3</li>
      </ul>
    </div>
  );
};

export default ChatList;
