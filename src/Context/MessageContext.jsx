import React, { createContext, useState } from "react";

export const MessageContextData = createContext();

export default function MessageContext({ children }) {
  const [messages, setMessages] = useState([]);

  return (
    <MessageContextData.Provider value={{ messages, setMessages }}>
      {children}
    </MessageContextData.Provider>
  );
}
