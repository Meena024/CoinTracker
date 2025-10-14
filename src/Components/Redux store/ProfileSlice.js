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
  },
});

export const ProfileActiions = ProfileSlice.actions;
export default ProfileSlice;
