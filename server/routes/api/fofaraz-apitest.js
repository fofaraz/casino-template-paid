const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {register} = require('../../controllers/users');
const {Web3} = require('web3');
const ERC20_ABI = require('./ERC20-ABI.json')

router.get('/', apitest);

async function apitest(req, res) {
    let response = {};
    const provider = new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/c4d6434b6b8543408bebe81bc6d1a2b8")
    const web3 = new Web3(provider);

    //get balance of an address
    const address = "0x88c6c46ebf353a52bdbab708c23d0c81daa8134a";
    const balance = await web3.eth.getBalance(address);
    const etherBalance = web3.utils.fromWei(balance, 'ether');
    console.log("etherBalance ", etherBalance);
    response.etherBalance=etherBalance;


    // call methods of a smart contract
    let contract = new web3.eth.Contract(ERC20_ABI, "0xb8c77482e45f1f44de1745f52c74426c631bdd52");
    let tokenInfo = {
        symbol: await contract.methods.symbol().call(),
        name: await contract.methods.name().call()
    }
    response.tokenInfo = tokenInfo;


    console.log(response);
    res.send(response);
}

module.exports = router;


/*
Hi Ryan
I have cloned casino template repo
and developed an apitest route that can be called by this url:
http://localhost:7777/api/fofaraz-apitest

this route fetches balance of a specific wallet address by calling getBalance method of ethereum and logs it
please tell me if this is enough or I need to call a more specific function of a smart contract

you can check my code here on my own git
https://github.com/fofaraz/casino-template-paid/blob/master/server/routes/api/fofaraz-apitest.js

is this ok to share my codes this way? if not please explain to me how should i submit my test codes
 */