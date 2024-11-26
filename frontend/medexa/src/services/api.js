import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Replace with your backend's actual URL

// Function to call backend for creating a folder on Pinata
export const createFolderOnPinata = async (patientAddress) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/create-folder`, { patientAddress });
        return response.data.cid; // Assume the backend responds with a CID
    } catch (error) {
        console.error("Error creating folder on Pinata:", error);
        throw error;
    }
};

// Function to update patient CID via the backend
export const updatePatientCID = async (patientAddress, newCID) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/update-cid`, { patientAddress, newCID });
        return response.data.success;
    } catch (error) {
        console.error("Error updating patient CID:", error);
        throw error;
    }
};
