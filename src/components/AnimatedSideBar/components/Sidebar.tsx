import React from "react";
import { useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AnimatePresence, motion } from "framer-motion";
import { useClickAway } from "react-use";
import { AiOutlineRollback } from "react-icons/ai";
import { BiHomeSmile, BiUser } from "react-icons/bi";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { FiSettings, FiShoppingCart } from "react-icons/fi";

interface IProps {
  open: boolean;
  toggleSidebar: () => void;
}

export const Sidebar = ({ open, toggleSidebar }: IProps) => {
  const ref = useRef(null);

  return (
    <div>
      <button
        onClick={toggleSidebar}
        className="p-3 border-2 border-zinc-800 rounded-xl"
        aria-label="toggle sidebar"
      >
        <GiHamburgerMenu className="text-[#ffffff]" />
      </button>
      <div className="hidden lg:block">
        <AnimatePresence mode="wait" initial={false}>
          {/* {open && ( */}
          <>
            <motion.div
              {...framerSidebarBackground}
              aria-hidden="true"
              className="relative bg-[rgba(228,218,218,0.7)] backdrop-blur-sm"
            ></motion.div>
            <motion.div
              {...framerSidebarPanel}
              className="fixed top-0 bottom-0 left-0 z-50 w-full h-screen max-w-xs border-r-2 border-zinc-800 bg-zinc-900 pt-5"
              ref={ref}
              aria-label="Sidebar"
            >
              <div className="flex items-center justify-between p-5 border-b-2 border-zinc-800">
                <span className="text-[#ffffff]">Welcome</span>
                <button
                  onClick={toggleSidebar}
                  className="p-3 border-2 border-zinc-800 rounded-xl block lg:hidden"
                  aria-label="close sidebar"
                >
                  <AiOutlineRollback className="text-[#ffffff]" />
                </button>
              </div>
              <ul>
                {items.map((item, idx) => {
                  const { title, href, Icon } = item;
                  return (
                    <li key={title}>
                      <a
                        // onClick={toggleSidebar}
                        href={href}
                        className="flex items-center justify-between gap-5 p-5 transition-all border-b-2 hover:bg-zinc-900 border-zinc-800 text-[#ffffff]"
                      >
                        <motion.span {...framerText(idx)}>{title}</motion.span>
                        <motion.div {...framerIcon}>
                          <Icon className="text-2xl text-[#ffffff]" />
                        </motion.div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </>
          {/* )} */}
        </AnimatePresence>
      </div>
      <div className="block">
        <AnimatePresence mode="wait" initial={false}>
          {open && (
            <>
              <motion.div
                {...framerSidebarBackground}
                aria-hidden="true"
                className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-[rgba(228,218,218,0.7)] backdrop-blur-sm"
              ></motion.div>
              <motion.div
                {...framerSidebarPanel}
                className="fixed top-0 bottom-0 left-0 z-50 w-full h-screen max-w-xs border-r-2 border-zinc-800 bg-zinc-900"
                ref={ref}
                aria-label="Sidebar"
              >
                <div className="flex items-center justify-between p-5 border-b-2 border-zinc-800">
                  <span className="text-[#ffffff]">Welcome</span>
                  <button
                    onClick={toggleSidebar}
                    className="p-3 border-2 border-zinc-800 rounded-xl"
                    aria-label="close sidebar"
                  >
                    <AiOutlineRollback className="text-[#ffffff]" />
                  </button>
                </div>
                <ul>
                  {items.map((item, idx) => {
                    const { title, href, Icon } = item;
                    return (
                      <li key={title}>
                        <a
                          onClick={toggleSidebar}
                          href={href}
                          className="flex items-center justify-between gap-5 p-5 transition-all border-b-2 hover:bg-zinc-900 border-zinc-800 text-[#ffffff]"
                        >
                          <motion.span {...framerText(idx)}>
                            {title}
                          </motion.span>
                          <motion.div {...framerIcon}>
                            <Icon className="text-2xl text-[#ffffff]" />
                          </motion.div>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const items = [
  { title: "Home", Icon: BiHomeSmile, href: "#" },
  { title: "About", Icon: BiUser },
  { title: "Contact", Icon: HiOutlineChatBubbleBottomCenterText, href: "#" },
  { title: "Settings", Icon: FiSettings, href: "#" },
  { title: "Shop", Icon: FiShoppingCart, href: "#" },
];

const framerSidebarBackground = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.2 } },
  transition: { duration: 0.3 },
};

const framerSidebarPanel = {
  initial: { x: "-100%" },
  animate: { x: 0 },
  exit: { x: "-100%" },
  transition: { duration: 0.3 },
};

const framerText = (delay) => {
  return {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: {
      delay: 0.5 + delay / 10,
    },
  };
};

const framerIcon = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  transition: {
    type: "spring",
    stiffness: 260,
    damping: 20,
    delay: 1.5,
  },
};
