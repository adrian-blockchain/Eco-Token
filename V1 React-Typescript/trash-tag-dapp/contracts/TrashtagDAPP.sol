pragma solidity ^0.8.0;

// SPDX-License-Identifier: MIT


import "./Jobcoin.sol";
import "./Trashtag.sol";



contract TrashtagDAPP is Jobcoin, Trashtag {





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