# POA Network - Proof of Bank Account (PoBA)

[![Build Status](https://travis-ci.org/poanetwork/poa-poba.svg?branch=master)](https://travis-ci.org/poanetwork/poa-poba)
[![Coverage Status](https://coveralls.io/repos/github/poanetwork/poa-poba/badge.svg?branch=master)](https://coveralls.io/github/poanetwork/poa-poba?branch=master)
[![dependencies Status](https://david-dm.org/poanetwork/poa-poba/status.svg)](https://david-dm.org/poanetwork/poa-poba)
[![devDependencies Status](https://david-dm.org/poanetwork/poa-poba/dev-status.svg)](https://david-dm.org/poanetwork/poa-poba?type=dev)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
What things you need to do previous to install
- Create a sandbox account on plaid.com, we need some information,  for example:
```
PLAID_CLIENT_ID=1234565b16d38dd9e9b00013178296 
PLAID_SECRET=12345672352d3da02e112fe290e1e8fd2085 
PLAID_PUBLIC_KEY=123456e1e61319a1192b80bd5d09e7c5ac35 
```

### Installing

A step by step series that tell you how to get a development env running

- Clone the repository and move to the directory where we cloned the repository
```
$ git clone git@github.com:poanetwork/poa-poba.gitt
$ cd poa-poba
```

- Install npm dependencies
```
$ npm install
```

- Move to the server folder, copy the file .env.example to .env, and add the plaid information related to the API
```
$ cd server
$ cp .env.example .env
```

- Move to the frontend folder, copy the file .env.example to .env, and add the plaid information related to the API
```
$ cd server
$ cp .env.example .env
```

- In another terminal, move to the directory where we cloned the repository and run the following command
```
$ npm run ganache
```

- In the previous terminal, run the following command
```
$ npm run dev
```
