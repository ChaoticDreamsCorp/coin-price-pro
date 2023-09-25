# SHELLHACKS WORKSHOP HACKER GUIDE

Today we are going to learn a bit about web development. How to create an application using React. Tools we will learn a bit about are: **Node.js**, **NPM**, **Vite**.

We will be using the Websocket API from JavaScript to connect to a public server to get realtime Bitcoin pricing data and use React to create a UI to display it.

**Quick Links**

---

- VisualStudio: https://visualstudio.microsoft.com/downloads/
- NodeJs v.18 LTS (includes npm): https://nodejs.org/
- Public WSS: `wss://ws.coincap.io/prices?assets=bitcoin`
- https://www.npmjs.com/
- https://vitejs.dev/
- https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
  
---

**Prerequisite Guide for Creating a Simple React App:**

For Windows users:
https://learn.microsoft.com/en-us/windows/wsl/install

In Windows Powershell:

1. `wsl --install`
2. Once you have installed WSL, you will need to create a user account and password for your newly installed Linux distribution

### Mac/Linux

1.  **Install Node.js and npm:**

1.  Go to https://nodejs.org/ and download the LTS version
    1. (Can someone tell me what LTS stands for?)
2. Make sure you have Node.js and npm (Node Package Manager) installed on your computer. Version 18 specifically

      ```bash
      node -v
      npm -v
      ```
      1.1 Linux
      ```bash
      sudo apt-get update
      ```
      ```bash
      sudo apt-get install nodejs npm
      ```
1.  **Install a Code Editor:**
Visual Studio Code:
https://code.visualstudio.com/download
2. **Setting up: Automatic formatting on save**
   - 2.1 Go to preferences:
   MacOS: `cmd+Shift+p`
   Windows: `ctrl+Shift+p`
   Linux: `ctrl+Alt+p` ( this can very on Linux :octocat: )
   - 2.2 On the preference search bar type: format on save
   Video Here:
   [![Setup auto format on save](https://img.youtube.com/vi/WCsHvCdyPY8/0.jpg)](https://www.youtube.com/watch?v=WCsHvCdyPY8)
3. **Create a New React App:**
   - Open your terminal or command prompt.
   - Run the following command to create a new React app using Create React App:
     ```bash/bash
     npm create vite@latest
     ```
**Follow the instructions on the terminal**
```bash
 cd btc-price-ws
```

```bash
 npm install
```

```bash
npm run dev
```

** Vite is a build tool and development server that is designed to enhance the development experience for modern web applications, including those built with JavaScript frameworks like React, Vue.js, and others. Vite, which means "fast" in French, **

     Replace `my-react-app` with your preferred project name.

4. **Navigate to Your App's Directory:**

   - Change your working directory to the newly created app folder:

     ```bash
     cd my-react-app (the name of your project)
     ```
5. **Start the Development Server:**
   - Start the development server to run your React app locally. Run the following command:
     ```bash
     npm run dev
     ```
   - Your React app will be available at `http://localhost:5173` by default.
     But could be a different port depending on your machine so click on whichever localhost:port combination your machine tells you. Open this URL in your web browser.
     ![Default Port](public/static/localhost_port.png)

6. **Edit and Develop Your React App:**
   - Use your chosen code editor to modify the source code located in the `src` directory.
   - The main React component is located in the `src/App.js` (or `src/App.jsx`) file. You can start editing this file to build your app.
7. **Add Additional Packages (Optional):**

   package: socket.io

   importing in code: import { io } from "socket.io-client";

   npm i (shorthand for install)

   npm install socket.io-client

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

## Next Steps: Take this App all the way!

This code appears to be a React component that establishes a WebSocket connection to retrieve the price of Bitcoin (BTC) from the "wss://ws.coincap.io/prices?assets=bitcoin" WebSocket endpoint. It then displays the received WebSocket messages on the webpage. To take this proof of concept (POC) further and integrate it with other APIs, you can follow these steps:

1. **API Integration**:

   - Decide which other APIs you want to integrate with. This could include cryptocurrency data APIs, financial market APIs, or any other data source that you find relevant to your application.

2. **Component Refactoring**:

   - Refactor the existing `WebSocket2` component to make it more reusable and generic. You can create a new component, such as `CryptoPriceTracker`, and pass in the WebSocket URL as a prop.

   ```jsx
   // CryptoPriceTracker.js
   import React, { useEffect, useState } from "react";

   function CryptoPriceTracker({ websocketUrl }) {
     // ... rest of the component code
   }

   export default CryptoPriceTracker;
   ```

3. **WebSocket Configuration**:

   - Modify the `CryptoPriceTracker` component to accept the WebSocket URL as a prop and make the WebSocket connection dynamic. This allows you to reuse the component for different cryptocurrencies or data sources.

   ```jsx
   function CryptoPriceTracker({ websocketUrl }) {
     const [messages, setMessages] = useState([]);

     useEffect(() => {
       const ws = new WebSocket(websocketUrl);

       ws.addEventListener("message", (event) => {
         const message = JSON.parse(event.data) as WebSocketMessage;
         setMessages((prevMessages) => [...prevMessages, message]);
       });

       return () => {
         ws.close();
       };
     }, [websocketUrl]);

     // ... rest of the component code
   }
   ```

4. **API Integration**:

   - For each additional API you want to integrate with, create a new instance of the `CryptoPriceTracker` component, passing in the appropriate WebSocket URL as a prop. You can do this within your main application component or route.

   ```jsx
   import React from "react";
   import CryptoPriceTracker from "./CryptoPriceTracker";

   function App() {
     return (
       <div>
         <CryptoPriceTracker websocketUrl="wss://ws.coincap.io/prices?assets=bitcoin" />
         <CryptoPriceTracker websocketUrl="wss://ws.example.com/other-crypto" />
         {/* Add more instances for other APIs */}
       </div>
     );
   }

   export default App;
   ```

5. **Data Presentation**:

   - Customize the presentation of data for each API. You may want to create separate components or sections for each cryptocurrency or data source to display relevant information.

6. **Error Handling**:

   - Implement error handling for WebSocket connections and API requests. Handle cases where the WebSocket connection fails or data retrieval encounters issues.

7. **Optimization**:

   - Consider optimizing the component to prevent excessive updates or memory leaks. You can limit the number of displayed messages or implement pagination for historical data.

8. **Documentation**:

   - Document your code and components, especially if you plan to collaborate with others or maintain the project over time.

9. **Testing**:

   - Write tests to ensure the reliability and correctness of your components, especially when dealing with real-time data.

10. **Styling and UI Enhancements**:
    - Improve the user interface and styling to make the information more visually appealing and user-friendly.

By following these steps, you can extend your POC to integrate with multiple APIs and present data from different sources within your React application. This approach makes your code more modular and maintainable, allowing you to add new data sources and functionalities more easily in the future.

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

# Configuring Firebase Local Emulators
Requirements:
- Install firebase tools cli: `curl -sL firebase.tools | bash`
- You should have a `firebase-admin.json` file in the project root. This file will contain service account keys for firebase-admin. This is required in order to run the emulators.

Sample `firebase-admin.json` JSON:
```
{
  "type": "service_account",
  "project_id": "project-id-here",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----some-key-here\n-----END PRIVATE KEY-----\n",
  "client_email": "...",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "...",
  "client_x509_cert_url": "...",
  "universe_domain": "..."
}
```

- Next run: `npm run emulators`
- Next run: `npm run server:dev`