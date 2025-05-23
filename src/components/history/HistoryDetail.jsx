import React, { useState } from "react";
import "../../styles/HistoryDetail.css";
import { FaTimes } from "react-icons/fa";

const HistoryDetail = ({ promptHistoryList }) => {
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  return (
    <div className="history-detail-box">
      <div className="history-card-list">
        {promptHistoryList.map((item, index) => (
          <div
            key={index}
            className="history-card"
            onClick={() => setSelectedPrompt(item)}
            style={{ cursor: "pointer" }}
          >
            <div className="history-card-header">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>{item.date}</span>
              <span>{item.time}</span>
            </div>
            <div className="history-card-image">생성된 이미지 01</div>
            <div className="history-card-bottom">
              <div className="prompt-tags">
                <span className="expand-arrow">▾</span>
                {item.keywords.map((kw, i) => (
                  <span key={i} className="tag-chip">
                    {kw}
                  </span>
                ))}
              </div>
              <div className="prompt-text">{item.text}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 아래 이미지 미리보기 영역 */}
      {selectedPrompt && (
        <div className="image-preview-wrapper">
          <div className="image-preview-box">
            <button
              className="image-preview-close"
              onClick={() => setSelectedPrompt(null)}
            >
              <FaTimes />
            </button>
            생성된 이미지
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryDetail;
