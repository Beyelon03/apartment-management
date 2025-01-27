import "../styles/apartment.css";

interface ImageModalProps {
  image: string;
  closeModal: () => void;
}

const ImageModal = ({ image, closeModal }: ImageModalProps) => {
  return (
    <div className="image-enlarged-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeModal}>
          Закрыть
        </button>
        <img src={image} alt="Enlarged" className="enlarged-image" />
      </div>
    </div>
  );
};

export default ImageModal;
