import React, {useState} from "react";
import "./VerificatorJudgement.css"
// @ts-ignore
import Web3 from "web3";
// @ts-ignore
import TrashTag from "../build/contracts/TrashtagDAPP.json";
declare const window: any;

export const VerificatorJudgement = ()=>{
    const [receive, setreceive] = useState<boolean>(false)
    const [imgHash, setImgHash] = useState<string[]>([])
    const [account, setAccount] = useState<string>('')
    const [contract, setContract] = useState<any>()
    const [loading, setLoading] =useState<boolean>(true)


    const componentWillAmount = async ()=>{
        if (loading == true){
            await loadWeb3();
            await loadBlockchaindata()
            setLoading(false)
        }

    }

    const yes = ()=>{
        const post = async ()=>{
            console.log("yes it is a trashtag challenge")
            await contract.methods.verificatorReward(account).send(
                {from:account}
            )
            window.location.reload();

        }
        post()
    }

    const no = ()=>{
        const post = async ()=>{
            console.log("No its not a trashtag")
            await contract.methods.verificatorPenality(account).send(
                {from:account}
            )
            window.location.reload();

        }
        post()
    }

    //API doit envoyer 2 hash d'images, array of two hash

    const Receive = ()=>{
        const get = async ()=>{
            console.log('Waiting for data from api')

        }

        if (imgHash != undefined) {
            return(
                <div>
                    <img src={`https://ipfs.io/ipfs/${imgHash[0]}`} alt="" className="trash-img1"/>
                    <img src={`https://ipfs.io/ipfs/${imgHash[1]}`} alt="" className="trash-img2"/>
                </div>
            )
        }
        else {
            return (<div><h4>Problem with reception</h4></div>)
        }
    }




    /*
    Crypto wallet detection
     */
    const loadWeb3 = async ()=> {

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

    /*
    Get data from the blockchain and recuperate contract abi
     */

    const loadBlockchaindata = async ()=>{
        const web3 = window.web3;

        //Load account
        const accounts = await web3.eth.getAccounts()
        setAccount(accounts[0]);
        console.log(account)
        const networkId = await web3.eth.net.getId()

        // @ts-ignore
        const networkData:any = TrashTag.networks[networkId]

        console.log(networkData)
        if (networkData){
            const abi =TrashTag.abi;
            const Contract =new web3.eth.Contract(abi, networkData.address)
            setContract(Contract)
            console.log(contract)
        }
        else {
            window.alert('Contract is not deployed on a detected network')
        }
    }

    componentWillAmount();





    return(
    <div className="judgement">
        <h3>TrashTag tinder</h3>
        {
            receive== true ? <div><h3>Loading...</h3></div>
                :
                <Receive/>
        }





        <div className="button">
        <button className="btn yes" onClick={yes}>Yes</button>


        <button className="btn no" onClick={no}>No</button>

        </div>
    </div>)

};

export default VerificatorJudgement;