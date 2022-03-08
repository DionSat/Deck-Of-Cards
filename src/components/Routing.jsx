import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Play from "./Play.jsx";
import HowToPlay from "./HowToPlay.jsx";
import AboutUs from "./AboutUs.jsx";
import CardValues from "./CardValue.jsx";

export default function Routing() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/play' element={<Play />} />
        <Route path='/how-to-play' element={<HowToPlay />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/card-values' element={<CardValues />} />
      </Routes>
    </Router>
  );
}
