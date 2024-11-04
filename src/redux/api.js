import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut } from "./slice/authSlice";

const baseQuery = fetchBaseQuery({
    // eslint-disable-next-line no-undef
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

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    
    if (result?.error?.status === 403) {
        api.dispatch(logOut())
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

    return result
}


export const api = createApi({
    baseQuery: baseQueryWithReauth,
    reducePath: "adminApi",
    tagTypes: ["User", "Products", "Reviews","Messages", "Conversations", "Customers", "Licenses", "Trials", "Transactions", "Geography", "Sales", "Admins", "Performance", "Dashboard"],
    endpoints: (build) => ({
        //products
        getProducts: build.query({ 
            query: ({ page, limit, sort, search, shop, category, min, max, platform, trial }) => ({
                url:"products",
                method: "GET",
                params: { page, limit, sort, search, shop, category, min, max, platform, trial },
            }),
            providesTags: ["Products"]
        }),
        getProduct: build.query({
            query: (id) => `products/${id}`,
            providesTags: ["Product"]
        }),
        deleteProduct: build.mutation({
            query: (id) => ({
                url: `products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: build.mutation({
            query: ({id, body}) => ({
                url: `products/${id}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['Product', 'Products'],
        }),
        addProduct: build.mutation({
            query: (body) => ({
                url: `products/add`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Products'],
        }),
        //review
        addReview: build.mutation({
            query: (body) => ({
                url: `reviews/add`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['Reviews'],
        }),
        getReviews: build.query({
            query: (productId) => ({
                url: `reviews`,
                method: 'GET',
                params: {productId}
        }),
            providesTags: ["Reviews"]
        }),
        deleteReview: build.mutation({
            query: ({productId, reviewId}) => ({
                url: `reviews?reviewId=${reviewId}&productId=${productId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Reviews'],
        }),
        //paid license
        addLicense: build.mutation({
            query: ({id, body}) => ({
                url: `product/${id}/license/add`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['License'],
        }),
        updateLicense: build.mutation({
            query: ({ licenseId, body}) => ({
                url: `product/${licenseId}/license`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['License'],
        }),
        updateLicenseSeller: build.mutation({
            query: ({ licenseId, body}) => ({
                url: `product/${licenseId}/licenseseller`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['License'],
        }),
        checkLicense: build.query({
            query: ({license, accountNumber, trial}) => ({
                url: `license`,
                method: "GET",
                params: { license, accountNumber, trial},
            }),
            providesTags: ["License"]
        }),
        getLicense: build.query({
            query: (orderId) => `product/${orderId}`,
            providesTags: ["License"]
        }),
        getCustomerLicense: build.query({
            query: (productId ) => `product/${productId}/customer`,
            providesTags: ["License"]
        }),
        getLicenses: build.query({
            query: ({ productId}) => ({
                url: `product/${productId}/license`,
                method: 'GET',
            }),
            providesTags: ["Licenses"]
        }),
        //trial license
        addTrialLicense: build.mutation({
            query: (body) => ({
                url: `trials/add`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Trial'],
        }),
        updateTrialLicense: build.mutation({
            query: (body) => ({
                url: `trials`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Trial'],
        }),
        getTrialLicense: build.query({
            query: (productId) => `trials/${productId}`,
            providesTags: ["Trial"]
        }),
        getTrialComment: build.query({
            query: (productId) => `trials/comments/${productId}`,
            providesTags: ["Trial Comment"]
        }),
        getTrialLicensesSeller: build.query({
            query: () => ({
                url: `trials`,
                method: 'GET',
            }),
            providesTags: ["Trials"]
        }),
        //conversation
        createConversation: build.mutation({
            query: (body) => ({
                url: `conversation`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Messages'],
        }),
        getConversation: build.query({ 
            query: (id) => `/conversation/${id}`,
            providesTags: ["Messages"]
        }),
        getConversations: build.query({ 
            query: () => `/conversation`,
            providesTags: ["Messages"]
        }),
        updateConversation: build.mutation({
            query: (id) => ({
                url: `conversation/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Messages'],
        }),
        //message
        addMessage: build.mutation({
            query: (body) => ({
                url: `messages/add`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Messages'],
        }),
        getMessages: build.query({
            query: (id) => `messages/${id}`,
            providesTags: ["Messages"]
        }),

        
        //auth
        login: build.mutation({
            query: (body) => ({
                url: `users/login`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['User'],
        }),
        logout: build.mutation({
            query: (body) => ({
                url: `users/logout`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['User'],
        }),
        register: build.mutation({
            query: (body) => ({
                url: `users/register`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['User'],
        }),
        verifyEmail: build.mutation({
            query: (body) => ({
                url: `users/verify-email`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['User'],
        }),
        sendToken: build.mutation({
            query: (body) => ({
                url: `users/send-token`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['User'],
        }),
        passReset: build.mutation({
            query: (body) => ({
                url: `users/reset-password`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['User'],
        }),
        //users
        getCustomers: build.query({ 
            query: () => "product/customers",
            providesTags: ["Customers"]
        }),
        getUser: build.query({ 
            query: (id) => `users/${id}`,
            providesTags: ["User"]
        }),
        getOwnerInfo: build.query({  
            query: (id) => `users/owner/${id}`,
            providesTags: ["Owner"]
        }),
        updateUser: build.mutation({
            query:({id, body}) => ({
                url: `users/profile/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['User'],
        }),

        //Orders
        createOrder: build.mutation({
            query: ({id, body}) => ({
                url: `orders/add/${id}`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Orders'],
        }),
        getOrders: build.query({  
            query: () => `orders`,
            providesTags: ["Orders"]
        }),
        getOrder: build.query({
            query: (id ) => `orders/${id}`,
            providesTags: ["Order"]
        }),
        //Shop
        loginShop: build.mutation({
            query: ( body ) => ({
                url: `shops/login`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Shop'],
        }),
        createShop: build.mutation({
            query: ( body ) => ({
                url: `shops/add`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Shop'],
        }),
        updateShop: build.mutation({
            query: ({id, body}) => ({
                url: `shops/shop/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Shop'],
        }),
        getShopSeller: build.query({  
            query: () => `shops/shop`,
            providesTags: ["Shop"]
        }),
        getShops: build.query({  
            query: () => `shops`,
            providesTags: ["Shops"]
        }),
        getShop: build.query({
            query: (id ) => `shops/${id}`,
            providesTags: ["Shop"]
        }),
        sendQAToken: build.mutation({
            query: (body) => ({
                url: `shops/send-token`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Shop'],
        }),
        QAReset: build.mutation({
            query: (body) => ({
                url: `shops/reset-qa`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Shop'],
        }),
        //withdrawal
        getWithdrawSeller: build.query({
            query: (id ) => `withdrawals/get-withdraw-request/${id}`,
            providesTags: ["Withdrawals"]
        }),
        createWithdrawal: build.mutation({
            query: ( body ) => ({
                url: `withdrawals/create-withdraw-request`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Withdrawal'],
        }),

        getTransactions: build.query({ 
            query: ({ page, pageSize, sort, search }) => ({
                url:"client/transactions",
                method: "GET",
                params: { page, pageSize, sort, search},
            }),
            providesTags: ["Transactions"]
        }),
        getGeography: build.query({ 
            query: (id) => `users/geo?userId=${id}`,
            providesTags: ["Geography"]
        }),
        getSales: build.query({ 
            query: () => "sales/sales",
            providesTags: [ "Sales" ]
        }),
        getAdmins: build.query({ 
            query: () => "management/admins",
            providesTags: ["Admins"]
        }),
        getUserPerformance: build.query({
            query: (id) => `management/performance/${id}`,
            providesTags: ["Performance"]
        }),
        getDashboard: build.query({
            query: () => "general/dashboard",
            provideTags: ["Dashboard"],
        })
    })
})

export const { 
    useGetWithdrawSellerQuery, useCreateWithdrawalMutation,
    useQAResetMutation, useSendQATokenMutation, useLoginShopMutation, useCreateShopMutation, useUpdateShopMutation, useGetShopSellerQuery, useGetShopsQuery, useGetShopQuery,
    useGetConversationQuery, useGetConversationsQuery, useCreateConversationMutation, useUpdateConversationMutation,
    useCreateOrderMutation, useGetOrdersQuery, useGetOrderQuery,
    useAddTrialLicenseMutation, useUpdateTrialLicenseMutation, useGetTrialCommentQuery,useGetTrialLicenseQuery, useGetTrialLicensesSellerQuery,
    useAddLicenseMutation, useUpdateLicenseMutation, useGetCustomerLicenseQuery, useUpdateLicenseSellerMutation, useCheckLicenseQuery, useGetLicenseQuery, useGetLicensesQuery,
    useGetMessagesQuery, useAddMessageMutation,
    useAddReviewMutation, deleteReviewMutation, useGetReviewsQuery,
    useAddProductMutation, deleteProductMutation, useGetProductsQuery, useGetProductQuery, useUpdateProductMutation, 
    useLogoutMutation, useLoginMutation, useRegisterMutation, usePassResetMutation, useSendTokenMutation, useVerifyEmailMutation,
    useGetUserQuery, useGetOwnerInfoQuery, useGetCustomersQuery, useUpdateUserMutation,
    useGetTransactionsQuery, useGetGeographyQuery,
    useGetSalesQuery, useGetAdminsQuery, useGetUserPerformanceQuery, useGetDashboardQuery } = api;