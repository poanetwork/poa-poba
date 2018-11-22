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
function buildRegisterBankAccountArgs(account, bank, names) {
  const hash = web3.utils.soliditySha3(
    account + Buffer.from(bank.institution).toString('hex') + Buffer.from(names).toString('hex')
  )
  const { v, r, s } = web3.eth.accounts.sign(hash, privateKey)
  return {
    institution: bank.institution,
    names,
    v,
    r,
    s
  }
}

function registerBankAccount(poba, args, account) {
  return poba.registerBankAccount(args.institution, args.names, args.v, args.r, args.s, {
    from: account
  })
}

function unregisterBankAccount(poba, args, account) {
  return poba.unregisterBankAccount(args.institution, args.names, {
    from: account
  })
}

describe('ownership', () => {
  contract('', () => {
    it('signer should be equal to owner', async () => {
      const poba = await PoBA.deployed()
      const owner = await poba.owner()
      const signer = await poba.signer()
      assert.equal(owner, signer)
    })
  })
})

describe('bank account registration (success)', () => {
  contract('', () => {
    it('registerBankAccount should register an address', async () => {
      const poba = await PoBA.deployed()
      const bankAccountData = { institution: 'Chase' }
      const identityNames = 'John Doe'
      const args = buildRegisterBankAccountArgs(ethAccount[0], bankAccountData, identityNames)

      let bankAccounts = await poba.userBankAccountsLength(ethAccount[0])
      assert.equal(+bankAccounts, 0)

      await registerBankAccount(poba, args, ethAccount[0])

      bankAccounts = await poba.userBankAccountsLength(ethAccount[0])
      assert.equal(+bankAccounts, 1)
    })
  })

  contract('', () => {
    it('should allow a user to register two different bank accounts', async () => {
      const poba = await PoBA.deployed()
      const bankOne = { institution: 'Chase' }
      const bankTwo = { institution: 'Sugar' }
      const identityNames = 'John Doe'

      const args1 = buildRegisterBankAccountArgs(ethAccount[0], bankOne, identityNames)
      let bankAccounts = await poba.userBankAccountsLength(ethAccount[0])
      assert.equal(+bankAccounts, 0)
      await registerBankAccount(poba, args1, ethAccount[0])
      bankAccounts = await poba.userBankAccountsLength(ethAccount[0])
      assert.equal(+bankAccounts, 1)
      const args2 = buildRegisterBankAccountArgs(ethAccount[0], bankTwo, identityNames)
      await registerBankAccount(poba, args2, ethAccount[0])
      bankAccounts = await poba.userBankAccountsLength(ethAccount[0])
      assert.equal(+bankAccounts, 2)
    })
  })

  contract('', () => {
    it('should allow different users to register different bank accounts', async () => {
      const poba = await PoBA.deployed()
      const bankOne = { institution: 'Chase' }
      const bankTwo = { institution: 'Sugar' }
      const identityNames = 'John Doe'

      const args1 = buildRegisterBankAccountArgs(ethAccount[0], bankOne, identityNames)
      let bankAccounts1 = await poba.userBankAccountsLength(ethAccount[0])
      assert.equal(+bankAccounts1, 0)
      await registerBankAccount(poba, args1, ethAccount[0])
      bankAccounts1 = await poba.userBankAccountsLength(ethAccount[0])
      assert.equal(+bankAccounts1, 1)

      const args2 = buildRegisterBankAccountArgs(ethAccount[1], bankTwo, identityNames)
      let bankAccounts2 = await poba.userBankAccountsLength(ethAccount[1])
      assert.equal(+bankAccounts2, 0)
      await registerBankAccount(poba, args2, ethAccount[1])
      bankAccounts2 = await poba.userBankAccountsLength(ethAccount[1])
      assert.equal(+bankAccounts2, 1)
    })
  })

  contract('', () => {
    it('should allow different users to register the same bank account', async () => {
      const poba = await PoBA.deployed()
      const bankAccountData = { institution: 'Chase' }
      const identityNames = 'John Doe, Another Doe'

      const args1 = buildRegisterBankAccountArgs(ethAccount[0], bankAccountData, identityNames)
      let bankAccounts1 = await poba.userBankAccountsLength(ethAccount[0])
      assert.equal(+bankAccounts1, 0)
      await registerBankAccount(poba, args1, ethAccount[0])
      bankAccounts1 = await poba.userBankAccountsLength(ethAccount[0])
      assert.equal(+bankAccounts1, 1)

      const args2 = buildRegisterBankAccountArgs(ethAccount[1], bankAccountData, identityNames)
      let bankAccounts2 = await poba.userBankAccountsLength(ethAccount[1])
      assert.equal(+bankAccounts2, 0)
      await registerBankAccount(poba, args2, ethAccount[1])
      bankAccounts2 = await poba.userBankAccountsLength(ethAccount[1])
      assert.equal(+bankAccounts2, 1)
    })
  })

  contract('', () => {
    it("totalUsers should be incremented if it's the first bank account for that user", async () => {
      const poba = await PoBA.deployed()

      let users = await poba.totalUsers()
      assert.equal(+users, 0)

      const bankAccountData = { institution: 'Chase' }
      const identityNames = 'John Doe'
      const args = buildRegisterBankAccountArgs(ethAccount[0], bankAccountData, identityNames)
      await registerBankAccount(poba, args, ethAccount[0])

      users = await poba.totalUsers()
      assert.equal(+users, 1)
    })
  })

  contract('', () => {
    it('should increment totalBankAccounts value', async () => {
      const poba = await PoBA.deployed()
      let totalBankAccounts = await poba.totalBankAccounts()
      assert.equal(+totalBankAccounts, 0)

      const accountData = { institution: 'Chase' }
      const identityNames = 'John Doe'
      const args = buildRegisterBankAccountArgs(ethAccount[0], accountData, identityNames)
      await registerBankAccount(poba, args, ethAccount[0])
      totalBankAccounts = await poba.totalBankAccounts()
      assert.equal(+totalBankAccounts, 1)
    })
  })
})

