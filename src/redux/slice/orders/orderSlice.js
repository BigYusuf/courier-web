import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    makeOrder: true,
  },

  reducers: {
    setMakeOrder: (state, action) => {
      state.makeOrder = action.payload;
    },
  },
});

export const { setMakeOrder } = orderSlice.actions;

export default orderSlice.reducer;
