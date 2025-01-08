import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import DynamicStarRating from "../components/DynamicStarRating";

function DetailAnnonce({ annonces, handleDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const annonce = annonces.find((a) => a.id === Number(id));
  if (!annonce) {
    return (
      <section className="annonces-section">
        <h2 className="section-title">Annonce introuvable</h2>
        <Link to="/viewlist">
          <button className="btn secondary">Retour à la Viewlist</button>
        </Link>
      </section>
    );
  }

  const onDelete = () => {
    if (window.confirm("Supprimer cette annonce ?")) {
      handleDelete(annonce.id);
      navigate("/viewlist");
    }
  };

  return (
    <section className="annonces-section">
      <h2 className="section-title">{annonce.title}</h2>
      {annonce.image && (
        <div className="annonce-image-holder" style={{ marginBottom: "1rem" }}>
          <img
            src={annonce.image}
            alt={annonce.title}
            className="annonce-image"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/200x300?text=No+Image";
            }}
          />
        </div>
      )}

      {/* Note en étoiles */}
      <div className="annonce-rating">
        <DynamicStarRating rating={annonce.rating} readOnly />
        <span className="annonce-rating-text">
          {annonce.rating.toFixed(1)} / 5
        </span>
      </div>

      {/* Commentaire affiché sous les étoiles */}
      <p style={{ marginTop: "1rem" }}>
        <strong>Commentaire :</strong>{" "}
        {annonce.comment && annonce.comment.trim() ? annonce.comment : "Aucun"}
      </p>

      {/* Boutons : Supprimer / Modifier / Retour */}
      <button
        className="btn danger"
        onClick={onDelete}
        style={{ marginTop: "1rem" }}
      >
        Supprimer
      </button>

      {/* Bouton “Modifier” => Edition */}
      <Link to={`/edit/${annonce.id}`} style={{ marginLeft: "0.5rem" }}>
        <button className="btn secondary">Modifier</button>
      </Link>

      {/* Bouton “Retour” => va vers /viewlist */}
      <Link to="/viewlist" style={{ marginLeft: "0.5rem" }}>
        <button className="btn secondary">Retour</button>
      </Link>
    </section>
  );
}

export default DetailAnnonce;
