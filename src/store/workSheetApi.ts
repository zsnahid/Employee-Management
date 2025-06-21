import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface WorkSheetEntry {
  _id: string;
  userId: string;
  selectedTask: string;
  startTime: string;
  completionTime: string;
  createdAt: string;
}

export const workSheetApi = createApi({
  // Unique name of this slice in the store
  reducerPath: "workSheetApi",

  // Configure the API calls
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      // Add any authentication headers here if needed
      headers.set("content-type", "application/json");
      return headers;
    },
  }),

  // Cache tags - helps RTK Query know when to refetch data
  // Tags group related data together
  tagTypes: ["WorkSheet"],

  // Actual API endpoints
  endpoints: (builder) => ({
    // Query to fetch all work sheet entries
    getWorkSheetEntries: builder.query<WorkSheetEntry[], void>({
      query: () => "/work-sheet",
      // This query provides 'WorkSheet' tags, meaning it contains work sheet data
      providesTags: (result) =>
        result
          ? [
              // Tag each individual entry with its ID
              ...result.map(({ _id }) => ({
                type: "WorkSheet" as const,
                id: _id,
              })),
              { type: "WorkSheet", id: "LIST" },
            ]
          : [{ type: "WorkSheet", id: "LIST" }],
    }),

    // Mutation to add a new work sheet entry
    addWorkSheetEntry: builder.mutation<
      WorkSheetEntry,
      {
        selectedTask: string;
        startTime: string;
        completionTime: string;
      }
    >({
      query: (formData) => ({
        url: "/work-sheet",
        method: "POST",
        body: formData,
      }),

      // Optimistic updates
      onQueryStarted: async (formData, { dispatch, queryFulfilled }) => {
        // Step 1: Immediately update the UI
        // Creates a temporary entry to show the user while the real request is happening
        const optimisticEntry: WorkSheetEntry = {
          _id: `temp-${Date.now()}`, // Temporary ID
          userId: "temp-user", // Will be replaced with real data
          ...formData,
          createdAt: new Date().toISOString(),
        };

        // Update the cached data immediately
        const patchResult = dispatch(
          workSheetApi.util.updateQueryData(
            "getWorkSheetEntries",
            undefined,
            (draft) => {
              // Add the new entry at the top of the list
              draft.unshift(optimisticEntry);
            },
          ),
        );

        try {
          // Step 2: Wait for the real API call to complete
          const { data: actualEntry } = await queryFulfilled;

          // Step 3: Replace the optimistic entry with the real data from MongoDB
          dispatch(
            workSheetApi.util.updateQueryData(
              "getWorkSheetEntries",
              undefined,
              (draft) => {
                // Find and replace the temporary entry with the real one
                const index = draft.findIndex(
                  (item) => item._id === optimisticEntry._id,
                );
                if (index !== -1) {
                  draft[index] = actualEntry;
                }
              },
            ),
          );
        } catch (err) {
          // Step 4: If the API call failed, undo the optimistic update
          console.error("Failed to add work sheet entry: ", err);
          patchResult.undo();
          // Dispatch a notification to show the user the error
        }
      },

      // This tells RTK Query to refetch any queries tagged with 'WorkSheet'
      // This ensures all parts of the app stay in sync
      invalidatesTags: [{ type: "WorkSheet", id: "LIST" }],
    }),

    // Mutation to update an existing entry
    updateWorkSheetEntry: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `/work-sheet/${id}`,
        method: "PUT",
        body: updates,
      }),

      // After updating an entry invalidate that specific entry's cache
      invalidatesTags: (result, error, { id }) => [{ type: "WorkSheet", id }],
    }),

    // Mutation to delete an entry
    deleteWorkSheetEntry: builder.mutation({
      query: (id) => ({
        url: `/work-sheet/${id}`,
        method: "DELETE",
      }),

      // After deleting an entry invalidate that specific entry and the list
      invalidatesTags: (result, error, id) => [
        { type: "WorkSheet", id },
        { type: "WorkSheet", id: "LIST" },
      ],
    }),
  }),
});

// Export hooks for use in components
// RTK Query automatically generates these hooks based on endpoints
export const {
  useGetWorkSheetEntriesQuery, // Hook to fetch all entries
  useAddWorkSheetEntryMutation, // Hook to add new entry
  useUpdateWorkSheetEntryMutation, // Hook to update entry
  useDeleteWorkSheetEntryMutation, // Hook to delete entry
} = workSheetApi;
