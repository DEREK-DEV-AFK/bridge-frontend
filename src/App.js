import './App.css';
import Footer from './components/footer';
import Header from './components/header';
import Main from './components/main';

import { useState } from 'react';


function App() {
  const [address, setAddress] = useState("");

  return (
    <div className="App">
      <Header Address={address} updateAddress={setAddress}/>
      <Main address={address}/>
      <Footer/>
    </div>
  );
}

export default App;
