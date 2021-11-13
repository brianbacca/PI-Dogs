import "./App.css";
import LandingPage from "./components/LandigPage/LandingPage";
import DogsHome from "./components/Home/DogsHome";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route path="/dogs" element={<DogsHome />} />
    </Routes>
  );
}

export default App;
