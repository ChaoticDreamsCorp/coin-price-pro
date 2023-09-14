import { useState, useEffect } from "react";
import { 
  createPriceWebSocketConn, 
  addWebSocketEventListener,
} from "./PriceWebSocket";
import { WebSocketMessage } from "./types";
import { formatCurrency } from "../../utils";

function PriceWebSocket() {
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const ws = createPriceWebSocketConn("wss://ws.coincap.io/prices?assets=bitcoin");

  useEffect(() => {
    const cleanup = addWebSocketEventListener(ws, (messages) => {
      return setMessages(messages);
    });

    // return cleanup;
    return cleanup;
  }, [ws]);

  return (
    <>
      <h1>
        BTC Price: {
        messages.map((msg) => {
          return (
            <span key={msg.bitcoin}>
              {formatCurrency(Number(msg.bitcoin), 'USD')}
            </span>
          )
        })
      }
      </h1>
    </>
  );
}

export default PriceWebSocket;