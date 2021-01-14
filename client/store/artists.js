import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_ARTISTS = 'GET_ALL_ARTISTS'
const DELETE_ARTIST = 'DELETE_ARTIST'

/**
 * INITIAL STATE
 */
const defaultArtist = []

/**
 * ACTION CREATORS
 */
export const getAllArtists = artists => ({type: GET_ALL_ARTISTS, artists})

export const deleteArtist = artistId => ({type: DELETE_ARTIST, artistId})

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

export const fetchDeleteArtist = artistId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/artists/${artistId}`)
      dispatch(deleteArtist(artistId))
    } catch (error) {
      console.log(error)
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
    case DELETE_ARTIST:
      return state.filter(artist => artist.id !== action.artistId)
    default:
      return state
  }
}
