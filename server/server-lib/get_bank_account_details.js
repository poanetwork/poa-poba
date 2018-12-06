const truffleContract = require('truffle-contract')
const Web3 = require('web3')
const pobaArtifact = require('../artifacts/PoBA.json')

const { RPC } = process.env
const provider = new Web3.providers.HttpProvider(RPC)
const PoBAContract = truffleContract(pobaArtifact)
PoBAContract.setProvider(provider)
// Needed to fix issue in truffle-contract:
// https://github.com/trufflesuite/truffle-contract/issues/57
if (typeof PoBAContract.currentProvider.sendAsync !== 'function') {
  PoBAContract.currentProvider.sendAsync = (...args) => PoBAContract.currentProvider.send(...args)
}

const getBankAccountDetails = (ethAccount, keccakIdentifier) => {
  let PoBA = null
  return PoBAContract.deployed()
    .then(instance => {
      PoBA = instance
      return PoBA.userBankAccountByKeccakIdentifier(ethAccount, keccakIdentifier)
    })
    .then(index => {
      return PoBA.getBankAccountsByAddress(ethAccount, index[1].toNumber())
    })
    .then(details => {
      return {
        bankName: details[1],
        identityNames: details[2]
      }
    })
}

module.exports = getBankAccountDetails
