// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { ByteHasher } from './helpers/ByteHasher.sol';
import { IWorldID } from './interfaces/IWorldID.sol';

contract MoodContract {
    using ByteHasher for bytes;

    // World ID related variables
    IWorldID internal immutable worldId;
    uint256 internal immutable groupId = 1;
    string internal constant actionId = "moodcast";
    mapping(uint256 => bool) internal nullifierHashes;

    // Struct to store mood data
    struct MoodData {
        string mood;
        uint256 timestamp;
    }

    // Mapping from address to array of mood data
    mapping(address => MoodData[]) public userMoods;
    
    // Array to store all addresses that have set moods
    address[] public users;
    
    // Mapping to check if an address is already in the users array
    mapping(address => bool) private userExists;

    // Mapping to track if a user has been verified
    mapping(address => bool) public isVerified;

    // Event emitted when a mood is set
    event MoodSet(address indexed user, string mood, uint256 timestamp);
    
    // Event emitted when a user is verified
    event UserVerified(address indexed user);

    constructor(IWorldID _worldId) {
        worldId = _worldId;
    }

    // Function to verify a user with World ID
    function verifyUser(
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof,
        address signal
    ) public {
        // Verify the provided proof
        worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(signal).hashToField(),
            nullifierHash,
            abi.encodePacked(actionId).hashToField(),
            proof
        );

        // Check if this nullifier hash has been used before
        require(!nullifierHashes[nullifierHash], "Proof has already been used");
        
        // Mark the nullifier hash as used
        nullifierHashes[nullifierHash] = true;
        
        // Mark the user as verified
        isVerified[signal] = true;
        
        emit UserVerified(signal);
    }

    // Function to set a mood (requires verification)
    function setMood(string memory _mood) public {
        require(isVerified[msg.sender], "User not verified with World ID");
        
        // Add user to users array if they don't exist yet
        if (!userExists[msg.sender]) {
            users.push(msg.sender);
            userExists[msg.sender] = true;
        }
        
        // Add mood to user's mood history
        userMoods[msg.sender].push(MoodData({
            mood: _mood,
            timestamp: block.timestamp
        }));
        
        // Emit event
        emit MoodSet(msg.sender, _mood, block.timestamp);
    }

    // Function to get a user's current mood
    function getCurrentMood(address _user) public view returns (string memory, uint256) {
        if (userMoods[_user].length == 0) {
            return ("No mood set", 0);
        }
        
        MoodData memory latestMood = userMoods[_user][userMoods[_user].length - 1];
        return (latestMood.mood, latestMood.timestamp);
    }

    // Function to get a user's mood history
    function getMoodHistory(address _user) public view returns (MoodData[] memory) {
        return userMoods[_user];
    }

    // Function to get all users
    function getAllUsers() public view returns (address[] memory) {
        return users;
    }

    // Function to get the latest moods from all users
    function getAllLatestMoods() public view returns (address[] memory, string[] memory, uint256[] memory) {
        address[] memory addresses = new address[](users.length);
        string[] memory moods = new string[](users.length);
        uint256[] memory timestamps = new uint256[](users.length);
        
        for (uint i = 0; i < users.length; i++) {
            addresses[i] = users[i];
            (moods[i], timestamps[i]) = getCurrentMood(users[i]);
        }
        
        return (addresses, moods, timestamps);
    }

    // Function to check if a user is verified
    function checkVerification(address _user) public view returns (bool) {
        return isVerified[_user];
    }
}
