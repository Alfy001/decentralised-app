import React, { useState } from "react";
import { registerHospital } from "../services/blockchain";

const HospitalRegistration = () => {
    const [address, setAddress] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await registerHospital(address);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register Hospital</h2>
            <input
                type="text"
                placeholder="Enter Hospital Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default HospitalRegistration;
