const path = require('path')
const shell = require('shelljs')

const rootDir = path.resolve(__dirname, '..')
const frontendDir = path.resolve(rootDir, 'frontend')
const serverDir = path.resolve(rootDir, 'server')

// Build frontend
shell.cd(frontendDir)

const buildStatusCode = shell.exec('npm run build').code

if (buildStatusCode !== 0) {
  shell.echo('Error: couldn\'t build frontend app')
  shell.exit(1)
}

// Use new build
const buildDir = path.resolve(frontendDir, 'build')
const publicDir = path.resolve(serverDir, 'public')

shell.rm('-rf', publicDir)
shell.cp('-r', buildDir, publicDir)
