import ApartmentsList from "../pages/ApartmentsList";
import AddApartment from "../pages/AddApartment";
import NotFound from "../pages/NotFound";
import EditApartment from "../pages/EditApartment.tsx";
import { Routes, Route } from "react-router";
import Layout from "../pages/Layout.tsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ApartmentsList />} />
        <Route path="/add" element={<AddApartment />} />
        <Route path="/edit/:id" element={<EditApartment />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
