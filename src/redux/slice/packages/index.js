import { api } from "../../api/index";

export const packageApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getPackages: builder.query({
      query: () => `/packages`,
      providesTags: ["Packages"],
    }),
    getPackage: builder.query({
      query: (id) => `/packages/${id}`,
      providesTags: ["Package"],
    }),

    deletePackage: builder.mutation({
      query: (id) => ({
        url: `/packages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Packages"],
    }),
    updatePackage: builder.mutation({
      query: ({ id, credentials }) => ({
        url: `/packages/${id}`,
        method: "PATCH",
        body: { ...credentials },
      }),
      invalidatesTags: ["Packages"],
    }),
    addPackage: builder.mutation({
      query: (credentials) => ({
        url: `/packages/add`,
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["Packages"],
    }),
    getRates: builder.query({
      query: ({ packageId }) => ({
        url: "/rates",
        method: "GET",
        params: {
          packageId,
        },
      }),
      providesTags: ["Rates"],
    }),
    getRate: builder.query({
      query: (id) => `/rates/${id}`,
      providesTags: ["Rate"],
    }),
    deleteRate: builder.mutation({
      query: (id) => ({
        url: `/rates/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Rates"],
    }),
    updateRates: builder.mutation({
      query: ({ id, credentials }) => ({
        url: `/rates/${id}`,
        method: "PATCH",
        body: { ...credentials },
      }),
      invalidatesTags: ["Rates"],
    }),
    addRate: builder.mutation({
      query: (credentials) => ({
        url: `/rates/add`,
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["Rates"],
    }),
  }),
});

export const {
  useUpdatePackageMutation,
  useAddPackageMutation,
  useDeletePackageMutation,
  useGetPackageQuery,
  useGetPackagesQuery,
  useGetRateQuery,
  useGetRatesQuery,
  useAddRateMutation,
  useUpdateRatesMutation,
  useDeleteRateMutation,
} = packageApiSlice;