describe('bank account registration (fail)', () => {
  contract('', () => {
    it('registerBankAccount should fail if institution is empty', async () => {
      const poba = await PoBA.deployed()
      const bankAccountData = { institution: '' }
      const identityNames = 'John Doe'
      const args = buildRegisterBankAccountArgs(ethAccount[0], bankAccountData, identityNames)

      let bankAccounts = await poba.userBankAccountsLength(ethAccount[0])
      assert.equal(+bankAccounts, 0)

      await registerBankAccount(poba, args, ethAccount[0]).then(
        () => assert.fail(), // should reject
        async () => {
          bankAccounts = await poba.userBankAccountsLength(ethAccount[0])
          assert.equal(+bankAccounts, 0)
        }
      )
    })
  })

  contract('', () => {
    it('registerBankAccount should fail if (identity) names is empty', async () => {
      const poba = await PoBA.deployed()
      const bankAccountData = { institution: 'Chase' }
      const identityNames = ''
      const args = buildRegisterBankAccountArgs(ethAccount[0], bankAccountData, identityNames)

      let bankAccounts = await poba.userBankAccountsLength(ethAccount[0])
      assert.equal(+bankAccounts, 0)

      await registerBankAccount(poba, args, ethAccount[0]).then(
        () => assert.fail(), // should reject
        async () => {
          bankAccounts = await poba.userBankAccountsLength(ethAccount[0])
          assert.equal(+bankAccounts, 0)
        }
      )
    })
  })

  contract('', () => {
    it('registerBankAccount should fail if signer is not valid', async () => {
      const poba = await PoBA.deployed()
      const bankAccountData = { institution: 'Chase' }
      const identityNames = 'John Doe'
      const args = buildRegisterBankAccountArgs(ethAccount[0], bankAccountData, identityNames)

      let bankAccounts = await poba.userBankAccountsLength(ethAccount[0])
      assert.equal(+bankAccounts, 0)

      await registerBankAccount(poba, args, ethAccount[1]).then(
        () => assert.fail(), // should reject
        async () => {
          bankAccounts = await poba.userBankAccountsLength(ethAccount[0])
          assert.equal(+bankAccounts, 0)
        }
      )
    })
  })

  contract('', () => {
    it('totalUsers should not be incremented if registerBankAccount fails', async () => {
      const poba = await PoBA.deployed()

      let totalUsers = await poba.totalUsers()
      assert.equal(+totalUsers, 0)

      // Make registerBankAccount fail with an emtpy institutuion
      const bankAccountData = { institution: '' }
      const identityNames = 'John Doe'
      const args = buildRegisterBankAccountArgs(ethAccount[0], bankAccountData, identityNames)
      await registerBankAccount(poba, args, ethAccount[0]).then(
        () => assert.fail(), // should reject
        async () => {
          totalUsers = await poba.totalUsers()
          assert.equal(+totalUsers, 0)
        }
      )
    })
  })
})

