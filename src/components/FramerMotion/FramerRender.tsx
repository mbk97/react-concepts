import React from "react";
import FramerPracticeOne from "./FramerPracticeOne";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./RoutesAnimation/Home";
import About from "./RoutesAnimation/About";
import Contact from "./RoutesAnimation/Contact";
import { AnimatePresence } from "framer-motion";

const FramerRender = () => {
  const location = useLocation();
  return (
    <div className="w-[100vw]">
      {/* <FramerPracticeOne /> */}
      <AnimatePresence>
        <header className="flex items-center justify-between">
          <h1>LOGO</h1>
          <div>
            <ul className="flex items-center gap-2">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/about"}>About</Link>
              </li>
              <li>
                <Link to={"/contact"}>Contact</Link>
              </li>
            </ul>
          </div>
        </header>
        <div className="my-[40px]" />

        <Routes location={location} key={location.key}>
          <Route path="/" index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default FramerRender;
