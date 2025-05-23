import React from "react";
import HistoryDetail from "./HistoryDetail";
import { FaArrowLeft } from "react-icons/fa";
import "../../styles/History.css";

const History02 = ({ selectedItem, onBack }) => {
  if (!selectedItem) return null;

  // ⚠ 선택된 히스토리에 따라 세부 프롬프트 더미 생성 (실제 프로젝트에선 DB 연동)
  const promptHistoryMap = {
    "풍경 생성방": [
      {
        date: "05-22",
        time: "14:21",
        keywords: ["자연", "산수도"],
        text: "깊은 산속에 폭포 아래 피리를 부는 선비를 그려줘.",
      },
      {
        date: "05-22",
        time: "14:30",
        keywords: ["운무", "산"],
        text: "구름에 가려진 산봉우리가 겹겹이 보이게 그려줘.",
      },
      {
        date: "05-22",
        time: "14:35",
        keywords: ["운무", "산"],
        text: "구름에 가려진 산봉우리가 겹겹이 보이게 그려줘.",
      },
      {
        date: "05-22",
        time: "14:38",
        keywords: ["운무", "산"],
        text: "구름에 가려진 산봉우리가 겹겹이 보이게 그려줘.",
      },
      {
        date: "05-22",
        time: "14:40",
        keywords: ["운무", "산"],
        text: "구름에 가려진 산봉우리가 겹겹이 보이게 그려줘.",
      },
      {
        date: "05-22",
        time: "14:41",
        keywords: ["운무", "산"],
        text: "구름에 가려진 산봉우리가 겹겹이 보이게 그려줘.",
      },
      {
        date: "05-22",
        time: "14:30",
        keywords: ["운무", "산"],
        text: "구름에 가려진 산봉우리가 겹겹이 보이게 그려줘.",
      },
      {
        date: "05-22",
        time: "14:30",
        keywords: ["운무", "산"],
        text: "구름에 가려진 산봉우리가 겹겹이 보이게 그려줘.",
      },
    ],
    "바다 생성방": [
      {
        date: "05-20",
        time: "10:10",
        keywords: ["바다", "물결"],
        text: "거친 파도 위를 떠다니는 물고기 무리를 표현해줘.",
      },
      {
        date: "05-20",
        time: "10:20",
        keywords: ["수평선", "노을"],
        text: "저녁 노을이 지는 수평선을 배경으로 해줘.",
      },
    ],
    불교화: [
      {
        date: "05-18",
        time: "11:10",
        keywords: ["관세음보살", "연꽃"],
        text: "붉은 연꽃 위에 앉은 관세음보살을 정중앙에 배치해줘.",
      },
    ],
  };

  const promptHistoryList = promptHistoryMap[selectedItem.roomName] || [];

  return (
    <div className="history-wrapper">
      <div className="history-scroll">
        <div className="history02-header">
          <div className="history02-title-left">
            <span className="history02-room-name">{selectedItem.roomName}</span>
            {selectedItem.tags.map((tag, idx) => (
              <span key={idx} className={`tag-chip tag-${tag}`}>
                {tag}
              </span>
            ))}
          </div>

          <div className="history02-title-right">
            <FaArrowLeft className="history02-back-icon" onClick={onBack} />
            <button className="history02-report-button">
              AI 보고서 보러 가기
            </button>
          </div>
        </div>

        <hr className="history-divider" />

        <HistoryDetail
          imageUrl={selectedItem.imageUrl}
          promptHistoryList={promptHistoryList}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "40px",
          }}
        >
          <button className="history-report-button">
            후처리 내용 보러 가기
          </button>
        </div>

        {/* 버튼 아래 최종 이미지 섹션 */}
        <div className="final-image-wrapper">
          <h2 className="final-image-title">최종 이미지</h2>
          <div className="final-image-box">최종 이미지</div>
        </div>
      </div>
    </div>
  );
};

export default History02;
