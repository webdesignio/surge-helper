'use strict'

const { existsSync } = require('fs')
const { homedir } = require('os')
const { spawnSync } = require('child_process')
const netrc = require('netrc')

module.exports = { login, generateConfig }

function login (args) {
  const surgeBin = require.resolve('surge/../.bin/surge')
  const child = spawnSync(surgeBin, ['login'], { stdio: 'inherit' })
  return Promise.resolve(null)
}

function generateConfig (args) {
  const netrcExists = existsSync(`${homedir()}/.netrc`)
  if (!netrcExists) return Promise.resolve(null)
  const rc = netrc()
  const foundKeys = Object.keys(rc).filter(k => k.indexOf('surge.sh') !== -1)
  if (!foundKeys.length) return Promise.resolve(null)
  const data = rc[foundKeys[0]]
  return Promise.resolve({ email: data.login, token: data.password })
}