describe('bank account removal', () => {
  contract('', accounts => {
    it('should allow to unregister a bank account', async () => {
      const poba = await PoBA.deployed()
      const bankAccountData = { institution: 'Chase' }
      const identityNames = 'John Doe'
      const args = buildRegisterBankAccountArgs(accounts[0], bankAccountData, identityNames)

      await registerBankAccount(poba, args, accounts[0])

      let bankAccountCount = await poba.userBankAccountsLength(accounts[0])
      assert.equal(+bankAccountCount, 1)

      await unregisterBankAccount(poba, args, accounts[0])

      bankAccountCount = await poba.userBankAccountsLength(accounts[0])
      assert.equal(+bankAccountCount, 0)
    })
  })

  contract('', accounts => {
    it("should not allow a user to unregister another user's bank account", async () => {
      const poba = await PoBA.deployed()
      const bankAccountData = { institution: 'Chase' }
      const identityNames = 'John Doe'
      const args = buildRegisterBankAccountArgs(accounts[0], bankAccountData, identityNames)

      await registerBankAccount(poba, args, accounts[0])

      let bankAccountCount = await poba.userBankAccountsLength(accounts[0])
      assert.equal(+bankAccountCount, 1)

      await unregisterBankAccount(poba, args, accounts[1]).then(
        () => assert.fail(), // should reject
        () => {}
      )

      bankAccountCount = await poba.userBankAccountsLength(accounts[0])
      assert.equal(+bankAccountCount, 1)
    })
  })

  contract('', accounts => {
    it('should delete the user if the unregistered bank account was his/her last one', async () => {
      const poba = await PoBA.deployed()
      const bankAccountData = { institution: 'Chase' }
      const identityNames = 'John Doe'
      const args = buildRegisterBankAccountArgs(accounts[0], bankAccountData, identityNames)

      await registerBankAccount(poba, args, accounts[0])

      let bankAccountCount = await poba.userBankAccountsLength(accounts[0])
      assert.equal(+bankAccountCount, 1)

      await unregisterBankAccount(poba, args, accounts[0])

      bankAccountCount = await poba.userBankAccountsLength(accounts[0])
      assert.equal(+bankAccountCount, 0)

      const userExists = await poba.userExists(accounts[0])
      assert.isFalse(userExists)
    })
  })

  contract('', accounts => {
    it('should not delete the user if the unregistered bank account was not their last one', async () => {
      const poba = await PoBA.deployed()
      const bankAccountData1 = { institution: 'Chase' }
      const bankAccountData2 = { institution: 'Chase2' }
      const identityNames = 'John Doe'
      const args1 = buildRegisterBankAccountArgs(accounts[0], bankAccountData1, identityNames)
      const args2 = buildRegisterBankAccountArgs(accounts[0], bankAccountData2, identityNames)

      await registerBankAccount(poba, args1, accounts[0])
      await registerBankAccount(poba, args2, accounts[0])

      let userExists = await poba.userExists(accounts[0])
      assert.isTrue(userExists)

      await unregisterBankAccount(poba, args1, accounts[0])

      userExists = await poba.userExists(accounts[0])
      assert.isTrue(userExists)
    })
  })

  contract('', accounts => {
    it('should not delete a bank account that a user has not registered', async () => {
      const poba = await PoBA.deployed()
      const bankAccountData1 = { institution: 'Chase' }
      const bankAccountData2 = { institution: 'Chase' }
      const identityNames1 = 'John Doe'
      const identityNames2 = 'Another Doe'

      const args1 = buildRegisterBankAccountArgs(accounts[0], bankAccountData1, identityNames1)
      const args2 = buildRegisterBankAccountArgs(accounts[0], bankAccountData2, identityNames2)

      await registerBankAccount(poba, args1, accounts[0])
      let bankAccountCount = await poba.userBankAccountsLength(accounts[0])
      assert.equal(+bankAccountCount, 1)

      await unregisterBankAccount(poba, args2, accounts[0]).then(
        () => assert.fail(), // should reject
        () => {}
      )

      bankAccountCount = await poba.userBankAccountsLength(accounts[0])
      assert.equal(+bankAccountCount, 1)
    })
  })

  contract('', accounts => {
    it('should decrement totalUsers value if the unregistered bank account was the last one for that user', async () => {
      const poba = await PoBA.deployed()

      let totalUsers = await poba.totalUsers()
      assert.equal(+totalUsers, 0)

      const bankAccountData = { institution: 'Chase' }
      const identityNames = 'John Doe'
      const args = buildRegisterBankAccountArgs(accounts[0], bankAccountData, identityNames)
      await registerBankAccount(poba, args, accounts[0])
      const bankAccountCount = await poba.userBankAccountsLength(accounts[0])
      assert.equal(+bankAccountCount, 1)

      totalUsers = await poba.totalUsers()
      assert.equal(+totalUsers, 1)

      await unregisterBankAccount(poba, args, accounts[0])

      totalUsers = await poba.totalUsers()
      assert.equal(+totalUsers, 0)
    })
  })

  contract('', () => {
    it('should not decrement totalUsers value if the unregistered bank account was not the last one for that user', async () => {
      const poba = await PoBA.deployed()

      let totalUsers = await poba.totalUsers()
      assert.equal(+totalUsers, 0)
      let bankAccounts = await poba.userBankAccountsLength(ethAccount[0])
      assert.equal(+bankAccounts, 0)

      const bankOne = { institution: 'Chase' }
      const bankTwo = { institution: 'Sugar' }
      const identityNames = 'John Doe'
      const args1 = buildRegisterBankAccountArgs(ethAccount[0], bankOne, identityNames)
      await registerBankAccount(poba, args1, ethAccount[0])
      const args2 = buildRegisterBankAccountArgs(ethAccount[0], bankTwo, identityNames)
      await registerBankAccount(poba, args2, ethAccount[0])
      bankAccounts = await poba.userBankAccountsLength(ethAccount[0])
      assert.equal(+bankAccounts, 2)

      await unregisterBankAccount(poba, args1, ethAccount[0])

      totalUsers = await poba.totalUsers()
      assert.equal(+totalUsers, 1)
    })
  })

  contract('', () => {
    it('should decrement totalBankAccounts value', async () => {
      const poba = await PoBA.deployed()
      const accountData = { institution: 'Chase' }
      const identityNames = 'John Doe'
      const args = buildRegisterBankAccountArgs(ethAccount[0], accountData, identityNames)
      await registerBankAccount(poba, args, ethAccount[0])

      let totalBankAccounts = await poba.totalBankAccounts()
      assert.equal(+totalBankAccounts, 1)

      await unregisterBankAccount(poba, args, ethAccount[0])

      totalBankAccounts = await poba.totalBankAccounts()
      assert.equal(+totalBankAccounts, 0)
    })
  })
})

describe('setSigner', () => {
  contract('', accounts => {
    it('should allow the owner to change the signer', async () => {
      const poba = await PoBA.deployed()

      const signerBefore = await poba.signer()

      await poba.setSigner(accounts[1])

      const signerAfter = await poba.signer()

      assert.notEqual(signerBefore, signerAfter)
      assert.equal(accounts[1], signerAfter)
    })
  })

  contract('', accounts => {
    it("should not allow someone that's not the owner to change the signer", async () => {
      const poba = await PoBA.deployed()

      const signerBefore = await poba.signer()

      await poba.setSigner(accounts[2], { from: accounts[1] }).then(
        () => assert.fail(), // should reject
        async () => {
          const signerAfter = await poba.signer()

          assert.equal(signerBefore, signerAfter)
        }
      )
    })
  })
})
