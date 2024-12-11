import { api } from "../../api/index";

export const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["Customers"],
    }),
    getUser: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: ["User"],
    }),
    getStaff: builder.query({
      query: (id) => `/staffs/${id}`,
      providesTags: ["Staff"],
    }),
    getStaffs: builder.query({
      query: () => "/staffs",
      providesTags: ["Staffs"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useGetStaffsQuery,
  useGetStaffQuery,
} = authApiSlice;
