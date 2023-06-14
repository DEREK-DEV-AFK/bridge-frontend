import { useEffect, useState } from 'react';
import axios from 'axios';
import './sub-header.css';

const Subheader = ({userInfo , updateUserInfo}) => {

    const [loading, setLoading] = useState(false);

    const getBalanceSeploia = async (account) => {
        return axios.get(`http://localhost:5000/sepolia/balance?userAddress=${account}`)
        .then((response) => {
            console.log('2. server response:', response.data);
            return response.data;
        });
    }

    const getBalanceMumbai = async (account) => {
      return axios.get(`http://localhost:5000/mumbai/balance?userAddress=${account}`)
      .then((response) => {
          console.log('2. server response:', response.data);
          return response.data;
      })
    };

      useEffect(() => {
        const fetchBalance = async () => {
          if (userInfo.address !== "" ) {
            try {
                setLoading(true);  
              const response = await getBalanceSeploia(userInfo.address);
              const response2 = await getBalanceMumbai(userInfo.address);
              console.log("resp ",response);
              console.log("resp2 ",response2);
              if (response.msg === false || response2.msg === false) {
                console.log("API error get balance");
              } 
              updateUserInfo(prevState => ({
                ...prevState,
                TokenEthBalance: response.msg ? response.result : 0,
                TokenPolyBalance: response2.msg ? response2.result : 0,
              }))
              setLoading(false);
            } catch (error) {
              console.log(error);
            }
          }
        };
    
        fetchBalance();
      }, [userInfo.address]);  

    if(loading){
        return(
            <div className='subheader-main'>
              <div className='left'>
                Loading.... <b>TokenETH</b>
              </div>
              <div className='right'>
                Loading.... <b>TokenPOLY</b>
              </div>
                
            </div>
        )
    }  

    return (
        <div className='subheader-main'>
            <div className='left'>
                {userInfo.TokenEthBalance ? userInfo.TokenEthBalance : 0} <b>TokenETH</b>
            </div>
            <div className='right'>
                {userInfo.TokenPolyBalance ? userInfo.TokenPolyBalance : 0} <b>TokenPOLY</b>
            </div>
        </div>
    )
}

export default Subheader;