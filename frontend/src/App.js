import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Workout from "./pages/Workout";
import Diet from "./pages/Diet";
import Rest from "./pages/Rest";
import More from "./pages/More";

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <Link to="/">운동</Link>
          <Link to="/diet">식단</Link>
          <Link to="/rest">휴식</Link>
          <Link to="/more">더보기</Link>
        </nav>

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