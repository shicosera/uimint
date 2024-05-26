"use client";

import { useState } from "react";
import Web3, { Contract } from "web3";
import { MyNFTABI } from "../abi/erc721";
declare global {
  interface Window {
    ethereum?: any;
  }
}

const Home = () => {
  const [web3Instance, setInstance] = useState<any>(null);
  const [account, setConnectedAccount] = useState<any>(null);
const [message, setMessage] = useState('');
const [loader, setLoader] = useState(false);

  const connectMetamask = async () => {
    //check metamask is installed
    if (window.ethereum) {
      // instantiate Web3 with the injected provider
      const web3 = new Web3(window.ethereum);

      //request user to connect accounts (Metamask will prompt)
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      //get the connected accounts
      const accounts: any = await web3.eth.getAccounts();
      setInstance(web3);
      setConnectedAccount(accounts[0]);
    } else {
      alert('Please download metamask');
    }
  }

  const mintNFT = async () => {
    try {
      setMessage('');
      setLoader(true);
      if (!web3Instance && !account) {
        return;
      }

      const contract = new Contract(MyNFTABI, "0xC38F57Bd2a2b9D72b1F82F802CE584B72940d265", web3Instance);

      const name = await contract.methods.name().call();
      console.log("name", name);
      
      const mintPrice = Web3.utils.toWei('0.01', 'ether');
      console.log("price", mintPrice);
      
      const respTransaction = await contract.methods.safeMint().send({value: mintPrice, from: account});
      
      console.log("resp", respTransaction);
      
      if (respTransaction?.transactionHash) {
      setMessage(`Minted, transaction id: ${respTransaction.transactionHash}`);
      } else {
        setMessage("Mint failed");
      }
    } catch (error) {
      setLoader(false);
      setMessage("Mint failed");
    }
  }

  return (
    <div className="flex flex-col p-10">
      <div>
        {
          !account ?  <button className='bg-red-500 p-2 rounded-lg text-white' onClick={connectMetamask}>Connect metamask</button> : `Connected to: ${account}` }
      </div>
        {loader ? "Please wait" : account && <button className='bg-blue-500 p-2 rounded-lg text-white'  onClick={mintNFT}>Mint NFT</button>}
        {message && message}
    </div>
  )
}

export default Home