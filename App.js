import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin/admin.js";
import Home from "./pages/Home/home.js";
import Register from "./pages/Login-Register/register.js";
import Login from "./pages/Login-Register/login.js";
import Navbar from "./components/Navbar/navbar.js";
import "./App.css";
function App() {
    return (
        <Router>
            <div className="app-container">

                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
