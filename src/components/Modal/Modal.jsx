import React, { useEffect} from "react";
import PropTypes from "prop-types";
import "./Modal.css";

/**
 * Props:
 * @param {boolean} isOpen    - Détermine si la modal est affichée
 * @param {function} onClose  - Fonction appelée pour fermer la modal
 * @param {React.ReactNode} children - Contenu de la modal
 */
export default function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container" role="dialog" aria-modal="true">
        <button
          className="modal-close-button"
          aria-label="Close modal"
          onClick={onClose}
        >
          ×
        </button>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen:   PropTypes.bool.isRequired,
  onClose:  PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};