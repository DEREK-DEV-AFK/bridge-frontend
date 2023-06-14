const axios = require('axios')
const getTxn = async () => {
    try {
        // console.log("data receiced in api requst ", from, to, amount);
        return (await axios.post(`http://localhost:5000/sepolia/burn`,{
              from: "0xBD1331f9E06c2934cc9B9b3E6ad4F011e66869C1",
              to: "0xBD1331f9E06c2934cc9B9b3E6ad4F011e66869C1",
              amount: "10"
        })
          .then((response) => {
            console.log("2. server response:", response.data);
            return response.data;
          }));
      } catch (err) {
        console.log("error calling burn txn api sepolia", err.message);
      }
}

getTxn()