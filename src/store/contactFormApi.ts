import { ContactFormData } from "@/app/(dashboard)/employee/contact-support/page";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface RewriteRequest {
  message: string;
}

export interface RewriteResponse {
  rewrittenMessage: string;
}

export const contactFormApi = createApi({
  reducerPath: "contactFormApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    rewriteMessage: builder.mutation<RewriteResponse, RewriteRequest>({
      query: (data) => ({
        url: "/rewrite-message",
        method: "POST",
        body: data,
      }),
    }),

    submitMessage: builder.mutation<
      { success: boolean; id: string },
      ContactFormData
    >({
      query: (data) => ({
        url: "/submit-message",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRewriteMessageMutation, useSubmitMessageMutation } =
  contactFormApi;
