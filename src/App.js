import './App.css';
import Footer from './components/footer';
import Header from './components/header';
import Main from './components/main';

import { useState } from 'react';


function App() {
  const [userInfo, setUserInfo] = useState({
    address: "",
    TokenEthBalance: "",
    TokenPolyBalance: ""
  });

  return (
    <div className="App">
      <Header Address={userInfo.address} updateAddress={setUserInfo}/>
      <Main userInfo={userInfo} updateUserInfo={setUserInfo}/>
      <Footer/>
    </div>
  );
}

export default App;
