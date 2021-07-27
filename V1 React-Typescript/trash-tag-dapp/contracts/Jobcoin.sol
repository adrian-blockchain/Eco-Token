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




    constructor() ERC20("JobCoin", "JBC")Ownable() {
        _mint(msg.sender, 0);
        amountReward = 100;
        rewardVerificator = 10;
        verifStake = 1000;
    }

    /*
    * To get jobcoin to test the dapp, only testnet function
    *Get 1000 JBC to test the Verificator section
    */
    function GetForTest() public{
        _mint(msg.sender, 1000);
    }


    /*
  *         TrashTag warriors rewards
  */

    function rewardCoinTrashtagWarrior(address _to) internal {
        _mint(_to, amountReward);
    }


    /*
    Contract exceed 24KB, need to do saving

    function setAmountReward(uint _newAmount)public onlyOwner{
        amountReward = _newAmount;
    }
    */


    function getAmountReward()public view returns(uint){
        return amountReward;
    }



    /*
   *         Verificators rewards
   */

    /*
    Contract exceed 24KB, need to do saving

    function setAmountVerifReward(uint _newAmount)public onlyOwner{
        rewardVerificator = _newAmount;
    }
    */


    function getAmountVerifReward()public view returns(uint){
        return rewardVerificator;
    }


    /*
    *         Verificators inital stake
    */

    /*
    Contract exceed 24KB, need to do saving

    function setAmountVerifStake(uint _newAmount)public onlyOwner{
        verifStake = _newAmount;
    }
    */


    function getAmountVerifStake()public view returns(uint){
        return verifStake;
    }



    /*
    * @notice A method to check if an address is a verificator.
    * @param _address The address to verify.
    * @return bool, uint256 Whether the address is a verificator,
    * and if so its position in the verificator array.
    */
    function isVerificator()public view returns(bool res, uint s){

        for(s=0; s< verificators.length; s+=1){
            if(msg.sender == verificators[s]) return(true, s);
        }
        return(false, 0);
    }

    /**
    * @notice A method to add the msg.sender.
    *
    */
    function addVerificator(address _to)
    internal
    {
        (bool _isVerificator, ) = isVerificator();
        if(!_isVerificator) verificators.push(_to);
    }

    /*
     * @notice A method to remove a msg.sender from verificator.
     * @param  The verificator to remove.
     */
    function removeVerificator()
    internal
    {
        (bool _isVerificator, uint s) = isVerificator();
        if(_isVerificator){
            verificators[s] = verificators[verificators.length - 1];
            verificators.pop();
        }
    }

    /*
    * @notice A method to retrieve the stake for a verificator.
    * @param msg.sender The verificator to retrieve the stake for.
    * @return uint256 The amount of JobCoin staked.
    */
    function stakeOf()
    public
    view
    returns(uint)
    {
        (bool _isVerificator,)= isVerificator();
        require(_isVerificator == true, "You are not verificator, so you don't have stake.");
        return stakes[msg.sender];
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
    * User become Verificator
    * He stakes 1000 virtual Jobcoin on the contract
    * He are now able to judge trashtags done by Trashtag Warriors
    */
    function becomeVerificator()
    public
    {
        (bool _isVerificator,) = isVerificator();
        require(!_isVerificator, "You are already verificator");
        _burn(msg.sender ,verifStake); //will revert if the user tries to stake more tokens than he owns
        if(stakes[msg.sender] == 0) addVerificator(msg.sender);
        stakes[msg.sender] = stakes[msg.sender].add(verifStake);
    }




    //Create 10 Jobcoin on Verficators stake
    function verificatorReward(address _verificator)internal  {
        (bool _isVerificator,) = isVerificator();
        if(_isVerificator){
            stakes[_verificator]= stakes[_verificator].add(rewardVerificator);
        }
    }

    //Destruct 20 Jobcoin on Verficators stake
    function verificatorPenality(address _verificator) internal {
        (bool _isVerificator, ) = isVerificator();
        if(_isVerificator){
            if(stakes[_verificator]>=0){
                stakes[_verificator]= stakes[_verificator].sub(rewardVerificator.mul(2));
            }
        }
    }


    /*
    * User is not able to judge Trashtag challenges anymore
    * His Jobcoin stake is send to his CryptoWallet
    */
    function withdrawStake()public{
        (bool _isVerificator,) = isVerificator();
        require(_isVerificator == true, "You are not a verificator, so you can't withdraw any stake");
        uint actualStake = stakeOf();
        removeVerificator();
        stakes[msg.sender] = 0;
        _mint(msg.sender, actualStake);
    }




}
