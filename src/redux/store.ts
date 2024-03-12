import { configureStore } from "@reduxjs/toolkit";
import ProjectsReducer from "./features/projectsSlice";
import LanguageReducer from "./features/languageSlice";

export const store = configureStore({
  reducer: {
    ProjectsReducer,
    LanguageReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
