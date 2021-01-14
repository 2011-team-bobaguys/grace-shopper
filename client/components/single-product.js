import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'
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

//SAMPLE IMAGES - DELETE LATER

const artImagePlaceHolder =
  'https://upload.wikimedia.org/wikipedia/commons/7/7a/Campbell%27Soup_%281965%29_Andy_Warhol_%281928-1967%29_%2849982308446%29.jpg'

const artistImagePlaceHolder =
  'https://upload.wikimedia.org/wikipedia/commons/2/2b/Andy_Warhol_by_Jack_Mitchell.jpg'

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
    let artistName = 'Unknown'
    let artistImage = artistImagePlaceHolder
    let artImage = product.imageUrl || artImagePlaceHolder
    if (product.Artist) {
      artistName = product.Artist.name
      artistImage = product.Artist.imageUrl
    }
    return (
      <div>
        <Paper>
          <img src={artImage} width="300" />
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
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <img src={artistImage} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={`${artistName}`} />
            </ListItem>
          </List>
          <Button>Share</Button>
          <Button>Buy</Button>
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
