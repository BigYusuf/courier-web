import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: { sideBarActive: false },
  reducers: {
    setActiveSideBar: (state, action) => {
      state.activeSideBar = action.payload;
    },
  },
});

export const { setActiveSideBar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
