import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Play from "./Play.jsx";
import HowToPlay from "./HowToPlay.jsx";
import Leaderboard from "./Leaderboard.jsx";

export default function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Play />} />
        <Route path="/how-to-play" element={<HowToPlay />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}
