import React, { Fragment } from "react";
import './App.css';
import GetVehicles from "./components/GetVehicles"

function App() {
  return (
    <Fragment>
      <div className="container">
        <GetVehicles />
      </div>
      <h1 className="text-center mt-5">Vehicle List</h1>
    </Fragment>
  );
}

export default App;
