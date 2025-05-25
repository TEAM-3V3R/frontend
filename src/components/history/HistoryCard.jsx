import React from "react";
import "../../styles/HistoryCard.css";

const HistoryCard = ({ imageUrl, createdAt, roomName, tags }) => {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const tagColorMap = {
    산수도: "#47B290",
    어해도: "#2677F4",
    탱화: "#F44B40",
  };

  return (
    <div className="history-card">
      <div className="history-card-image">
        <img src={imageUrl} alt="생성 이미지" />
      </div>

      <div className="history-card-info">
        <div className="history-card-meta">
          <span>{formattedDate}</span>
          {tags.map((tag, i) => (
            <span
              key={i}
              className="history-card-tag"
              style={{
                backgroundColor: tagColorMap[tag] || "#f5f5f5",
                color: "#f5f5f5",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="history-card-room">
          <strong>{roomName}</strong>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
