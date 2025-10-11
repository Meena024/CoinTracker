import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import ModalSlice from "./ModalSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    modal: ModalSlice.reducer,
  },
});

export default store;
