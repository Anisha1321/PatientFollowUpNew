import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./App.css";

const contractABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_patientAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_age",
        type: "uint256",
      },
    ],
    name: "addPatient",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "checkInvariant",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_patientAddress",
        type: "address",
      },
    ],
    name: "getDetails",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "age",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "followUpCount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "followUpDate",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_patientAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_followUpDate",
        type: "uint256",
      },
    ],
    name: "recordFollowUp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const contractAddress = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [patientAddress, setPatientAddress] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [patientDetails, setPatientDetails] = useState(null);

  useEffect(() => {
    async function loadBlockchainData() {
      const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545/");
      const web3 = new Web3(provider);
      const instance = new web3.eth.Contract(contractABI, contractAddress);
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      setContract(instance);
    }
    loadBlockchainData();
  }, []);

  const addPatient = async (event) => {
    event.preventDefault();
    await contract.methods
      .addPatient(patientAddress, patientName, patientAge)
      .send({ from: account });
    alert("Patient added successfully");
  };

  const getPatientDetails = async (event) => {
    event.preventDefault();
console.log({patientAddress});
    const details = await contract.methods.getDetails(patientAddress).call();
console.log(details);
    setPatientDetails({
      name: details.name,
      age: details.age,
      followUpCount: details.followUpCount,
      lastFollowUpDate: details.followUpDate,
    });
  };

  const recordFollowUp = async (event) => {
    event.preventDefault();
    const timestamp = new Date(followUpDate).getTime() / 1000; // Convert to Unix timestamp
    await contract.methods
      .recordFollowUp(patientAddress, timestamp)
      .send({ from: account });
    alert("Follow-up recorded successfully");
  };

  return (
    <div className="App">
      <h1>Patient Follow-Up</h1>
      <p>Account: {account}</p>

      <h2>Add Patient</h2>
      <form onSubmit={addPatient}>
        <input
          type="text"
          placeholder="Patient Address"
          value={patientAddress}
          onChange={(e) => setPatientAddress(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Patient Age"
          value={patientAge}
          onChange={(e) => setPatientAge(e.target.value)}
          required
        />
        <button type="submit">Add Patient</button>
      </form>

      <h2>Record Follow-Up</h2>
      <form onSubmit={recordFollowUp}>
        <input
          type="text"
          placeholder="Patient Address"
          value={patientAddress}
          onChange={(e) => setPatientAddress(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          placeholder="Follow-Up Date"
          value={followUpDate}
          onChange={(e) => setFollowUpDate(e.target.value)}
          required
        />
        <button type="submit">Record Follow-Up</button>
      </form>

      <h2>Get Patient Details</h2>
      <form onSubmit={getPatientDetails}>
        <input
          type="text"
          placeholder="Patient Address"
          value={patientAddress}
          onChange={(e) => setPatientAddress(e.target.value)}
          required
        />
        <button type="submit">Get Details</button>
      </form>

      {patientDetails && (
        <div>
          <h3>Patient Details</h3>
          <p>Name: {patientDetails.name}</p>
          <p>Age: {patientDetails.age.toString()}</p>
          <p>Follow-Up Count: {patientDetails.followUpCount.toString()}</p>
          <p>
            Last Follow-Up Date:{" "}
            {new Date(patientDetails.lastFollowUpDate * 1000).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;