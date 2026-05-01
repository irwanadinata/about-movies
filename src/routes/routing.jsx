import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/homePage/home";
import MovieList from "@/pages/movieList/movieList";
import Movie from "@/pages/movieDetail/movieDetail";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ChatWidget from "@/components/chatWidget";
import SearchMovie from "@/pages/search/searchMovie";
import { AuthContextProvider } from "@/utils/contexts/authContext";
import "@/styles/app.css";
import Signin from "@/pages/signIn/signIn";
function Routing() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route index element={<Home />}></Route>
            <Route path="movie/:id" element={<Movie />}></Route>
            <Route path="movies/:type" element={<MovieList />}></Route>
            <Route path="/*" element={<h1>Error Page</h1>}></Route>
            <Route path="/search" element={<SearchMovie />} />
            <Route path="/signin" element={<Signin />} />
          </Routes>
          <Footer />
          <ChatWidget />
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default Routing;
