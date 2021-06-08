import Web3 from "web3";
import TrashTag from "../build/contracts/TrashTag.json"
import React from "react";


const HDWalletProvider = require("@truffle/hdwallet-provider")
const publicKey = '0xC5ADD9cbed123A8C1CB03312f67634F14FA41DA2'
const privateKey = '5435bdd957de889e9906c8706dcd9837b6f94f67ccb91e8169c8f7b2f0bb2cf3';


export const createNFT =async (account:string, contract:any, uri:any) =>{
    let provider = new HDWalletProvider(privateKey, "http://localhost:7545", 0)
    console.log("provider: ",provider)
    console.log("account user: ", account)
    const accountToSend = `"${account}"`
    console.log(accountToSend)
    /*
    await contract.methods.Approve(accountToSend).send(
        {from: provider}
    )

     */
    await contract.methods.MintForTest(uri, account).send(
        {from: account}
    )
}

export default createNFT;