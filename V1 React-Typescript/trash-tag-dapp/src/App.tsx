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
import Metamask from "./components/Metamask";
import RinkebyIndication from "./components/RinkebyIndication";
import Binocle from "./components/pictures/binoculars.png"
import Garbage from "./components/pictures/garbage (2).png"
import Localisation from "./components/pictures/localisation.png"
import Com from "./components/pictures/commaunautarian.png"
import Watson from "./components/pictures/watson.png";

declare const window: any;
function App() {
  let  [set, setSet] = useState<boolean>(true);
  const [account, setAccount] = useState<string>('')
  const [contract, setContract] = useState<any>()
  const [hide, setHide] = useState<boolean>(false)
  const [ethBalance, setEthBalance]=useState<number>();
  const [balance, setBalance] = useState<number>()
  const [metamask, setMetamask] = useState<boolean>(false)

/*
Lauch
 */
  const componentWillAmount = async ()=>{
    if (set == true){
      await loadWeb3();
      await loadBlockchaindata()
      setSet(false)
    } if (contract != undefined){
      await getBalance()
    }

  }

  const getBalance = ()=>{
    const load = async ()=>{
      let bal = await contract.methods.balanceOf(account).call(
          {from: account}
      )
      const bala:number = Number(bal);
      setBalance(bala);

    }
    load();
  }

  /*
  Crypto wallet detection
   */
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      setMetamask(true)
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

      const val = await web3.eth.getBalance(accounts[0]);
      const ethBal:number = Number(val);
      console.log(ethBal)
      setEthBalance(ethBal);

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
      {metamask == false ?
          <Metamask/>
              :
          <div>
          {ethBalance ==0 ? <RinkebyIndication/>
              :
          <div>
        <Navbar account={account}/>
        <div className="balance"><h4>{balance} JBC </h4></div>


            <img src={logo} className='logo'/>

      {hide == true ?
        <div>
        <GetImage account={account} contract={contract}/>
        </div>  :
        <div className="notice">
        <div className="rules">
        <h2>Trashtag Warriors rules</h2>

        <ol>
        <li><div className="container-picture">
        <h3>Be aware to active GPS localisation on your pictures</h3>
        <img src={gps_setting}/>
        </div></li>

        <li><h3>You need to take the most evident pictures</h3>
        <p>Mettre 2* meme images de samedi, Natural and BLUR</p>
        </li>

        <li>
        <h3>You need to take two pictures from the exact same position and orientation</h3>
        <img className="person" src={Binocle}/>
        <img className="garbage" src={Garbage}/>
        </li>
        </ol>
        </div>

        <div className="verification">
        <h2>How do we verify TrashTag Challenge ?</h2>
        <ol>
        <li>
        <h3>Metadatas Verification</h3>
        <h5>We compare: GPS Position, Phone orientation and time, beewteen your two pictures</h5>
        <img src={Localisation}/>
        </li>

        <li>
        <h3>Human verification</h3>
        <h5>Verificators will accept or decline your trashtag challenge based on your pictures.</h5>
        <img src={Com}/>
        </li>

        <li>
        <h3>Watson verification</h3>
        <h5>Based on the IBM watson AI, we want to build a model of neural network which could be able to automaticaly detect a trashtag challenge</h5>
        <img src={Watson}/>
        </li>
        </ol>



        </div>



        <div className="Button">
        <Button variant="contained" color="default" onClick={hideAware}>OK</Button>
        </div>



        </div>
      }
          </div>

      }
          </div>
      }
    </div>

  )
};

export default App;
