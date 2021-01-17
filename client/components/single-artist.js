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
  Button,
  CircularProgress
} from '@material-ui/core'
import {Share} from '@material-ui/icons/'

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
    let artistImage = this.props.artist.imageUrl
    return (
      <div>
        <Paper>
          {artistImage ? (
            <img className="singleViewImg" src={artistImage} width="300" />
          ) : (
            <CircularProgress />
          )}
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
