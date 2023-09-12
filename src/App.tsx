import { useState, useEffect } from "react";

interface WebSocketMessage {
  // Define the structure of your WebSocket message here
  // For example:
  price: number;
  // Add other properties as needed
}

function App() {
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);

  // Add an event listener to handle incoming WebSocket messages
  useEffect(() => {
    const ws = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin");
    ws.addEventListener("message", (event) => {
      // Parse the JSON message received from the WebSocket
      const message = JSON.parse(event.data) as WebSocketMessage;

      // Update the state with the new message
      setMessages(() => [message]);
    });

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h1>Hello shell hacks</h1>
      <div>
        <h2>Incoming Messages:</h2>

        {messages.map((message, index) => (
          <span key={index}>{JSON.stringify(message)}</span>
        ))}
      </div>
    </div>
  );
}

export default App;
