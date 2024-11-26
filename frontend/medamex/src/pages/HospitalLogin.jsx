import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import getContract from "../utils/contract";

const HospitalLogin = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [message, setMessage] = useState("");
  const [cid, setCID] = useState("");

  const registerPatient = async () => {
    try {
      const contract = await getContract();
      const tx = await contract.registerPatient(walletAddress);
      await tx.wait();
      setMessage(`Patient ${walletAddress} registered successfully!`);
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  const fetchPatientDetail = async () => {
    try {
      const contract = await getContract();
      const patientCID = await contract.getPatientCID(walletAddress);
      setCID(patientCID);
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <Box>
      <Typography variant="h4">Welcome, Hospital</Typography>
      <TextField
        label="Patient Wallet Address"
        fullWidth
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
        sx={{ my: 2 }}
      />
      <Button variant="contained" color="primary" onClick={registerPatient} sx={{ mr: 2 }}>
        Register Patient
      </Button>
      <Button variant="contained" color="info" onClick={fetchPatientDetail}>
        Fetch Patient Details
      </Button>
      {cid && <Typography sx={{ mt: 2 }}>CID: {cid}</Typography>}
      {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
    </Box>
  );
};

export default HospitalLogin;
