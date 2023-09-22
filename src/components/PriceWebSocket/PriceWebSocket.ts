import { WebSocketMessage } from "./types";

const PRICE_WS_MSG_EVENT = "message";

const processPriceSocketMsg = function (incomingMsg: string): WebSocketMessage {
  return JSON.parse(incomingMsg) as WebSocketMessage;
}

export const createPriceWebSocketConn = function (uri: string): WebSocket {
  return new WebSocket(uri);
}

export const closePriceWebSocketConn = function (ws: WebSocket) {
  return ws.close();
}

export const addWebSocketEventListener = function (
  ws: WebSocket,
  stateSetterCb: (messages: WebSocketMessage[]) => void
): (() => void) {
  const eventListener = (incomingMsg: MessageEvent) => {
    const message = processPriceSocketMsg(incomingMsg.data);
    stateSetterCb([message]);
  };
  
  ws.addEventListener(PRICE_WS_MSG_EVENT, eventListener);

  return () => closePriceWebSocketConn(ws);
}
