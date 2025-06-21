import { configureStore } from "@reduxjs/toolkit";
import { workSheetApi } from "./workSheetApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    // Add the reducers - this manages caching and API state
    [workSheetApi.reducerPath]: workSheetApi.reducer,
  },

  // Add the RTK Query middleware - this handles background refetching and caching
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(workSheetApi.middleware),
});

// Enable automatic refetching on focus/reconnect
// This ensures that the data stays fresh when users return to the app
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
