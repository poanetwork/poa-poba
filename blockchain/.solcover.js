module.exports = {
  testrpcOptions: '-p 8555 --mnemonic "gauge pilot return sauce iron woman reason ridge across kangaroo sorry ritual"',
  compileCommand: '../node_modules/.bin/truffle compile',
  testCommand: '../node_modules/.bin/truffle test --network coverage',
  skipFiles: ['ERC20.sol', 'TestERC20.sol'],
};
