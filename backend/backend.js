require("dotenv").config();
const express = require("express");
const { ethers } = require("ethers");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

// Load environment variables
const ALCHEMY_URL = process.env.ALCHEMY_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;

// Initialize Ethers provider and wallet
const provider = new ethers.JsonRpcProvider(ALCHEMY_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// Contract ABI (your existing ABI)
const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "hospital",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "isRegistered",
        "type": "bool"
      }
    ],
    "name": "HospitalRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "patient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "newCID",
        "type": "string"
      }
    ],
    "name": "PatientCIDUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "patient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "isRegistered",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "folderCID",
        "type": "string"
      }
    ],
    "name": "PatientRegistered",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "admin",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAdmin",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_patient",
        "type": "address"
      }
    ],
    "name": "getPatientCID",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_hospital",
        "type": "address"
      }
    ],
    "name": "isRegisteredHospital",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "patientCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_hospital",
        "type": "address"
      }
    ],
    "name": "registerHospital",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_patient",
        "type": "address"
      }
    ],
    "name": "registerPatient",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "registeredHospitals",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "registeredPatients",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_hospital",
        "type": "address"
      }
    ],
    "name": "revokeHospital",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_patient",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_newCID",
        "type": "string"
      }
    ],
    "name": "updatePatientCID",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Create contract instance
const hospitalContract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, wallet);

// Function to create a folder on Pinata and return the CID
async function createFolderOnPinata(patientAddress) {
    const folderName = `Patient_${patientAddress}`;
    const filePath = `./${folderName}/placeholder.txt`;

    if (!fs.existsSync(folderName)) fs.mkdirSync(folderName);
    fs.writeFileSync(filePath, "Placeholder text for IPFS.");

    const formData = new FormData();
    formData.append("file", fs.createReadStream(filePath), { filepath: `/${folderName}/placeholder.txt` });
    formData.append("pinataMetadata", JSON.stringify({ name: folderName }));

    try {
        const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            maxContentLength: "Infinity",
            headers: {
                pinata_api_key: PINATA_API_KEY,
                pinata_secret_api_key: PINATA_SECRET_API_KEY,
                ...formData.getHeaders(),
            },
        });
        return response.data.IpfsHash;
    } catch (error) {
        console.error("Pinata error:", error.message);
    }
}

// Function to update the CID in the smart contract
async function updatePatientCID(patientAddress, newCID) {
    const tx = await hospitalContract.updatePatientCID(patientAddress, newCID);
    await tx.wait();
}

// Express app and API endpoints
const app = express();
app.use(express.json());

app.post("/create-folder", async (req, res) => {
    const { patientAddress } = req.body;
    try { const cid = await createFolderOnPinata(patientAddress)
      res.status(200).json({ cid });
    } catch (error) {
        console.error("Error creating folder:", error.message);
        res.status(500).json({ error: "Failed to create folder on Pinata." });
    }
});

app.post("/update-cid", async (req, res) => {
    const { patientAddress, newCID } = req.body;
    if (!patientAddress || !newCID) {
        return res.status(400).json({ error: "Patient address and new CID are required." });
    }

    try {
        await updatePatientCID(patientAddress, newCID);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error updating CID:", error.message);
        res.status(500).json({ error: "Failed to update CID in the blockchain." });
    }
});

app.get("/patients/:address/cid", async (req, res) => {
    const patientAddress = req.params.address;
    try {
        const cid = await hospitalContract.getPatientCID(patientAddress);
        res.status(200).json({ cid });
    } catch (error) {
        console.error("Error fetching CID:", error.message);
        res.status(500).json({ error: "Failed to fetch patient CID." });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
