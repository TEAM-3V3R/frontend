import React, { useState } from "react";

const Chatting = ({ room, messages, onSend }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", content: input };

    // 즉시 사용자 메시지 반영
    onSend(userMessage);

    // 봇 응답 시뮬레이션
    const botMessage = {
      type: "image",
      content:
        "https://via.placeholder.com/300x200?text=" + encodeURIComponent(input),
    };

    setTimeout(() => {
      onSend(botMessage);
    }, 500);

    setInput("");
  };

  if (!room) return <div style={{ padding: "16px" }}>채팅방을 선택하세요.</div>;

  return (
    <div
      style={{
        flex: 1,
        padding: "16px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h3>{room.title}</h3>
      <div style={{ flex: 1, overflowY: "auto", marginBottom: "12px" }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            {msg.type === "user" ? (
              <div style={{ fontWeight: "bold" }}>👤 {msg.content}</div>
            ) : (
              <img
                src={msg.content}
                alt="응답 이미지"
                style={{ width: "300px", borderRadius: "8px" }}
              />
            )}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
          placeholder="프롬프트 입력..."
        />
        <button onClick={handleSend}>전송</button>
      </div>
    </div>
  );
};

export default Chatting;
