import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import MyWebSocket from "./WebSocket.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MyWebSocket></MyWebSocket>
  </React.StrictMode>
);
