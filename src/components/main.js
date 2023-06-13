import './main.css';
import axios from 'axios';

const Main = async ({userInfo, updateUserInfo}) => {
    console.log("current address value ", userInfo.address, typeof userInfo.address);

    // const getBalance = (account) => {
    //     updateUserInfo({
    //         TokenEthBalance: "loading"
    //     });
    //     return axios.get(`http://localhost:5000/sepolia/balance?userAddress=${account}`)
    //     .then((response) => {
    //         console.log('2. server response:' + response.data)
    //     });
    // }
    console.log("user info ", userInfo, "user address ", userInfo.address)
    if(userInfo.address === ""){
        console.log("in if block")
        return (
            <div className='main-main'>
                Mainnnnnn
            </div>
        )
    } 

    // else if(userInfo.TokenEthBalance === "loading"){
    //     return(
    //         <div>
    //             <div>Loading.....</div>
    //         </div>
    //     )
    // } else {
    //     const balanceOfUser = await getBalance(userInfo.address);
    //     console.log("balance ", balanceOfUser)
    //     if(balanceOfUser.msg === 'Success'){
    //         return (
    //             <div className='main-main'>
    //                 <div>
    //                     Success
    //                 </div>
    //             </div>
    //         )
    //     } else {
    //         return (
    //             <div className='main-main'>
    //                 <div> API error </div>
    //             </div>
    //         )
    //     }
    // }
    
}

export default Main;