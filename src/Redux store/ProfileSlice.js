import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  profileUrl: null,
  email: null,
  emailVerified: false,
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
    setEmailInfo: (state, action) => {
      const { email, emailVerified } = action.payload;
      state.email = email;
      state.emailVerified = emailVerified;
    },
    reset: (state) => {
      state.name = null;
      state.profileUrl = null;
      state.email = null;
      state.emailVerified = false;
    },
  },
});

export const ProfileActions = ProfileSlice.actions;
export default ProfileSlice;
