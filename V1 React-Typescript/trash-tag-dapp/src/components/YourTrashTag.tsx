// @ts-ignore
import Web3 from "web3";

// @ts-ignore
import TrashTag from "../build/contracts/TrashtagDAPP.json";
// @ts-ignore
import React, {useEffect, useState} from "react";

import Card from "./Card";
import "./YourTrashTag..css";

declare const window: any;






export const YourTrashTag = ()=> {

    // Blockchain States
    const [account, setAccount] = useState<string>('')
    const [contract, setContract] = useState<any>()

    //App states
    let [loading, setLoading] = useState<boolean>(true);
    const [amountNFT, setAmountNFT] = useState<number>(0)
    const [cids, setCid] = useState<string[]>([])


    const ViewNFT = async () => {

        const AmountNFT: number = await contract.methods.getAmountNFT(account).call({from: account})
        setAmountNFT(AmountNFT)
        console.log(AmountNFT)

        let i: number;
        const data:any = []

        console.log("Avant boucle")


        for (i = 1; i <= AmountNFT; i++) {
            //Localisation of the metadatas stored in the NFT
            let cid = await contract.methods.getURI(i).call({from: account})
            data.push(cid)
        }
        console.log(data)
        setCid(data)



    }


    const componentWillAmount = async () => {
        if (loading == true) {
            await loadWeb3();
            await loadBlockchaindata();
            setLoading(false)
            if (contract != undefined){
                await ViewNFT();
            }

        }
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



    return (<div className="container">
        <div className="address">{account}</div>

        {contract == undefined ? <div id="loader" className="text-center mt-5"><p>Loading</p></div>
            :
            <div>

                {amountNFT == 0 ? <div><h2>You did not participate to a trashtag Challenge yet</h2></div>
                    :
                    <div>
                        <br/>
                        <h2>Trashtag Token:{amountNFT}</h2>
                        <ul>
                            {
                                cids.map(item =>(
                                    <Card cid={item}/>
                                ))
                            }
                        </ul>
                    </div>
                }
            </div>
        }
    </div>)
}


export default YourTrashTag;