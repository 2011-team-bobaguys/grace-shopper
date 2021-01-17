import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProduct} from '../store/singleProduct'
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
import {Share, AddShoppingCart} from '@material-ui/icons/'

/**
 * COMPONENT
 */

export class SingleProduct extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    try {
      this.props.loadProduct(this.props.match.params.productId)
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const product = this.props.product || {}
    let artImage = product.imageUrl
    let artist = ''
    let artistName = 'Unknown'
    let artistImage =
      'https://upload.wikimedia.org/wikipedia/commons/2/2b/Andy_Warhol_by_Jack_Mitchell.jpg'
    if (product.Artist) {
      artist = product.Artist
      artistName = product.Artist.name
      artistImage = product.Artist.imageUrl
    }
    return (
      <div>
        <Paper>
          <div className="singleViewContainer">
            <div className="singleViewImgContainer">
              {artImage ? (
                <img className="singleViewImg" src={artImage} width="300" />
              ) : (
                <CircularProgress />
              )}
            </div>
            <div className="singleViewTextContainer">
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
                    <ListItemText primary={`${artistName}`} />
                  </ListItem>
                </Link>
              </List>
              <Button startIcon={<Share />}>Share</Button>
              <Button startIcon={<AddShoppingCart />}>Buy</Button>
            </div>
          </div>
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
    product: state.singleProduct
  }
}

const mapDispatch = dispatch => {
  return {
    loadProduct: productId => dispatch(fetchProduct(productId))
  }
}

const SingleProductConnected = connect(mapState, mapDispatch)(SingleProduct)
export default SingleProductConnected
