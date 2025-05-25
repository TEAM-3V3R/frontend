import React from "react";
import "../../styles/Chat.css";

const ChatList = () => {
  const handleNewChat = () => {
    alert("새 채팅");
  };

  return (
    <div className="chat-list">
      <button className="chat-new-btn" onClick={handleNewChat}>
        +&nbsp;&nbsp;새 채팅
      </button>
    </div>
  );
};

export default ChatList;
