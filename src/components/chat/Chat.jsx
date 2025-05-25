import React from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import "../../styles/Chat.css";

const Chat = () => {
  return (
    <div className="chat-wrapper">
      <div className="chat-list-container">
        <ChatList />
      </div>
      <div className="chat-main-container">
        <ChatWindow />
        <ChatInput />
      </div>
    </div>
  );
};

export default Chat;
