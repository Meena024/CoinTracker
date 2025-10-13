import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import ModalSlice from "./ModalSlice";
import ProfileSlice from "./ProfileSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    modal: ModalSlice.reducer,
    profile: ProfileSlice.reducer,
  },
});

export default store;
