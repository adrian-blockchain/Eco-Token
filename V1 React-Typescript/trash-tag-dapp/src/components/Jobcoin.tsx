import React, {useState} from "react";
// @ts-ignore
import Web3 from "web3";
// @ts-ignore
import TrashTag from "../build/contracts/TrashtagDAPP.json";
import JobCoin from  "./pictures/JOBCOIN.png";


declare const window: any;



export const Jobcoin =()=>{
    const [account, setAccount] = useState<string>('')
    const [contract, setContract] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true)
    const [supply, setSupply] = useState<number>()
    const [balance, setBalance] = useState<number>()
    const [wait, setWait] = useState<boolean>(true)

    const componentWillAmount = async () => {
        if (loading == true) {
            await loadWeb3();
            await loadBlockchaindata();
            setLoading(false)
            if (contract != undefined){
                await getSupply()
                await getBalance()
            }

        }
    }



    const getBalance = ()=>{
        const load = async ()=>{
            let bal = await contract.methods.balanceOf(account).call(
                {from: account}
            )
            const bala:number = Number(bal);
            setBalance(bala);

        }
        load();

    }

    const getJBC =()=>{
        const load = async ()=> {
            await contract.methods.GetForTest().send({from: account})
            setWait(false);
        }
        load()

    }

    const Reload = ()=>{
        window.location.reload();
        return (
            <div>
                <h3>Reload the page to see changement</h3>
            </div>
    )
    }

    const getSupply =async () =>{
        let sup = await contract.methods.totalSupply().call(
            {from:account}
        )
        const supp:number = Number(sup);
        setSupply(supp);
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





    return(
        <div className="container">
            <div className="address">{account}</div>
            <img className="logo" src={JobCoin}/>

            <h4>Supply of jobcoin: {supply}</h4>
            <br/>
            <h4>Your balance of :{balance} </h4>
            <br/>
            {wait== true ?
                <button className="btn" onClick={getJBC}>Get JBC for test</button>
                :
                <Reload/>
            }
        </div>
    )
};

export default Jobcoin;