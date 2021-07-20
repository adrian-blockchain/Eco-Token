// @ts-ignore
import React, {useState} from 'react';
// @ts-ignore
import Web3 from "web3";
// @ts-ignore
import {Button} from "@material-ui/core";
import gps_setting from "./components/pictures/gps_setting.png"
import logo from "./components/pictures/trashtag_dapp.png"
import './App.css';
import {GetImage} from './components/GetImage'
import {Navbar } from './components/Navbar';
// @ts-ignore
import TrashTag from '../src/build/contracts/TrashtagDAPP.json'
import {ErrorBoundary} from "./components/ErrorBoundary";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import YourTrashTag from "./components/YourTrashTag";
import Verificators from "./components/Verificators";

declare const window: any;
function App() {
  let  [set, setSet] = useState<boolean>(true);
  const [account, setAccount] = useState<string>('')
  const [contract, setContract] = useState<any>()
  const [hide, setHide] = useState<boolean>(false)

/*
Lauch
 */
  const componentWillAmount = async ()=>{
    if (set == true){
      await loadWeb3();
      await loadBlockchaindata()
      setSet(false)

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

  const hideAware =()=>{
    setHide(true);
  }




  return (

    <div className="App">
      <Navbar account={account} />

      <img src={logo} className='logo'/>

      {hide == true ?
          <div>
              <GetImage account={account} contract={contract}/>
          </div>  :
          <div className="container-picture">
            <p>Be aware to active GPS localisation on your pictures</p>
            <img src={gps_setting}/>
            <div className="Button">
            <Button variant="contained" color="default" onClick={hideAware}>OK</Button>
            </div>
          </div>
      }

    </div>





  );
};

export default App;
