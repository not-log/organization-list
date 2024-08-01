import { configureStore } from "@reduxjs/toolkit";

import organizationsSlice from "./organizatonsSlice";

export const store = configureStore({
  reducer: {
    [organizationsSlice.name]: organizationsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
