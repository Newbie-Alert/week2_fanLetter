import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "../GlobalStyle";
import App from "../App";
import Detail from "../pages";
import Header from "../components/Header";
import MessageContext from "../Context/MessageContext";

const Router = () => {
  // MAIN RETURN
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <MessageContext>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/message/:id" element={<Detail />} />
        </Routes>
      </MessageContext>
    </BrowserRouter>
  )
}

export default Router