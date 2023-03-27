# ![WebApp](screenshots/Music-App.png)

<h1 align="center">Web Music</h1>

<p align="left">The WebPlayer is a cloud-based music storage platform that allows users to upload their music and access it anywhere, anytime, directly from the internet. With the ability to access a personal music library from anywhere with an internet connection, the Web Music is the perfect choice for music lovers on the go.</p>

## Technologies

Project is created with:

- Vue: 3.2.47
- Pinia: 2.0.33
- Vite: 4.1.4
- Tailwindcss: 3.2.7
- Firebase: 9.17.2

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
