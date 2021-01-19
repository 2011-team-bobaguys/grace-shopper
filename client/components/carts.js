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
    const activeCart = this.props.cart
    const subtotal = activeCart ? activeCart.cartTotalPrice : ' '
    if (!this.props.user.id) {
      return <p>This is the guest cart for now!</p>
    } else if (activeCart === '' || !activeCart || !activeCart.Products) {
      return (
        <div>
          <h3>Your cart is empty right now! Go shopping!</h3>
        </div>
      )
    } else {
      return (
        <div>
          <div className="loggedinCart">
            <h2>Items</h2>
            <h2>Price</h2>
          </div>
          {activeCart.Products.map(product => {
            return (
              <div className="loggedinCart" key={product.id}>
                <div>
                  <h3>{product.title}</h3>
                  <p>Quantity: {product.CartProduct.quantity}</p>
                </div>
                <h4>
                  {`
            $${(
              product.price /
              100 *
              product.CartProduct.quantity
            ).toLocaleString('en-US')}`}
                </h4>
              </div>
            )
          })}
          <small>
            ......................................................................................
          </small>
          <h3 id="subtotalCart">
            {`Subtotal:
            $${(subtotal / 100).toLocaleString('en-US')}`}
          </h3>
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
