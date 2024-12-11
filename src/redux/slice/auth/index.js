import { api } from "../../api/index";

export const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login-user",
        method: "POST",
        body: { ...credentials },
      }),
      providesTags: ["Auth"],
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register-user",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    loginStaff: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login-staff",
        method: "POST",
        body: { ...credentials },
      }),
      providesTags: ["Auth"],
    }),
    registerStaff: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register-staff",
        method: "POST",
        body: { ...credentials },
      }),
      providesTags: ["Staffs", "Auth"],
    }),
    sendOtp: builder.mutation({
      query: (credentials) => ({
        url: "/auth/send-otp",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    verifyEmail: builder.mutation({
      query: (credentials) => ({
        url: `/auth/verify-otp`,
        method: "PATCH",
        body: credentials,
      }),
    }),

    resetPass: builder.mutation({
      query: (credentials) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    forgotPass: builder.mutation({
      query: (credentials) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    changePass: builder.mutation({
      query: (credentials) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: { ...credentials },
      }),
    }),
    getProfile: builder.query({
      query: () => "users/profile/user",
      providesTags: ["User"],
    }),
    getStaffProfile: builder.query({
      query: () => "staffs/profile/staff",
      providesTags: ["Staff"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSendOtpMutation,
  useGetProfileQuery,
  useGetStaffProfileQuery,
  useLoginStaffMutation,
  useRegisterStaffMutation,
  useVerifyEmailMutation,
  useForgotPassMutation,
  useChangePassMutation,
} = authApiSlice;
