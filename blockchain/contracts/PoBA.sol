pragma solidity ^0.4.4;


contract PoBA {
  address public owner;
  address public signer;

  constructor() public {
    owner = msg.sender;
    signer = owner;
  }

  struct BankAccount {
    string bankName;
    string identityNames;
    uint256 attestationDate;
    bool attestationFact;
    bytes32 keccakIdentifier;
    uint256 creationBlock;
  }

  struct User {
    uint256 creationBlock;
    BankAccount[] bankAccounts;
  }

  mapping (address => User) public users;

  // Stats:
  uint64 public totalUsers;
  uint64 public totalBankAccounts;

  // Events:
  event LogBankAccountRegistered(address indexed wallet, bytes32 keccakIdentifier);
  event LogBankAccountUnregistered(address indexed wallet, bytes32 keccakIdentifier);
  event LogSignerChanged(address newSigner);

  // Modifiers:
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  modifier checkUserExists(address wallet) {
    require(userExists(wallet));
    _;
  }

  function signerIsValid(bytes32 data, uint8 v, bytes32 r, bytes32 s)
  public constant returns (bool)
  {
    bytes memory prefix = "\x19Ethereum Signed Message:\n32";
    bytes32 prefixed = keccak256(abi.encodePacked(prefix, data));
    return (ecrecover(prefixed, v, r, s) == signer);
  }

  function userExists(address wallet)
  public view returns (bool)
  {
    return (users[wallet].creationBlock > 0);
  }

  // Methods:
  // set address that is used on server-side to calculate signatures
  // and on contract-side to verify them
  function setSigner(address newSigner) public onlyOwner {
    signer = newSigner;
    emit LogSignerChanged(newSigner);
  }

  function registerBankAccount(
    string institution,
    string names,
    uint8 v, bytes32 r, bytes32 s) public {

    require(bytes(institution).length > 0);
    require(bytes(names).length > 0);
    require(users[msg.sender].bankAccounts.length < 2**256-1);

    if (!userExists(msg.sender)) {
      // new user
      users[msg.sender].creationBlock = block.number;
      totalUsers += 1;
    }

    BankAccount memory ba;

    ba.bankName = institution;
    ba.identityNames = names;
    ba.attestationDate = now;
    ba.attestationFact = true;
    ba.creationBlock = block.number;

    bytes32 hash = keccak256(abi.encodePacked(msg.sender, ba.bankName, ba.identityNames));
    require(signerIsValid(hash, v, r, s));
    ba.keccakIdentifier = hash;

    users[msg.sender].bankAccounts.push(ba);
    totalBankAccounts += 1;

    emit LogBankAccountRegistered(msg.sender, ba.keccakIdentifier);
  }

  function unregisterBankAccount(string institution, string names)
  public checkUserExists(msg.sender)
  {
    bool found;
    uint256 index;
    (found, index) = userBankAccountByBankAccount(msg.sender, institution, names);
    require(found);

    // Store keccakIdentifier for logging purpose
    bytes32 keccakIdentifier = users[msg.sender].bankAccounts[index].keccakIdentifier;

    // Remove bank account from the list
    uint256 length = users[msg.sender].bankAccounts.length;

    if (index != length - 1) {
      users[msg.sender].bankAccounts[index] = users[msg.sender].bankAccounts[length - 1];
    }
    users[msg.sender].bankAccounts.length--;
    totalBankAccounts -= 1;

    if (users[msg.sender].bankAccounts.length == 0) {
      delete users[msg.sender];
      totalUsers -= 1;
    }

    emit LogBankAccountUnregistered(msg.sender, keccakIdentifier);
  }

  // returns (found/not found, index if found/0 if not found, confirmed/not confirmed)
  function userBankAccountByBankAccount(address wallet, string institution, string names)
  public view checkUserExists(wallet) returns(bool, uint256)
  {
    bytes32 keccakIdentifier = keccak256(abi.encodePacked(wallet, institution, names));
    return userBankAccountByKeccakIdentifier(wallet, keccakIdentifier);
  }

  // returns (found/not found, index if found/0 if not found, confirmed/not confirmed)
  function userBankAccountByKeccakIdentifier(address wallet, bytes32 keccakIdentifier)
  public view checkUserExists(wallet) returns(bool, uint256)
  {
    for (uint256 ai = 0; ai < users[wallet].bankAccounts.length; ai++) {
      if (users[wallet].bankAccounts[ai].keccakIdentifier == keccakIdentifier) {
        return (true, ai);
      }
    }
    return (false, 0);
  }

  function userBankAccountsLength(address _address) public constant returns (uint256) {
    return users[_address].bankAccounts.length;
  }

  function getBankAccountsByAddress(address _address, uint256 addressIndex) public constant
  returns (bytes32 keccakIdentifier, string bankName, string identityNames, uint256 attestationDate)
  {
    return (
      users[_address].bankAccounts[addressIndex].keccakIdentifier,
      users[_address].bankAccounts[addressIndex].bankName,
      users[_address].bankAccounts[addressIndex].identityNames,
      users[_address].bankAccounts[addressIndex].attestationDate
    );
  }
}
