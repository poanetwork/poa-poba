const path = require('path')
const shell = require('shelljs')
const { exec } = require('child_process')
const kill = require('tree-kill')

const rootDir = path.resolve(__dirname, '..')
const frontendDir = path.resolve(rootDir, 'frontend')
const blockchainDir = path.resolve(rootDir, 'blockchain')

async function main() {
  // start ganache
  shell.cd(rootDir)
  // const ganache = shell.exec('npm run ganache', { async: true })
  const ganache = exec('npm run ganache', { detached: true })
  ganache.stdout.on('data', console.log)
  await isGanacheListening(ganache)

  // deploy contracts
  shell.cd(blockchainDir)
  shell.exec('npm run migrate')

  // run tests
  shell.cd(frontendDir)
  shell.env['CI'] = 'true' // run tests only once
  const testsCode = shell.exec('npm test').code

  kill(ganache.pid, () => {
    shell.exit(testsCode)
  })
}

function isGanacheListening(ganache) {
  return new Promise(resolve => {
    ganache.stdout.on('data', data => {
      if (data.includes('Listening')) {
        resolve()
      }
    })
  })
}

main()
