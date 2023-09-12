import { useEffect, useState } from "react";

interface WebSocketMessage {
  price: number;
}

function MyWebSocket() {
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  useEffect(() => {
    const ws = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin");

    ws.addEventListener("message", (inComingMsg) => {
      const message = JSON.parse(inComingMsg.data) as WebSocketMessage;

      setMessages(() => [message]);
    });
    return () => {
      ws.close;
    };
  }, []);
  return (
    <>
      <h1>BTC PRICE: </h1>
      {messages.map((msg, index) => {
        return <span key={index}>{JSON.stringify(msg)}</span>;
      })}
    </>
  );
}

export default MyWebSocket;
