pragma solidity ^0.4.17;


contract Migrations {
  address public owner;
  uint public lastCompleteMigration;

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  function Migrations() public {
    owner = msg.sender;
  }

  function setCompleted(uint completed) public restricted {
    lastCompleteMigration = completed;
  }

  function upgrade(address newAddress) public restricted {
    Migrations upgraded = Migrations(newAddress);
    upgraded.setCompleted(lastCompleteMigration);
  }
}
