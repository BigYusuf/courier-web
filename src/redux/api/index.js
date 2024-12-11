import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut } from "../slice/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_BASE_URL}`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  console.log(api, "test api");
  let result = await baseQuery(args, api, extraOptions);
  // if (result?.error) api.dispatch(logOut())
  console.log(result, "test user");
  if (
    result?.error?.data?.error?.message === "No Token, you need to Login" ||
    result?.error?.message === "No Token, you need to Login" ||
    result?.error?.data?.error?.status === 401 ||
    result.error?.status === 401
  ) {
    console.log("log out user");
    api.dispatch(logOut());
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Auth",
    "Customers",
    "Customer",
    "User",
    "Orders",
    "Track",
    "Staff",
    "Staffs",
    "Messages",
    "Message",
    "Package",
    "Packages",
    "Rate",
    "Rates",
    "Contacts",
    "Contact",
    "Track",
  ],
  endpoints: (builder) => ({}),
});
