import React from "react";

const MovieCard = ({ele}) => {
  return <div data-testid="movie-card">
    <img src={ele.poster} alt="" />
    <h2>{ele.title}</h2>
    <h4>{ele.year}</h4>
    <h6>{ele.rating}</h6>
    <p>{ele.type}</p>
    <p>{ele.imdbID}</p>
  </div>;
};

export default MovieCard;
