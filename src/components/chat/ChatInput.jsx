// src/components/ChatInput.jsx
import React from "react";

const ChatInput = () => {
  return (
    <div
      style={{
        backgroundColor: "rgba(231, 231, 231, 0.8)",
        borderRadius: "16px",
        padding: "10px",
      }}
    >
      <input
        type="text"
        placeholder="메시지를 입력하세요..."
        style={{
          width: "100%",
          padding: "10px",
          boxSizing: "border-box",
          borderRadius: "8px",
          border: "1px solid #aaa",
        }}
      />
    </div>
  );
};

export default ChatInput;
