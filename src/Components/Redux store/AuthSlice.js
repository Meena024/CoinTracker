import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "Auth",
  initialState: { isAuthenticated: false, idToken: "", userId: "" },
  reducers: {
    userAuthenticated(state) {
      state.isAuthenticated = true;
    },
    userLogOut(state) {
      state.isAuthenticated = false;
    },

    setIdToken(state, action) {
      state.idToken = action.payload;
    },

    setUserId(state, action) {
      state.userId = action.payload;
    },
  },
});

export const AuthAction = AuthSlice.actions;
export default AuthSlice;
