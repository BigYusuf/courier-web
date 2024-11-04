import { createSlice } from "@reduxjs/toolkit";

//let retriveItem = JSON.parse(localStorage.getItem("DashBoardUser"));
//console.log(retriveItem.userId)
//retrieve user from id
const initialState = {
    mode: "dark",
   // userId: retriveItem.userId,
}

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        }
    }
})

export const { setMode } = globalSlice.actions;
export default globalSlice.reducer;