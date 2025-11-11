import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  profileUrl: null,
};

const ProfileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setProfileUrl: (state, action) => {
      state.profileUrl = action.payload;
    },
    reset: (state) => {
      state.name = null;
      state.profileUrl = null;
    },
  },
});

export const ProfileActions = ProfileSlice.actions;
export default ProfileSlice;
