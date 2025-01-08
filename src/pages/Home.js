import React, { useState, useEffect } from "react";

const TMDB_BEARER =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDkzOTFiN2U0ZWZiMTAwOTI3Yjc4ZTcwYjFiNDI5YyIsIm5iZiI6MTczNjM0ODgzNC4xNDUsInN1YiI6IjY3N2U5NGEyNDRkNjQ5ZmZhZTdiMGZjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uF2Amvax1F2-Beim6spDehsa4IRS1OeRUsWPweSk01g";

function Home({ annonces, addToWishlist, handleDelete }) {
  const [tmdbFilms, setTmdbFilms] = useState([]);
  const [sortOrder, setSortOrder] = useState("az");

  useEffect(() => {
    fetchTMDBUpcoming();
  }, []);

  const fetchTMDBUpcoming = async () => {
    try {
      const url =
        "https://api.themoviedb.org/3/movie/upcoming?language=fr-FR&page=1";

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${TMDB_BEARER}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      setTmdbFilms(data.results ?? []);
    } catch (error) {
      console.error("Erreur fetch TMDB upcoming:", error);
      setTmdbFilms([]);
    }
  };

  // Tri des TMDB films
  const sortFilms = (films) => {
    const sorted = [...films];
    if (sortOrder === "az") {
      sorted.sort((a, b) =>
        (a.title || "").localeCompare(b.title || "", "fr", { sensitivity: "base" })
      );
    } else {
      sorted.sort((a, b) =>
        (b.title || "").localeCompare(a.title || "", "fr", { sensitivity: "base" })
      );
    }
    return sorted;
  };

  const displayedFilms = sortFilms(tmdbFilms);

  return (
    <section className="annonces-section">
      <span
        style={{
          display: "flex",
          position: "absolute",
          top: "0",
          right: "0",
          color: "#FFFFFF",
          padding: "0.3rem",
        }}
      >
        Date du jour: 10/01/2023
      </span>

      <h2 className="section-title">Films à venir</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>Tri par Titre : </label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="az">A–Z</option>
          <option value="za">Z–A</option>
        </select>
      </div>

      {displayedFilms.length === 0 ? (
        <p>Chargement ou aucun film...</p>
      ) : (
        <ul className="annonces-grid">
          {displayedFilms.map((film) => (
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
              <p style={{ fontStyle: "italic", marginBottom: "0.5rem" }}>
                Sortie : {film.release_date}
              </p>
              <button
                className="btn primary"
                onClick={() => addToWishlist(film)}
              >
                Ajouter à la wishlist
              </button>
            </li>
          ))}
        </ul>
      )}

      <hr style={{ margin: "2rem 0" }} />
    </section>
  );
}

export default Home;
