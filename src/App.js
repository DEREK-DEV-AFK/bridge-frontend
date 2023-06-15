import './App.css';
import Footer from './components/footer';
import Header from './components/header';
import Main from './components/main';
import Subheader from './components/sub-header';

import { useState, useEffect } from 'react';


function App() {
  const [userInfo, setUserInfo] = useState({
    address: "",
    TokenEthBalance: "",
    TokenPolyBalance: ""
  });

  useEffect(() => {
    if(window.ethereum) {
      // window.ethereum.on('chainChanged', () => {
      //   window.location.reload();
      // })
      window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      })
    }
  })

  return (
    <div className="App">
      <Header Address={userInfo.address} updateAddress={setUserInfo}/>
      <Subheader userInfo={userInfo} updateUserInfo={setUserInfo}/>
      <Main userInfo={userInfo} updateUserInfo={setUserInfo}/>
      <Footer/>
    </div>
  );
}

export default App;
