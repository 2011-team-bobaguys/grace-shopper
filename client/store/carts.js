import axios from 'axios'

const initialState = []

/**
 * ACTION TYPES
 */
const GET_ALL_CARTS = 'GET_ALL_CARTS'

/**
 * ACTION CREATORS
 */

const getAllCarts = carts => {
  return {type: GET_ALL_CARTS, carts}
}

/**
 * THUNK CREATORS
 */

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
    case GET_ALL_CARTS:
      return [...state, ...action.carts] // return array of cart objects
    default:
      return state
  }
}
