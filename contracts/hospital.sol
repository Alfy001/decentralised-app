// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract HospitalRecords {
    address public admin;

    // Events
    event HospitalRegistered(address indexed hospital, bool isRegistered);
    event PatientRegistered(address indexed patient, bool isRegistered, string folderCID);
    event PatientCIDUpdated(address indexed patient, string newCID);

    // Constructor
    constructor() {
        admin = msg.sender;
        admins[admin] = true; // Set contract deployer as admin
    }

    // Modifiers
    modifier onlyAdmin() {
        require(admins[msg.sender], "Access Denied: Only Admin");
        _;
    }

    modifier onlyRegisteredHospital() {
        require(registeredHospitals[msg.sender], "Access Denied: Only Registered Hospitals");
        _;
    }

    modifier onlyAuthorized() {
    require(
        msg.sender == admin || registeredHospitals[msg.sender],
        "Access Denied: Only Admin or Registered Hospital"
    );
    _;
    }

    // Mappings
    mapping(address => bool) public registeredPatients;
    mapping(address => string) patientFolderCID; // Mapping for patient address to folder CID
    mapping(address => bool) public registeredHospitals; // Registered hospitals
    mapping(address => bool) admins; // Admins

    uint256 public patientCount; // Counter for patient IDs

    // Register a new hospital (only by admin)
    function registerHospital(address _hospital) public onlyAdmin {
        registeredHospitals[_hospital] = true;
        emit HospitalRegistered(_hospital, true);
    }
    
    function getAdmin() public view returns (address) {
        return admin;
    }


    // Admin registers a new patient
    function registerPatient(address _patient) public onlyRegisteredHospital {
        require(!registeredPatients[_patient], "Patient is already registered");

        registeredPatients[_patient] = true;
        patientFolderCID[_patient] = "pending"; // Placeholder CID

        patientCount++;

        emit PatientRegistered(_patient, true, "pending");
    }

    function updatePatientCID(address _patient, string memory _newCID) public onlyAdmin {
        require(registeredPatients[_patient], "Patient not registered");
        patientFolderCID[_patient] = _newCID;

        emit PatientCIDUpdated(_patient, _newCID);
    }

    function revokeHospital(address _hospital) public onlyAdmin {
    require(registeredHospitals[_hospital], "Hospital is not registered");
    registeredHospitals[_hospital] = false;
    emit HospitalRegistered(_hospital, false);
    }


    // Function to retrieve the CID for a registered patient by address
    function getPatientCID(address _patient) public view onlyAuthorized returns (string memory) {
    require(registeredPatients[_patient], "Patient is not registered");
    return patientFolderCID[_patient];
    }

    function isRegisteredHospital(address _hospital) public view returns (bool) {
        return registeredHospitals[_hospital];
    }
}
