pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

import "./Strings.sol";


contract TrashTag is ERC1155{

    address public admin;
    using Strings for string;
    mapping(uint256 => string) tokenURI;
    mapping (address => uint) tokenApproved;
    mapping (uint => address) IdToOwner;
    uint public idCount =0;
    uint private amountReward;



    constructor() public ERC1155("ipfs://"){
        admin = msg.sender;
        setAmountReward(100);


    }
    //Approved after verififcation

    modifier gouvernance(){
        require(msg.sender == admin);
        _;
    }

    modifier Approved(uint _id){
        require(msg.sender == IdToOwner[_id]);
        _;
    }

    function approve(address _to, string calldata _uri) public gouvernance{
        tokenApproved[_to] = idCount;
        IdToOwner[idCount] = _to;
        mint(_to,idCount, _uri);
        idCount = idCount++;
    }

    function mint(address _to,uint _id, string calldata _uri) private Approved(_id){
        uint id = tokenApproved[msg.sender];
        tokenURI[_id] = _uri;
        _mint(_to, id, 1, ""); //NFT
        _mint(_to, 1, amountReward, ""); //Crypto
    }

    function setAmountReward(uint _newAmount) gouvernance{
        amountReward = _newAmount;
    }


    function getURI(uint256 _tokenId)public view returns(string memory){
        string memory hashURI = tokenURI[_tokenId];
        return Strings.strConcat(uri,hashURI);
    }
}
