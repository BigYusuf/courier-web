import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
  name: "question",
  initialState: {
    question: [],
    supportQuestion: null,
    familyQuestion: null,
    houseQuestion: null,
    personalQuestion: [],
  },
  reducers: {
    getQuestions: (state, action) => {
      state.question.push({ ...action.payload });
    },
    getSupportQuestions: (state, action) => {
      state.supportQuestion = action.payload;
      //state.supportQuestion.push({...action.payload});
    },
    getFamilyQuestions: (state, action) => {
      state.familyQuestion = action.payload;
      //state.familyQuestion.push({...action.payload});
    },
    getHouseQuestions: (state, action) => {
      state.houseQuestion = action.payload;
      // state.houseQuestion.push({...action.payload});
    },
    getPersonalQuestions: (state, action) => {
      state.personalQuestion.push({ ...action.payload });
    },
  },
});

export const {
  getQuestions,
  getSupportQuestions,
  getFamilyQuestions,
  getHouseQuestions,
  getPersonalQuestions,
} = questionSlice.actions;

export default questionSlice.reducer;
