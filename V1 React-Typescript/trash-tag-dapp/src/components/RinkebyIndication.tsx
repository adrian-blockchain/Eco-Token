import React from "react";
import Rinkeby from "./pictures/rinkeby.png";
import  "./RinkebyIndication.css";

export const RinkebyIndication = ()=>{

    return(<div className="container">
            <br/>
        <h3>You need to select the RINKEBY testnet on your metamask interface</h3>

    <img src={Rinkeby}/>
    <h5>Because smart contracts are immutables, we deploy it on a testnet for now</h5>
    <br/>
            <h3>To use the DAPP you need some ethers to paid gas fees </h3>
            <h5>To get easily some testnet eth you can go on this website</h5>
            <h4><a href="https://faucet.rinkeby.io/" target="_blank">faucet.rinkeby.io</a></h4>
            <h5>If you want to know more about gas fees : <a href="https://ethereumprice.org/gas/" target="_blank">ethereumprice.org</a> </h5>

        </div>
)
};

export default RinkebyIndication;