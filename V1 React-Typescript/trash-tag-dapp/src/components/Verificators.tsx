import React, {useState} from "react";
// @ts-ignore
import Web3 from "web3";

// @ts-ignore
import TrashTag from "../build/contracts/TrashtagDAPP.json";
import VerificatorJudgement from "./VerificatorJudgement";

import "./Verificator.css";
declare const window: any;

export const Verificators = ()=>{
    let [loading, setLoading] = useState<boolean>(true);
    const [account, setAccount] = useState<string>('')
    const [contract, setContract] = useState<any>()
    const [isVerificator, setIsVerificator] = useState<boolean>(false);
    const [balanceOf, setBalanceOf] = useState<number>(0);
    const [stake, setStake] = useState<number>(0);
    const [wait, setWait] = useState<boolean>(true)
    const [wait1, setWait1] = useState<boolean>(true)


    const componentWillAmount = async () => {
        if (loading == true) {
            await loadWeb3();
            await loadBlockchaindata();
            setLoading(false)
        }
        if (contract != undefined) {
            await amountJobcoin();
            await IsVerificator();
            console.log(isVerificator)

        }
    }

    const Withdraw = ()=>{

        const withdraw = ()=>{
            const load = async ()=>{
                await contract.methods.withdrawStake().send(
                    {from:account}
                )
                let ans = await contract.methods.isVerificator(account).call(
                    {from: account}
                )
                console.log(ans)
                setWait1(false)

            }
            load();
        }

        return <div>
            <button className="btn" onClick={withdraw}>Withdraw your stake</button>
        </div>
    }
    const Reload = ()=>{
        window.location.reload();

        return (
            <div>
                <h3>Reload the page to see changement</h3>
            </div>
        )
    }



    const IsVerificator = async ()=> {
        let ans = await contract.methods.isVerificator(account).call(
            {from: account}
        )
        console.log(ans)


        if (ans != null) {
            let bool: boolean = ans[0];

            //console.log(bool)

            if (bool == false) {
                await setIsVerificator(false)
            } else if (bool == true) {
                await setIsVerificator(true)
            }
        }else {
            console.log(ans)

        }
    }

    /*
            Receive the amount stake from the blockchain abi
             */
    const Stake = ()=>{
        const load= async ()=>{
            const value:number = await contract.methods.viewStakeVerificator().call(
                {from:account}
            )
            setStake(value)
        }
        load()
        if (stake ==0){
            return(
            <div><h3>Loading...</h3></div>
            )
        }
        if (stake != undefined) {
            return (

                <div className="stake">
                    <h4>Your stake: {stake} JBC</h4>

                </div>
            )
        }else{
            return (
                <div><h3>Problem</h3></div>
            )
        }
    }

    //Become verificator will stake 1000 Jobcoins on the verificator section

    const BecomeVerificator =()=> {
        const start = async ()=>{
            await contract.methods.becomeVerificator().send(
                {from:account}
            )
            setWait(false)
        }
        start();
    }

    const amountJobcoin= async ()=> {
            const balance:number = await contract.methods.balanceOf(account).call(
                {from:account})
            setBalanceOf(balance);
    }






    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            console.log(window.web3)
            await window.ethereum.enable()

        } else if (window.web3) {
            console.log("Web 3")
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            window.alert('No blockchain wallet detected, download metamask')
        }
    }


    const loadBlockchaindata = async () => {
        const web3 = window.web3;


        //Load account
        const accounts = await web3.eth.getAccounts()
        setAccount(accounts[0]);
        console.log(account)
        const networkId = await web3.eth.net.getId()

        // @ts-ignore
        const networkData: any = TrashTag.networks[networkId]

        console.log(networkData)
        if (networkData) {

            const abi = TrashTag.abi;
            const Contract = await new web3.eth.Contract(abi, networkData.address)
            setContract(Contract)
            console.log(Contract)
        } else {
            window.alert('Contract is not deployed on a detected network')
        }
    }
    componentWillAmount();
    //
    return(
        <div className="container" >
            <div className="address">{account}</div>
            <div className="balance">
            <h4>{balanceOf} JBC </h4>
            </div>

            <h2>Verificators section</h2>
        {contract == undefined? <div><h2>Loading...</h2></div>
            :
            <div>
                {isVerificator == true ?
                    <div>

                        <Stake/>
                        <VerificatorJudgement/>


                        {wait1== true ?
                            <Withdraw/>
                            :
                            <Reload/>
                        }


                    </div>
                    :

                    <div>
                        {balanceOf >=1000 ?
                            <div>
                                {wait== true ?
                                    <div className="container-becomeVerificator">
                                        <h3>Human verification</h3>
                                        <p>The purpose of verificators is to judge if an Trashtag challenge is valid or not</p>
                                        <button className="btn" onClick={BecomeVerificator}>Become verificator</button>
                                    </div>
                                        :
                                    <Reload/>
                                }

                            </div>

                            :
                            <div>
                                <h2>You need to go get JOBCOIN </h2>
                                <br/>
                                <h3> It's a test version, you can go get JBC for free in the Jobcoin section</h3>
                            </div>

                        }
                    </div>
                }
            </div>
        }
    </div>
    )
};

export default Verificators;