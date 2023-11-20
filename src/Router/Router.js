import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<App messages={messages} setMessages={setMessages} />} />
        <Route path="/message/:id" element={<Detail messages={messages} setMessages={setMessages} />} />
        <Route path="*" element={<Navigate replace to='/' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router