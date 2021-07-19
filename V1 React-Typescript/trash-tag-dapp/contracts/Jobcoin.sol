pragma solidity ^0.8.0;

// SPDX-License-Identifier: MIT


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
/**
 * @dev Wrappers over Solidity's arithmetic operations.
 *
 * NOTE: `SignedSafeMath` is no longer needed starting with Solidity 0.8. The compiler
 * now has built in overflow checking.
 */
import "@openzeppelin/contracts/access/Ownable.sol";






contract Jobcoin is ERC20, Ownable{

    //inspired by https://github.com/HQ20/StakingToken

    using SafeMath for uint;



    uint256 internal amountReward;
    uint256 internal rewardVerificator;
    uint256 internal verifStake;


    address[] internal verificators;
    mapping(address=> uint256) internal stakes;
    mapping(address=> uint256) internal rewards;
    mapping(address=> uint256) internal penalities;



    constructor() ERC20("JobCoin", "JBC")Ownable() {
        _mint(msg.sender, 250000000);
        setAmountReward(100);
        setAmountVerifReward(10);
        setAmountVerifStake(1000);
    }







    /*
  *         TrashTag warriors rewards
  */

    function rewardCoinTrashtagWarrior(address _to) public onlyOwner {
        _mint(_to, amountReward);
    }




    function setAmountReward(uint _newAmount)public onlyOwner{
        amountReward = _newAmount;
    }

    function getAmountReward()public view returns(uint){
        return amountReward;
    }



    /*
   *         Verificators rewards
   */


    function setAmountVerifReward(uint _newAmount)public onlyOwner{
        rewardVerificator = _newAmount;
    }

    function getAmountVerifReward()public view returns(uint){
        return rewardVerificator;
    }


    /*
    *         Verificators inital stake
    */


    function setAmountVerifStake(uint _newAmount)public onlyOwner{
        verifStake = _newAmount;
    }


    function getAmountVerifStake()public view returns(uint){
        return verifStake;
    }



    /*
    * @notice A method to check if an address is a verificator.
    * @param _address The address to verify.
    * @return bool, uint256 Whether the address is a verificator,
    * and if so its position in the verificator array.
    */

    function isVerificator(address _address)public view returns(bool res, uint s){

        for(s=0; s< verificators.length; s+=1){
            if(_address == verificators[s]) return(true, s);
        }
        return(false, 0);
    }

    /**
    * @notice A method to add a verificator.
    * @param _verificator The verificator to add.
    */
    function addVerificator(address _verificator)
    internal
    {
        (bool _isVerificator, ) = isVerificator(_verificator);
        if(!_isVerificator) verificators.push(_verificator);
    }

    /**
     * @notice A method to remove a verificator.
     * @param _verificator The verificator to remove.
     */
    function removeVerificator(address _verificator)
    public
    {
        (bool _isVerificator, uint s) = isVerificator(_verificator);
        if(_isVerificator){
            verificators[s] = verificators[verificators.length - 1];
            verificators.pop();
        }
    }

    /**
    * @notice A method to retrieve the stake for a verificator.
    * @param _verificator The verificator to retrieve the stake for.
    * @return uint256 The amount of JobCoin staked.
    */
    function stakeOf(address _verificator)
    public
    view
    returns(uint)
    {
        uint reward = rewards[_verificator];
        uint penality = penalities[_verificator];
        return stakes[_verificator].add(reward).sub(penality);
    }


    /**
     * @notice A method to the aggregated stakes from all stakeholders.
     * @return uint256 The aggregated stakes from all stakeholders.
     */
    function totalStakes()
    public
    view
    returns(uint)
    {
        uint _totalStakes = 0;
        for (uint s = 0; s < verificators.length; s += 1){
            _totalStakes = _totalStakes.add(stakes[verificators[s]]);
        }
        return _totalStakes;
    }

    /*
    * @notice A method for a verificator to create a stake.
    * @param _stake The size of the stake to be created.
    */


    function becomeVerificator()
    public
    {
        _burn(msg.sender,verifStake); //will revert if the user tries to stake more tokens than he owns
        if(stakes[msg.sender] == 0) addVerificator(msg.sender);
        stakes[msg.sender] = stakes[msg.sender].add(verifStake);
    }




    function verificatorReward(address _verificator)public onlyOwner {
        (bool _isVerificator,) = isVerificator(_verificator);
        if(_isVerificator){
            rewards[_verificator]= rewards[_verificator].add(rewardVerificator);
        }
    }

    function verificatorPenality(address _verificator)public onlyOwner {
        (bool _isVerificator, ) = isVerificator(_verificator);
        if(_isVerificator){
            penalities[_verificator]= penalities[_verificator].add(rewardVerificator.mul(2));
        }
    }



    function viewStakeVerificator()public view returns(uint){
        uint reward = rewards[msg.sender];
        uint penality = penalities[msg.sender];

        return stakes[msg.sender].add(reward).sub(penality);

    }

    function withdrawStake()public{
        uint actualStake = stakeOf(msg.sender);
        rewards[msg.sender] = 0;
        penalities[msg.sender] = 0;
        stakes[msg.sender] = 0;
        _mint(msg.sender, actualStake);
    }

}









