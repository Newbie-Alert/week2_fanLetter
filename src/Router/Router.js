import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "../GlobalStyle";
import { useState } from "react";
import App from "../App";
import Detail from "../pages";
import Header from "../components/Header";

const Router = () => {
  // STATES
  const [messages, setMessages] = useState([]);
  // MAIN RETURN
  return (
    <BrowserRouter>
      <Header />
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<App messages={messages} setMessages={setMessages} />} />
        <Route path="/message/:id" element={<Detail messages={messages} setMessages={setMessages} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router