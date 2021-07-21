import React, {useState} from "react";
// @ts-ignore
import Web3 from "web3";
// @ts-ignore
import TrashTag from "../build/contracts/TrashtagDAPP.json";

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

    const Destack = ()=>{

        const withdraw = ()=>{
            const load = async ()=>{
                await contract.methods.withdrawStake().send(
                    {from:account}
                )
                setWait1(false)

            }
            load();
        }

        return <div>
            <button onClick={withdraw}>Withdraw your stake</button>
        </div>
    }
    const Reload = ()=>{
        return (
            <div>
                <h3>Reload the page to see changement</h3>
            </div>
        )
    }

    const IsVerificator = async ()=>{
        let res=await contract.methods.isVerificator().call(
            {from: account}
        )

        let bool:boolean = res[0];

        if (bool ==false){
            await setIsVerificator(false)
        }else if (bool==true){
            await setIsVerificator(true)
        }
    }


    const Stake = ()=>{

        /*
        Receive the amount stake from the blockchain abi
         */
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

    //tHIS ACTIOP

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
        <h3>Verificators section</h3>
        {contract == undefined? <div><h2>Loading...</h2></div>
            :
            <div>
                {isVerificator == true ?
                    <div>
                        <h2>Tinder ecologique</h2>
                        <Stake/>


                        {wait1== true ?
                            <Destack/>
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
                                        <button onClick={BecomeVerificator}>Become verificator</button>
                                    </div>
                                        :
                                    <Reload/>
                                }

                            </div>

                            :
                            <div>
                                <h2>You need to go get JOBCOIN </h2>
                                <br/>
                                <h3> It's a test version, you can go get JBC in the Jobcoin section</h3>
                            </div>

                        }
                    </div>
                }
            </div>
        }
    </div>
    )
}

export default Verificators;