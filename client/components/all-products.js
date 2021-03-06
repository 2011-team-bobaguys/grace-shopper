import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, fetchDeleteProduct} from '../store/products'
import {addToCart} from '../store/cart'
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
import {AddShoppingCart, Delete} from '@material-ui/icons/'

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
export class AllProducts extends React.Component {
  constructor() {
    super()
    this.handleDelete = this.handleDelete.bind(this)
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }
  componentDidMount() {
    this.props.loadProducts()
  }

  handleDelete(productToDelete) {
    this.props.loadDeleteProduct(productToDelete)
  }

  handleAddToCart(productId) {
    this.props.toggleAddToCart(productId)
  }

  handleGuestCart(productId) {
    let guestCart = JSON.parse(window.localStorage.getItem('guestCart'))
    if (guestCart[productId]) {
      guestCart[productId]++
    } else {
      guestCart[productId] = 1
    }

    window.localStorage.setItem('guestCart', JSON.stringify(guestCart))
  }

  render() {
    const classes = useStyles
    const user = this.props.user
    return (
      <div>
        <h2>All Art</h2>
        <div id="allProductViewContainer">
          {this.props.products.map(product => (
            <div id="allProductView" key={product.id}>
              <Card style={{width: '30vw'}} className={classes.root}>
                <Link to={`/products/${product.id}`}>
                  <CardActionArea id="artImgContainer">
                    <CardMedia
                      className={classes.media}
                      image={product.imageUrl}
                      title={product.title}
                      style={{height: 1, width: '30 vw', paddingTop: '55%'}}
                    />

                    <CardContent>
                      <Typography noWrap variant="h6" component="h3">
                        {product.title}
                      </Typography>
                      {product.Artist ? (
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {`By ${product.Artist.name} (${product.year})`}
                        </Typography>
                      ) : (
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {`By unknown artist (${product.year})`}
                        </Typography>
                      )}
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {`$${(product.price / 100).toLocaleString('en-US')}`}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
                <CardActions>
                  <Button
                    startIcon={<AddShoppingCart />}
                    onClick={() => {
                      if (this.props.user.id) {
                        this.handleAddToCart(product.id)
                      } else {
                        this.handleGuestCart(product.id)
                      }
                    }}
                  >
                    Buy
                  </Button>
                  {user.isAdmin ? (
                    <Button
                      startIcon={<Delete />}
                      onClick={() => this.handleDelete(product.id)}
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
    products: state.products,
    user: state.user,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    loadProducts: () => dispatch(fetchProducts()),
    loadDeleteProduct: productId => dispatch(fetchDeleteProduct(productId)),
    toggleAddToCart: productId => dispatch(addToCart(productId))
  }
}

const AllProductsConnected = connect(mapState, mapDispatch)(AllProducts)
export default AllProductsConnected
