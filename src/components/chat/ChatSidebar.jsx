import React from "react";

const ChatSidebar = ({ rooms, currentRoomId, onSelectRoom, onAddRoom }) => {
  return (
    <div
      style={{ width: "200px", borderRight: "1px solid #ccc", padding: "16px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <h4 style={{ margin: 0 }}>채팅방</h4>
        <button onClick={onAddRoom} style={{ fontSize: "16px" }}>
          ＋
        </button>
      </div>
      {rooms.map((room) => (
        <div
          key={room.id}
          onClick={() => onSelectRoom(room.id)}
          style={{
            padding: "8px",
            cursor: "pointer",
            backgroundColor: room.id === currentRoomId ? "#eee" : "transparent",
            marginBottom: "4px",
            borderRadius: "6px",
          }}
        >
          {room.title}
        </div>
      ))}
    </div>
  );
};

export default ChatSidebar;
