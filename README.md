# **Algorand Custody**

Built for the Algorand + Tatum [gitcoin hackathon](https://gitcoin.co/issue/algorandfoundation/grow-algorand/122/100027180) to demonstrate how easy it is to build on top of Tatum.

### Disclaimer: This project isn't audited and you shouldn't use it in a production environment

## Try it out -> [Demo Site](http://20.123.179.17:8080/) (Testnet)

![](https://s10.gifyu.com/images/wallet39c3442aee7b019bb.png)

## Tech Stack

- Tatum
- Blitzjs
- Sqlite
- React
- Prisma
- Chakra Ui

## How to spin up

### Install blitz

```
yarn global add blitz
```
and

```
npm install -g blitz --legacy-peer-deps
```

### Install packages

```
yarn
```

### Create the database

```
blitz prisma migrate dev
```

### Setup .env variables

Sign up for a free Tatum API key [here](https://dashboard.tatum.io/sign-up)

```
TATUM_API_KEY=
```

Sign up for a free Purestake Algorand Indexer API key [here](https://developer.purestake.io/)

This is needed because currently Tatum doesn't support transaction indexing

```
ALGORAND_TESTNET_API_KEY=
```

### Start the server in development mode
```
blitz dev --port 8080
```

Open [http://localhost:8080](http://localhost:8080) with your browser to see the result.

## Tests

Runs your tests using Jest.

```
yarn test
```

Blitz comes with a test setup using [Jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/).

## Commands

Blitz comes with a powerful CLI that is designed to make development easy and fast. You can install it with `npm i -g blitz`

```
  blitz [COMMAND]

  dev       Start a development server
  build     Create a production build
  start     Start a production server
  export    Export your Blitz app as a static application
  prisma    Run prisma commands
  generate  Generate new files for your Blitz project
  console   Run the Blitz console REPL
  install   Install a recipe
  help      Display help for blitz
  test      Run project tests
```

You can read more about it on the [CLI Overview](https://blitzjs.com/docs/cli-overview) documentation.

## What's included?


### Tools included

Blitz comes with a set of tools that corrects and formats your code, facilitating its future maintenance. You can modify their options and even uninstall them.

- **ESLint**: It lints your code: searches for bad practices and tell you about it. You can customize it via the `.eslintrc.js`, and you can install (or even write) plugins to have it the way you like it. It already comes with the [`blitz`](https://github.com/blitz-js/blitz/tree/canary/packages/eslint-config) config, but you can remove it safely. [Learn More](https://blitzjs.com/docs/eslint-config).
- **Husky**: It adds [githooks](https://git-scm.com/docs/githooks), little pieces of code that get executed when certain Git events are triggerd. For example, `pre-commit` is triggered just before a commit is created. You can see the current hooks inside `.husky/`. If are having problems commiting and pushing, check out ther [troubleshooting](https://typicode.github.io/husky/#/?id=troubleshoot) guide. [Learn More](https://blitzjs.com/docs/husky-config).
- **Prettier**: It formats your code to look the same everywhere. You can configure it via the `.prettierrc` file. The `.prettierignore` contains the files that should be ignored by Prettier; useful when you have large files or when you want to keep a custom formatting. [Learn More](https://blitzjs.com/docs/prettier-config).
