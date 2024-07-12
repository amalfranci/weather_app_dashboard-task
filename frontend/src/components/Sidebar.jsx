import React, { useState } from "react";
import "remixicon/fonts/remixicon.css";

function Sidebar({ sideToggle, activeComponent, setActiveComponent }) {
  return (
    <div
      className={`${
        sideToggle ? "hidden" : "block"
      } w-64 bg-gray-900 fixed h-full px-4 py-2 `}
    >
      <a
        href="#"
        className="flex items-center pb-4  border-b border-b-gray-700"
      >
        {/* <img src={logo} alt='' className='w-16 h-10 rounded object-cover' /> */}
        <span className="text-lg font-bold text-white ml-3">Vi-Scan</span>
      </a>
      <ul className="mt-4">
        <li
          className={`mb-1 group ${
            activeComponent === "dashboard" ? "active" : ""
          }`}
        >
          <a
            onClick={() => setActiveComponent("dashboard")}
            className="flex items-center py-2 px-2 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white  cursor-pointer"
          >
            <i className="ri-home-2-line mr-3 text-lg"></i>
            <span className="text-sm ">Dashboard</span>
          </a>
        </li>
        <li
          className={`mb-1 group ${
            activeComponent === "favorites" ? "active" : ""
          }`}
        >
          <a
            onClick={() => setActiveComponent("favorites")}
            className="flex items-center py-2 px-2 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white cursor-pointer"
          >
            <i className="ri-shopping-cart-line mr-3 text-lg"></i>
            <span className="text-sm ">Favorites</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
