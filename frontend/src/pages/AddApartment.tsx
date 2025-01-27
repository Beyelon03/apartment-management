import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setApartments,
  setErrorMessage,
} from "../store/slices/apartmentSlice.ts";
import "../styles/apartment-add.css";
import { backendUrl } from "../config/api.ts";

const AddApartment = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [rooms, setRooms] = useState<1 | 2 | 3>(1);
  const [images, setImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const validateForm = () => {
    if (title.length === 0 || title.length > 90) {
      setError(
        "Заголовок не должен быть пустым и должен содержать не более 90 символов.",
      );
      return false;
    }
    if (description.length === 0 || description.length > 335) {
      setError(
        "Описание не должно быть пустым и должно содержать не более 335 символов.",
      );
      return false;
    }
    if (price <= 0) {
      setError("Цена должна быть положительным числом.");
      return false;
    }
    if (![1, 2, 3].includes(rooms)) {
      setError("Количество комнат должно быть 1, 2 или 3.");
      return false;
    }
    if (images.length > 5) {
      setError("Максимальное количество изображений: 5.");
      return false;
    }
    for (const file of images) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Каждое изображение должно быть не больше 5 MB.");
        return false;
      }
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    if (!validateForm()) return;

    setIsLoading(true);
    setSuccessMessage("");

    try {
      const response = await axios.post(
        `${backendUrl}api/apartments/create`,
        { title, description, price, rooms },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const apartmentId = response.data._id;

      dispatch(
        setApartments({
          apartments: [response.data],
          totalPages: 1,
        }),
      );

      if (images.length > 0) {
        const formData = new FormData();
        images.forEach((image) => {
          formData.append("images", image);
        });

        await axios.patch(
          `${backendUrl}api/apartments/${apartmentId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
      }

      setTitle("");
      setDescription("");
      setPrice(0);
      setRooms(1);
      setImages([]);
      setError("");
      setSuccessMessage("Квартира успешно создана!");
    } catch (error) {
      console.error("Ошибка при добавлении квартиры:", error);
      setError("Не удалось создать квартиру. Попробуйте снова.");
      dispatch(
        setErrorMessage("Не удалось создать квартиру. Попробуйте снова."),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Добавить квартиру</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <div>
        <label htmlFor="title">Название:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Описание:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="price">Цена:</label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label htmlFor="rooms">Количество комнат:</label>
        <select
          id="rooms"
          value={rooms}
          onChange={(e) => setRooms(Number(e.target.value) as 1 | 2 | 3)}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
      </div>
      <div>
        <label htmlFor="images">Изображения:</label>
        <input
          id="images"
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Загрузка..." : "Добавить"}
      </button>
    </form>
  );
};

export default AddApartment;
