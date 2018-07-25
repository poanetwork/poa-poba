const PoBA = artifacts.require('PoBA')
const Web3 = require('web3')

const web3 = new Web3()

const ethAccount = [
  '0x9f398EE455b4027eb667A69Ed68E69ce4Df84692',
  '0x8fc00688be3c7609326263fce9f2500417ad2433'
]
const privateKey = '0x3daa79a26454a5528a3523f9e6345efdbd636e63f8c24a835204e6ccb5c88f9e'

/**
 * Build arguments for registerBankAccount method
 *
 * The { v, r, s } values were signed with the PK of address 0x92970dbd5c0ee6b439422bfd7cd71e1dda921a03,
 * 0x3daa79a26454a5528a3523f9e6345efdbd636e63f8c24a835204e6ccb5c88f9e, for the requester address
 * 0x9f398EE455b4027eb667A69Ed68E69xwce4Df84692
 */
function buildRegisterBankAccountArgs(account, bank) {
  const hash = web3.utils.soliditySha3(
    account +
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

function registerBankAccount(poba, args, account) {
  return poba.register(args.bankAccount, args.institution, args.v, args.r, args.s, {
    from: account
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
    it('registerBankAccount should register an address', async () => {
      const poba = await PoBA.deployed()
      const bank = {
        account: '1111222233330000',
        institution: 'Chase'
      }
      const args = buildRegisterBankAccountArgs(ethAccount[0], bank)

      let bankAccounts = await poba.accountsLength(ethAccount[0])
      assert.equal(+bankAccounts, 0)

      await registerBankAccount(poba, args, ethAccount[0])

      bankAccounts = await poba.accountsLength(ethAccount[0])
      assert.equal(+bankAccounts, 1)
    })
  })

  contract('', () => {
    it('should allow a user to register two different bank accounts', async () => {
      const poba = await PoBA.deployed()
      const bankOne = {
        account: '1111222233330000',
        institution: 'Chase'
      }
      const bankTwo = {
        account: '1111222233330001',
        institution: 'Sugar'
      }
      const args1 = buildRegisterBankAccountArgs(ethAccount[0], bankOne)
      let bankAccounts = await poba.accountsLength(ethAccount[0])
      assert.equal(+bankAccounts, 0)
      await registerBankAccount(poba, args1, ethAccount[0])
      bankAccounts = await poba.accountsLength(ethAccount[0])
      assert.equal(+bankAccounts, 1)
      const args2 = buildRegisterBankAccountArgs(ethAccount[0], bankTwo)
      await registerBankAccount(poba, args2, ethAccount[0])
      bankAccounts = await poba.accountsLength(ethAccount[0])
      assert.equal(+bankAccounts, 2)
    })
  })

  contract('', () => {
    it('should allow different users to register different bank accounts', async () => {
      const poba = await PoBA.deployed()
      const bankOne = {
        account: '1111222233330000',
        institution: 'Chase'
      }
      const bankTwo = {
        account: '1111222233330001',
        institution: 'Sugar'
      }

      const args1 = buildRegisterBankAccountArgs(ethAccount[0], bankOne)
      let bankAccounts1 = await poba.accountsLength(ethAccount[0])
      assert.equal(+bankAccounts1, 0)
      await registerBankAccount(poba, args1, ethAccount[0])
      bankAccounts1 = await poba.accountsLength(ethAccount[0])
      assert.equal(+bankAccounts1, 1)

      const args2 = buildRegisterBankAccountArgs(ethAccount[1], bankTwo)
      let bankAccounts2 = await poba.accountsLength(ethAccount[1])
      assert.equal(+bankAccounts2, 0)
      await registerBankAccount(poba, args2, ethAccount[1])
      bankAccounts2 = await poba.accountsLength(ethAccount[1])
      assert.equal(+bankAccounts2, 1)
    })
  })

  contract('', () => {
    it('should allow different users to register the same bank account', async () => {
      const poba = await PoBA.deployed()
      const bank = {
        account: '1111222233330000',
        institution: 'Chase'
      }

      const args1 = buildRegisterBankAccountArgs(ethAccount[0], bank)
      let bankAccounts1 = await poba.accountsLength(ethAccount[0])
      assert.equal(+bankAccounts1, 0)
      await registerBankAccount(poba, args1, ethAccount[0])
      bankAccounts1 = await poba.accountsLength(ethAccount[0])
      assert.equal(+bankAccounts1, 1)

      const args2 = buildRegisterBankAccountArgs(ethAccount[1], bank)
      let bankAccounts2 = await poba.accountsLength(ethAccount[1])
      assert.equal(+bankAccounts2, 0)
      await registerBankAccount(poba, args2, ethAccount[1])
      bankAccounts2 = await poba.accountsLength(ethAccount[1])
      assert.equal(+bankAccounts2, 1)
    })
  })
})

contract('bank account registration (fail)', () => {
  contract('', () => {
    it('registerBankAccount should fail if account is empty', async () => {
      const poba = await PoBA.deployed()
      const bank = {
        account: '',
        institution: 'Chase'
      }

      const args = buildRegisterBankAccountArgs(ethAccount[0], bank)

      let bankAccounts = await poba.accountsLength(ethAccount[0])
      assert.equal(+bankAccounts, 0)

      await registerBankAccount(poba, args, ethAccount[0]).then(
        () => assert.fail(), // should reject
        async () => {
          bankAccounts = await poba.accountsLength(ethAccount[0])
          assert.equal(+bankAccounts, 0)
        }
      )
    })
  })
  contract('', () => {
    it('registerBankAccount should fail if institution is empty', async () => {
      const poba = await PoBA.deployed()
      const bank = {
        account: '1111222233330000',
        institution: ''
      }

      const args = buildRegisterBankAccountArgs(ethAccount[0], bank)

      let bankAccounts = await poba.accountsLength(ethAccount[0])
      assert.equal(+bankAccounts, 0)

      await registerBankAccount(poba, args, ethAccount[0]).then(
        () => assert.fail(), // should reject
        async () => {
          bankAccounts = await poba.accountsLength(ethAccount[0])
          assert.equal(+bankAccounts, 0)
        }
      )
    })
  })
  contract('', () => {
    it('registerBankAccount should fail if signer is not valid', async () => {
      const poba = await PoBA.deployed()
      const bank = {
        account: '1111222233330000',
        institution: 'Chase'
      }

      const args = buildRegisterBankAccountArgs(ethAccount[0], bank)

      let bankAccounts = await poba.accountsLength(ethAccount[0])
      assert.equal(+bankAccounts, 0)

      await registerBankAccount(poba, args, ethAccount[1]).then(
        () => assert.fail(), // should reject
        async () => {
          bankAccounts = await poba.accountsLength(ethAccount[0])
          assert.equal(+bankAccounts, 0)
        }
      )
    })
  })
  contract('', () => {
    it('registerBankAccount should fail if data is not valid', async () => {
      const poba = await PoBA.deployed()
      const bank = {
        account: '1111222233330000',
        institution: 'Chase'
      }

      const args = buildRegisterBankAccountArgs(ethAccount[0], bank)

      let bankAccounts = await poba.accountsLength(ethAccount[0])
      assert.equal(+bankAccounts, 0)

      args.bankAccount = '1111222233330001'
      await registerBankAccount(poba, args, ethAccount[0]).then(
        () => assert.fail(), // should reject
        async () => {
          bankAccounts = await poba.accountsLength(ethAccount[0])
          assert.equal(+bankAccounts, 0)
        }
      )
    })
  })
})
