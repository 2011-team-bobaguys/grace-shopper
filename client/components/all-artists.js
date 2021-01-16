import React from 'react'
import {connect} from 'react-redux'
import {fetchArtists, fetchDeleteArtist} from '../store/artists'
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {Link} from 'react-router-dom'
import {ViewCarousel, Delete} from '@material-ui/icons/'

const useStyles = makeStyles({
  root: {
    maxWidth: '150px'
  },
  media: {
    height: 100
  }
})

/**
 * COMPONENT
 */
export class AllArtists extends React.Component {
  constructor() {
    super()
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentDidMount() {
    this.props.loadArtists()
  }

  handleDelete(artistToDelete) {
    this.props.loadDeleteArtist(artistToDelete)
  }

  render() {
    const classes = useStyles
    const user = this.props.user
    // console.log('PROPS', this.props)
    return (
      <div>
        <h2>All Artists</h2>
        <div>
          {this.props.artists.map(artist => (
            <div key={artist.id}>
              <Card style={{maxWidth: '300px'}} className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    // component="img"
                    image={artist.imageUrl}
                    title={artist.name}
                    style={{height: 1, maxWidth: '300px', paddingTop: '55%'}}
                  />

                  <CardContent>
                    <Typography variant="h6" component="h3">
                      {artist.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {`Info about ${artist.name}`}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    startIcon={<ViewCarousel />}
                    component={Link}
                    to={`/artists/${artist.id}`}
                  >
                    View
                  </Button>
                  {user.isAdmin ? (
                    <Button
                      startIcon={<Delete />}
                      onClick={() => this.handleDelete(artist.id)}
                    >
                      Delete
                    </Button>
                  ) : (
                    ''
                  )}
                </CardActions>
              </Card>
            </div>
          ))}
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
    artists: state.artists,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadArtists: () => dispatch(fetchArtists()),
    loadDeleteArtist: artistId => dispatch(fetchDeleteArtist(artistId))
  }
}

const AllArtistsConnected = connect(mapState, mapDispatch)(AllArtists)
export default AllArtistsConnected
