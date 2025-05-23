import React, { useEffect, useState } from "react";
import ChatSidebar from "./ChatSidebar";
import Chatting from "./Chatting";

const LOCAL_KEY = "chatRoomMessages";

const Chat = () => {
  const [rooms, setRooms] = useState([
    { id: 1, title: "산수도 생성방" },
    { id: 2, title: "어해도 생성방" },
    { id: 3, title: "탱화 생성방" },
  ]);
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [roomMessages, setRoomMessages] = useState({});

  // ✅ localStorage에서 메시지 로드
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      setRoomMessages(JSON.parse(saved));
    }
  }, []);

  // ✅ 저장 시 localStorage에도 반영
  const handleSendMessage = (newMessage) => {
    setRoomMessages((prev) => {
      const updated = {
        ...prev,
        [currentRoomId]: [...(prev[currentRoomId] || []), newMessage],
      };
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const currentRoom = rooms.find((room) => room.id === currentRoomId);
  const messages = roomMessages[currentRoomId] || [];

  // ✅ 새 채팅방 생성
  const handleAddRoom = () => {
    const title = prompt("채팅방 이름을 입력하세요");
    if (!title) return;
    const newId = rooms.length > 0 ? rooms[rooms.length - 1].id + 1 : 1;
    const newRoom = { id: newId, title };
    setRooms([newRoom, ...rooms]);
    setCurrentRoomId(newId);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <ChatSidebar
        rooms={rooms}
        currentRoomId={currentRoomId}
        onSelectRoom={setCurrentRoomId}
        onAddRoom={handleAddRoom} // ✅ 전달
      />
      <Chatting
        room={currentRoom}
        messages={messages}
        onSend={handleSendMessage}
      />
    </div>
  );
};

export default Chat;
