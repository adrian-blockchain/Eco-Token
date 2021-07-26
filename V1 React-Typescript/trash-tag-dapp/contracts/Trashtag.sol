pragma solidity ^0.8.0;

// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "./Jobcoin.sol";



contract Trashtag is ERC1155, Jobcoin{




    mapping(address => mapping(uint256 => string)) tokenURI;
    mapping(address => uint) NFTAmount;




    constructor() public ERC1155("") {
    }



    //This function will be an OnlyOwner in the production version
    function rewardTrashtagWarrior(string memory _uri, address _to)public {


        //id 0 is for the coin, so NFT's id start at 1
        NFTAmount[_to] ++;

        //Id's of toeken is determined by the amount store in struct
        uint id = NFTAmount[_to];

        tokenURI[_to][id] = _uri;

        _mint(_to, id, 1, ""); //NFT

    }



    function getAmountNFT(address _receiver) public view returns(uint){
        return NFTAmount[_receiver];
    }




    function getURI(uint _tokenId)public view returns(string memory){
        string memory hashURI = tokenURI[msg.sender][_tokenId];
        return hashURI;
    }
}





