import './header.css';

const Header = ({Address, updateAddress}) => {

    const btnHandler = () => {

        if(window.ethereum){

            window.ethereum
            .request({method: "eth_requestAccounts"})
            .then((res) => accountChangeHandler(res[0]));
        }else {
            alert("install metamask!!");
        }
    }

    const btnDisconnect = () => {
        updateAddress(prevState => ({
            ...prevState,
            address: ""
        }));
    }

    // Function for getting handling all events
  const accountChangeHandler = (account) => {
    // Setting an address data
    updateAddress({
        address: account
    });
  };

    return (
        <div className="header-main">
            <div className='main-left'>
                <h3>Centralised Bridge</h3>
            </div>
            <div className='main-right'>
                <button className='btn-connect' onClick={Address === "" ? btnHandler : btnDisconnect }>{Address === "" ? "Connect" : Address.substring(0,6)+"...."+Address.substring(Address.length-6)}</button>
            </div>
        </div>        
    )
}   

export default Header;