import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import getContract from "../utils/contract";

const AdminLogin = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [message, setMessage] = useState("");

  const registerHospital = async () => {
    try {
      const contract = await getContract();
      const tx = await contract.registerHospital(walletAddress);
      await tx.wait();
      setMessage(`Hospital ${walletAddress} registered successfully!`);
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  const revokeHospital = async () => {
    try {
      const contract = await getContract();
      const tx = await contract.revokeHospital(walletAddress);
      await tx.wait();
      setMessage(`Hospital ${walletAddress} revoked successfully!`);
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <Box>
      <Typography variant="h4">Welcome, Admin</Typography>
      <TextField
        label="Hospital Wallet Address"
        fullWidth
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
        sx={{ my: 2 }}
      />
      <Button variant="contained" color="primary" onClick={registerHospital} sx={{ mr: 2 }}>
        Register Hospital
      </Button>
      <Button variant="contained" color="error" onClick={revokeHospital}>
        Revoke Hospital
      </Button>
      {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
    </Box>
  );
};

export default AdminLogin;
