import React from "react";
import "../../styles/Chat.css";

const ChatList = ({
  rooms,
  selectedIndex,
  setSelectedIndex,
  handleNewChat,
}) => {
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
