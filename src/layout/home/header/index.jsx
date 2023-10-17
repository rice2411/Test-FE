import React, { useEffect, useState } from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { getCurrentUser, logout } from "../../../utils/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userName, setUserName] = useState("");
  const toggleMode = () => {
    if (localStorage.getItem("theme") !== null) {
      const theme = localStorage.getItem("theme");
      switch (theme) {
        case "light":
          localStorage.setItem("theme", "dark");
          document.documentElement.classList.add("dark");
          setIsDarkMode(true);
          break;
        case "dark":
          localStorage.setItem("theme", "light");
          document.documentElement.classList.remove("dark");
          setIsDarkMode(false);
          break;
      }
    } else {
      localStorage.setItem("theme", "light");
    }
  };
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setIsDarkMode(theme == "dark");
    const { username } = getCurrentUser() || "";
    setUserName(username);
  }, []);
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="https://flowbite.com" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Hi {userName}
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            <div
              onClick={() => {
                handleLogout();
              }}
              className=" cursor-pointer text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              Log out
            </div>

            <div
              onClick={() => {
                toggleMode();
              }}
              className="cursor-pointer text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              {isDarkMode ? <BsFillSunFill /> : <BsFillMoonFill />}
            </div>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          ></div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
