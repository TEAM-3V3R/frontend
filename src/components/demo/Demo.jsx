import React from "react";

const Demo = () => {
  return (
    <div
      style={{
        width: "600px",
        margin: "50px auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {/* 제목과 구분선 */}
      <div style={{ marginBottom: "16px", width: "100%" }}>
        <h2 style={{ margin: 0 }}>실제 LED 화면 시연 영상</h2>
        <hr style={{ marginTop: "8px", width: "100%" }} />
      </div>

      {/* 영상 플레이어 <- 영상 집어넣어야 함 */}
      <div style={{ width: "100%" }}>
        <video width="100%" controls>
          <source src="/video/demo.mp4" type="video/mp4" />
          브라우저가 video 태그를 지원하지 않습니다.
        </video>
      </div>
    </div>
  );
};

export default Demo;
