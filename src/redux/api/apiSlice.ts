import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://book-mania.onrender.com" }),
  tagTypes: ["books", "reviews"],
  endpoints: () => ({}),
});
