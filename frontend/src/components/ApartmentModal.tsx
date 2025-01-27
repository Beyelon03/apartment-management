import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useState, useEffect } from "react";
import "../styles/apartment.css";
import { ApartmentProps } from "./Apartment.tsx";
import { backendUrl } from "../config/api.ts";

interface ApartmentModalProps {
  apartment: ApartmentProps;
  closeModal: () => void;
}

const ApartmentModal = ({ apartment, closeModal }: ApartmentModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!apartment) {
      dispatch(closeModal);
    }
  }, [apartment, dispatch]);

  const formatDate = (date: Date | string) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return "Некорректная дата";
    }
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(parsedDate);
  };

  const handleImageClick = (image: string) => {
    setEnlargedImage(image);
  };

  const closeImage = () => {
    setEnlargedImage(null);
  };

  if (!apartment) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={() => dispatch(closeModal)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{apartment.title}</h2>
        <p>{apartment.description}</p>
        <p>Цена: {apartment.price} грн</p>
        <p>Количество комнат: {apartment.rooms}</p>
        <p>Создано: {formatDate(apartment.createdAt)}</p>
        <p>Обновлено: {formatDate(apartment.updatedAt)}</p>

        <div className="apartment-images">
          {apartment.images.length > 0 ? (
            apartment.images.map((image, index) => (
              <img
                key={`${apartment._id}-modal-${index}`}
                src={`${backendUrl}${image}`}
                alt={`Apartment image ${index}`}
                className="modal-image"
                onClick={() => handleImageClick(`${backendUrl}${image}`)}
              />
            ))
          ) : (
            <p>Изображений нет</p>
          )}
        </div>

        {enlargedImage && (
          <div className="image-enlarged-overlay" onClick={closeImage}>
            <img
              src={enlargedImage}
              alt="Enlarged view"
              className="enlarged-image"
            />
          </div>
        )}

        <button className="close-button" onClick={() => dispatch(closeModal)}>
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default ApartmentModal;
