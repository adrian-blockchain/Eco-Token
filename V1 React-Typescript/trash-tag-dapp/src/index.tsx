import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import YourTrashTag from './components/YourTrashTag'
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import Verificators from "./components/Verificators";
import './components/Navbar/Navbar.css'
import Jobcoin from "./components/Jobcoin";





// @ts-ignore
ReactDOM.render(
    <Router>
        <div>
            <nav className="NavbarItems">
                <div className="menu-icon" >
                    <i className='fas fa-times'></i>
                </div>
                <ul  className='nav-menu active'>
                    <li><Link to="/" className="nav-links">Participation</Link> </li>
                    <li><Link to="/myTrashtag" className="nav-links">My Trashtags</Link></li>
                    <li><Link to="/verificators" className="nav-links">Verificators</Link></li>
                    <li><Link to="/jobcoin" className="nav-links">Jobcoin</Link></li>
                </ul>
            </nav>

            <main>
                <Route exact path="/" component={App}/>
                <Route path="/mytrashtag" component={YourTrashTag}/>
                <Route path="/verificators" component={Verificators}/>
                <Route path="/jobcoin" component={Jobcoin}/>
            </main>

        </div>
    </Router>




    ,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
