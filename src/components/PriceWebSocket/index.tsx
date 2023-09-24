import { useState, useEffect } from "react";
import {
  createPriceWebSocketConn,
  addWebSocketEventListener,
} from "./PriceWebSocket";
import { WebSocketMessage } from "./types";
import { formatCurrency } from "../../utils";
import PriceCalculator from "../PriceCalculator";

function PriceWebSocket() {
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);

  const ws = createPriceWebSocketConn(
    "wss://ws.coincap.io/prices?assets=bitcoin"
  );

  useEffect(() => {
    return addWebSocketEventListener(ws, (messages) => {
      return setMessages(messages);
    });
  }, [ws]);

  return (
    <>
      <h1>
        {messages.length > 0 ? ( // if messages in state
          messages.map((msg) => {
            // render message contents
            return (
              <>
                {/* pass to calculator */}
                <PriceCalculator message={msg.bitcoin} />;
                <span className="mx-3">BTC Price:</span>
                <span key={msg.bitcoin}>
                  {formatCurrency(Number(msg.bitcoin), "USD")}
                </span>
              </>
            );
          }) // else, render loading spinner
        ) : (
          <div className="spinner-border text-secondary" role="status">
            <span className="sr-only d-none">Loading...</span>
          </div>
        )}
      </h1>
    </>
  );
}

export default PriceWebSocket;
