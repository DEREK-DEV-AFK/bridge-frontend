import { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./main.css";
import axios from "axios";
import { getBalanceMumbai, getBalanceSeploia } from "../utils/getBalance";

const Main = ({ userInfo, updateUserInfo }) => {
  const [loading, setLoading] = useState(true);
  const [hasRequestedSepolia, setHasRequestedSepolia] = useState(false);
  const [hasRequestedMumbai, setHasRequestedMumbai] = useState(false);
  const [getData, setData] = useState("");
  const [apiResp, setApiResp] = useState("");

  const transferFromSeploia = async (from, to, amount) => {
    try {
      console.log("data receiced in api requst ", from, to, amount);
      return await axios
        .post(`http://localhost:5000/sepolia/burn`, {
          from: from,
          to: to,
          amount: amount,
        })
        .then((response) => {
          console.log("2. server response:", response.data);
          return response.data;
        });
    } catch (err) {
      console.log("error calling burn txn api sepolia", err.message);
      alert("api error");
    }
  };

  const transferFromMumbai = async (from, to, amount) => {
    try {
      console.log("data receiced in api requst ", from, to, amount);
      return await axios
        .post(`http://localhost:5000/mumbai/burn`, {
          from: from,
          to: to,
          amount: amount,
        })
        .then((response) => {
          console.log("2. server response:", response.data);
          return response.data;
        });
    } catch (err) {
      console.log("error caliing burn txn api mumbai ", err.message);
      alert("api error");
    }
  };

  useEffect(() => {
    const checkCurrentNetworkOrSwitch = async (chainIdToSwitch) => {
      console.log("chain id to switch ", chainIdToSwitch);
      if (window.ethereum.networkVersion !== chainIdToSwitch) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [
              { chainId: ethers.utils.hexValue(Number(chainIdToSwitch)) },
            ],
          });
          return true;
        } catch (err) {
          console.log("err of network switch", err.message, err.code);
          // This error code indicates that the chain has not been added to MetaMask
          if (err.code === 4902) {
            alert("chain does not exist !");
          }

          return false;
        }
      } else {
        return true;
      }
    };

    const updateBalance = async (user) => {
      try {
        const mumbaiBalance = await getBalanceMumbai(user);
        const sepoliaBalance = await getBalanceSeploia(user);

        console.log("res ", mumbaiBalance.result, sepoliaBalance.result);

        return {
          mumbaiBalance: mumbaiBalance.result,
          sepoliaBalance: sepoliaBalance.result,
        };
      } catch (err) {
        console.log("error while updating balance ", err.message);
        return false;
      }
    };

    const fetch = async () => {
      if (hasRequestedMumbai === true || hasRequestedSepolia === true) {
        console.log("get data ", getData);

        if (hasRequestedMumbai === true) {
          console.log("states", getData.from, getData.to, getData.amount);
          const result = await transferFromMumbai(
            getData.from,
            getData.to,
            getData.amount
          );
          console.log("api mumabi resposne ", result);

          if (result) {
            let phraseJson = JSON.parse(result.result);
            phraseJson.from = getData.from;

            setData("");
            setApiResp(phraseJson);
            setHasRequestedSepolia(false);

            console.log("use state ", apiResp);
          }
        }

        if (hasRequestedSepolia === true) {
          console.log("states", getData.from, getData.to, getData.amount);
          const result = await transferFromSeploia(
            getData.from,
            getData.to,
            getData.amount
          );
          console.log("api sepolia resposne ", result);

          if (result) {
            let phraseJson = JSON.parse(result.result);
            phraseJson.from = getData.from;

            setData("");
            setApiResp(phraseJson);
            setHasRequestedSepolia(false);

            console.log("use state ", apiResp);
          }
        }

        try {
          await checkCurrentNetworkOrSwitch(apiResp.chainId);
          const resultMetamsk = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [
              {
                from: apiResp.from,
                to: apiResp.to,
                data: apiResp.data,
              },
            ],
          });

          console.log("metamask ", resultMetamsk);
          alert("txn success ", resultMetamsk);
          const updatedBalance = await updateBalance(apiResp.from);
          console.log("updated values ", updatedBalance);
          updateUserInfo((prevState) => ({
            ...prevState,
            TokenEthBalance: updatedBalance.sepoliaBalance,
            TokenPolyBalance: updatedBalance.mumbaiBalance,
          }));
        } catch (err) {
          console.log("metamask erro ", err.message);
        }
      }
    };
    fetch();
  }, [hasRequestedSepolia, hasRequestedMumbai]);

  const handleClickSepolia = async (event) => {
    event.preventDefault();
    let to = event.target.toLeft.value,
      amount = event.target.amountLeft.value,
      from = userInfo.address;
    console.log(to);
    console.log(from);
    console.log(amount, typeof amount);

    if (userInfo.address === "") {
      alert("no user connected");
      return;
    }

    if (to.length !== 42 || to.slice(0, 2) !== "0x") {
      alert("invalid address");
      return;
    }

    if (amount > userInfo.TokenEthBalance) {
      alert("insufficient amount");
      return;
    }

    setData({
      from: from,
      to: to,
      amount: amount,
    });

    setHasRequestedSepolia(true);
  };

  const handleClickMumbai = async (event) => {
    event.preventDefault();
    let to = event.target.toRight.value,
      amount = event.target.amountRight.value,
      from = userInfo.address;
    console.log(to);
    console.log(from);
    console.log(amount, typeof amount);
    if (userInfo.address === "") {
      alert("no user connected");
      return;
    }

    if (to.length !== 42 || to.slice(0, 2) !== "0x") {
      alert("invalid address");
      return;
    }

    if (amount > userInfo.TokenPolyBalance) {
      alert("insufficient amount");
      return;
    }

    // const result = await transferFromMumbai(userInfo.address, to, amount);
    // console.log("api mumbai resposne ", result);

    setData({
      from: from,
      to: to,
      amount: amount,
    });

    setHasRequestedMumbai(true);
  };

  return (
    <div className="main-main">
      <div className="main-left">
        <b>Sepolia</b>
        <form onSubmit={handleClickSepolia} className="main-left-form">
          <input
            className="to-textarea"
            placeholder="To"
            id="toLeft"
            name="toLeft"
          />
          <input
            className="amount-textarea"
            placeholder="Amount"
            id="amountLeft"
            name="amountLeft"
          />
          <button
            className="btn-submit" /*disabled={loading ? loading : false}*/
          >
            Burn
          </button>
        </form>
        {/*loading ? <>Sending....</> : <></>*/}
        {/* <button onClick={handleClickSepolia} >Burn</button> */}
      </div>
      <div class="wrapper">
        <svg
          width="18px"
          height="17px"
          viewBox="0 0 18 17"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            id="prev"
            transform="translate(8.500000, 8.500000) scale(-1, 1) translate(-8.500000, -8.500000)"
          >
            <polygon
              class="arrow"
              points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"
            ></polygon>
            <polygon
              class="arrow-fixed"
              points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"
            ></polygon>
            <path d="M-1.48029737e-15,0.56157424 L-1.48029737e-15,16.1929159 L9.708,8.33860465 L-2.66453526e-15,0.56157424 L-1.48029737e-15,0.56157424 Z M1.33333333,3.30246869 L7.62533333,8.34246869 L1.33333333,13.4327013 L1.33333333,3.30246869 L1.33333333,3.30246869 Z"></path>
          </g>
        </svg>

        <svg
          width="18px"
          height="17px"
          viewBox="-1 0 18 17"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <polygon
              class="arrow"
              points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"
            ></polygon>
            <polygon
              class="arrow-fixed"
              points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"
            ></polygon>
            <path d="M-4.58892184e-16,0.56157424 L-4.58892184e-16,16.1929159 L9.708,8.33860465 L-1.64313008e-15,0.56157424 L-4.58892184e-16,0.56157424 Z M1.33333333,3.30246869 L7.62533333,8.34246869 L1.33333333,13.4327013 L1.33333333,3.30246869 L1.33333333,3.30246869 Z"></path>
          </g>
        </svg>
      </div>
      <div className="main-right">
        <b>Mumbai</b>
        <form onSubmit={handleClickMumbai} className="main-right-form">
          <input
            className="to-textarea"
            placeholder="To"
            id="toRight"
            name="toRight"
          />
          <input
            className="amount-textarea"
            placeholder="Amount"
            id="amountRight"
            name="amountRight"
          />
          <button className="btn-submit" /*disabled={loading}*/>Burn</button>
        </form>
        {/*loading ? <>Sending....</> : <></>*/}
      </div>
    </div>
  );

  // when data is available, title is shown
  //   return <div className="main-main">Mainnnnnn</div>;
};

export default Main;
