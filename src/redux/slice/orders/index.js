import { api } from "../../api/index";

export const orderApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAdminOrders: builder.query({
      query: () => `/orders`,
      providesTags: ["Orders"],
    }),
    getOrders: builder.query({
      query: () => `/orders/user`,
      providesTags: ["Orders"],
    }),
    getOrder: builder.query({
      query: (id) => `/orders/user/${id}`,
      providesTags: ["Orders"],
    }),
    getAdminOrder: builder.query({
      query: (id) => `/orders/${id}`,
      providesTags: ["Orders"],
    }),
    getTrackItem: builder.query({
      query: (id) => `/track/staff/${id}`,
      providesTags: ["Track"],
    }),

    updateTracker: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/track/${id}`,
        method: "PATCH",
        body: credentials,
      }),
      invalidatesTags: ["Track"],
    }),

    updateOrder: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/orders/${id}`,
        method: "PATCH",
        body: credentials,
      }),
      invalidatesTags: ["Orders"],
    }),
    confirmOrder: builder.mutation({
      query: ({ id, credentials }) => ({
        url: `/orders/${id}`,
        method: "PATCH",
        body: { ...credentials },
      }),
      invalidatesTags: ["Orders"],
    }),
    createOrder: builder.mutation({
      query: (credentials) => ({
        url: `/orders/add`,
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetTrackItemQuery,
  useCreateOrderMutation,
  useConfirmOrderMutation,
  useUpdateOrderMutation,
  useGetOrderQuery,
  useGetOrdersQuery,
  useGetAdminOrdersQuery,
  useGetAdminOrderQuery,
  useUpdateTrackerMutation,
} = orderApiSlice;
