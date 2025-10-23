import { createSlice } from "@reduxjs/toolkit";

const MiscSlice = createSlice({
  name: "Misc",
  initialState: {
    darkMode: false,
  },
  reducers: {
    setDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
  },
});

export const MiscActions = MiscSlice.actions;
export default MiscSlice;
