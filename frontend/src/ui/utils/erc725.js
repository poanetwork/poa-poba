export const CLAIMHOLDERABI = [
  {
    constant: false,
    inputs: [
      { name: '_claimType', type: 'uint256' },
      { name: '_scheme', type: 'uint256' },
      { name: 'issuer', type: 'address' },
      { name: '_signature', type: 'bytes' },
      { name: '_data', type: 'bytes' },
      { name: '_uri', type: 'string' }
    ],
    name: 'addClaim',
    outputs: [{ name: 'claimRequestId', type: 'bytes32' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' },
      { name: '_data', type: 'bytes' }
    ],
    name: 'execute',
    outputs: [{ name: 'executionId', type: 'uint256' }],
    payable: true,
    stateMutability: 'payable',
    type: 'function'
  }
]

export const CLAIM_TYPES_KYC = 7
export const CLAIM_SCHEMES_ECDSA = 1
// @TODO: this is not very well documented on the standard
export const EXECUTE_METHOD_VALUE = 0
// @TODO: add gas estimation
export const EXECUTE_TRANSACTION_GAS = 4612388

/**
 * Execute the corresponding claim addition on the given identity contract.
 * @param {[type]} web3
 * @param {[type]} fromWallet
 * @param {[type]} identityContractAddress
 * @param {[type]} claim
 * @param {Function} cb
 */
export const executeAddClaimOnIdentityContract = async (
  web3,
  fromWallet,
  identityContractAddress,
  claim,
  cb
) => {
  const identityContract = new web3.eth.Contract(CLAIMHOLDERABI, identityContractAddress, {
    from: fromWallet
  })
  const addClaimABI = await identityContract.methods
    .addClaim(
      CLAIM_TYPES_KYC,
      CLAIM_SCHEMES_ECDSA,
      claim.issuer,
      claim.signature,
      claim.data,
      claim.uri
    )
    .encodeABI()
  console.warn(`fromWallet: ${fromWallet}`)
  return identityContract.methods
    .execute(identityContractAddress, EXECUTE_METHOD_VALUE, addClaimABI)
    .send({ gas: EXECUTE_TRANSACTION_GAS, from: fromWallet }, cb)
}
