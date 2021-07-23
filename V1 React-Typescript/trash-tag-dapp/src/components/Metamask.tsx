import React from "react";
import Fox from "./pictures/metamask.png"
import Rinkeby from "./pictures/rinkeby.png";

export const Metamask = ()=>{

    return(
        <div><h2>You did not install metamask yet</h2>
            <img src={Fox}/>
            <h5>Metamask is a crypto-wallet which permit to do the connection between you and the blockchain</h5>
            <h5>It's the key to enter in the world of decenetralized application</h5>
            <h5>You can install it here : <a href="https://metamask.io/" target="_blank">Metamask.io</a> </h5>
            <br/>

        </div>
    )

}

export default Metamask;