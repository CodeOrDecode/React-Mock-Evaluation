import React from "react";
import { useState } from "react";

const AddMovie = () => {
  const [formstate, setFormstate] = useState({
    title: "",
    year: "",
    imdbID: "",
    type: "",
    rating: "",
    poster: "",
  });

  async function handlesubmit(event) {
    let obj2 = { ...formstate, id: Math.random() + Date.now() };
    event.preventDefault();
    await fetch(`http://localhost:8080/movies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj2),
    });
    setFormstate({  title: "",
    year: "",
    imdbID: "",
    type: "",
    rating: "",
    poster: "",})
  }
  function handlechange(event) {
    let allvalue =
      event.target.name === "rating" ? +event.target.value : event.target.value;
    setFormstate({ ...formstate, [event.target.name]: allvalue });
  }
  return (
    <div data-testid="add-movie">
      <h1>Add Movie</h1>
      <form data-testid="add-movie-form" onSubmit={handlesubmit}>
        <input
          type="text"
          placeholder="title"
          onChange={handlechange}
          value={formstate.title}
          name="title"
        />
        <input
          type="number"
          placeholder="year"
          onChange={handlechange}
          value={formstate.year}
          name="year"
        />
        <input
          type="number"
          placeholder="imdbID"
          onChange={handlechange}
          value={formstate.imdbID}
          name="imdbID"
        />
        <select onChange={handlechange} value={formstate.type} name="type">
          <option value="default">Select a type</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
        </select>
        <input
          type="number"
          placeholder="rating"
          onChange={handlechange}
          value={formstate.rating}
          name="rating"
        />
        <input
          type="text"
          placeholder="poster"
          onChange={handlechange}
          value={formstate.poster}
          name="poster"
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddMovie;
