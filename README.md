# Sandbox

> Code executor in sandbox

## Summary :memo:

- [Motivation](#Motivation)
- [Architecture](#Architecture)
- [Prerequisites](#Prerequisites)
- [Installing](#Installing)
- [Proof of concepts](#proof-of-concepts)
- [Next steps](#next-steps)
- [Built With](#built-with)
- [Contributing](#Contributing)
- [License](#License)

## Motivation :gift_heart:

The goal of this project is to permit execute code from a determined source(actualy only git pr's are open) and limit time of execution, cpu consumition and memory consumition.

## Architecture :hammer:

It is the initial architecture and we are basically doing:

- Downloading source code
- Creating a image
- Creating a container
- Starting a container

[Here](#next) you can see the next steps of this project and possible modifications in architecture.

<p align="center">
<img src="https://i.ibb.co/xGMWw7X/initialarchitecture.png" 
    alt="Application architecture"
/>
</p>

## Getting Started :computer:

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Docker](https://docs.docker.com/get-docker/) and [NodeJS](https://nodejs.org/en/download/) already installed to follow the nexts steps.

Your docker must be able to recive requests. [Here](https://nodejs.org/en/download/) you can see how to enable it.

### Installing

A step by step series of examples that tell you how to get a development env running

Cloning project

```bash
git clone https://github.com/thierrysantos/sandbox.git
```

Installing project depencies

```bash
yarn
# or 
npm install
```

Start project

```bash
yarn start:dev
# or
npm run start:dev
```

## Proof of concepts :clipboard: 

- Executing NodeJS code - [Executing NodeJS code](https://github.com/thierrysantos/sandbox-example)

## Next steps :snowboarder:

- [ ] Add a test suit to project
- [ ] Dockerize project
- [ ] Improve error handling
- [ ] Add state management (This feature will help us to launch another instance of the api and continue from x step)
- [ ] Use Dockerfile from source code if already exists in project
- [ ] Add support to run another commands in build image
- [ ] Add support to run other languages
- [ ] Add a supervisor to clear the enviroment(containers, images...)
- [ ] Add a support to stop and remove a containers after x running time
- [ ] Add a support to limit memory consumition
- [ ] Add a support to limit cpu consumition
- [ ] Add a support to environment variables
- [ ] Add a support to get the result from container execution
- [ ] Learn possible of migration to kubernetes
- [ ] Add github actions

## Built With :gem:

* [Typescript](https://www.typescriptlang.org/) - TypeScript is a typed superset of JavaScript that compiles to plain JavaScript
* [Docker REST API](https://docs.docker.com/engine/api/v1.40/) - Docker REST API

## Contributing :sparkling_heart:
 
Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

 
## Authors :pencil2:

* **Thierry Santos** - *Initial work* - [Thierry Santos](https://github.com/thierrysantos)

See also the list of [contributors](https://github.com/thierrysantos/sandbox/contributors) who participated in this project.

## License :newspaper:

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details