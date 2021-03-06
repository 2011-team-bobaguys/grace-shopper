import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'
/**
 * INITIAL STATE
 */
const defaultProduct = []

/**
 * ACTION CREATORS
 */
export const getAllProducts = products => ({type: GET_ALL_PRODUCTS, products})

export const deleteProduct = productId => ({type: DELETE_PRODUCT, productId})

export const addNewProduct = productInfo => ({type: ADD_PRODUCT, productInfo})

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/products')
      dispatch(getAllProducts(res.data || defaultProduct))
    } catch (err) {
      console.error(err)
    }
  }
}

export const fetchDeleteProduct = productId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${productId}`)
      dispatch(deleteProduct(productId))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addProductToDB = productInfo => {
  return async dispatch => {
    try {
      await axios.post('/api/products', productInfo)
      dispatch(addNewProduct(productInfo))
    } catch (err) {
      console.log(err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultProduct, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== action.productId)
    case ADD_PRODUCT:
      return [...state, action.productInfo]
    default:
      return state
  }
}
