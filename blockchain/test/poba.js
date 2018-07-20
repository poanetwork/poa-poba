const PoBA = artifacts.require('PoBA')
const Web3 = require('web3')

const web3 = new Web3()

const ethAccount = '0x9f398EE455b4027eb667A69Ed68E69ce4Df84692'
const privateKey = '0x3daa79a26454a5528a3523f9e6345efdbd636e63f8c24a835204e6ccb5c88f9e'

/**
 * Build arguments for registerBankAccount method
 *
 * The { v, r, s } values were signed with the PK of address 0x92970dbd5c0ee6b439422bfd7cd71e1dda921a03,
 * 0x3daa79a26454a5528a3523f9e6345efdbd636e63f8c24a835204e6ccb5c88f9e, for the requester address
 * 0x9f398EE455b4027eb667A69Ed68E69ce4Df84692
 */
function buildRegisterBankAccountArgs() {
  const bank = {
    account: '1111222233330000',
    institution: 'Chase'
  }

  const hash = web3.utils.soliditySha3(
    ethAccount +
      Buffer.from(bank.account).toString('hex') +
      Buffer.from(bank.institution).toString('hex')
  )
  const { v, r, s } = web3.eth.accounts.sign(hash, privateKey)
  return {
    bankAccount: bank.account,
    institution: bank.institution,
    v,
    r,
    s
  }
}

function registerBankAccount(poba, args) {
  return poba.register(args.bankAccount, args.institution, args.v, args.r, args.s, {
    from: ethAccount
  })
}

contract('ownership', () => {
  it('signer should be equal to owner', async () => {
    const poba = await PoBA.deployed()
    const owner = await poba.owner()
    const signer = await poba.signer()
    assert.equal(owner, signer)
  })
})

contract('bank account registration (success)', () => {
  contract('', () => {
    it('registerAddress should register an address', async () => {
      const poba = await PoBA.deployed()
      const args = buildRegisterBankAccountArgs()

      let bankAccounts = await poba.accountsLength(ethAccount)
      assert.equal(+bankAccounts, 0)

      await registerBankAccount(poba, args)

      bankAccounts = await poba.accountsLength(ethAccount)
      assert.equal(+bankAccounts, 1)
    })
  })
})
