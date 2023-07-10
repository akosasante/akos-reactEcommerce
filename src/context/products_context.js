import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }

  const fetchProducts = async (url) => {
    dispatch({ type: GET_PRODUCTS_BEGIN })
    try {
      const response = await axios.get(url , { withCredentials: true })
      const products = response.data.products
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products })
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR })
    }
  }
//fn that fetches single product- without line 55 I used to get an array of products just like in fetchProducts fn , now it gives an error in console bundle.js:146779     GET http://localhost:3000/products/NaN 404 (Not Found)- so in SingleProductPage.js i converted it to number - line 18
  const fetchSingleProduct = async (url,id) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
    try {
      const response = await axios.get(`${url}/${id}`, {
        withCredentials: true,
      })
      const singleProduct = response.data.product
      
     // console.log(singleProduct);
      
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct })
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
    }
  }

  const addProduct = async (product) => {
    try {
      const response = await axios.post(
        url,
        product,
        { withCredentials: true }
      );
      const responseProduct = response?.data?.product

      console.log('Product added successfully:', responseProduct);

      // reload products:
      fetchProducts(url);

      return responseProduct
    } catch (error) {
      console.log('Error adding product:', error);
    }
  }

  const ensureProductsLoaded = async () => {
    if (!state.products?.length) {
      // If products is not defined, or if it's an empty list, then re-fetch the products from the backend
      await fetchProducts();
    }
  }

  useEffect(() => {
    fetchProducts(url)
  }, [])

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        fetchSingleProduct,
        addProduct,
        ensureProductsLoaded
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}