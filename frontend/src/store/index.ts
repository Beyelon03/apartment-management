import { configureStore } from "@reduxjs/toolkit";
import apartmentsReducer from "./slices/apartmentSlice";

const store = configureStore({
  reducer: {
    apartments: apartmentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
