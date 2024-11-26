import React, { useState } from "react";

const HospitalLogin = () => {
    const [address, setAddress] = useState("");

    const handleLogin = () => {
        // Handle hospital login logic here
        console.log("Hospital address:", address);
    };

    return (
        <div>
            <h2>Hospital Login</h2>
            <input
                type="text"
                placeholder="Enter Hospital Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default HospitalLogin;