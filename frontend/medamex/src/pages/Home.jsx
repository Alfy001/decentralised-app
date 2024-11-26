import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import getContract from "../utils/contract";

const Home = () => {
  const navigate = useNavigate();

  const loginAsAdmin = async () => {
    try {
      const contract = await getContract(); // Get contract with signer
      const signerAddress = await contract.signer.getAddress(); // Get connected wallet address
      const adminAddress = "0xe78f3c13aC8A3DCEE1f800997E6c422c4605d83b"; // Fetch admin address from the contract
  
      if (signerAddress.toLowerCase() === adminAddress.toLowerCase()) {
        navigate("/admin-login");
      } else {
        alert("Access Denied: You are not the admin.");
      }
    } catch (error) {
      console.error("Error during admin login:", error);
      alert("Error connecting to MetaMask: " + error.message);
    }
  };
  
  
  
  const loginAsHospital = async () => {
    try {
      const contract = await getContract(); // Get contract with signer
      const signer = await contract.signer.getAddress(); // Get connected wallet address
      const isHospital = await contract.isRegisteredHospital(signer); // Check if it's a registered hospital
  
      if (isHospital) {
        navigate("/hospital-login");
      } else {
        alert("Access Denied: You are not a registered hospital.");
      }
    } catch (error) {
      alert("Error connecting to MetaMask: " + error.message);
    }
  };
  

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h3" gutterBottom>
        Welcome to MedaMex
      </Typography>
      <Button variant="contained" color="primary" onClick={loginAsAdmin} sx={{ m: 2 }}>
        Login as Admin
      </Button>
      <Button variant="contained" color="primary" onClick={loginAsHospital} sx={{ m: 2 }}>
        Login as Hospital
      </Button>
    </Box>
  );
};

export default Home;
