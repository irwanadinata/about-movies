import React, { useEffect, useState } from "react";
import "@/styles/recommendation.css";
import Cards from "@/components/card";
import SkeletonCard from "@/components/skeletonCard";
import axios from "axios";
import Button from "@/components/button";
import Swal from "sweetalert2";

const SKELETON_COUNT = 10;

const Recommendation = () => {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    getData();
  }, [page]);

  const getData = () => {
    const loadingSetter = page === 1 ? setIsLoading : setIsLoadingMore;
    loadingSetter(true);

    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`,
      )
      .then((response) => {
        setMovieList((prev) => [...prev, ...response.data.results]);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      })
      .finally(() => {
        loadingSetter(false);
      });
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="movie-list">
      <h2 className="list-title">Recommendation</h2>
      <div className="list-cards">
        {isLoading
          ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <SkeletonCard key={`skeleton-${i}`} />
            ))
          : movieList.map((movie) => <Cards movie={movie} key={movie.id} />)}

        {isLoadingMore &&
          Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <SkeletonCard key={`skeleton-more-${i}`} />
          ))}
      </div>
      <div className="load-more-wrapper">
        <Button
          className="btn btn-primary btn-load-more"
          onClick={loadMore}
          label={isLoadingMore ? "Loading..." : "Load More"}
          disabled={isLoadingMore}
        />
      </div>
    </div>
  );
};

export default Recommendation;
