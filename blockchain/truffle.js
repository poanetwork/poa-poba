const HDWalletProvider = require('truffle-hdwallet-provider')

const mnemonic = 'gauge pilot return sauce iron woman reason ridge across kangaroo sorry ritual'
const rinkebyUrl = 'https://rinkeby.infura.io'

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*'
    },
    test: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
      gas: '5000000'
    },
    coverage: {
      host: '127.0.0.1',
      port: 8555,
      network_id: '*',
      gas: '0xfffffffffff',
      gasPrice: 0x01
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, rinkebyUrl),
      network_id: 4
    }
  }
}
