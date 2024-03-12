import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  current,
} from "@reduxjs/toolkit";

interface initialStateTypes {
  language: string | any;
}

const initialState = {
  language: "en",
} as initialStateTypes;

export const languages = createSlice({
  name: "languages",
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction) => {
      state.language = action.payload;
    },
  },
});

export const { changeLanguage } = languages.actions;
export default languages.reducer;
