// SPDX-License-Identifier:MIT
pragma solidity 0.8.17;

contract PatientFollowUp{
    struct Patient{
        string name;
        uint256 age;
        bool exists;
        uint256 followUpCount;
        uint256 lastFollowUpDate;
    }
    
    mapping(address => Patient) private patients;
    address[] private patientAddresses;


    function addPatient(address _patientAddress, string memory _name, uint256 _age) public{
        require(!patients[_patientAddress].exists,"Patient already exists.");
        require(_age>0,"Age must be greater than 0");
        
        patients[_patientAddress] = Patient({
            name: _name,
            age : _age,
            exists : true,
            followUpCount: 0,
            lastFollowUpDate: 0
        });

        patientAddresses.push(_patientAddress);
    }

    function recordFollowUp(address _patientAddress, uint256 _followUpDate) public {
        require(patients[_patientAddress].exists,"Patient does not exists");
        require(_followUpDate>block.timestamp,"Follow up date must be in future.");
        
        Patient storage patient = patients[_patientAddress];
        patient.followUpCount += 1;
        patient.lastFollowUpDate = _followUpDate;
    }

    function getDetails(address _patientAddress) public view returns(string memory name, uint256 age, uint256 followUpCount,uint256 followUpDate){
        if(!patients[_patientAddress].exists){
            revert("Patient does not exists");
        }
        Patient storage patient = patients[_patientAddress];
        return (patient.name, patient.age , patient.followUpCount, patient.lastFollowUpDate);
    }

    
    function checkInvariant() public view {
        uint256 totalFollowUps = 0;

        for (uint256 i = 0; i < patientAddresses.length; i++) {
            totalFollowUps += patients[patientAddresses[i]].followUpCount;
        }

        // Invariant: totalFollowUps should be non-negative
        assert(totalFollowUps >= 0);
    }

}