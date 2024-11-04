import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { logOut } from "../slice/auth";
//import { RootState } from "../redux/store";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_BASE_URL}`,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token
    if (token) {
      headers.set("authorization", `Bearer ${token}`)
    }
    return headers
  }
})


const baseQueryWithReauth = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);
  // if (result?.error) api.dispatch(logOut())
  if (result?.error?.data?.error === "Invalid or expired token") {
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
    "Orders",
    "Track",
    "Staff",
    "Staffs",
    "Messages",
    "Message",
    "Package",
    "Packages",
    
  ],
  endpoints: (builder) => ({}),
});
