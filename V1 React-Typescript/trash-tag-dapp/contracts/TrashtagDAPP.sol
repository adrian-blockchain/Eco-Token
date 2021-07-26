pragma solidity ^0.8.0;

// SPDX-License-Identifier: MIT


import "./Trashtag.sol";



contract TrashtagDAPP is  Trashtag {

    using SafeMath for uint;



    uint nbOfTrashtagValidated;

    address[] WaitingList;
    string[] WaintingURI;


    mapping(address =>uint) TrashtagValidatedByVerificator;
    mapping(address =>uint) TrashtagDoneByTTW;
    mapping(address=>mapping(uint => int)) Judgment;



    modifier IsVerificator (){
        (bool isHe,) = Jobcoin.isVerificator(msg.sender);
        require(isHe == true, "You are not Verificator");
        _;
    }






    /*
    * Create an Trashtag token and reward 100 JBC without verification
    * Test function to test YourTrahstags without waiting.
    *Testnet only
    */
    function NFTCreationForTest(string memory _uri, address _to)public{
        Trashtag.rewardTrashtagWarrior(_uri, _to);
        Jobcoin.rewardCoinTrashtagWarrior(_to);

    }


    /*
    * Create an NFT of the trashtag challenge and send it to the Trashtag warrior
    * Reward the Trashtag warrior with 100 Jobcoin
    */
    function TrashtagTagTokenCreation(string memory _uri, address _to)internal{
        Trashtag.rewardTrashtagWarrior(_uri, _to);
        Jobcoin.rewardCoinTrashtagWarrior(_to);
    }


    /*
 * Store metadata's uri
 */
    function NeedToBeValidate(string calldata _uri) public{
        WaitingList.push(msg.sender);
        WaintingURI.push(_uri);
    }


    /*
    * Take the first address on the wait list and return metadatas IPFS address of the potential trahstag challenge.
    * And trahstag warrior adaddress
    */
    function WaitingTobeValidate() public view IsVerificator() returns(string memory) {
        uint alreadyValidated = TrashtagValidatedByVerificator[msg.sender];
        uint _waitingNb = WaitingList.length;
        if(alreadyValidated < _waitingNb){
            //Cannot return _uri + _TTWarrior because solidity do not manage
            return WaintingURI[alreadyValidated];
        }
        else{
            //No more trashtag waiting
            return "0";
        }
    }


    /*
    *return the last trashtag warrior address register ont the waitingList
    */

    function getWaitingList() public view IsVerificator() returns(address){
        uint alreadyValidated = TrashtagValidatedByVerificator[msg.sender];
        uint _waitingNb = WaitingList.length;

        if(alreadyValidated < _waitingNb){
            address _TTWarrior = WaitingList[alreadyValidated];
            return _TTWarrior;
        }
        else{
            //No more trashtag waiting
            return address(0);
        }

    }



    function Verify(bool _judgment) public IsVerificator() returns(bool){

        uint _TTValidated = TrashtagValidatedByVerificator[msg.sender];

        if(_TTValidated < WaitingList.length){

            address _TTWarrior = WaitingList[_TTValidated];
            TrashtagValidatedByVerificator[msg.sender]++;
            uint amountNFT = Trashtag.getAmountNFT(_TTWarrior);
            amountNFT ++;

            //If positive judgement
            if(_judgment){


                Judgment[_TTWarrior][amountNFT] ++;

                int judgement = Judgment[_TTWarrior][amountNFT];

                if(judgement == 5){

                    string memory _uri = WaintingURI[_TTValidated];
                    TrashtagTagTokenCreation(_uri, _TTWarrior);
                    Jobcoin.verificatorReward(msg.sender);
                }

                if(judgement == 8|| judgement == 14) {
                    Jobcoin.verificatorReward(msg.sender);
                }

                else if(judgement<-10) {
                    Jobcoin.verificatorPenality(msg.sender);
                }
            }

            if(!_judgment){


                Judgment[_TTWarrior][amountNFT] --;
                int judgement = Judgment[_TTWarrior][amountNFT];

                if(judgement >5){
                    Jobcoin.verificatorPenality(msg.sender);
                }
                else if(judgement <20){
                    Jobcoin.verificatorReward(msg.sender);
                }

            }
            return true;
        }
        else{
            //No more trashtag to validate
            return false;
        }
    }





}