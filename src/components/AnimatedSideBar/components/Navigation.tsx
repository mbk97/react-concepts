import React, { useState } from "react";
import { FiGithub } from "react-icons/fi";
import { Sidebar } from "./Sidebar";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const toggleSidebar = () => setOpen((prev) => !prev);
  return (
    <nav className="flex items-center justify-between px-5  py-2 border-b-2 border-zinc-800">
      <div className={`flex items-center gap-3 ${open ? "w-[0%]" : "w-[20%]"}`}>
        <Sidebar open={open} toggleSidebar={toggleSidebar} />
      </div>
      <div
        className={`${
          open ? "w-[100%]" : "w-[80%]"
        } ml-10 flex justify-between items-center h-[67px]`}
      >
        <p className="text-[#ffffff]">Animated Sidebar</p>
        <div>
          <a
            className="flex w-[170px] items-center gap-2 px-4 py-2 text-orange-400 bg-orange-700/20 rounded-xl"
            href=""
          >
            <FiGithub className="text-lg" />
            Source Code
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
