import { ethers } from "ethers";
//import contractABI from "../HospitalRecords.json";
 // Replace with the path to your ABI JSON file.

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

const provider = new ethers.JsonRpcProvider(import.meta.env.VITE_ALCHEMY_URL);
const signer = provider.getSigner();
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

const hospitalContract = new ethers.Contract(contractAddress, contractABI, signer);

export const registerHospital = async (hospitalAddress) => {
    try {
        const tx = await hospitalContract.registerHospital(hospitalAddress);
        await tx.wait();
        alert("Hospital registered successfully!");
    } catch (error) {
        console.error("Error registering hospital:", error);
    }
};

export const registerPatient = async (patientAddress) => {
    try {
        const tx = await hospitalContract.registerPatient(patientAddress);
        await tx.wait();
        alert("Patient registered successfully!");
    } catch (error) {
        console.error("Error registering patient:", error);
    }
};

export const getPatientCID = async (patientAddress) => {
    try {
        const cid = await hospitalContract.getPatientCID(patientAddress);
        return cid;
    } catch (error) {
        console.error("Error fetching CID:", error);
    }
};
