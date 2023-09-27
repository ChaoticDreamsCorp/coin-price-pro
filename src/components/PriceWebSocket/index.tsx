import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
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
    return addWebSocketEventListener(ws, (messages) => {
      return setMessages(messages);
    });
  }, [ws]);

  return (
    <>
      <div>
        {
          messages.length ? // if messages in state
          messages.map(msg => { // render message contents
            const uniqueKey = uuidv4(); // Generate a unique key for each message
            return (
              <>
                <div key={uniqueKey}>
                  <span className="mx-3">
                    BTC Price: {formatCurrency(Number(msg.bitcoin), 'USD')}
                  </span>
                </div>
              </>
            )
          }) : // else, render loading spinner
          <div className="spinner-border text-secondary" role="status">
            <span className="sr-only d-none">Loading...</span>
          </div>
        }
      </div>
    </>
  );
}

export default PriceWebSocket;