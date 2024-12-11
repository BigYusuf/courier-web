import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut } from "./slice/authSlice";

const baseQuery = fetchBaseQuery({
  // eslint-disable-next-line no-undef
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
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    api.dispatch(logOut());
    //console.log('sending refresh token')
    // send refresh token to get new access token
    /* const refreshResult = await baseQuery('/refresh', api, extraOptions)
        console.log(refreshResult)
        if (refreshResult?.data) {
            const user = api.getState().auth.user
            // store the new token 
            api.dispatch(setCredentials({ ...refreshResult.data, user }))
            // retry the original query with new access token 
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }*/
  }

  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  reducePath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Reviews",
    "Messages",
    "Conversations",
    "Customers",
    "Licenses",
    "Trials",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
  ],
  endpoints: (build) => ({}),
});


