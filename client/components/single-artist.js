import React from 'react'
import {connect} from 'react-redux'
import {fetchArtist} from '../store/singleArtist'
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Button
} from '@material-ui/core'
import {Share} from '@material-ui/icons/'

//SAMPLE IMAGES - DELETE LATER

const artImagePlaceHolder =
  'https://upload.wikimedia.org/wikipedia/commons/7/7a/Campbell%27Soup_%281965%29_Andy_Warhol_%281928-1967%29_%2849982308446%29.jpg'

const artistImagePlaceHolder =
  'https://upload.wikimedia.org/wikipedia/commons/2/2b/Andy_Warhol_by_Jack_Mitchell.jpg'

/**
 * COMPONENT
 */

export class SingleArtist extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    try {
      this.props.loadArtist(this.props.match.params.artistId)
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const artist = this.props.artist || {}
    let artistImage = this.props.artist.imageUrl || artistImagePlaceHolder
    console.log('PROPS', this.props)
    return (
      <div>
        <Paper>
          <img src={artistImage} width="300" />
          <Typography variant="h6" component="h3">
            {artist.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {`Info about ${artist.name}`}
          </Typography>
          <Button startIcon={<Share />}>Share</Button>
        </Paper>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    artist: state.singleArtist
  }
}

const mapDispatch = dispatch => {
  return {
    loadArtist: artistId => dispatch(fetchArtist(artistId))
  }
}

const SingleArtistConnected = connect(mapState, mapDispatch)(SingleArtist)
export default SingleArtistConnected
