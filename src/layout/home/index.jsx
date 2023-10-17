import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

const HomeLayout = () => {
  useEffect(() => {
    if (localStorage.getItem("theme") !== null) {
      const theme = localStorage.getItem("theme");
      if (
        theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);
  return (
    <div className="flex flex-col h-screen justify-between dark:bg-[#111827] ">
      <Header />
      <div className="mb-auto dark:bg-[#111827] ">
        <div className="m-5 mt-10">
          <Outlet />    
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
