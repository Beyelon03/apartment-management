import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApartmentProps } from "../../components/Apartment";

interface ApartmentsState {
  apartments: ApartmentProps[];
  currentPage: number;
  totalPages: number;
  filters: {
    minPrice: number;
    maxPrice: number;
    rooms: string;
  };
  errorMessage: string | null;
  selectedApartmentId: string | null;
  isModalOpen: boolean;
}

const initialState: ApartmentsState = {
  apartments: [],
  currentPage: 1,
  totalPages: 1,
  filters: {
    minPrice: 0,
    maxPrice: 50000,
    rooms: "",
  },
  errorMessage: null,
  selectedApartmentId: null,
  isModalOpen: false,
};

const apartmentsSlice = createSlice({
  name: "apartments",
  initialState,
  reducers: {
    setApartments: (
      state,
      action: PayloadAction<{
        apartments: ApartmentProps[];
        totalPages: number;
      }>,
    ) => {
      state.apartments = action.payload.apartments;
      state.totalPages = action.payload.totalPages;
    },
    setErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<Partial<ApartmentsState["filters"]>>,
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSelectedApartmentId: (state, action: PayloadAction<string | null>) => {
      state.selectedApartmentId = action.payload;
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.selectedApartmentId = null;
    },
  },
});

export const {
  setApartments,
  setErrorMessage,
  setFilters,
  setCurrentPage,
  setSelectedApartmentId,
  openModal,
  closeModal,
} = apartmentsSlice.actions;

export default apartmentsSlice.reducer;
