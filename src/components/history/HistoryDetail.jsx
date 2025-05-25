import React, { useState } from "react";
import "../../styles/HistoryDetail.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const HistoryDetail = ({ promptHistoryList }) => {
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null); // ✅ 확장된 카드 index 저장

  const toggleExpand = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="history-detail-box">
      <div className="history-card-list">
        {promptHistoryList.map((item, index) => {
          const isExpanded = expandedIndex === index;

          return (
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

              <div
                className="history-card-bottom"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="prompt-tags">
                  <span
                    className="expand-arrow"
                    onClick={() => toggleExpand(index)}
                  >
                    {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                  {item.keywords.slice(0, 2).map((kw, i) => (
                    <span key={i} className="tag-chip">
                      {kw}
                    </span>
                  ))}
                </div>

                {isExpanded ? (
                  <div className="expanded-category-box">
                    {item.keywords.map((kw, i) => (
                      <div key={i} className="expanded-tag">
                        {kw}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="prompt-text">{item.text}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedPrompt && (
        <div className="image-preview-wrapper">
          <div className="image-preview-box">
            <button
              className="image-preview-close"
              onClick={() => setSelectedPrompt(null)}
            >
              ×
            </button>
            생성된 이미지
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryDetail;
