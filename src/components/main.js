import { useEffect, useState } from 'react';
import './main.css';
import axios from 'axios';

const Main = ({userInfo , updateUserInfo}) => {

    const [loading, setLoading] = useState(true);
    
    if(userInfo.address === ""){
        console.log("in if block")
        return (
            <div className='main-main'>
                Mainnnnnn
            </div>
        )
    } 


  // when data is available, title is shown
  return (
    <div className='main-main'>
        Mainnnnnn
    </div>
  );
}

export default Main;