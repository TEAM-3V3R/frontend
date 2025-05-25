import React from "react";
import "../../styles/Chat.css";

const ChatWindow = ({ room }) => {
  if (!room) {
    return <div className="chat-window">채팅방을 선택해주세요.</div>;
  }

  const tags = ["산수도", "어해도", "탱화"];

  return (
    <div className="chat-window">
      <div className="chat-window-header">
        <div className="chat-tags">
          {tags.map((tag, index) => (
            <button key={index} className={`chat-tag tag-${tag}`}>
              {tag}
            </button>
          ))}
        </div>
        <button className="chat-end-btn">채팅 종료</button>
      </div>

      <div className="chat-window-body">
        <h3>{room}</h3>
        <p>{room}의 메시지가 여기에 표시됩니다.</p>
      </div>
    </div>
  );
};

export default ChatWindow;
