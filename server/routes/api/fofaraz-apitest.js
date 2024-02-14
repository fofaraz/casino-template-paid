const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {register} = require('../../controllers/users');
const {Web3} = require('web3');

router.get('/', apitest);

async function apitest(req, res) {
    const address = "0x88c6c46ebf353a52bdbab708c23d0c81daa8134a";
    const provider = new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/c4d6434b6b8543408bebe81bc6d1a2b8")
    const web3 = new Web3(provider);
    const balance = await web3.eth.getBalance(address);
    const etherBalance = web3.utils.fromWei(balance, 'ether');

    console.log("etherBalance ", etherBalance);
    res.send({address: etherBalance});
}

module.exports = router;
