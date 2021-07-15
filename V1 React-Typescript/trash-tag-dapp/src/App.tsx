// @ts-ignore
import React, {useState} from 'react';
import Web3 from "web3";
import logo from './logo.svg';
import './App.css';
import {GetImage} from './components/GetImage'
import {Navbar } from './components/Navbar';
// @ts-ignore
import TrashTag from '../src/build/contracts/TrashTag.json'
import {ErrorBoundary} from "./components/ErrorBoundary";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import YourTrashTag from "./components/YourTrashTag";
import Verificators from "./components/Verificators";

declare const window: any;
function App() {
  let  [set, setSet] = useState<boolean>(true);
  const [account, setAccount] = useState<string>('')
  const [contract, setContract] = useState<any>()
  const [amountCoin, setAmountCoin] = useState<number>(0)



  const componentWillAmount = async ()=>{
    if (set == true){
      await loadWeb3();
      await loadBlockchaindata()
      setSet(false)

    }

  }


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




  return (

    <div className="App">
      <Navbar account={account} />
      <br/>
      <h1>Trash-Tag Dapp</h1>

      <br/>

      <ErrorBoundary>
      <GetImage account={account} contract={contract}/>
      </ErrorBoundary>

    </div>

  );
}

export default App;
