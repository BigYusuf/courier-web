import { createSlice } from "@reduxjs/toolkit"

const shopSlice = createSlice({
    name: 'shopAuth',
    initialState: { shop: null, shopToken: null },
    reducers: {
        setShopCredentials: (state, action) => {
            const { shop, shopToken } = action.payload
            state.shop = shop
            state.shopToken = shopToken
        },

        logOutShop: (state) => {
            state.shop = null
            state.shopToken = null
        }
    },
})

export const { setShopCredentials, logOutShop } = shopSlice.actions

export default shopSlice.reducer

export const selectShop = (state) => state.shopAuth.shop
export const selectShopToken = (state) => state.shopAuth.shopToken
