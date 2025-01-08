import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Home from "./pages/Home";
import ViewedList from "./pages/ViewedList";
import Wishlist from "./pages/Wishlist";
import AddAnnonce from "./pages/AddAnnonce";
import DetailAnnonce from "./pages/DetailAnnonce";
import EditAnnonce from "./pages/EditAnnonce";

import "./App.css";

function App() {
  const [annonces, setAnnonces] = useState([]);
  const [tmdbWishlist, setTmdbWishlist] = useState([]); 
  // => On stocke la wishlist distinctement pour les films TMDB

  // Lecture localStorage au montage
  useEffect(() => {
    const storedAnnonces = localStorage.getItem("annonces");
    if (storedAnnonces) {
      setAnnonces(JSON.parse(storedAnnonces));
    }
    const storedWishlist = localStorage.getItem("tmdbWishlist");
    if (storedWishlist) {
      setTmdbWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  // Sauvegarde localStorage
  useEffect(() => {
    localStorage.setItem("annonces", JSON.stringify(annonces));
  }, [annonces]);

  useEffect(() => {
    localStorage.setItem("tmdbWishlist", JSON.stringify(tmdbWishlist));
  }, [tmdbWishlist]);

  // Méthodes pour annonces locales
  const addAnnonce = (annonce) => {
    setAnnonces((prev) => [...prev, annonce]);
  };

  const deleteAnnonce = (id) => {
    setAnnonces((prev) => prev.filter((a) => a.id !== id));
  };

  // Méthodes pour wishlist TMDB
  const addToWishlist = (film) => {
    // film = { id, title, poster_path, ... } => TMDB film
    if (!tmdbWishlist.some((f) => f.id === film.id)) {
      setTmdbWishlist((prev) => [...prev, film]);
    }
  };

  const removeFromWishlist = (id) => {
    setTmdbWishlist((prev) => prev.filter((f) => f.id !== id));
  };

  const handleUpdate = (updatedAnnonce) => {
    setAnnonces((prev) =>
      prev.map((ann) => (ann.id === updatedAnnonce.id ? updatedAnnonce : ann))
    );
  };

  return (
    <Router>
      <div className="app-container">
        {/* HEADER */}
        <header className="header">
          <Link to="/" className="brand-link">
            <h1 className="brand">CallTheCine</h1>
          </Link>
          <nav className="nav-links">
            <Link to="/wishlist" className="nav-link">
              Wishlist
            </Link>
            <Link to="/viewlist" className="nav-link">
              Viewlist
            </Link>
          </nav>
        </header>

        <Routes>
          {/* Home : TMDB films + annonces locales (pas de wishlist pour locales) */}
          <Route
            path="/"
            element={
              <Home
                annonces={annonces}
                addToWishlist={addToWishlist} // pour TMDB films
                handleDelete={deleteAnnonce}  // pour annonces locales
              />
            }
          />

          {/* ViewedList : annonces locales, tri + ajout, pas de bouton "Modifier", juste détail + suppr. */}
          <Route
            path="/viewlist"
            element={
              <ViewedList annonces={annonces} />
            }
          />

          {/* Wishlist : liste de films TMDB en favoris */}
          <Route
            path="/wishlist"
            element={
              <Wishlist
                wishlist={tmdbWishlist}
                removeFromWishlist={removeFromWishlist}
              />
            }
          />

          {/* AddAnnonce : pour créer une annonce locale */}
          <Route
            path="/add"
            element={<AddAnnonce onAdd={addAnnonce} />}
          />

          {/* DetailAnnonce : voir détail d'une annonce locale */}
          <Route
            path="/annonce/:id"
            element={
              <DetailAnnonce
                annonces={annonces}
                handleDelete={deleteAnnonce}
              />
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <section className="annonces-section">
                <h2 className="section-title">Page non trouvée</h2>
                <Link to="/">
                  <button className="btn secondary">Retour</button>
                </Link>
              </section>
            }
          />

        <Route
          path="/edit/:id"
          element={<EditAnnonce annonces={annonces} handleUpdate={handleUpdate} />}
        />
        </Routes>

        {/* FOOTER */}
        <footer className="footer">
          <p>CallTheCine • Demi-étoiles • Website by Franklin</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
