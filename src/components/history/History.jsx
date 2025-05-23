import React, { useState } from "react";
import HistoryCard from "./HistoryCard";
import HistoryDetail from "./HistoryDetail";
import "../../styles/History.css";

const History = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortOrder, setSortOrder] = useState("latest");
  const [selectedItem, setSelectedItem] = useState(null);

  const allTags = ["산수도", "어해도", "탱화"];

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const historyList = [
    {
      imageUrl: "/img/sample1.jpg",
      createdAt: "2024-05-19 14:32",
      roomName: "풍경 생성방",
      tags: ["산수도"],
      prompt: "깊은 산속에 폭포 아래 피리를 부는 선비를 그려줘.",
    },
    {
      imageUrl: "/img/sample2.jpg",
      createdAt: "2024-05-20 09:15",
      roomName: "바다 생성방",
      tags: ["어해도"],
      prompt: "거친 파도 위를 떠다니는 물고기 무리를 표현해줘.",
    },
    {
      imageUrl: "/img/sample3.jpg",
      createdAt: "2024-05-18 11:10",
      roomName: "불교화",
      tags: ["탱화"],
      prompt: "붉은 연꽃 위에 앉은 관세음보살을 정중앙에 배치해줘.",
    },
    {
      imageUrl: "/img/sample1.jpg",
      createdAt: "2024-05-19 14:32",
      roomName: "풍경 생성방",
      tags: ["산수도"],
      prompt: "깊은 산속에 폭포 아래 피리를 부는 선비를 그려줘.",
    },
    {
      imageUrl: "/img/sample2.jpg",
      createdAt: "2024-05-20 09:15",
      roomName: "바다 생성방",
      tags: ["어해도"],
      prompt: "거친 파도 위를 떠다니는 물고기 무리를 표현해줘.",
    },
    {
      imageUrl: "/img/sample3.jpg",
      createdAt: "2024-05-18 11:10",
      roomName: "불교화",
      tags: ["탱화"],
      prompt: "붉은 연꽃 위에 앉은 관세음보살을 정중앙에 배치해줘.",
    },
  ];

  const filteredList = historyList
    .filter((item) =>
      selectedTags.length === 0
        ? true
        : selectedTags.every((tag) => item.tags.includes(tag))
    )
    .sort((a, b) =>
      sortOrder === "latest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

  if (selectedItem) {
    return (
      <HistoryDetail
        imageUrl={selectedItem.imageUrl}
        promptCategories={selectedItem.tags}
        promptText={selectedItem.prompt}
        onBack={() => setSelectedItem(null)}
      />
    );
  }

  return (
    <div className="history-wrapper">
      <div className="history-scroll">
        <div className="history-top">
          {/* 태그 버튼 그룹 */}
          <div className="tag-button-group">
            {allTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              const className = `tag-button ${
                isSelected ? `selected-${tag}` : ""
              }`;
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={className}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          {/* 정렬 선택 */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="select-button"
          >
            <option value="latest">최신순</option>
            <option value="oldest">과거순</option>
          </select>
        </div>

        <hr className="history-divider" />

        {filteredList.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              color: "#333",
              fontSize: "16px",
              padding: "40px 0",
              paddingTop: "200px",
            }}
          >
            해당 태그와 관련한 히스토리가 아직 존재하지 않습니다.
          </div>
        ) : (
          <div className="history-card-list">
            {filteredList.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedItem(item)}
                style={{ cursor: "pointer" }}
              >
                <HistoryCard
                  imageUrl={item.imageUrl}
                  createdAt={item.createdAt}
                  roomName={item.roomName}
                  tags={item.tags}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
