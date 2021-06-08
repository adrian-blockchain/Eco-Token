pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

import "./Strings.sol";


contract TrashTag is ERC1155{

    using Strings for string;

    address private admin;
    uint private amountReward;


    mapping(address => mapping(uint256 => string)) tokenURI;
    mapping(address => User) users;

    string constant private baseMetadataURI = "https://ipfs.io/ipfs/";

    struct User{
        uint NFTAmount;
        bool approved;
    }



    constructor() public ERC1155(""){
        admin = msg.sender;
        setAmountReward(100);
    }


    // Only the contract owner can execute
    modifier governance(){
        require(msg.sender == admin);
        _;
    }


    //Chekc if the msg.sender is approved to earn rewards
    modifier Approved(address _to){
        require(users[_to].approved == true);
        _;
    }


    //Only governance is able to approved a receiver
    function Approve(address _to)public governance {
        users[_to].approved = true;
    }

    function Mint(string calldata _uri, address _to)public Approved(_to){

        //id 0 is for the coin, so NFT's id start at 1
        users[_to].NFTAmount ++;

        //Id's of toeken is determined by the amount store in struct
        uint id = users[_to].NFTAmount;

        tokenURI[_to][id] = _uri;

        _mint(_to, id, 1, ""); //NFT
        _mint(_to, 0, amountReward, ""); //Crypto


        //Next token need to be approved again
        users[_to].approved = false;
    }

    function MintForTest(string calldata _uri, address _to)public{

        //id 0 is for the coin, so NFT's id start at 1
        users[_to].NFTAmount ++;

        //Id's of toeken is determined by the amount store in struct
        uint id = users[_to].NFTAmount;

        tokenURI[_to][id] = _uri;

        _mint(_to, id, 1, ""); //NFT
        _mint(_to, 0, amountReward, ""); //Crypto


        //Next token need to be approved again
        //users[_to].approved = false;
    }




    function setAmountReward(uint _newAmount)private governance{
        amountReward = _newAmount;
    }






    function SendToken(address _to,uint _id) public{
        require(users[msg.sender].NFTAmount >0, "You did not clean the world yet");

        setApprovalForAll(_to, true);
        safeTransferFrom(msg.sender, _to, _id, 1, "");

        setApprovalForAll(_to, false);

        string memory uri =tokenURI[msg.sender][_id];

        uint newId = users[_to].NFTAmount++;

        tokenURI[_to][newId]= uri;

        tokenURI[msg.sender][_id] = "not yours anymore";
    }

    function sendCoin(address _to,uint amount) public{
        require(balanceOf(msg.sender,0)<= amount);

        uint id = users[_to].NFTAmount++;

        setApprovalForAll(_to, true);

        safeTransferFrom(msg.sender, _to, id, 1, "");

        setApprovalForAll(_to, false);

        string memory uri =tokenURI[msg.sender][id];


        tokenURI[_to][id]= uri;

        tokenURI[msg.sender][id-1] = "not yours anymore";
    }



    function getBalanceCoin(address _receiver) public view returns(uint){
        return balanceOf(_receiver, 0);
    }

    function getAmountNFT(address _receiver) public view returns(uint){

        /*To get nft's ID via typescript

        var ids:number[] = new Array(NFTAmount)
        while (i=1,i<=NFTAmount, i++ ){
            ids[i]=i
        }
        */


        return users[_receiver].NFTAmount;
    }


    function getURI(uint _tokenId)public view returns(string memory){
        string memory hashURI = tokenURI[msg.sender][_tokenId];
        return Strings.strConcat(
            baseMetadataURI,
            hashURI
        );
    }

    function getAdmin()public view returns(address){
        return admin;
    }
}



