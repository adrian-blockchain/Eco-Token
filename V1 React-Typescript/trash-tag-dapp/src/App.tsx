import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {GetImage} from './components/GetImage'


function App() {
  return (
    <div className="App">
      <h1>Trash-Tag Dapp</h1>
        <GetImage />
    </div>
  );
}

export default App;
