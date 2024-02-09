import React from "react";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import MovieCard from "./MovieCard";
import "../index.css";
const MovieList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sorttext, setSorttext] = useState("default");
  const [filtertext, setFiltertext] = useState("default");

  async function getData() {
    let url;
    if (sorttext === "default" && filtertext === "default") {
      url = `http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}/movies`;
    }
    else if(sorttext === "default" && filtertext !== "default"){
      url = `http://localhost:8080/movies?type=${filtertext}`
    }
    else if(sorttext !== "default" && filtertext === "default"){
      url = `http://localhost:8080/movies?_sort=year&_order=${sorttext}`
    }
    else{
      url = `http://localhost:8080/movies?_sort=year&_order=${sorttext}&type=${filtertext}`
    }
    setLoading(true);
    let res = await fetch(url);
    let finalres = await res.json();
    console.log(finalres);
    setData(finalres);
    setLoading(false);
  }

  function handlesort(event) {
    if (event.target.value == "default") {
      setSorttext("default");
    } else if (event.target.value == "Oldest first") {
      setSorttext("asc");
    } else {
      setSorttext("desc");
    }
  }

  function handlefilter(event) {
    if (event.target.value == "default") {
      setFiltertext("default");
    } else if (event.target.value == "movie") {
      setFiltertext("movie");
    } else if (event.target.value == "series") {
      setFiltertext("series");
    } else {
      setFiltertext("game");
    }
  }

  useEffect(() => {
    getData();
  }, [sorttext, filtertext]);

  return (
    <div data-testid="movie-list">
      <h1>Movies List</h1>
      <div>
        <label>Sort By Year</label>
        <select data-testid="sort" onChange={handlesort}>
          <option value="default">--</option>
          <option value="Oldest first">oldest-first</option>
          <option value="Newest first">newest-first</option>
        </select>
      </div>
      <div>
        <label>Filter By Type</label>
        <select data-testid="filter" onChange={handlefilter}>
          <option value="default">--</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="game">Game</option>
        </select>
      </div>
      {/* Either Loading component or below div with `data-testid="movie-container"` should exist on DOM at a time */}

      {loading ? (
        <Loading />
      ) : (
        <div>
          <div data-testid="movie-container" className="styleit">
            {/* render all the movies data with the help of MovieCard component here */}
            {data.map((ele) => {
              return <MovieCard key={ele.id} ele={ele} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieList;
