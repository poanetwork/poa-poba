pragma solidity ^0.4.4;


contract PoBA {
  address public owner;
  address public signer;

  mapping (address => string[]) public accounts;

  constructor() {
    owner = msg.sender;
    signer = owner;
  }

  function signerIsValid(bytes32 data, uint8 v, bytes32 r, bytes32 s)
  public constant returns (bool)
  {
      bytes memory prefix = "\x19Ethereum Signed Message:\n32";
      bytes32 prefixed = keccak256(prefix, data);
      return (ecrecover(prefixed, v, r, s) == signer);
  }

  function register(string account, uint8 v, bytes32 r, bytes32 s) {
    require(bytes(account).length > 0);

    bytes32 hash = keccak256(msg.sender, account);
    require(signerIsValid(hash, v, r, s));

    accounts[msg.sender].push(account);
  }

  function accountsLength(address _address) public constant returns (uint256) {
    return accounts[_address].length;
  }
}
