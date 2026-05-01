import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { UserAuth } from "@/utils/contexts/authContext";
import Swal from "sweetalert2";
import "@/styles/navbar.css";

const NAV_LINKS = [
  { to: "/movies/popular", icon: "fas fa-fire", label: "Popular" },
  { to: "/movies/top_rated", icon: "fas fa-star", label: "Top Rated" },
  { to: "/movies/upcoming", icon: "fas fa-calendar-alt", label: "Upcoming" },
  { to: "/search", icon: "fas fa-search", label: "Search" },
];

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const location = useLocation();

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsNavOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: error.message });
    }
  };

  return (
    <>
      <nav className={`navbar-root${scrolled ? " navbar-scrolled" : ""}`}>
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            <img src={logo} alt="CineScope" />
          </Link>

          <ul className="navbar-links">
            {NAV_LINKS.map(({ to, icon, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`navbar-link${location.pathname === to ? " active" : ""}`}
                >
                  <i className={icon} />
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="navbar-auth">
            {user ? (
              <>
                <span className="navbar-username">
                  <i className="fas fa-user-circle" /> {user.displayName}
                </span>
                <button
                  className="navbar-btn navbar-btn-danger"
                  onClick={handleSignOut}
                >
                  <i className="fas fa-sign-out-alt" /> Logout
                </button>
              </>
            ) : (
              <Link to="/signin" className="navbar-btn navbar-btn-primary">
                <i className="fas fa-sign-in-alt" /> Sign In
              </Link>
            )}
          </div>

          <button
            className={`navbar-hamburger${isNavOpen ? " open" : ""}`}
            onClick={() => setIsNavOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`mobile-drawer${isNavOpen ? " drawer-open" : ""}`}>
        <ul className="drawer-links">
          {NAV_LINKS.map(({ to, icon, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`drawer-link${location.pathname === to ? " active" : ""}`}
              >
                <i className={icon} />
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="drawer-auth">
          {user ? (
            <>
              <p className="drawer-username">
                <i className="fas fa-user-circle" /> {user.displayName}
              </p>
              <button
                className="navbar-btn navbar-btn-danger w-full"
                onClick={handleSignOut}
              >
                <i className="fas fa-sign-out-alt" /> Logout
              </button>
            </>
          ) : (
            <Link
              to="/signin"
              className="navbar-btn navbar-btn-primary w-full justify-center"
            >
              <i className="fas fa-sign-in-alt" /> Sign In
            </Link>
          )}
        </div>
      </div>

      {isNavOpen && (
        <div className="drawer-backdrop" onClick={() => setIsNavOpen(false)} />
      )}

      <div className="navbar-spacer" />
    </>
  );
};

export default Navbar;
