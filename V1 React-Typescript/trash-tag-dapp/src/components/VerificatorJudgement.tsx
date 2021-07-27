import React, {useState} from "react";
import "./VerificatorJudgement.css"
// @ts-ignore
import Web3 from "web3";
// @ts-ignore
import axios from "axios";
// @ts-ignore
import TrashTag from "../contracts/TrashtagDAPP.json";



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
    const [URI, setURI] = useState<boolean>(true);
    let [cid, setCid] = useState<any>();
    let [TTwarrior, setTTwarrior] = useState<string>()
    let [newURI, setNewURI] = useState<boolean>(true)

    const componentWillAmount = async ()=>{
        if (loading == true){
            await loadWeb3();
            await loadBlockchaindata()
            setLoading(false)
        }
        if(contract != undefined){
            await Receive();
        }

    }

    const yes = ()=>{
        const post = async ()=>{
            await contract.methods.Verify(true).send(
                {from:account}
            )
            window.location.reload();
        }
        post()
    }

    const no = ()=>{
        const post = async ()=>{
            await contract.methods.Verify(false).send(
                {from:account}
            )
            window.location.reload();
        }
        post()
    }

    //API doit envoyer 2 hash d'images, array of two hash

    const Receive = ()=> {
        const get = async () => {
            if (newURI == true) {
                const uri: string = await contract.methods.WaitingTobeValidate().call(
                    {from: account}
                )

                if (uri == "0") {
                    setNewURI(false);
                } else {
                    const cid: any = await axios.get(`https://ipfs.io/ipfs/${uri}`);
                    setCid(cid);
                }


            }
        }

        get();

        if (!URI) {
            return (<div>
                <h3>No more trashtag to Verify</h3>
            </div>)
        }

        if (cid != undefined) {
            return (
                <div>
                    <img src={cid.data[0].ImgHash} className="trash-img1"/>
                    <img src={cid.data[1].ImgHash} className="trash-img2"/>
                </div>
            )
        } else {
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

        {cid != undefined ?
           <div>
               <img src={cid.data[0].ImgHash} className="trash-img1"/>
               <img src={cid.data[1].ImgHash} className="trash-img2"/>
               <div className="button">
                   <button className="btn yes" onClick={yes}>Yes</button>


                   <button className="btn no" onClick={no}>No</button>

               </div>
            </div>
               :
            <div>
               <h3>No more trashtag to verify for the moment : (</h3>
            </div>
        }
    </div>);

};

export default VerificatorJudgement;