import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchArtist} from '../store/singleArtist'
import {
  Card,
  CardActions,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
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
    let products = []
    let productTitle = 'none'
    let productImage =
      'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
    if (artist.Products) {
      products = artist.Products
    }
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
                <List>
                  {products.map(product => {
                    productImage = product.imageUrl
                    productTitle = product.title
                    return (
                      <div key={product.id}>
                        <Link to={`/products/${product.id}`}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <img
                                  src={productImage}
                                  style={{maxWidth: '50px'}}
                                />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={productTitle} />
                          </ListItem>
                        </Link>
                      </div>
                    )
                  })}
                </List>
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
