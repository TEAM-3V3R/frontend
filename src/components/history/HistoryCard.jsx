import React from "react";

const HistoryCard = ({ imageUrl, createdAt, roomName, tags }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        overflow: "hidden",
        width: "300px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      {/* 위쪽: 이미지 */}
      <div style={{ height: "200px", overflow: "hidden" }}>
        <img
          src={imageUrl}
          alt="생성 이미지"
          style={{ width: "100%", objectFit: "cover", height: "100%" }}
        />
      </div>

      {/* 아래쪽: 설명 */}
      <div style={{ padding: "12px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "6px",
            fontSize: "12px",
            color: "#555",
          }}
        >
          <span>{createdAt}</span>
          {tags.map((tag, i) => (
            <span
              key={i}
              style={{
                backgroundColor: "#eef",
                padding: "2px 8px",
                borderRadius: "12px",
                fontSize: "11px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <div style={{ fontSize: "13px", color: "#333" }}>
          <strong>{roomName}</strong>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
