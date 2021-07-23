pragma solidity ^0.8.0;

// SPDX-License-Identifier: MIT


import "./Jobcoin.sol";
import "./Trashtag.sol";



contract TrashtagDAPP is Jobcoin, Trashtag {

    //Function for testnet
    function GetForTest()public{
        Jobcoin.getTest(msg.sender);
    }

    /*
   * Will burn 1000 Jobcoin from the user crypto wallet, and create a Stake of 1000 JBCStake
*/
    function becomeVerificator() public{
        Jobcoin.becomeVerificator(msg.sender);
    }


    function withdraw() public{
        Jobcoin.withdrawStake();
    }


    //OnlyOwner function for the mainnet
    function TrashtagTokenCreation(string calldata _uri, address _to)public{
        Trashtag.rewardTrashtagWarrior(_uri, _to);
        Jobcoin.rewardCoinTrashtagWarrior(_to);
    }

    //OnlyOwner function for the mainnet
    // Add 10 JBCStake from verificator stake
    function RewardVerificator(address _to)public {
        Jobcoin.verificatorReward(_to);

    }


    //OnlyOwner function for the mainnet
    //Brun 20 JBCStake from verificators stakes
    function PenalityVerificator(address _to)public {
        Jobcoin.verificatorPenality(_to);
    }



}