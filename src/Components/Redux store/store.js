import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import ModalSlice from "./ModalSlice";
import ProfileSlice from "./ProfileSlice";
import ExpenseSlice from "./ExpenseSlice";
import MiscSlice from "./MiscSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    modal: ModalSlice.reducer,
    profile: ProfileSlice.reducer,
    expense: ExpenseSlice.reducer,
    misc: MiscSlice.reducer,
  },
});

export default store;
