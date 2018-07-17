const PoBA = artifacts.require('PoBA')
const Web3 = require('web3')

const web3 = new Web3()

contract('ownership', () => {
  it('signer should be equal to owner', async () => {
    const poba = await PoBA.deployed()
    const owner = await poba.owner()
    const signer = await poba.signer()
    assert.equal(owner, signer)
  })
})

contract('bank account registration (success)', function() {
  contract('', () => {
    it('registerAddress should register an address', async () => {
      // PoBA.setProvider(web3.currentProvider)
      const poba = await PoBA.deployed()
      const owner = await poba.owner()
      const signer = await poba.signer()
      const args = buildRegisterBankAccountArgs()
      console.log('args', args)
      const account = '0x92970dbd5c0ee6b439422bfd7cd71e1dda921a03'
      // 0x92970dbd5c0ee6b439422bfd7cd71e1dda921a03

      // let bankAccounts = await poba.accountsLength(account)
      // assert.equal(+bankAccounts, 0)
      console.log('owner', owner)
      console.log('signer', signer)

      await registerBankAccount(poba, args)

      // bankAccounts = await poba.accountsLength(account)
      // assert.equal(+bankAccounts, 1)
    })
  })
})

/**
 * Build arguments for registerBankAccount method
 *
 * The { v, r, s } values were signed with the PK of address 0xdbde11e51b9fcc9c455de9af89729cf37d835156,
 * 1dd9083e16e190fa5413f87837025556063c546bf16e38cc53fd5d018a3acfbb, for the requester address
 * 0x7e7693f12bfd372042b754b729d1474572a2dd01
 */
function buildRegisterBankAccountArgs() {
  const ethAccount = '0x92970dbd5c0ee6b439422bfd7cd71e1dda921a03'
  const bankAccount = '1111222233330000'
  const institution = 'chase'
  const privateKey = '3daa79a26454a5528a3523f9e6345efdbd636e63f8c24a835204e6ccb5c88000'

  const hash = web3.utils.sha3(ethAccount + Buffer.from(bankAccount).toString('hex'))
  const { v, r, s } = web3.eth.accounts.sign(hash, privateKey)
  console.log('v', v)
  console.log('r', r)
  console.log('s', s)

  return {bankAccount, institution, v, r, s}

}

function registerBankAccount(poba, args) {
  return poba.register(
    args.bankAccount,
    args.institution,
    args.v,
    args.r,
    args.s
  )
}
