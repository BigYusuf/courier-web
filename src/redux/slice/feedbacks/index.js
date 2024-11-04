import { createSlice } from "@reduxjs/toolkit";

const feedbackSlice = createSlice({
  name: "feedbacks",
  initialState: { feedback: null, feedbacks: [] },
  reducers: {
    getFeedback: (state, action) => {
      state.feedback = action.payload;
    },
    getFeedbacks: (state, action) => {
      state.feedbacks = action.payload;
    },
    getFeedbacksByNation: (state, action) => {
      state.feedbacks = action.payload;
      //state.feedbacks.push({ ...action.payload });
    },
  },
});

export const { getFeedback, getFeedbacks, getFeedbacksByNation } =
  feedbackSlice.actions;

export default feedbackSlice.reducer;
