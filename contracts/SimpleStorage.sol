// SPDX-License-Identifier: MIT
pragma solidity 0.5.16;

contract ImagesStorage {
  string ipfsHash;

  function set(string memory x) public {
    ipfsHash = x;
  }

  function get() public view returns (string memory) {
    return ipfsHash;
  }
}
