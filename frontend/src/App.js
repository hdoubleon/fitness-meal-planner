import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Workout from "./pages/Workout";
import Diet from "./pages/Diet";
import Rest from "./pages/Rest";
import More from "./pages/More";

function App() {
  const [time, setTime] = useState(0); // 경과 시간 상태
  const [isTiming, setIsTiming] = useState(false); // 타이머 진행 중 여부
  const [intervalId, setIntervalId] = useState(null); // setInterval ID
  const [isPaused, setIsPaused] = useState(false); // 일시정지 상태

  // 로컬 스토리지에서 타이머 상태 불러오기
  useEffect(() => {
    const savedTime = localStorage.getItem("time");
    const savedIsTiming = localStorage.getItem("isTiming");

    if (savedTime) setTime(Number(savedTime));
    if (savedIsTiming === "true") {
      setIsTiming(true);
      startTimer(Number(savedTime)); // 저장된 시간에서 타이머 시작
    }
  }, []);

  // 시:분:초 포맷으로 변환
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // 타이머 시작
  const startTimer = (initialTime = 0) => {
    const id = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime + 1;
        localStorage.setItem("time", newTime); // 타이머 시간 저장
        return newTime;
      });
    }, 1000);
    setIntervalId(id);
    setIsTiming(true);
    setIsPaused(false); // 일시정지 상태 초기화
    localStorage.setItem("isTiming", "true"); // 타이머 상태 저장
  };

  // 타이머 일시 정지
  const pauseTimer = () => {
    if (intervalId) {
      clearInterval(intervalId); // interval 정지
      setIsPaused(true); // 일시정지 상태로 변경
      setIsTiming(false); // 타이머 상태 업데이트
      localStorage.setItem("isTiming", "false"); // 타이머 상태 저장
    }
  };

  // 타이머 종료
  const stopTimer = () => {
    if (intervalId) {
      clearInterval(intervalId); // interval 정지
    }
    setIsTiming(false);
    setIsPaused(false); // 일시정지 상태 초기화
    setTime(0); // 시간 초기화
    localStorage.setItem("time", "0"); // 시간 초기화
    localStorage.setItem("isTiming", "false"); // 타이머 상태 초기화
  };

  return (
    <Router>
      <div className="app">
        {/* 하단에 고정된 네비게이션 바 */}
        <nav className="bottom-nav">
          <Link to="/" className="nav-item">
            <img src="logo192.png" alt="운동" className="nav-icon" />
            운동
          </Link>
          <Link to="/diet" className="nav-item">
            <img src="logo192.png" alt="식단" className="nav-icon" />
            식단
          </Link>
          <Link to="/rest" className="nav-item">
            <img src="/logo192.png" alt="휴식" className="nav-icon" />
            휴식
          </Link>
          <Link to="/more" className="nav-item">
            <img src="/logo192.png" alt="더보기" className="nav-icon" />
            더보기
          </Link>
        </nav>

        {/* 스톱워치: 어디에서든 보이는 부분 */}
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: "#fff",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
          <p>{formatTime(time)}</p>
          {!isTiming && !isPaused ? (
            <button onClick={() => startTimer(time)}>운동 시작</button>
          ) : isPaused ? (
            <div>
              <button onClick={() => startTimer(time)}>운동 시작</button>
              <button onClick={stopTimer}>운동 종료</button>
            </div>
          ) : (
            <button onClick={pauseTimer}>일시 정지</button>
          )}
        </div>

        {/* 라우터 설정 */}
        <Routes>
          <Route path="/" element={<Workout />} />
          <Route path="/diet" element={<Diet />} />
          <Route path="/rest" element={<Rest />} />
          <Route path="/more" element={<More />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
