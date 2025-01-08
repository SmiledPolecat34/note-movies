import React from "react";
import { Link } from "react-router-dom";

function Wishlist({ wishlist, removeFromWishlist }) {
  return (
    <section className="annonces-section">
      <h2 className="section-title">Wishlist</h2>

      {wishlist.length === 0 ? (
        <p>Aucun film présent dans la wishlist.</p>
      ) : (
        <ul className="annonces-grid">
          {wishlist.map((film) => (
            <li key={film.id} className="annonce-card">
              <div className="annonce-image-holder">
                <img
                  src={
                    film.poster_path
                      ? `https://image.tmdb.org/t/p/w200${film.poster_path}`
                      : "https://via.placeholder.com/200x300?text=No+Poster"
                  }
                  alt={film.title}
                  className="annonce-image"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/200x300?text=No+Poster";
                  }}
                />
              </div>
              <h4 className="annonce-title">{film.title}</h4>
              <p style={{ fontStyle: "italic" }}>
                Sortie : {film.release_date}
              </p>
              <button
                className="btn danger"
                onClick={() => removeFromWishlist(film.id)}
              >
                Retirer
              </button>
            </li>
          ))}
        </ul>
      )}

      <Link to="/">
        <button className="btn secondary" style={{ marginTop: "1rem" }}>
          Retour Accueil
        </button>
      </Link>
    </section>
  );
}

export default Wishlist;
