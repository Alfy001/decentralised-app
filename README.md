Hospital Registry on Blockchain

This project enables secure storage and access of medical data using blockchain technology. Hospitals can access patient information such as allergies and injection history, while admins can manage hospital registrations.

Features

Decentralized storage of sensitive medical data.

Role-based access control (Admin vs Hospital).

MetaMask integration for user authentication.

Smart contract functionality using Solidity and Hardhat.



---

Getting Started

Prerequisites

Node.js (v16 or above)

MetaMask Extension

Hardhat (for blockchain development)


Installation

1. Clone the repository:

git clone <repository_url>


2. Navigate to the project directory:

cd <repository_name>


3. Install dependencies:

npm install


4. Deploy smart contracts:

npx hardhat run scripts/deploy.js --network <network_name>

Replace <network_name> with localhost or a testnet like sepolia.




---

Usage

1. Start the local blockchain:

npx hardhat node


2. Launch the frontend:

npm start


3. Open your browser and navigate to http://localhost:3000.


4. Connect MetaMask to the desired network.


5. Login as:

Admin: Manage hospital registrations.

Hospital: Access patient data.





---

Smart Contract Overview

The HospitalRegistry smart contract includes:

1. Admin Functions:

Add new hospitals.

Verify hospital registrations.



2. Hospital Functions:

Access decentralized patient data.




Deployment Example

The contract can be deployed locally or on a testnet:

npx hardhat run scripts/deploy.js --network localhost


---

Technologies Used

Frontend: React, ethers.js

Backend: Hardhat, Solidity

Blockchain: Ethereum testnets or local Hardhat node

Authentication: MetaMask



---

Contributing

Contributions are welcome! Please follow the steps below:

1. Fork the repository.


2. Create a feature branch:

git checkout -b <feature_branch>


3. Commit your changes and push:

git commit -m "Add feature"
git push origin <feature_branch>


4. Open a pull request.




---

License

This project is licensed under the MIT License. See the LICENSE file for details.


---

Adjustments

You can add more project-specific details, such as:

Links to deployed versions (if hosted).

Screenshots of the frontend/dashboard.

Troubleshooting tips.
