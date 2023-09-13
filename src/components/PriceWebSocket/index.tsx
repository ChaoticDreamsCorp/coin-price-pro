import { useState, useEffect } from "react";
import { 
  createPriceWebSocketConn, 
  initWsConnAndAddEventListener,  
} from "./PriceWebSocket";
import { WebSocketMessage } from "./types";
import { formatCurrency } from "../../utils";
import React from "react";

function PriceWebSocket() {
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const ws = createPriceWebSocketConn("wss://ws.coincap.io/prices?assets=bitcoin");

  useEffect(() => {
    const cleanup = initWsConnAndAddEventListener(ws, (messages) => {
      return setMessages(messages);
    });

    // return cleanup;
    return cleanup;
  }, [ws]);

  return (
    <>
      <div className="d-flex justify-content-center">        
      {messages.length >= 1 ? (
        <div className="d-flex justify-content-center">
          {messages.map((msg) => (
            <React.Fragment key={msg.bitcoin}>
              <h1 className="mx-3">BTC Price:</h1>
              <span>{formatCurrency(Number(msg.bitcoin), 'USD')}</span>
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className="spinner-border text-secondary" role="status">
          <span className="sr-only d-none">Loading...</span>
        </div>
      )}

      </div>
    </>
  );
}

export default PriceWebSocket;