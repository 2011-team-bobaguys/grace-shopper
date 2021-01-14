import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_SINGLE_ARTIST = 'GET_SINGLE_ARTIST'

/**
 * INITIAL STATE
 */
const defaultArtist = {}

/**
 * ACTION CREATORS
 */
export const getSingleArtist = artist => {
  return {type: GET_SINGLE_ARTIST, artist}
}

/**
 * THUNK CREATORS
 */
export const fetchArtist = artistId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/artists/${artistId}`)
      dispatch(getSingleArtist(res.data || defaultArtist))
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
    case GET_SINGLE_ARTIST:
      return action.artist
    default:
      return state
  }
}
