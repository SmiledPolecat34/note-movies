import React, { useState } from "react";
import { Link } from "react-router-dom";
import DynamicStarRating from "../components/DynamicStarRating";

function ViewedList({ annonces }) {
  const [sortCriteria, setSortCriteria] = useState("az");

  const sortAnnonces = () => {
    const copy = [...annonces];
    switch (sortCriteria) {
      case "az":
        copy.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "za":
        copy.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "bestNote":
        copy.sort((a, b) => b.rating - a.rating);
        break;
      case "worstNote":
        copy.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }
    return copy;
  };

  const displayed = sortAnnonces();

  return (
    <section className="annonces-section">
      <h2 className="section-title">ViewedList</h2>

      {/* Bouton “Ajouter une Annonce” toujours visible */}
      <Link to="/add">
        <button className="btn primary">Ajouter une Annonce</button>
      </Link>

      <div style={{ marginTop: "1rem" }}>
        <label>Tri : </label>
        <select
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value="az">Titre A-Z</option>
          <option value="za">Titre Z-A</option>
          <option value="bestNote">Meilleure Note → Pire</option>
          <option value="worstNote">Pire Note → Meilleure</option>
        </select>
      </div>

      {displayed.length === 0 ? (
        <p style={{ marginTop: "1rem" }}>Aucune annonce dans la ViewedList.</p>
      ) : (
        <ul className="annonces-grid" style={{ marginTop: "1rem" }}>
          {displayed.map((ann) => (
            <li key={ann.id} className="annonce-card">
              {ann.image && (
                <div className="annonce-image-holder">
                  <img
                    src={ann.image}
                    alt={ann.title}
                    className="annonce-image"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/200x300?text=No+Image";
                    }}
                  />
                </div>
              )}
              <h4 className="annonce-title">{ann.title}</h4>
              <div className="annonce-rating">
                <DynamicStarRating rating={ann.rating} readOnly />
                <span className="annonce-rating-text">
                  {ann.rating.toFixed(1)} / 5
                </span>
              </div>
              <Link to={`/annonce/${ann.id}`} style={{ marginTop: "0.5rem" }}>
                <button className="btn secondary">Détails</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ViewedList;
