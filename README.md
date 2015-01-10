# [Ledger (frontend)][1]

<a href="https://assembly.com/ledger/bounties">
  <img height="20" src="https://asm-badger.herokuapp.com/ledger/badges/tasks.svg">
</a>

Track your expenses.

This is a product being built by the Assembly community. You can
help push this idea forward by visiting <https://assembly.com/ledger>.

This is the frontend for [ledger-backend][2].

- [Installation](#installation)
- [Configuration](#configuration)
- [Deployment](#deployment)

## Installation

To install ledger-frontend, you'll need Node.js v0.10.

``` sh
$ git clone https://github.com/asm-products/ledger-frontend.git
$ cd ledger-frontend
$ npm install
$ bower install
$ npm run start
# http://localhost:8000
```

## Configuration

To configure ledger-frontend, use environment variables.

``` sh
$ env LEDGER_BACKEND_URL=http://ledger-backend.example.com npm run start
```

## Deployment

To deploy ledger-frontend, create an [OpenShift][3] account.

``` sh
$ rhc app create ledgerfrontend nodejs-0.10
$ cd ledgerfrontend
$ rhc env LEDGER_BACKEND_URL='...'
$ git remote add github https://github.com/asm-products/ledger-frontend.git
$ git pull github master
$ git push origin github/master:master
```

[1]: https://github.com/asm-products/ledger-frontend
[2]: https://github.com/asm-products/ledger-backend
[3]: https://www.openshift.com
