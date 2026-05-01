import React, { useState } from "react";
import "@/styles/card.css";
import { Link } from "react-router-dom";

const Cards = ({ movie }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Link
      to={`/movie/${movie.id}`}
      style={{ textDecoration: "none", color: "white" }}
    >
      <div className="cards">
        {!imgLoaded && <div className="cards-img-skeleton shimmer" />}

        <img
          className="cards-img"
          src={`https://image.tmdb.org/t/p/w500${
            movie ? movie.poster_path : ""
          }`}
          alt={movie?.original_title}
          onLoad={() => setImgLoaded(true)}
          style={{ opacity: imgLoaded ? 1 : 0 }}
        />

        {imgLoaded && (
          <div className="cards-overlay">
            <div className="card-title">
              {movie ? movie.original_title : ""}
            </div>
            <div className="card-runtime">
              {movie ? movie.release_date : ""}
              <span className="card-rating">
                {movie ? movie.vote_average : ""}
                <i className="fas fa-star" />
              </span>
            </div>
            <div className="card-description">
              {movie ? movie.overview.slice(0, 140) + "..." : ""}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Cards;
