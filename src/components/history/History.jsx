import React, { useState } from "react";
import HistoryCard from "./HistoryCard";

const History = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortOrder, setSortOrder] = useState("latest"); // latest | oldest

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
      tags: ["산수도", "AI 생성"],
    },
    {
      imageUrl: "/img/sample2.jpg",
      createdAt: "2024-05-20 09:15",
      roomName: "바다 생성방",
      tags: ["어해도"],
    },
    {
      imageUrl: "/img/sample3.jpg",
      createdAt: "2024-05-18 11:10",
      roomName: "불교화",
      tags: ["탱화"],
    },
  ];

  // 필터 + 정렬 적용
  const filteredList = historyList
    .filter((item) =>
      selectedTags.length === 0
        ? true
        : selectedTags.every((tag) => item.tags.includes(tag))
    )
    .sort((a, b) => {
      return sortOrder === "latest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt);
    });

  return (
    <div>
      {/* ✅ 상단: 태그 버튼 + 정렬 선택 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        {/* 태그 버튼 */}
        <div style={{ display: "flex", gap: "10px" }}>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              style={{
                padding: "6px 12px",
                borderRadius: "16px",
                backgroundColor: selectedTags.includes(tag)
                  ? "#007bff"
                  : "#eee",
                color: selectedTags.includes(tag) ? "#fff" : "#333",
                border: "none",
                cursor: "pointer",
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* 정렬 드롭다운 */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{ padding: "6px 10px", fontSize: "14px" }}
        >
          <option value="latest">최신순</option>
          <option value="oldest">과거순</option>
        </select>
      </div>

      <hr
        style={{
          marginBottom: "20px",
          border: "0",
          borderTop: "1px solid #ccc",
        }}
      />

      {/* ✅ 카드 목록 */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {filteredList.map((item, index) => (
          <HistoryCard
            key={index}
            imageUrl={item.imageUrl}
            createdAt={item.createdAt}
            roomName={item.roomName}
            tags={item.tags}
          />
        ))}
      </div>
    </div>
  );
};

export default History;
