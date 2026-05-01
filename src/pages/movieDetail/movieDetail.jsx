import React, { useEffect, useState } from "react";
import "@/styles/movieDetail.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "@/components/button";
import Swal from "sweetalert2";

const Movie = () => {
  const [currentMovieDetail, setMovie] = useState();
  const { id } = useParams();
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  const getData = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`,
      )
      .then((response) => {
        setMovie(response.data);
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
    <>
      <div className="movie">
        <div className="movie-intro">
          <img
            className="movie-backdrop"
            src={`https://image.tmdb.org/t/p/original${
              currentMovieDetail ? currentMovieDetail.backdrop_path : ""
            }`}
          />
        </div>
        <div className="movie-detail">
          <div className="movie-detailLeft">
            <div className="movie-posterBox">
              <img
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/original${
                  currentMovieDetail ? currentMovieDetail.poster_path : ""
                }`}
              />
            </div>
          </div>
          <div className="movie-detailRight">
            <div className="movie-detailRightTop">
              <div className="movie-name">
                {currentMovieDetail ? currentMovieDetail.original_title : ""}
              </div>
              <div className="movie-tagline">
                {currentMovieDetail ? currentMovieDetail.tagline : ""}
              </div>
              <div className="movie-rating">
                {currentMovieDetail ? currentMovieDetail.vote_average : ""}{" "}
                <i className="fas fa-star" />
                <span className="movie-voteCount">
                  {currentMovieDetail
                    ? "(" + currentMovieDetail.vote_count + ") votes"
                    : ""}
                </span>
              </div>
              <div className="movie-runtime">
                {currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}
              </div>
              <div className="movie-releaseDate">
                {currentMovieDetail
                  ? "Release date: " + currentMovieDetail.release_date
                  : ""}
              </div>
              <div className="movie-genres">
                {currentMovieDetail && currentMovieDetail.genres
                  ? currentMovieDetail.genres.map((genre) => (
                      <>
                        <span className="movie-genre" id={genre.id}>
                          {genre.name}
                        </span>
                      </>
                    ))
                  : ""}
              </div>
            </div>
            <div className="movie-detailRightBottom">
              <div className="synopsisText">Synopsis</div>
              <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
            </div>
          </div>
        </div>
        <div className="movie-links">
          {currentMovieDetail && currentMovieDetail.homepage && (
            <Button
              label="Details"
              to={currentMovieDetail.homepage}
              target="_blank"
              className="movie-homeButton movie-Button"
            />
          )}
          {currentMovieDetail && currentMovieDetail.imdb_id && (
            <Button
              label="Watch Now"
              to={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id}
              target="_blank"
              className="movie-watchButton movie-Button"
            />
          )}
        </div>
        <div className="movie-heading">Production companies</div>
        <div className="movie-production">
          {currentMovieDetail &&
            currentMovieDetail.production_companies &&
            currentMovieDetail.production_companies.map((company) => (
              <>
                {company.logo_path && (
                  <span className="productionCompanyImage">
                    <img
                      className="movie-productionCompany"
                      src={
                        "https://image.tmdb.org/t/p/original" +
                        company.logo_path
                      }
                    />
                    <span>{company.name}</span>
                  </span>
                )}
              </>
            ))}
        </div>
      </div>
    </>
  );
};

export default Movie;
