import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import "../styles/apartment-edit.css";
import { backendUrl } from "../config/api.ts";

interface EditApartmentProps {
  _id: string;
  title: string;
  description: string;
  price: number;
  rooms: 1 | 2 | 3;
  images: string[];
}

const MAX_IMAGES = 5;

const EditApartment = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [apartment, setApartment] = useState<EditApartmentProps | null>(null);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchApartment = async () => {
    try {
      const response = await axios.get<EditApartmentProps>(
        `${backendUrl}api/apartments/${id}`,
      );
      setApartment(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке квартиры:", error);
    }
  };

  const handleUpdate = async () => {
    if (!apartment) return;
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", apartment.title);
      formData.append("description", apartment.description);
      formData.append("price", apartment.price.toString());
      formData.append("rooms", apartment.rooms.toString());

      if (newImages.length > 0) {
        newImages.forEach((image) => formData.append("images", image));
      }

      await axios.patch(`${backendUrl}api/apartments/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Квартира успешно обновлена!");
      navigate("/");
    } catch (error) {
      console.error("Ошибка при обновлении квартиры:", error);
      alert("Не удалось обновить квартиру.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Вы уверены, что хотите удалить эту квартиру?",
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${backendUrl}api/apartments/${id}`);
      alert("Квартира успешно удалена!");
      navigate("/");
    } catch (error) {
      console.error("Ошибка при удалении квартиры:", error);
      alert("Не удалось удалить квартиру.");
    }
  };

  const handleRemoveImage = async (image: string) => {
    if (!apartment || !apartment.images) return;

    const updatedImages = apartment.images.filter((img) => img !== image);

    try {
      await axios.patch(
        `${backendUrl}api/apartments/${id}`,
        {
          removedImages: [image],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      setApartment({ ...apartment, images: updatedImages });
      alert("Изображение успешно удалено!");
    } catch (error) {
      console.error("Ошибка при удалении изображения:", error);
      alert("Не удалось удалить изображение.");
    }
  };

  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !apartment) return;

    const filesArray = Array.from(event.target.files);
    const currentImagesCount = apartment.images?.length || 0;
    const newImagesCount = currentImagesCount + filesArray.length;

    if (newImagesCount > MAX_IMAGES) {
      alert(`Максимальное количество изображений: ${MAX_IMAGES}`);
      return;
    }

    setNewImages((prev) => [...prev, ...filesArray]);
  };

  const handleReplaceImage = (index: number, file: File) => {
    if (!apartment || !apartment.images) return;

    const updatedImages = [...apartment.images];
    updatedImages[index] = URL.createObjectURL(file);

    setApartment({ ...apartment, images: updatedImages });
    setNewImages((prev) => [...prev, file]);
  };

  useEffect(() => {
    fetchApartment();
  }, [id]);

  if (!apartment) {
    return <h2>Загрузка данных квартиры...</h2>;
  }

  return (
    <div className="edit-apartment">
      <h1>Редактирование квартиры</h1>
      <label>
        Заголовок:
        <input
          type="text"
          value={apartment.title}
          onChange={(e) =>
            setApartment({ ...apartment, title: e.target.value })
          }
        />
      </label>
      <label>
        Описание:
        <textarea
          value={apartment.description}
          onChange={(e) =>
            setApartment({ ...apartment, description: e.target.value })
          }
        />
      </label>
      <label>
        Цена:
        <input
          type="number"
          value={apartment.price}
          onChange={(e) =>
            setApartment({ ...apartment, price: Number(e.target.value) })
          }
        />
      </label>
      <label>
        Количество комнат:
        <select
          value={apartment.rooms}
          onChange={(e) =>
            setApartment({
              ...apartment,
              rooms: Number(e.target.value) as 1 | 2 | 3,
            })
          }
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
      </label>

      <div className="images-section">
        <h2>Изображения:</h2>
        {apartment.images?.map((image, index) => (
          <div key={index} className="image-item">
            <img src={`${backendUrl}${image}`} alt={`Apartment ${index}`} />
            <button onClick={() => handleRemoveImage(image)}>Удалить</button>
            <input
              type="file"
              onChange={(e) =>
                e.target.files && handleReplaceImage(index, e.target.files[0])
              }
            />
          </div>
        ))}

        {(apartment.images?.length || 0) < MAX_IMAGES && (
          <div className="add-image">
            <input type="file" multiple onChange={handleAddImage} />
          </div>
        )}
      </div>

      <div className="buttons">
        <button onClick={handleUpdate} disabled={isLoading}>
          {isLoading ? "Сохранение..." : "Сохранить"}
        </button>
        <button className="delete-button" onClick={handleDelete}>
          Удалить
        </button>
      </div>
    </div>
  );
};

export default EditApartment;
