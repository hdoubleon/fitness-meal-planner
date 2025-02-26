import React, { useState } from "react";

function Workout({ startTimer, pauseTimer, stopTimer, time, isTiming }) {
    const [exercises, setExercises] = useState([]); // 운동 목록 상태
    const [newExercise, setNewExercise] = useState(""); // 새 운동 이름 입력 상태
    const [selectedExercise, setSelectedExercise] = useState(null); // 선택된 운동 상태

    // 운동 추가 함수
    const addExercise = () => {
        if (newExercise) {
            const updatedExercises = [...exercises, newExercise];
            setExercises(updatedExercises);
            localStorage.setItem("exercises", JSON.stringify(updatedExercises)); // 로컬 스토리지에 저장
            setNewExercise(""); // 입력란 초기화
        }
    };

    // 운동 클릭 시 세부 정보 표시
    const handleExerciseClick = (exercise) => {
        setSelectedExercise(exercise);
    };

    // 세부 정보 닫기
    const closeExerciseDetail = () => {
        setSelectedExercise(null);
    };

    return (
        <div>
            {/* 운동 목록 */}
            <h1>운동 페이지</h1>
            {selectedExercise ? (
                <div>
                    <h2>{selectedExercise}</h2>
                    <button onClick={closeExerciseDetail}>닫기</button>
                </div>
            ) : (
                <div>
                    <input
                        type="text"
                        value={newExercise}
                        onChange={(e) => setNewExercise(e.target.value)} // 입력값 업데이트
                        placeholder="운동 이름을 입력하세요"
                    />
                    <button onClick={addExercise}>+</button>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {exercises.map((exercise, index) => (
                            <div
                                key={index}
                                style={{
                                    border: "1px solid #ccc",
                                    borderRadius: "8px",
                                    padding: "16px",
                                    margin: "8px",
                                    width: "150px",
                                    textAlign: "center",
                                    cursor: "pointer",
                                }}
                                onClick={() => handleExerciseClick(exercise)}
                            >
                                <h4>{exercise}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Workout;