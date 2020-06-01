import React from "react";
import HogeContainer from "./containers/hogeContainer";
import FaceApiContainer from "./containers/faceApiContainer";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <HogeContainer />
      <FaceApiContainer />
    </div>
  );
}

export default App;
