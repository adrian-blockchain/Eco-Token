pragma solidity ^0.8.0;

// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./Strings.sol";
import "./Jobcoin.sol";



contract Trashtag is ERC1155, Jobcoin{



    using Strings for string;

    address private admin;



    mapping(address => mapping(uint256 => string)) tokenURI;
    mapping(address => uint) NFTAmount;




    constructor() public ERC1155("") {
    }




    function rewardTrashtagWarrior(string memory _uri, address _to)public onlyOwner{


        //id 0 is for the coin, so NFT's id start at 1
        NFTAmount[_to] ++;

        //Id's of toeken is determined by the amount store in struct
        uint id = NFTAmount[_to];

        tokenURI[_to][id] = _uri;

        _mint(_to, id, 1, ""); //NFT

    }




    function SendToken(address _to,uint _id) public{
        require(NFTAmount[msg.sender] >0, "You did not clean the world yet!");
        uint id = NFTAmount[_to];
        safeTransferFrom(msg.sender, _to, id, 1, "");
        string memory uri =tokenURI[msg.sender][_id];
        tokenURI[_to][id]= uri;
        tokenURI[msg.sender][_id] = "not yours anymore";
    }





    function getAmountNFT(address _receiver) public view returns(uint){
        return NFTAmount[_receiver];
    }




    function getURI(uint _tokenId)public view returns(string memory){
        string memory hashURI = tokenURI[msg.sender][_tokenId];
        return hashURI;
    }
}





