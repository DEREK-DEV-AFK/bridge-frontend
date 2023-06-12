import './main.css';
import axios from 'axios';

const Main = async ({address}) => {
    console.log("current address value ", address, typeof address);
    // const getBalance = async (account) => {
    //     try {

    //         console.log("get in balance of address ", account);
    //         const result = await axios.get(`http://localhost:5000/sepolia/balance?userAddress=${account}`)

    //         return result.data;

    //     } catch (err) {
    //         console.log("api request error ", err.message);
    //     }
    // }

    const getBalance = (account) => {
        return axios.get(`http://localhost:5000/sepolia/balance?userAddress=${account}`)
        .then((response) => {
            console.log('2. server response:' + response.data)
        });
    }

    if(address === "" || address === undefined){
        console.log("in if block")
        return (
            <div className='main-main'>
                Mainnnnnn
            </div>
        )
    } else {
        const balanceOfUser = await getBalance(address);
        console.log("balance ", balanceOfUser)
        if(balanceOfUser.msg === 'Success'){
            return (
                <div className='main-main'>
                    <div>
                        {balanceOfUser.result}
                    </div>
                </div>
            )
        } else {
            return (
                <div className='main-main'>
                    <div> API error </div>
                </div>
            )
        }
    }
    
}

export default Main;