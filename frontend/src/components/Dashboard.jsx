import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import Favorites from "./Favorites";
import { useNavigate } from "react-router-dom";

function Dashboard({ sideToggle, setSideToggle, activeComponent }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div className={`${sideToggle ? " " : "ml-64"} w-full`}>
      <Navbar sideToggle={sideToggle} setSideToggle={setSideToggle} />

      <div>
        {activeComponent === "dashboard" && <Home />}
        {activeComponent === "favorites" && <Favorites />}
      </div>
    </div>
  );
}

export default Dashboard;
