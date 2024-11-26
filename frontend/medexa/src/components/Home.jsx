import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
    <div>
        <h1>Welcome to the Hospital Management System</h1>
        <div>
            <Link to="/login-hospital">
                <button>Hospital Login</button>
            </Link>
            <Link to="/login-patient">
                <button>Patient Login</button>
            </Link>
        </div>
    </div>
);

export default Home;