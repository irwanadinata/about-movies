import React, { useEffect, useState } from "react";
import "@/styles/movieList.css";
import { useParams } from "react-router-dom";
import Cards from "@/components/card";
import axios from "axios";
import Swal from "sweetalert2";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const { type } = useParams();
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    getData();
  }, [type]);

  const getData = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=${apiKey}&language=en-US&page=1`,
      )
      .then((response) => {
        setMovieList(response.data.results);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      });
  };

  return (
    <div className="movie-list">
      <h2 className="list-title">{(type ? type : "POPULAR").toUpperCase()}</h2>
      <div className="list-cards">
        {movieList.map((movie) => (
          <Cards movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
