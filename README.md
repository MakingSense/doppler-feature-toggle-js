# TESTING CI

# Doppler Feature Toggle JavaScript Client

JavaScript client of our simple feature toggle system based on a JSON file over HTTP.

I am doing this project as part of [Making Sense's Self Training Program](http://confluence.makingsense.com/display/DD/Training+program).

The objective of this training is refreshing my knowledge on several technologies (TypeScript, Node, ES Modules) but mainly in the way to work with them to create a library (builds, tests, versions, continuous integration, packages, CDN).

See more details in [CAP-215](http://jira.makingsense.com/browse/CAP-215).

## Usage

Nothing useful to use yet.

## Development

### Yarn scripts

- `yarn run test`: Run test suite
- `yarn run test:watch`: Run test suite in [interactive watch mode](http://facebook.github.io/jest/docs/cli.html#watch)
- `yarn run test:prod`: Run tests, format validator, linting and generate coverage (not yet)
- `yarn run build`: Generate bundles and typings
- `yarn run start`: Run build in watch mode

### Using with Docker

- `sh ./build-w-docker.sh`: Execute `yarn run test:prod` into a Docker Node container.

### Architecture and other decisions

It is based on [TypeScript library starter](https://github.com/alexjoverm/typescript-library-starter), but in place of using it as it is, the project has been created from the scratch and taking different decisions.

#### TypeScript library starter resources

- [Write a library using TypeScript library starter](https://dev.to/alexjoverm/write-a-library-using-typescript-library-starter) by [@alexjoverm](https://github.com/alexjoverm/)
- [📺 Create a TypeScript Library using typescript-library-starter](https://egghead.io/lessons/typescript-create-a-typescript-library-using-typescript-library-starter) by [@alexjoverm](https://github.com/alexjoverm/)
- [Introducing TypeScript Library Starter Lite](https://blog.tonysneed.com/2017/09/15/introducing-typescript-library-starter-lite/) by [@tonysneed](https://github.com/tonysneed)

### Other resources

- https://github.com/tonysneed/typescript-library-starter-lite
- https://github.com/Hotell/typescript-lib-starter
- https://www.tsmean.com/articles/how-to-write-a-typescript-library/
- https://github.com/bersling/typescript-library-starter
- https://github.com/ospatil/generator-node-typescript
- https://github.com/bitjson/typescript-starter
- https://codeburst.io/https-chidume-nnamdi-com-npm-module-in-typescript-12b3b22f0724

Thanks to @joaquinicolas and @matiasbeckerle for sharing some of these links with me.

### Yarn vs NPM

_TypeScript library starter_ was using NPM. It is more advanced than the last version that I used before. For example it has a lock file like Yarn. 

But some experiments gave me some issues in Travis running _npm ci_, so I prefer trying with Yarn.

### Commit messages

I will use [Angular's Commit Message Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit) in order to generate release notes automatically using [semantic release](https://github.com/semantic-release/semantic-release).

I like using rebase and merge, without squashing commits, I am not sure if it will work fine with semantic release, let's try.

Thanks to @stirelli for helping me with it.

### Bundles and distribution

_TypeScript library starter_ has building UMD and ES5 bundles out of the box, but I also want to use my library by linking the script file from a CDN source and Rollup is ready for that. 

I have configured it using [the convention described by Axel Rauschmayer](http://2ality.com/2017/04/setting-up-multi-platform-packages.html#browser-browser-specific-code)
