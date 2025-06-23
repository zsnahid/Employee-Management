/**
 * Employee API - RTK Query slice for managing employee data
 *
 * Features:
 * - Fetch employee information from MongoDB 'users' collection
 * - Cache management for efficient data access
 * - Error handling and loading states
 */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Employee {
  userId: string;
  userName: string;
  email?: string;
  designation?: string;
  isVerified?: boolean;
  bank_account_no?: string;
  salary?: string | number;
}

export const employeeListApi = createApi({
  // Unique name of this slice in the store
  reducerPath: "employeeListApi",

  // Configure the API calls
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      headers.set("content-type", "application/json");
      return headers;
    },
  }),

  // Cache tags for managing data invalidation
  tagTypes: ["EmployeeList"],

  // API endpoints
  endpoints: (builder) => ({
    // Query to fetch all employees
    getEmployees: builder.query<Employee[], void>({
      query: () => "/employee-list",
      // This query provides 'Employee' tags
      providesTags: (result) =>
        result
          ? [
              // Tag each individual employee with its ID
              ...result.map(({ userId }) => ({
                type: "EmployeeList" as const,
                id: userId,
              })),
              // General tag for the entire list
              { type: "EmployeeList", id: "LIST" },
            ]
          : [{ type: "EmployeeList", id: "LIST" }],
    }),

    // Query to fetch a single employee by ID
    getEmployeeById: builder.query<Employee, string>({
      query: (id) => `/employee-list/${id}`,
      providesTags: (result, error, id) => [{ type: "EmployeeList", id }],
    }),

    // Mutation to update employee information
    updateEmployee: builder.mutation<
      Employee,
      Partial<Employee> & Pick<Employee, "userId">
    >({
      query: ({ userId, ...patch }) => ({
        url: `/employee-list/${userId}`,
        method: "PATCH",
        body: patch,
      }),
      // Invalidate the specific employee and the list
      invalidatesTags: (result, error, { userId }) => [
        { type: "EmployeeList", id: userId },
        { type: "EmployeeList", id: "LIST" },
      ],
    }),

    // Mutation to create a new employee
    createEmployee: builder.mutation<
      Employee,
      Omit<Employee, "userId" | "createdAt">
    >({
      query: (newEmployee) => ({
        url: "/employee-list",
        method: "POST",
        body: newEmployee,
      }),
      // Invalidate the list to refetch all employees
      invalidatesTags: [{ type: "EmployeeList", id: "LIST" }],
    }),

    // Mutation to delete an employee
    deleteEmployee: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/employee-list/${id}`,
        method: "DELETE",
      }),
      // Invalidate the specific employee and the list
      invalidatesTags: (result, error, id) => [
        { type: "EmployeeList", id },
        { type: "EmployeeList", id: "LIST" },
      ],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeListApi;
