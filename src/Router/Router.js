import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "../GlobalStyle";
import App from "../App";
import Detail from "../pages";
import Header from "../components/Header";

const Router = () => {
  // MAIN RETURN
  return (
    <BrowserRouter>
      <Header />
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/message/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router