import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AddCandidateModal from "./components/dashboard/AddCandidateModal";
import Employees from "./components/dashboard/Table/Employees";
import AttendanceDashboard from "./components/dashboard/Table/Attendence";
import LogoutModal from "./components/dashboard/Modal/LogoutModal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/modal" element={<AddCandidateModal />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/attendance" element={<AttendanceDashboard />} />
        <Route path="/logout" element={<LogoutModal />} />
      </Routes>
    </Router>
  );
}

export default App;
