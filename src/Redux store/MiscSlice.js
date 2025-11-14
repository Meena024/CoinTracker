import { createSlice } from "@reduxjs/toolkit";

const MiscSlice = createSlice({
  name: "Misc",
  initialState: {
    darkMode: false,
    premium: false,
  },
  reducers: {
    setDarkMode(state, action) {
      state.darkMode = action.payload;
    },
    setPremium(state, action) {
      state.premium = action.payload;
    },
    reset(state) {
      state.darkMode = false;
      state.premium = false;
    },
  },
});

export const MiscActions = MiscSlice.actions;
export default MiscSlice;
