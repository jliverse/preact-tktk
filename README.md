## Installation

Install dependencies using [Yarn](https://yarnpkg.com):
```sh
yarn install
```

This software uses [webpack] to compile JavaScript, [Less](https://lesscss.org/) styles, images and sound clips into a single package. Browser compatibility is automated using [Babel](https://babeljs.io/) and includes Internet Explorer 11 and the two (2) most recent versions of other major desktop browsers.

## Development
Start a local server:
```sh
yarn start
```
Run tests using [Jest](https://facebook.github.io/jest/):
```sh
yarn test
```
…or test continuously as you make changes with:
```sh
yarn jest
```
Run UI tests in a browser using [Tape](https://github.com/substack/tape):
```sh
yarn test:browser
```
Run all tests and create a production-ready release in `public`:
```sh
yarn release
