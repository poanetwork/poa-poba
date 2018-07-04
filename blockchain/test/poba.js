const PoBA = artifacts.require('PoBA')

contract('ownership', () => {
  it('signer should be equal to owner', async () => {
    const poba = await PoBA.deployed()
    const owner = await poba.owner()
    const signer = await poba.signer()
    assert.equal(owner, signer)
  })
})
