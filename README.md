SHELLHACKS WORKSHOP: How-to:

Today we are going to learn a bit about web development. How to create an application using React. Tools we will learn a bit about are: nodejs, npm, vite.

We will be using the Websocket API from JavaScript to connect to a public server to get realtime Bitcoin pricing data and use React to create a UI to display it.

**Quick Links**

---

- VisualStudio: https://visualstudio.microsoft.com/downloads/
- NodeJs v.18 LTS (includes npm): https://nodejs.org/

---

**Prerequisite Guide for Creating a Simple React App:**

For Windows users:
https://learn.microsoft.com/en-us/windows/wsl/install

In power shell:

1. wsl --install
2. Once you have installed WSL, you will need to create a user account and password for your newly installed Linux distribution

Mac/Linux

1.  **Install Node.js and npm:**

1.  Go to https://nodejs.org/ and download the LTS version
    1. (Can someone tell me what LTS stands for?)
1.  - Make sure you have Node.js and npm (Node Package Manager) installed on your computer. Version 18 specifically

      ```bash
      node -v
      npm -v
      ```

      1.1
      sudo apt-get update
      sudo apt-get install nodejs npm

1.  **Install a Code Editor:**

Visual Studio Code:
https://code.visualstudio.com/download

2. **Setting up: Automatic formatting on save**

   2.1 Go to preferences:

   MacOS: `cmd+Shift+p`

   Windows: `ctrl+Shift+p`

   Linux: `ctrl+Alt+p`
   this can very on Linux :octocat:

[![Setup auto format on save](https://img.youtube.com/vi/WCsHvCdyPY8/0.jpg)](https://www.youtube.com/watch?v=WCsHvCdyPY8)

3. **Create a New React App:**

   - Open your terminal or command prompt.
   - Run the following command to create a new React app using Create React App:

     ```bash/bash
     npm create vite@latest
     ```

\*\*\* Follow the instructions on the terminal
$ cd btc-price-ws
$ npm install
$ npm run dev

** Vite is a build tool and development server that is designed to enhance the development experience for modern web applications, including those built with JavaScript frameworks like React, Vue.js, and others. Vite, which means "fast" in French, **

     Replace `my-react-app` with your preferred project name.

4. **Navigate to Your App's Directory:**

   - Change your working directory to the newly created app folder:

     ```bash
     cd my-react-app
     ```

5. **Start the Development Server:**

   - Start the development server to run your React app locally. Run the following command:

     ```bash
     npm run dev
     ```

   - Your React app will be available at `http://localhost:3000` by default. Open this URL in your web browser.

6. **Edit and Develop Your React App:**

   - Use your chosen code editor to modify the source code located in the `src` directory.
   - The main React component is located in the `src/App.js` (or `src/App.jsx`) file. You can start editing this file to build your app.

7. **Add Additional Packages (Optional):**

   socket.io

   import { io } from "socket.io-client";

   npm install socket.io-client

   nom i

   - Depending on your project requirements, you may need to install additional npm packages for state management, routing, styling, etc. Install them using `npm install`.

8. **Build for Production (Optional):**

   - When you're ready to deploy your app, you can create a production build by running:

     ```bash
     npm run build
     ```

   - This command will generate an optimized build of your app in the `build` directory.

9. **Deploy Your React App (Optional):**

   - Deploy your React app to a web hosting platform or server of your choice. Common options include Netlify, Vercel, GitHub Pages, or a traditional web host.

That's it! You've completed the prerequisite guide for creating a simple React app. This guide will help you get started with setting up your development environment and building a basic React application.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
