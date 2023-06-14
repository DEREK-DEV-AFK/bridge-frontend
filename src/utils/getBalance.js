import axios from "axios";

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

export { getBalanceMumbai, getBalanceSeploia};