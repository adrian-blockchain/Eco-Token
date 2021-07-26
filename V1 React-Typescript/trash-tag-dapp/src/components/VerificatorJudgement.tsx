import React, {useState} from "react";
import "./VerificatorJudgement.css"
// @ts-ignore
import Web3 from "web3";
// @ts-ignore
import axios from "axios";
// @ts-ignore
import TrashTag from "../build/contracts/TrashtagDAPP.json";
const HDWalletProvider = require('@truffle/hdwallet-provider');
const info = require("./../config.json")


declare const window: any;

export const VerificatorJudgement = ()=>{
    const [receive, setreceive] = useState<boolean>(false)
    const [metadatas, setMetadatas] = useState<string>()
    const [TTaccount, setTTaccount] = useState<string>();
    let [positive, setPositive] = useState<number>(0);
    let [negative, setNegative] = useState<number>(0);
    const [account, setAccount] = useState<string>('')
    const [contract, setContract] = useState<any>()
    const [loading, setLoading] =useState<boolean>(true)
    const governance = new HDWalletProvider(info.privatekey, "http://localhost:7545")

    const componentWillAmount = async ()=>{
        if (loading == true){
            await loadWeb3();
            await loadBlockchaindata()
            setLoading(false)
        }

    }

    const yes = ()=>{
        const post = async ()=>{

            if (positive = 3){
                console.log("yes it is a trashtag challenge")
                await contract.methods.verificatorReward(account).send(
                    {from:account}
                )

                /*await contract.methods.TrashtagTokenCreation(uri, account).send(
                    {from:governance}
                )
                 */
            }
            window.location.reload();
        }
        post()
    }

    const no = ()=>{
        const post = async ()=>{
            if (positive >10){
                console.log("No its not a trashtag")
                await contract.methods.verificatorPenality(account).send(
                    {from:account}
                )
             //Post negative
            }
            else{
                console.log("negative")
            }
            window.location.reload();

        }
        post()
    }

    //API doit envoyer 2 hash d'images, array of two hash

    const Receive = ()=>{
        const get = async ()=> {
            //const uri: any = await axios.get(``)

            //const res: any = await axios.get(`https://ipfs.io/ipfs/${uri}`)


            console.log('Waiting for data from api')
/*

            if (res != undefined) {
                return(
                    <div>
                        <img  alt="" className="trash-img1"/>
                        <img src={`https://ipfs.io/ipfs/${imgHash2}`} alt="" className="trash-img2"/>
                    </div>
                )

            } else {
                return (<div><h4>Problem with reception</h4></div>)
            }

 */
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
                <div><h3>En attente de l'api</h3></div>
                //<Receive/>
        }





        <div className="button">
        <button className="btn yes" onClick={yes}>Yes</button>


        <button className="btn no" onClick={no}>No</button>

        </div>
    </div>)

};

export default VerificatorJudgement;