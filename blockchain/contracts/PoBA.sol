pragma solidity ^0.4.4;


contract PoBA {
  address public owner;
  address public signer;

  constructor() {
    owner = msg.sender;
    signer = owner;
  }

  struct BankAccount {
    string accountNumber;
    string bankName;
    uint256 attestationDate;
    bool attestationFact;

    uint256 creationBlock;
  }

  struct User {
    uint256 creationBlock;
    BankAccount[] bankAccounts;
  }

  mapping (address => User) public users;

  function signerIsValid(bytes32 data, uint8 v, bytes32 r, bytes32 s)
  public constant returns (bool)
  {
      bytes memory prefix = "\x19Ethereum Signed Message:\n32";
      bytes32 prefixed = keccak256(prefix, data);
      return (ecrecover(prefixed, v, r, s) == signer);
  }

  function register(
    string account,
    string institution,
    uint8 v, bytes32 r, bytes32 s) {

    require(bytes(account).length > 0);
    require(bytes(institution).length > 0);
    require(users[msg.sender].bankAccounts.length < 2**256-1);

    users[msg.sender].creationBlock = block.number;

    BankAccount memory ba;

    ba.accountNumber = account;
    ba.bankName = institution;
    ba.attestationDate = now;
    ba.attestationFact = true;
    ba.creationBlock = block.number;

    bytes32 hash = keccak256(
      msg.sender,
        ba.accountNumber,
        ba.bankName,
        ba.attestationDate,
        ba.attestationFact
    );
    require(signerIsValid(hash, v, r, s));

    users[msg.sender].bankAccounts.push(ba);
  }

  function accountsLength(address _address) public constant returns (uint256) {
    return users[_address].bankAccounts.length;
  }
}
