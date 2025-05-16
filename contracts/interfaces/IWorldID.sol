// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IWorldID {
    /// @notice Verifies a World ID proof.
    /// @param root The root of the Merkle tree.
    /// @param groupId The group ID of the Merkle tree.
    /// @param signalHash The hash of the signal.
    /// @param nullifierHash The hash of the nullifier.
    /// @param externalNullifierHash The hash of the external nullifier.
    /// @param proof The zero-knowledge proof.
    function verifyProof(
        uint256 root,
        uint256 groupId,
        uint256 signalHash,
        uint256 nullifierHash,
        uint256 externalNullifierHash,
        uint256[8] calldata proof
    ) external view;
}
