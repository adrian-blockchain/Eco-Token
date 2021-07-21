pragma solidity ^0.8.0;

// SPDX-License-Identifier: MIT


import "./Jobcoin.sol";
import "./Trashtag.sol";



contract TrashtagDAPP is Jobcoin, Trashtag {

    //Function for testnet
    function GetForTest()public{
        Jobcoin.getTest(msg.sender);
    }

    function becomeVerificator() public{
        Jobcoin.becomeVerificator(msg.sender);
    }

    function withdraw() public{
        Jobcoin.withdrawStake();
    }


    function TrashtagWarriorReward(string calldata _uri, address _to)public{
        Trashtag.rewardTrashtagWarrior(_uri, _to);
        Jobcoin.rewardCoinTrashtagWarrior(_to);

    }

    function RewardVerificator(address _to)public onlyOwner{
        Jobcoin.verificatorReward(_to);

    }

    function PenalityVerificator(address _to)public onlyOwner{
        Jobcoin.verificatorPenality(_to);
    }



}