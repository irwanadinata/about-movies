import React, { useState } from "react";
import axios from "axios";
import Cards from "@/components/card";
import SkeletonCard from "@/components/skeletonCard";
import "@/styles/searchMovie.css";
import Input from "@/components/input";
import Swal from "sweetalert2";

const SKELETON_COUNT = 8;

const SearchMovie = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const search = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setHasSearched(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
      );
      setResults(response.data.results);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") search();
  };

  return (
    <div className="w-full h-screen bg-dark text-white overflow-auto py-4 px-8">
      <div className="search-bar-wrapper">
        <Input
          icon="fas fa-search"
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onClear={() => {
            setQuery("");
            setResults([]);
            setHasSearched(false);
          }}
        />
        <button
          className="btn btn-outline btn-warning"
          onClick={search}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <i className="fas fa-search"></i>
          )}
        </button>
      </div>

      <div className="list-cards">
        {isLoading
          ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <SkeletonCard key={`skeleton-${i}`} />
            ))
          : results.map((movie) => <Cards key={movie.id} movie={movie} />)}
      </div>

      {!isLoading && hasSearched && results.length === 0 && (
        <p className="search-empty">No movies found for "{query}"</p>
      )}
    </div>
  );
};

export default SearchMovie;
