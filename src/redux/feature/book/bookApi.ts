import { api } from "../../api/apiSlice";

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["books"],
    }),
    singleBook: builder.query({
      query: (id) => `/book/${id}`,
    }),
    postBook: builder.mutation({
      query: (data) => ({
        url: `/book`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    editBook: builder.mutation({
      query: (data) => ({
        url: `/book`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteBook: builder.mutation({
      query(id) {
        return {
          url: `/book/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["books"],
    }),
    postReview: builder.mutation({
      query: (data) => ({
        url: `/review`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reviews"],
    }),
    getReviews: builder.query({
      query: (id) => `/reviews/${id}`,
      providesTags: ["reviews"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  usePostBookMutation,
  useSingleBookQuery,
  useDeleteBookMutation,
  useEditBookMutation,
  usePostReviewMutation,
  useGetReviewsQuery,
} = productApi;
