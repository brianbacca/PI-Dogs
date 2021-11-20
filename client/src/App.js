import React from "react";
import LandingPage from "./components/LandigPage/LandingPage";
import DogsHome from "./components/Home/DogsHome";
import DogCreate from "./components/DogCreate/DogCreate";
import Details from "./components/Details/Details";
import { Route, Routes } from "react-router-dom";


function App() {

  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route path="/dogs" element={<DogsHome />} />
      <Route path="dogs/:id" element={<Details />} />
      <Route path="/newDog" element={<DogCreate />} />
    </Routes>
  );
}

export default App;
