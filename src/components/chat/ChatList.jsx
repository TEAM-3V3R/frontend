import React, { useState } from "react";
import "../../styles/Chat.css";

const ChatList = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleNewChat = () => {
    const count = rooms.filter((room) => room.startsWith("새 채팅")).length;

    const newRoomName = `새 채팅 ${count + 1}`;
    setRooms([newRoomName, ...rooms]);
    setSelectedIndex(0);
  };

  return (
    <div className="chat-list">
      <button className="chat-new-btn" onClick={handleNewChat}>
        +&nbsp;&nbsp;새 채팅
      </button>

      <ul className="chat-list-ul">
        {rooms.map((room, index) => (
          <li key={index}>
            <button
              className={`chat-room-btn ${
                selectedIndex === index ? "selected" : ""
              }`}
              onClick={() => setSelectedIndex(index)}
            >
              <span className="chat-room-icon">💬</span>
              {room}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
