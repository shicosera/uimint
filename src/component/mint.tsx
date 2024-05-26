"use client";

import { useState } from 'react';
import Web3 from 'web3';
declare global {
  interface Window {
    ethereum?: any;
  }
}
const MintNft = () => {
  const [web3, setWeb3] = useState<any>(null);
  const [account, setConnectedAccount] = useState(null);
  const [contract, setContract] = useState<any>(null);

  const connectMetamask = async () => {
      //check metamask is installed
      if (window.ethereum) {
        // instantiate Web3 with the injected provider
        const web3 = new Web3(window.ethereum);
  
        //request user to connect accounts (Metamask will prompt)
        await window.ethereum.request({ method: 'eth_requestAccounts' });
  
        //get the connected accounts
        const accounts: any = await web3.eth.getAccounts();
  
        setConnectedAccount(accounts[0]);
      } else {
        alert('Please download metamask');
      }
    }

  return (
    <div>
      {!account ?  <button className='text-pink-500'>Connect metamask</button> : `Connected to: ${account}` }
    </div>
  )
}

export default MintNft;