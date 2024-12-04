// Home.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        <div style={{ marginTop: "20px" }}>
          <Link to="/upload">영화 등록 페이지로 이동</Link>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Link to="/Edit/1">영화 수정 페이지로 이동</Link>
        </div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default Home;