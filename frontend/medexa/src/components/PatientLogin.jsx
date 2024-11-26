import React, { useState } from "react";

const PatientLogin = () => {
    const [address, setAddress] = useState("");

    const handleLogin = () => {
        // Handle patient login logic here
        console.log("Patient address:", address);
    };

    return (
        <div>
            <h2>Patient Login</h2>
            <input
                type="text"
                placeholder="Enter Patient Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default PatientLogin;