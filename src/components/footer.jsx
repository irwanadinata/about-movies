import { Link } from "react-router-dom";
import logoImg from "@/assets/logo.png";
import "@/styles/footer.css";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Popular", to: "/movies/popular" },
  { label: "Top Rated", to: "/movies/top_rated" },
  { label: "Upcoming", to: "/movies/upcoming" },
  { label: "Search", to: "/search" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-root">
      <div className="footer-glow" />
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src={logoImg} alt="AboutMovies" className="footer-logo-img" />
          </Link>
          <p className="footer-tagline">
            Discover, explore, and fall in love with movies.
          </p>
        </div>

        <div className="footer-nav">
          <p className="footer-nav-title">Browse</p>
          <ul className="footer-nav-list">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="footer-nav-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-info">
          <p className="footer-nav-title">About</p>
          <p className="footer-info-text">
            Powered by{" "}
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-tmdb-link"
            >
              TMDB API
            </a>
            . Movie data, images, and metadata provided by The Movie Database.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-divider" />
        <p className="footer-copy">© {year} AboutMovies</p>
      </div>
    </footer>
  );
}
