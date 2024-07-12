import React, { useState } from "react";
import "remixicon/fonts/remixicon.css";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Favorites from "./components/Favorites";
import Sidebar from "./components/Sidebar";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/LoginPage";
import Register from "./components/RegisterPage";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  const [sideToggle, setSideToggle] = useState(false);
  const [activeComponent, setActiveComponent] = useState("dashboard");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <div className="flex">
                <Sidebar
                  sideToggle={sideToggle}
                  activeComponent={activeComponent}
                  setActiveComponent={setActiveComponent}
                />
                <Dashboard
                  sideToggle={sideToggle}
                  setSideToggle={setSideToggle}
                  activeComponent={activeComponent}
                  setActiveComponent={setActiveComponent}
                />
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
