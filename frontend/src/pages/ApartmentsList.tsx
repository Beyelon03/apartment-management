import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  setApartments,
  setErrorMessage,
  setFilters,
  setCurrentPage,
  closeModal,
} from "../store/slices/apartmentSlice";
import ApartmentModal from "../components/ApartmentModal";
import Apartment from "../components/Apartment";
import Pagination from "../components/Pagination";
import FilterBar from "../components/FilterBar";
import "../styles/apartments-list.css";
import axios from "axios";
import { backendUrl } from "../config/api";

const ApartmentsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    apartments,
    currentPage,
    totalPages,
    filters,
    errorMessage,
    isModalOpen,
    selectedApartmentId,
  } = useSelector((state: RootState) => state.apartments);

  const selectedApartment = apartments.find(
    (apartment) => apartment._id === selectedApartmentId,
  );

  const fetchApartments = async () => {
    try {
      const response = await axios.get(`${backendUrl}api/apartments`, {
        params: {
          page: currentPage,
          limit: 6,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          rooms: filters.rooms,
        },
      });

      if (response.data.errors && response.data.errors.length > 0) {
        dispatch(setErrorMessage("По заданному фильтру нет результатов."));
      } else {
        dispatch(setErrorMessage(null));
        dispatch(
          setApartments({
            apartments: response.data.apartments,
            totalPages: response.data.totalPages,
          }),
        );
      }
    } catch (error) {
      console.error("Ошибка при загрузке квартир:", error);
      dispatch(setErrorMessage("Ошибка при получении списка квартир."));
    }
  };

  useEffect(() => {
    fetchApartments();
  }, [currentPage, filters]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: value }));
  };

  const handleFilterSubmit = () => {
    dispatch(setCurrentPage(1));
    fetchApartments();
  };

  return (
    <div>
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onFilterSubmit={handleFilterSubmit}
      />
      <div className="apartments-list">
        <h1>Все квартиры</h1>
        {errorMessage ? (
          <h3>{errorMessage}</h3>
        ) : apartments.length === 0 ? (
          <h3>Список доступных предложений пуст.</h3>
        ) : (
          apartments.map((apartment) => (
            <Apartment key={apartment._id} {...apartment} />
          ))
        )}
      </div>

      {isModalOpen && selectedApartment && (
        <ApartmentModal
          apartment={selectedApartment}
          closeModal={() => dispatch(closeModal())}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => dispatch(setCurrentPage(page))}
      />
    </div>
  );
};

export default ApartmentsList;
