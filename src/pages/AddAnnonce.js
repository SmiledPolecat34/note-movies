import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DynamicStarRating from "../components/DynamicStarRating";

function AddAnnonce({ onAdd, annonces, editAnnonce }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  // Champs
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageDataUrl, setImageDataUrl] = useState("");

  // Charger l'annonce si on est en mode édition
  useEffect(() => {
    if (isEditing && annonces) {
      const ann = annonces.find((a) => a.id === Number(id));
      if (ann) {
        setTitle(ann.title);
        setRating(ann.rating);
        setComment(ann.comment || "");
        setImageDataUrl(ann.image || "");
      }
    }
  }, [isEditing, id, annonces]);

  // Convertir le fichier image en Data URL
  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageDataUrl(reader.result);
      };
      reader.readAsDataURL(imageFile);
    }
  }, [imageFile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Veuillez saisir un titre.");
      return;
    }
    if (!rating) {
      alert("Veuillez choisir une note.");
      return;
    }

    const newAnnonce = {
      id: isEditing ? Number(id) : Date.now(),
      title,
      rating,
      comment,
      image: imageDataUrl,
    };

    if (isEditing && editAnnonce) {
      editAnnonce(newAnnonce);
    } else {
      onAdd(newAnnonce);
    }

    navigate("/viewlist");
  };

  return (
    <section className="annonces-section">
      <h2 className="section-title">
        {isEditing ? "Modifier l'Annonce" : "Ajouter une Annonce"}
      </h2>

      <form onSubmit={handleSubmit} className="annonce-form">
        {/* Titre obligatoire */}
        <div className="form-group">
          <label>
            Titre <span style={{ color: "red" }}>*</span> :
          </label>
          <input
            type="text"
            placeholder="Ex: Mon Film..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Note obligatoire */}
        <div className="form-group">
          <label>
            Note <span style={{ color: "red" }}>*</span> :
          </label>
          <DynamicStarRating rating={rating} onChange={setRating} />
          <span style={{ marginLeft: "0.5rem" }}>{rating.toFixed(1)} / 5</span>
        </div>

        {/* Commentaire optionnel */}
        <div className="form-group">
          <label>Commentaire :</label>
          <input
            type="text"
            placeholder="Ex: J'ai adoré ce film..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        {/* Image via fichier local */}
        <div className="form-group">
          <label>Image (fichier) :</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImageFile(e.target.files[0]);
              }
            }}
          />
        </div>

        <button type="submit" className="btn primary">
          {isEditing ? "Enregistrer" : "Ajouter"}
        </button>
      </form>
    </section>
  );
}

export default AddAnnonce;
