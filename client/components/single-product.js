import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProduct} from '../store/singleProduct'
import {addToCart} from '../store/cart'
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
import {Share, AddShoppingCart} from '@material-ui/icons/'

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

export class SingleProduct extends React.Component {
  constructor() {
    super()
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  componentDidMount() {
    try {
      this.props.loadProduct(this.props.match.params.productId)
    } catch (error) {
      console.error(error)
    }
  }

  handleAddToCart(productId) {
    this.props.toggleAddToCart(productId)
  }

  render() {
    const classes = useStyles
    const product = this.props.product || {}
    let artImage = product.imageUrl
    let artist = ''
    let artistName = 'Unknown'
    let artistImage =
      'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
    if (product.Artist) {
      artist = product.Artist
      artistName = product.Artist.name
      artistImage = product.Artist.imageUrl
    }
    return (
      <div>
        <div className="singleViewContainer">
          <div className="singleViewImgContainer">
            {artImage ? (
              <img className="singleViewImg" src={artImage} width="300" />
            ) : (
              <CircularProgress />
            )}
          </div>
          <div className="singleViewTextContainer">
            <Card style={{minWidth: '500px'}} className={classes.root}>
              <CardContent>
                <Typography variant="h6" component="h3">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {`${product.medium} (${product.year})`}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {`$${(product.price / 100).toLocaleString('en-US')}`}
                </Typography>
                <List>
                  <Link to={`/artists/${artist.id}`}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <img src={artistImage} style={{maxWidth: '50px'}} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={artistName} />
                    </ListItem>
                  </Link>
                </List>
              </CardContent>
              <CardActions>
                <Button startIcon={<Share />}>Share</Button>
                <Button
                  startIcon={<AddShoppingCart />}
                  onClick={() => this.handleAddToCart(product.id)}
                >
                  Buy
                </Button>
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
    product: state.singleProduct,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    loadProduct: productId => dispatch(fetchProduct(productId)),
    toggleAddToCart: productId => dispatch(addToCart(productId))
  }
}

const SingleProductConnected = connect(mapState, mapDispatch)(SingleProduct)
export default SingleProductConnected
