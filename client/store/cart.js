import axios from 'axios'

const initialState = {}

/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART'
const GET_ACTIVE_CART = 'GET_ACTIVE_CART'
const CHECKOUT_CART = 'CHECKOUT_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'

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

const checkout = cart => {
  return {
    type: CHECKOUT_CART,
    cart
  }
}

const remove = cart => {
  return {
    type: REMOVE_FROM_CART,
    cart
  }
}

const update = cart => {
  return {
    type: UPDATE_QUANTITY,
    cart
  }
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

export const checkoutCart = () => {
  return async dispatch => {
    try {
      const res = await axios.put('/api/cart/checkout')
      dispatch(checkout(res.data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const removeFromCart = productId => {
  return async dispatch => {
    try {
      const res = await axios.put(`/api/cart/delete/${productId}`)
      dispatch(remove(res.data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const updateQuantity = (productId, qty) => {
  return async dispatch => {
    try {
      const res = await axios.put(`/api/cart/edit/${productId}/${qty}`)
      dispatch(update(res.data))
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
      return action.cart // return only the cart object
    case GET_ACTIVE_CART:
      return action.cart
    case CHECKOUT_CART:
      return action.cart
    case REMOVE_FROM_CART:
      return action.cart
    case UPDATE_QUANTITY:
      return action.cart
    default:
      return state
  }
}
