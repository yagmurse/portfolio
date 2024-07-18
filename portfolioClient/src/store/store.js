// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./slices/JobsSlice.js";
import authReducer from "./slices/AuthSlice.js";

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    auth: authReducer,
  },
});
