import React from 'react'
import {connect} from 'react-redux'
import {
  fetchActiveCart,
  checkoutCart,
  removeFromCart,
  updateQuantity
} from '../store/cart'
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
    this.handleCheckout = this.handleCheckout.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleUpdateQuantity = this.handleUpdateQuantity.bind(this)
  }
  componentDidMount() {
    this.props.loadActiveCart()
  }

  handleCheckout(subtotal) {
    this.props.loadCheckoutCart()
    this.props.history.push({
      pathname: '/checkout-success',
      totalPrice: subtotal
    })
  }

  handleDelete(productId) {
    this.props.loadRemoveFromCart(productId)
  }

  handleUpdateQuantity(productId, quantity) {
    this.props.loadUpdateQuantity(productId, quantity)
  }

  render() {
    const activeCart = this.props.cart
    let subtotal = 0

    if (activeCart.Products) {
      subtotal = activeCart.Products.reduce((accum, product) => {
        return accum + product.price * product.CartProduct.quantity
      }, 0)
    }
    if (activeCart === '' || !activeCart || !activeCart.Products) {
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
                  <p>
                    Quantity:{' '}
                    <input
                      min={1}
                      style={{width: 50}}
                      type="number"
                      value={product.CartProduct.quantity}
                      onChange={() => {
                        this.handleUpdateQuantity(
                          product.id,
                          event.target.value
                        )
                      }}
                    />
                  </p>
                  <Button onClick={() => this.handleDelete(product.id)}>
                    Delete item
                  </Button>
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
          <hr />
          <h3 id="subtotalCart">
            {`Subtotal:
            $${(subtotal / 100).toLocaleString('en-US')}`}
          </h3>
          <Button onClick={() => this.handleCheckout(subtotal)}>
            Checkout
          </Button>
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
    loadActiveCart: () => dispatch(fetchActiveCart()),
    loadCheckoutCart: () => dispatch(checkoutCart()),
    loadRemoveFromCart: productId => dispatch(removeFromCart(productId)),
    loadUpdateQuantity: (productId, qty) =>
      dispatch(updateQuantity(productId, qty))
  }
}

const AllUserCarts = connect(mapState, mapDispatch)(AllCarts)
export default AllUserCarts
