import React from "react";
import { useState } from "react"; 
import AddMovie from "./Components/AddMovie";
import MovieList from "./Components/MovieList";

const App = () => {
  const [first, setFirst] = useState(true)
  function handlechange(){
    setFirst(!first);
  }
  return (
    <div className="App">
      <h1>React Movies List</h1>
      {/* The below button should have text content as either `Show Movies`or `Add Movie` */}
      <button data-testid="toggle-btn" onClick={handlechange}>{first ?"Add Movie":"Show Movies"}</button>
      <div data-testid="container">
        {/* Add the required components here either AddMovie or MovieList will exist on DOM at a time*/}
        {first ? <MovieList/>:<AddMovie/>}
      </div>
    </div>
  );
};

export default App;
