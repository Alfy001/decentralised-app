import React, { useState, useEffect } from "react";
import { getPatientCID } from "../services/blockchain";

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [patientAddress, setPatientAddress] = useState("");

    const fetchCID = async () => {
        const cid = await getPatientCID(patientAddress);
        alert(`CID for ${patientAddress}: ${cid}`);
    };

    return (
        <div>
            <h2>Patient List</h2>
            <input
                type="text"
                placeholder="Enter Patient Address"
                value={patientAddress}
                onChange={(e) => setPatientAddress(e.target.value)}
            />
            <button onClick={fetchCID}>Get CID</button>
        </div>
    );
};

export default PatientList;
