import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "events",
  initialState: { events: [], event: null },
  reducers: {
    getEvents: (state, action) => {
      state.events = action.payload;
      //state.events?.push({ ...action.payload });
    },
    getEventsByNation: (state, action) => {
      state.events = action.payload;
      //state.events?.push({ ...action.payload });
    },
    getEvent: (state, action) => {
      state.event = action.payload;
    },
  },
});

export const { getEvents, getEventsByNation, getEvent } = eventSlice.actions;

export default eventSlice.reducer;
