import axios from 'axios'

const initialState = []

/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART'
const GET_ACTIVE_CART = 'GET_ACTIVE_CART'
const GET_ALL_CARTS = 'GET_ALL_CARTS'

/**
 * ACTION CREATORS
 */

const add = cart => {
  return {
    type: ADD_TO_CART,
    cart
  }
}

const getActiveCart = cart => {
  return {
    type: GET_ACTIVE_CART,
    cart
  }
}

const getAllCarts = carts => {
  return {type: GET_ALL_CARTS, carts}
}

/**
 * THUNK CREATORS
 */

export const addToCart = productId => {
  return async dispatch => {
    try {
      const res = await axios.put(`/api/cart/add/${productId}`)
      dispatch(add(res.data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const fetchActiveCart = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/cart')
      dispatch(getActiveCart(res.data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const fetchAllCarts = () => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/cart/all`)
      dispatch(getAllCarts(res.data))
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.cart] // return only the cart object
    case GET_ACTIVE_CART:
      return [...state, action.cart]
    case GET_ALL_CARTS:
      return [...state, ...action.carts] // return array of cart objects
    default:
      return state
  }
}
