import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    users: [],
    user: null,
    profile: null,
    singleUser: null,
    staffs: [],
    staff: null,
  },

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setStaff: (state, action) => {
      state.staff = action.payload;
    },
    getAllUsers: (state, action) => {
      state.users = action.payload;
    },
    getAllStaffs: (state, action) => {
      state.staffs = action.payload;
    },
    getSingleUser: (state, action) => {
      state.singleUser = action.payload;
    },
    logOut: (state) => {
      state.user = null;
      state.singleUser = null;
      state.profile = null;
      state.staff = null;
      state.users = [];
      state.staffs = [];
    },
  },
});

export const {
  setUser,
  setProfile,
  setStaff,
  getAllUsers,
  getAllStaffs,
  getSingleUser,
  logOut,
} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.user.user;
export const selectCurrentProfile = (state) => state.user.profile;
