# Patient Follow-Up Contract
This is a smart contract that allows for the registration of patients and the recording of their follow-up visits. It stores patient data and allows for retrieval and validation of this information.

## Description

The **Patient Follow-Up Contract** enables healthcare providers to register patients, track their follow-up visits, and view their details. 
The contract uses Ethereum addresses to uniquely identify patients and ensures that only valid data is recorded.

The contract includes functions for:

* Adding a new patient.
* Recording a follow-up visit.
* Viewing a patient's details (name, age, number of follow-ups, and the last follow-up date).
* Checking the integrity of the stored data using an invariant check.

## Getting Started

### Prerequisites
You need to have the following installed:

* Node.js and npm
* Hardhat or Truffle for deploying the contract
* Metamask for interacting with the contract on a test network
* Solidity Compiler (0.8.17 or compatible)


### Installing

* Clone the repository:

  git clone https://github.com/your-repo/patient-follow-up.git

* Install dependencies:

  npm install

### Deploying the Contract

* Set up your environment for deploying on a test network like Rinkeby or Avalanche.
  
* Compile the contract:

  npx hardhat compile


* Deploy the contract:

  npx hardhat run scripts/deploy.js --network <your-network>


### Executing program

* After deploying, you'll get the contract's address. Copy it and update the frontend.
* The frontend will allow you to interact with the contract:
* Add a patient by entering their address, name, and age.
* Record a follow-up by selecting the patient and inputting the follow-up date.
* View patient details like name, age, follow-up count, and the last follow-up date.

Example commands to interact via a terminal or console:

npx hardhat console --network 

const contract = await ethers.getContractAt("PatientFollowUp", "deployed_contract_address");

await contract.addPatient("0xPatientAddress", "John Doe", 30);

await contract.recordFollowUp("0xPatientAddress", 1681920000);


## Help

For issues related to deployment or contract interaction:

npx hardhat help

## Common Issues
* Make sure the follow-up date is in the future and in Unix timestamp format.
* Ensure the patient address hasn't been registered previously before adding a new patient.
* Metamask should be connected to the correct network.

  
## Authors
Anisha Kumari (@anishakumarixib@gmail.com)


## License

This project is licensed under the Anisha Kumari License - see the LICENSE.md file for details
