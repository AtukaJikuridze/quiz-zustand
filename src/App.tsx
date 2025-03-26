import { useState } from "react";
import "./App.css";
import QuizComponent from "./components/QuizComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Results from "./components/Results";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QuizComponent />} />
          <Route path="results" element={<Results />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
