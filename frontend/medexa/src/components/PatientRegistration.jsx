import React, { useState } from "react";
import { registerPatient } from "../services/blockchain";

const PatientRegistration = () => {
    const [address, setAddress] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await registerPatient(address);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register Patient</h2>
            <input
                type="text"
                placeholder="Enter Patient Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default PatientRegistration;
