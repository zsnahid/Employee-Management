import { configureStore } from "@reduxjs/toolkit";
import { workSheetApi } from "./workSheetApi";
import { employeeListApi } from "./employeeListApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { contactFormApi } from "./contactFormApi";

export const store = configureStore({
  reducer: {
    // Add the reducers - this manages caching and API state
    [workSheetApi.reducerPath]: workSheetApi.reducer,
    [employeeListApi.reducerPath]: employeeListApi.reducer,
    [contactFormApi.reducerPath]: contactFormApi.reducer,
  },

  // Add the RTK Query middleware - this handles background refetching and caching
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      workSheetApi.middleware,
      employeeListApi.middleware,
      contactFormApi.middleware,
    ),
});

// Enable automatic refetching on focus/reconnect
// This ensures that the data stays fresh when users return to the app
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
