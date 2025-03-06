import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice.ts";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
