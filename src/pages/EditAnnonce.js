import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import DynamicStarRating from "../components/DynamicStarRating";

function EditAnnonce({ annonces, handleUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Trouver l’annonce à éditer
  const annonceToEdit = annonces.find((a) => a.id === Number(id));

  // States locaux pour les champs
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(3.5);
  const [imageDataUrl, setImageDataUrl] = useState("");

  // Pour gérer un nouveau fichier si l’utilisateur veut changer l’image
  const [imageFile, setImageFile] = useState(null);

  // Pré-remplir le formulaire si l'annonce existe
  useEffect(() => {
    if (annonceToEdit) {
      setTitle(annonceToEdit.title || "");
      setComment(annonceToEdit.comment || "");
      setRating(annonceToEdit.rating || 3.5);
      setImageDataUrl(annonceToEdit.image || "");
    }
  }, [annonceToEdit]);

  // Conve nouveau fichier image l’utilisateur choisit un fichier
  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageDataUrl(reader.result);
      };
      reader.readAsDataURL(imageFile);
    }
  }, [imageFile]);

  // Si l'annonce n'existe pas, on affiche un message d'erreur
  if (!annonceToEdit) {
    return (
      <section className="annonces-section">
        <h2 className="section-title">Annonce introuvable</h2>
        <Link to="/viewlist">
          <button className="btn secondary">Retour à la liste</button>
        </Link>
      </section>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Veuillez entrer un titre.");
      return;
    }

    // Constr l’objet mis à jour
    const updatedAnnonce = {
      ...annonceToEdit,
      title,
      comment,
      rating,
      image: imageDataUrl,
    };

    // Appel d handleUpdate pour modifier dans le state
    handleUpdate(updatedAnnonce);

    // Redirection après édition : vers la page "viewlist"
    navigate("/viewlist");
  };

  return (
    <section className="annonces-section">
      <h2 className="section-title">Modifier l'annonce</h2>

      <form className="annonce-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Titre :</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre de l'annonce"
          />
        </div>

        <div className="form-group">
          <label htmlFor="comment">Commentaire :</label>
          <input
            id="comment"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Commentaire..."
          />
        </div>

        {/* Note en demi-étoiles */}
        <div className="form-group">
          <label>Note :</label>
          <DynamicStarRating rating={rating} onChange={setRating} />
          <span style={{ marginLeft: "0.5rem" }}>{rating.toFixed(1)} / 5</span>
        </div>

        {/* Image : possibilité d’en sélectionner une nouvelle */}
        <div className="form-group">
          <label htmlFor="imageFile">Nouvelle image (optionnel) :</label>
          <input
            id="imageFile"
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImageFile(e.target.files[0]);
              }
            }}
          />
        </div>

        {/* Aperçu de l'image (existante ou nouvelle) */}
        {imageDataUrl && (
          <div className="annonce-image-holder" style={{ margin: "1rem 0" }}>
            <img
              src={imageDataUrl}
              alt="Aperçu"
              style={{ maxWidth: "200px" }}
            />
          </div>
        )}

        <button type="submit" className="btn primary">
          Sauvegarder
        </button>
        <Link to={`/annonce/${annonceToEdit.id}`} style={{ marginLeft: "0.5rem" }}>
          <button type="button" className="btn secondary">
            Annuler
          </button>
        </Link>
      </form>
    </section>
  );
}

export default EditAnnonce;
