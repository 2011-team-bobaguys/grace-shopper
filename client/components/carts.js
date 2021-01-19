import React from 'react'
import {connect} from 'react-redux'
import {fetchActiveCart} from '../store/cart'
import {
  Card,
  CardActions,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button
} from '@material-ui/core'

export class AllCarts extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.loadActiveCart()
  }

  render() {
    const activeCart = this.props.cart[0]
    const subtotal = activeCart ? activeCart.cartTotalPrice : ' '
    // console.log('ACTIVE CART!!!', activeCart)
    // console.log('this.props.cart', this.props.cart)
    console.log('PROPS', this.props)
    if (!this.props.user.id) {
      return <p>This is the guest cart for now!</p>
    } else if (
      activeCart === '' ||
      !activeCart ||
      activeCart.Products.length === 0
    ) {
      return (
        <div>
          <h3>Your cart is empty right now! Go shopping!</h3>
        </div>
      )
    } else {
      return (
        <div>
          <h2>My Active Cart</h2>
          {activeCart.Products.map(product => {
            return (
              <div key={product.id}>
                <h3>{product.title}</h3>
                <h4>
                  {`Price:
            $${(product.price / 100).toLocaleString('en-US')}`}
                </h4>
                <p>Quantity: {product.CartProduct.quantity}</p>
              </div>
            )
          })}
          <small>
            ......................................................................................
          </small>
          <h4>
            {`Subtotal:
            $${(subtotal / 100).toLocaleString('en-US')}`}
          </h4>
          <Button>Checkout</Button>
        </div>
      )
    }
  }
}

const mapState = state => {
  return {
    cart: state.cart,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadActiveCart: () => dispatch(fetchActiveCart())
  }
}

const AllUserCarts = connect(mapState, mapDispatch)(AllCarts)
export default AllUserCarts
