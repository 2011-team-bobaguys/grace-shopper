import axios from 'axios'

const initialState = []

/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART'

/**
 * ACTION CREATORS
 */

const add = product => {
  return {
    type: ADD_TO_CART,
    product
  }
}

/**
 * THUNK CREATORS
 */

export const addToCart = productId => {
  return async dispatch => {
    try {
      const res = axios.put(`/api/cart/add/${productId}`)
      dispatch(add(res.data))
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
      return [...state, action.product]
    default:
      return state
  }
}
