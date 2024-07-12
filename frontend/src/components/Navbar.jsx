import React, { useEffect, useState } from "react";
import {
  FaBars,
  FaBeer,
  FaBell,
  FaSearch,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar({ sideToggle, setSideToggle }) {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  console.log("van user", user);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    setUser(userData.name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="bg-gray-900 px-4 py-3 flex justify-between ">
      <div className="flex items-center text-lg">
        <FaBars
          className="text-white me-4 cursor-pointer"
          onClick={() => setSideToggle(!sideToggle)}
        />
        <span className="text-white font-semibold">Dashboard</span>
      </div>
      <div className="flex items-center gap-x-5">
        <div className="text-white">
          <button onClick={handleLogout}>
            <FaSignOutAlt className="w-5 h-5" />
          </button>
        </div>
        <div className="relative">
          <button className="text-white group">
            <FaUserCircle className="w-6 h-6 mt-1" />
            <div className="z-10 hidden absolute bg-white m-5 gap-3 rounded-lg shadow w-40 group-focus:block top-full right-0">
              <ul className="py-2  text-sm text-gray-950 ">
                <li className="hover:bg-gray-950  hover:text-gray-100 rounded-md">
                  {user}
                </li>
              </ul>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
