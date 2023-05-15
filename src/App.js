import React from "react";
import Router from "./routers/Router";
import "./assets/scss/main.css";

const App = () => {
  return (
    <div className="App">
      <div className="title">
        <h1 className="pt-5 text-center">Crud React Js</h1>
      </div>
      <Router />
    </div>
  );
};

export default App;
