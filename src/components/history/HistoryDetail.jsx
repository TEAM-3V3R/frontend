// src/components/HistoryDetail.jsx
import React from "react";
import "../../styles/HistoryDetail.css";

const HistoryDetail = ({ promptHistoryList }) => {
  return (
    <div className="history-card-list">
      {promptHistoryList.map((item, index) => (
        <div key={index} className="history-card">
          {/* 날짜와 시간 */}
          <div className="history-card-header">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span>{item.date}</span>
            <span>{item.time}</span>
          </div>

          {/* 이미지 자리 */}
          <div className="history-card-image">생성된 이미지 01</div>

          {/* 내용 영역 (다르게 구성됨) */}
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
  );
};

export default HistoryDetail;
