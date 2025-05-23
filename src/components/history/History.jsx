import React, { useState } from "react";
import HistoryCard from "./HistoryCard";
import HistoryDetail from "./HistoryDetail";

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
      tags: ["산수도", "AI 생성"],
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
      tags: ["산수도", "AI 생성"],
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
    <div
      style={{
        width: "1000px",
        height: "600px",
        backgroundColor: "#f5f5f5",
        borderRadius: "16px",
        padding: "24px",
        margin: "40px auto",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 내부 스크롤 영역 */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* 태그 + 정렬 */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
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

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{
              padding: "6px 10px",
              fontSize: "14px",
              marginLeft: "80px",
            }}
          >
            <option value="latest">최신순</option>
            <option value="oldest">과거순</option>
          </select>
        </div>

        <hr style={{ marginBottom: "20px", borderTop: "1px solid #ccc" }} />

        {/* 카드 목록 */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
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
      </div>
    </div>
  );
};

export default History;
