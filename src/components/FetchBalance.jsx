import { Wallet } from "ethers";
import { ethers } from "ethers";
import React, { useState } from "react";
import * as dotenv from "dotenv";
dotenv.config();


const FetchBalance = ({ privateKey }) => {
  const rpcKey = process.env.RPC_KEY;
    const [balance,setBalance] =  useState();
 async function findMyBalance(privateKey) {
    let provider = new ethers.JsonRpcProvider(
      `https://eth-sepolia.g.alchemy.com/v2/${rpcKey}`
    );
    // console.log("private key",privateKey);
    const wallet = new Wallet(privateKey, provider);
    let balance;
    balance = await provider.getBalance(wallet.address);
    setBalance(balance.toString());
    // console.log(balance.toString());
  }
  findMyBalance(privateKey);
  return <div>balance - {balance}</div>;
};

export default FetchBalance;
