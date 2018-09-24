import contract from 'truffle-contract'
import pobaArtifact from './artifacts/PoBA.json'
// eslint-disable-line import/no-unresolved
const PoBA = contract(pobaArtifact)

class PoBAContract {
  constructor(provider) {
    this.contract = null
    PoBA.setProvider(provider)

    this.init = this.init.bind(this)
    this.getVerifiedBankAccounts = this.getVerifiedBankAccounts.bind(this)
    this.registerBankAccount = this.registerBankAccount.bind(this)
    this.unregisterBankAccount = this.unregisterBankAccount.bind(this)
  }

  async init() {
    this.contract = await PoBA.deployed()
    return this
  }

  async getVerifiedBankAccounts(walletAddress) {
    const promises = []
    try {
      const accountsLengthResult = await this.contract.accountsLength(walletAddress)
      const accountsLength = accountsLengthResult.c[0]
      for (let index = 0; index < accountsLength; index++) {
        promises.push(this.contract.getBankAccounts(walletAddress, index))
      }
    } catch (e) {
      console.error('Error getting verified bank accounts', e)
    }
    return Promise.all(promises)
  }

  async registerBankAccount(args, walletAddress) {
    return this.contract.register(
      args.bankAccount.account,
      args.bankAccount.institution,
      args.identityNames,
      args.v,
      args.r,
      args.s,
      { from: walletAddress }
    )
  }

  async unregisterBankAccount(args, walletAddress) {
    // Default estimation of gas is too low, multiply it by 2
    const gasEstimate = await this.contract.unregisterBankAccount.estimateGas(
      args.account,
      args.bankName,
      args.identityNames,
      { from: walletAddress }
    )
    return this.contract.unregisterBankAccount(args.account, args.bankName, args.identityNames, {
      from: walletAddress,
      gas: gasEstimate * 2
    })
  }
}

const getInstance = async provider => {
  const instance = new PoBAContract(provider)
  return instance.init()
}

export default getInstance
