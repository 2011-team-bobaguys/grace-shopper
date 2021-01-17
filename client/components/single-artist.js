import React from 'react'
import {connect} from 'react-redux'
import {fetchArtist} from '../store/singleArtist'
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  CircularProgress
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {Share} from '@material-ui/icons/'

const useStyles = makeStyles({
  root: {
    maxWidth: '300px'
  },
  media: {
    height: 300
  }
})

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
    const classes = useStyles
    const artist = this.props.artist || {}
    let artistImage = this.props.artist.imageUrl
    return (
      <div>
        <div className="singleViewContainer">
          <div className="singleViewImgContainer">
            {artistImage ? (
              <img className="singleViewImg" src={artistImage} width="300" />
            ) : (
              <CircularProgress />
            )}
          </div>
          <div className="singleViewTextContainer">
            <Card style={{minWidth: '500px'}} className={classes.root}>
              <CardContent>
                <Typography variant="h6" component="h3">
                  {artist.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {`Info about ${artist.name}`}
                </Typography>
              </CardContent>
              <CardActions>
                <Button startIcon={<Share />}>Share</Button>
              </CardActions>
            </Card>
          </div>
        </div>
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
