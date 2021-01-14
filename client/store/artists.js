import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_ARTISTS = 'GET_ALL_ARTISTS'

/**
 * INITIAL STATE
 */
const defaultArtist = []

/**
 * ACTION CREATORS
 */
export const getAllArtists = artists => ({type: GET_ALL_ARTISTS, artists})

/**
 * THUNK CREATORS
 */
export const fetchArtists = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/artists')
      dispatch(getAllArtists(res.data || defaultArtist))
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultArtist, action) {
  switch (action.type) {
    case GET_ALL_ARTISTS:
      return action.artists
    default:
      return state
  }
}
