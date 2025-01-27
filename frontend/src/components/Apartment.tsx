import { useState } from "react";
import "../styles/apartment.css";
import { useNavigate } from "react-router";
import { backendUrl } from "../config/api.ts";
import { useDispatch } from "react-redux";
import {
  openModal,
  setSelectedApartmentId,
} from "../store/slices/apartmentSlice.ts";
import ImageModal from "./ImageModal";

export interface ApartmentProps {
  _id: string;
  title: string;
  description: string;
  price: number;
  rooms: 1 | 2 | 3;
  images: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

const Apartment = (props: ApartmentProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    navigate(`/edit/${props._id}`);
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

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

  const handleMoreClick = () => {
    dispatch(setSelectedApartmentId(props._id));
    dispatch(openModal());
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(`${backendUrl}${image}`);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="apartment">
        <h2 title={props.title}>{truncateText(props.title, 40)}</h2>
        <p title={props.description}>{truncateText(props.description, 40)}</p>
        <p className="price">Цена: {props.price} грн</p>
        <p className="rooms">Количество комнат: {props.rooms}</p>
        <p>
          Создано:{" "}
          {props.createdAt ? formatDate(props.createdAt) : "Дата не указана"}
        </p>
        <p>
          Обновлено:{" "}
          {props.updatedAt ? formatDate(props.updatedAt) : "Дата не указана"}
        </p>

        <div className="apartment-images">
          {props.images.length > 0 ? (
            props.images.map((image, index) => (
              <img
                key={`${props._id}-${index}`}
                src={`${backendUrl}${image}`}
                alt={`Apartment image ${index}`}
                className="apartment-image"
                onClick={() => handleImageClick(image)}
              />
            ))
          ) : (
            <p>Изображений нет</p>
          )}
        </div>

        <div className="buttons-container">
          <button className="info" onClick={handleMoreClick}>
            Подробнее
          </button>
          <button className="edit-button" onClick={handleEditClick}>
            Редактировать
          </button>
        </div>
      </div>

      {isModalOpen && selectedImage && (
        <ImageModal image={selectedImage} closeModal={handleCloseModal} />
      )}
    </>
  );
};

export default Apartment;
