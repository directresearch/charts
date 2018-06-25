# DirectResearch Charts

Webpack based boilerplate for producing charts (Input: ES6, Output: universal library)

[![StyleCI](https://github.styleci.io/repos/137753828/shield?branch=master)](https://github.styleci.io/repos/137753828)


*Have in mind that you have to build your library before publishing. The files under the `lib` folder are the ones that should be distributed.*

## Getting started

1. Build your library
  * Run `yarn install` (recommended) or `npm install` to get the project's dependencies
  * Run `yarn build` or `npm run build` to produce minified version of your library.
2. Development mode
  * Having all the dependencies installed run `yarn dev` or `npm run dev`. This command will generate an non-minified version of your library and will run a watcher so you get the compilation on file change.
3. Running production
  * Run `yarn build` or `npm run build`
  * Bump version number in package.json
  * Make new release in github `https://github.com/directresearch/charts/releases/new` with the same version number as package.json
  * Check `jsdelivr` if new version is available thru there cdn `https://cdn.jsdelivr.net/gh/directresearch/charts/`
  
## Usage in Angular frontend

1. Change correct version from `https://cdn.jsdelivr.net/gh/directresearch/charts/` in `index.blade.php`

## Scripts

* `yarn build` or `npm run build` - produces production version of your library under the `lib` folder
* `yarn dev` or `npm run dev` - produces development version of your library and runs a watcher
