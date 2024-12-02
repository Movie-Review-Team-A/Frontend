// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/globalStyles";
import MovieList from "./pages/MovieList";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/list" element={<MovieList />} />
      </Routes>
    </Router>
  );
}

export default App;