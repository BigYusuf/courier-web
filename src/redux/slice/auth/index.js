import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    user: null,
    evalUser: null,
    profile: null,
    singleUser: null,
    managers: [],
    manager: null,
    admin: null,
    superAdmin: null,
  },
  
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setEvalUser: (state, action) => {
      state.evalUser = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setManager: (state, action) => {
      state.manager = action.payload;
    },
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    setSuperAdmin: (state, action) => {
      state.superAdmin = action.payload;
    },
    getAllUsers: (state, action) => {
      state.users = action.payload;
    },
    getAllManagers: (state, action) => {
      state.managers = action.payload;
    },
    getSingleUser: (state, action) => {
      state.singleUser = action.payload;
    },
    logOut: (state) => {
      state.user = null;
      state.evalUser = null;
      state.singleUser = null;
      state.profile = null;
      state.manager = null;
      state.users = [];
      state.managers = [];
      state.admin = null;
      state.superAdmin = null;
    },
  },
});

export const {
  setUser,
  setEvalUser,
  setProfile,
  setManager,
  setAdmin,
  getAllUsers,
  getAllManagers,
  getSingleUser,
  logOut,
} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.user.user;
export const selectCurrentProfile = (state) => state.user.profile;
