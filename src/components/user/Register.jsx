import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(null);
  const navigate = useNavigate();

  // 아이디 더미 데이터 (중복 확인 용도)
  const handleCheckDuplicate = () => {
    const taken = ["admin", "user1", "test"];
    setIsDuplicate(taken.includes(username));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isDuplicate) {
      alert("아이디가 중복됩니다.");
      return;
    }
    alert(`회원가입 완료\n이름: ${name}\n아이디: ${username}`);

    navigate("/main");
  };

  const labelStyle = { width: "60px" };
  const inputStyle = { width: "200px", padding: "8px" };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        alignItems: "flex-start",
      }}
    >
      {/* 제목과 구분선 */}
      <div style={{ marginBottom: "16px" }}>
        <h2 style={{ margin: 0 }}>회원가입</h2>
        <hr style={{ marginTop: "8px", width: "500%" }} />
      </div>

      {/* 아이디 입력 + 중복 확인 */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <label style={labelStyle}>ID</label>
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setIsDuplicate(null);
          }}
          style={inputStyle}
          required
        />
        <button type="button" onClick={handleCheckDuplicate}>
          {isDuplicate === false ? "확인 완료" : "중복 확인"}
        </button>
      </div>

      {/* 이름 입력 */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <label style={labelStyle}>이름</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
          required
        />
      </div>

      {/* 중복 상태 메시지 */}
      {isDuplicate === true && (
        <p style={{ color: "red", margin: 0 }}>이미 사용 중인 아이디입니다.</p>
      )}
      {isDuplicate === false && (
        <p style={{ color: "green", margin: 0 }}>사용 가능한 아이디입니다.</p>
      )}

      {/* 회원가입 버튼 */}
      <button type="submit" style={{ padding: "8px 16px", marginTop: "8px" }}>
        회원가입
      </button>
    </form>
  );
};

export default Register;
