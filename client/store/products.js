import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'

/**
 * INITIAL STATE
 */
const defaultProduct = []

/**
 * ACTION CREATORS
 */
export const getAllProducts = products => ({type: GET_ALL_PRODUCTS, products})

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

/**
 * REDUCER
 */
export default function(state = defaultProduct, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    default:
      return state
  }
}
