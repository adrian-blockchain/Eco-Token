import React, {useState} from 'react';
import Web3 from "web3";
import logo from './logo.svg';
import './App.css';
import {GetImage} from './components/GetImage'
import {Navbar } from './components/Navbar';
import TrashTag from "./build/contracts/TrashTag.json";

declare const window: any;
function App() {
  const [account, setAccount] = useState('')

  const componentWillAmount = async ()=>{
    await loadWeb3();
    await loadBlockchaindata();
  }


  const loadWeb3 = async ()=> {
    if (window.ethereum) {
      console.log("ethereum")
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if (window.web3) {
      console.log("Web 3")

      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert('No blockchain wallet detected, download metamask')
    }
  }
    const loadBlockchaindata = async ()=>{
      const web3 = window.web3;

      //Load account
      const accounts = await web3.eth.getAccounts()
      setAccount(accounts[0]);
      console.log(account)

      const abi =TrashTag.abi;
      const contract =new web3.eth.Contract(abi)

    }
    componentWillAmount();




  return (
    <div className="App">
      <Navbar account={account} />
    <br/>
      <h1>Trash-Tag Dapp</h1>
<br/>
        <GetImage />
    </div>
  );
}

export default App;
