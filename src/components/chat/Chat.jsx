import React, { useState } from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import "../../styles/Chat.css";

const Chat = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleNewChat = () => {
    const count = rooms.filter((room) => room.startsWith("새 채팅")).length;
    const newRoom = `새 채팅 ${count + 1}`;
    setRooms([newRoom, ...rooms]);
    setSelectedIndex(0);
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-list-container">
        <ChatList
          rooms={rooms}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          handleNewChat={handleNewChat}
        />
      </div>
      <div className="chat-main-container">
        <ChatWindow room={rooms[selectedIndex]} />
        <ChatInput />
      </div>
    </div>
  );
};

export default Chat;
