import { createSlice } from "@reduxjs/toolkit"

const productsSlice = createSlice({
    name: 'products',
    initialState: { products: null, myProducts: null },
    reducers: {
        setProducts: (state, action) => {
            return {...state, products: [...action.payload]};
        },
        setMyProducts: (state, action) => {
            return {...state, products: [...action.payload]};
        },
        newProduct: (state, action) => {
            return {...state, products: [ action.payload, ...state.products]};
        },
        updateProduct: (state, action) => {
            const products = state.products.map((product) => {
                if(product._id === action.payload._id){
                    product = action.payload;
                }
                return product
            })
            return {...state, products: [ ...products]};
        },
        deleteProduct: (state, action) => {
            const products = state.products.filter((product) => product._id !== action.payload._id)
            return {...state, products: [ ...products]};
        },
    },
})

export const { setProducts, setMyProducts, newProduct, updateProduct, deleteProduct } = productsSlice.actions

export default productsSlice.reducer

export const selectMyProduct = (state) => state.products.myProducts
export const selectAllProduct = (state) => state.products.products