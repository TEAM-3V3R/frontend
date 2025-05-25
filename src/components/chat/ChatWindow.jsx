import React from "react";
import "../../styles/Chat.css";

const ChatWindow = ({ room, selectedTag, onTagSelect }) => {
  const tags = ["산수도", "어해도", "탱화"];

  if (!room) {
    return <div className="chat-window">채팅방을 선택해주세요.</div>;
  }

  const handleTagClick = (tag) => {
    if (!selectedTag) {
      onTagSelect(tag);
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-window-header">
        <div className="chat-tags">
          {tags.map((tag) => {
            let tagClass = `chat-tag tag-${tag}`;
            if (selectedTag) {
              tagClass += selectedTag === tag ? " selected" : " disabled";
            }
            return (
              <button
                key={tag}
                className={tagClass}
                onClick={() => handleTagClick(tag)}
                disabled={!!selectedTag}
              >
                {tag}
              </button>
            );
          })}
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
