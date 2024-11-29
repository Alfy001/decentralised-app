import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import getContract from "../utils/contract";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const loginAsAdmin = async () => {
    setLoading(true);
    try {
      const contract = await getContract(); // Get contract with signer
      const signerAddress = await contract.signer.getAddress(); // Get connected wallet address

      // Check if the signer address is an admin by calling the isAdmin function
      const isAdmin = await contract.isAdmin(signerAddress);
      console.log("Is deployer an admin?", isAdmin);

      if (isAdmin) {
        console.log("User is an admin.");
        navigate("/admin-login");
      } else {
        alert("Access Denied: You are not the admin.");
      }
    } catch (error) {
      console.error("Error during admin login:", error);
      alert("Error connecting to MetaMask: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const loginAsHospital = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
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

      {loading ? (
        <CircularProgress sx={{ m: 2 }} />
      ) : (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={loginAsAdmin}
            sx={{ m: 2 }}
          >
            Login as Admin
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={loginAsHospital}
            sx={{ m: 2 }}
          >
            Login as Hospital
          </Button>
        </>
      )}
    </Box>
  );
};

export default Home;
