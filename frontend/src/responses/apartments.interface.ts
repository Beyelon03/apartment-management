import { ApartmentProps } from "../components/Apartment.tsx";
import { AxiosError } from "axios";

export interface ApartmentsResponse {
  errors: AxiosError[];
  apartments: ApartmentProps[];
  total: number;
  page: number;
  totalPages: number;
}
