import React from 'react'
import {connect} from 'react-redux'
import {fetchArtists} from '../store/artists'
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

const useStyles = makeStyles({
  root: {
    maxWidth: 150
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
  }
  componentDidMount() {
    this.props.loadArtists()
  }

  render() {
    const classes = useStyles
    console.log('PROPS', this.props)
    return (
      <div>
        <h2>All Artists</h2>
        <div>
          {this.props.artists.map(artist => (
            <div key={artist.id}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    component="img"
                    image={artist.imageUrl}
                    title="art"
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
                  <Button component={Link} to={`/artists/${artist.id}`}>
                    View
                  </Button>
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
    artists: state.artists
  }
}

const mapDispatch = dispatch => {
  return {
    loadArtists: () => dispatch(fetchArtists())
  }
}

const AllArtistsConnected = connect(mapState, mapDispatch)(AllArtists)
export default AllArtistsConnected
