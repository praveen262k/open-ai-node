### Configurations
create a .env file in the root of the application (never add this file to stash repository)

Add below keys to your .env file 

```
OPEN_API_KEY=YOUR KEY
```

### Install and run

```
yarn install

yarn start

```

http://localhost:3009/

## Simple starter kit for quick POC purposes only

* with react 18 as front server side render enabled 
* spins up an end point to host api within the same application.
* Supports TS
* Webpack module federation is enabled
* OpenAI packages are included and sample API is included (read the need for env definitions)
* Under /tools/ directory there is a postman file in case you want to test your apis quickly.

## Checklist before you run

create a .env file in the root of the application (never add this file to stash repository)

Add below keys to your .env file
<code>
OPEN_API_KEY=YOUR KEY
</code>

###OpenAI 3 things you can do now in this kit
* /api/ask.js has an example on chat completion integration darwin syntax
* /api/chat.js has an example on chat completion integration using turbo version syntax
* /api/fn.js has an example on function calling chat completion integration, look at below section for more information

#### Specific to function
Typical usage of function call involves, defining the function model parameters. And second, defining the function - actual implementation that takes parameters and returns json response for OpenAI to infer.

So as **Step#1** I included both the function model and the function implementation in one file and export them in below structure
```
const getWeatherMeta = {
    // define the function model
};

const getWeather = (params) => {
    // implement api call and return the weather as json
};

export default {
  fn: getWeather,
  meta: getWeatherMeta,
};
```

Step#2: Import the file to registry.js
```
Follow the steps inside this file. 3 steps have been documented.

```
IMPORTANT: This is the NOT definetly the best or right way to do but just to make development quick for POC 

Restart the application for every change, then you are all done (till HMR is done :))


#### Things to do ###

- [X] Basic react 18 server side rendering
- [X] Enable react pipe stream support
- [X] Add API route support
- [X] Enable JSON parsing to express JS
- [X] Enable Environment variables support
- [X] Add Open AI modules
- [X] Add an example Open AI completion api endpoint
- [X] Add axios support
- [ ] Add Graph API support
- [ ] Enable HMR support
- [X] Add an example for ChatGPT function
- [X] Add an example for ChatGPT gpt turbo model
- [X] Add postman file for quick run
- [ ] Add environment variables to postman 
- [X] React UI to submit prompts
- [ ] Add web component example
- [ ] Service worker support
- [ ] WASM Example
- [ ] NX?
- [ ] TSUP addition
- [ ] @mantine
- [ ] zustand
- [ ] Socket example
- [ ] Rust based build

#### Noteworthy references
* https://towardsdatascience.com/custom-informed-gpt-3-models-for-your-website-with-very-simple-code-47134b25620b
* https://pub.towardsai.net/build-chatgpt-like-chatbots-with-customized-knowledge-for-your-websites-using-simple-programming-f393206c6626
* https://www.youtube.com/watch?v=432thqUKs-Y
* https://www.youtube.com/watch?v=-LNcpralkjM
* 