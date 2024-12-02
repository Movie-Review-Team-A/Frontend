// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/globalStyles";
import MovieList from "./pages/MovieList";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/list" element={<MovieList />} />
        <Route path="/detail" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
