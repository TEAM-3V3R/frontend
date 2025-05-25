import React from "react";
import "../../styles/Chat.css";

const ChatInput = () => {
  return (
    <div className="chat-input">
      <input
        type="text"
        placeholder="메시지를 입력하세요..."
        className="chat-input-box"
      />
    </div>
  );
};

export default ChatInput;
