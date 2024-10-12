import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: "light",
};
const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggelTheme : (state)=>{
            state.theme = state.theme === "light" ? 'dark' : 'light';
        },
    }
});
export const {toggelTheme} = themeSlice.actions;
export default themeSlice.reducer;