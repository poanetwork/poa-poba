const truffleContract = require('truffle-contract')
const Web3 = require('web3')
const pobaArtifact = require('../artifacts/PoBA.json')

const { RPC } = process.env
const web3 = new Web3(RPC)
const PoBAContract = truffleContract(pobaArtifact)
PoBAContract.setProvider(web3.currentProvider)

// Needed to fix issue in truffle-contract:
// https://github.com/trufflesuite/truffle-contract/issues/57
if (typeof PoBAContract.currentProvider.sendAsync !== 'function') {
  PoBAContract.currentProvider.sendAsync = (...args) => PoBAContract.currentProvider.send(...args)
}

const getPoBAContractInstance = () => {
  return PoBAContract.deployed()
}

module.exports = getPoBAContractInstance
