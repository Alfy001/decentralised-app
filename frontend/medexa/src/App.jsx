import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HospitalRegistration from "./components/HospitalRegistration.jsx";
import PatientRegistration from "./components/PatientRegistration.jsx";
import PatientList from "./components/PatientList.jsx";
import Home from "./components/Home.jsx";
import HospitalLogin from "./components/HospitalLogin.jsx";
import PatientLogin from "./components/PatientLogin.jsx";

const App = () => (
    <Router>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/register-hospital">Register Hospital</Link>
            <Link to="/register-patient">Register Patient</Link>
            <Link to="/patients">Patient List</Link>
        </nav>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register-hospital" element={<HospitalRegistration />} />
            <Route path="/register-patient" element={<PatientRegistration />} />
            <Route path="/patients" element={<PatientList />} />
            <Route path="/login-hospital" element={<HospitalLogin />} />
            <Route path="/login-patient" element={<PatientLogin />} />
        </Routes>
    </Router>
);

export default App;