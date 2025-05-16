// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

library ByteHasher {
    /// @dev Converts a bytes array to a uint256 field element.
    /// @param value The bytes array to be converted.
    /// @return The uint256 field element.
    function hashToField(bytes memory value) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(value))) >> 8;
    }
}
