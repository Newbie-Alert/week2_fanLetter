import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GlobalStyle } from "../GlobalStyle";
import App from "../App";
import Detail from "../pages";
import Header from "../components/Header";

const Router = () => {
  // MAIN RETURN
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/message/:id" element={<Detail />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router