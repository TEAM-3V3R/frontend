import React, { useState } from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import "../../styles/Chat.css";

const Chat = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [tagByRoom, setTagByRoom] = useState({}); // 각 방별 선택된 태그 저장

  const handleNewChat = () => {
    const count = rooms.filter((room) => room.startsWith("새 채팅")).length;
    const newRoom = `새 채팅 ${count + 1}`;
    setRooms([newRoom, ...rooms]);
    setSelectedIndex(0);
  };

  const handleTagSelect = (roomName, tag) => {
    setTagByRoom((prev) => ({
      ...prev,
      [roomName]: tag,
    }));
  };

  const selectedRoom = rooms[selectedIndex];

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
        <ChatWindow
          room={selectedRoom}
          selectedTag={tagByRoom[selectedRoom]}
          onTagSelect={(tag) => handleTagSelect(selectedRoom, tag)}
        />
        <ChatInput />
      </div>
    </div>
  );
};

export default Chat;
