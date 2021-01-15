import React from 'react'
import {connect} from 'react-redux'
import {fetchCarts} from '../store/user'

export class AllCarts extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.loadCarts(this.props.user.id)
  }

  render() {
    let activeCart = ''
    if (this.props.user.carts) {
      activeCart = this.props.user.carts.filter(cart => {
        return cart.active === true
      })[0]
    }

    if (activeCart === '' || !activeCart) {
      return (
        <div>
          <h3>Your cart is empty right now! Go shopping!</h3>
        </div>
      )
    } else {
      return (
        <div>
          <h2>My Active Cart</h2>
          {this.props.user.carts &&
            activeCart.Products.map(product => {
              return (
                <div key={product.id}>
                  <h3>{product.title}</h3>
                  <h4>Price:{product.price}</h4>
                  <p>Quantity:{product.CartProduct.quantity}</p>
                </div>
              )
            })}
          <small>...........................................</small>
          <h4>
            Subtotal:
            {this.props.user.carts
              ? activeCart.Products.reduce((accum, singleProduct) => {
                  return accum + singleProduct.price * 1 //needs to be quantity
                }, 0)
              : ' '}
          </h4>
        </div>
      )
    }
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadCarts: userId => dispatch(fetchCarts(userId))
  }
}

const AllUserCarts = connect(mapState, mapDispatch)(AllCarts)
export default AllUserCarts
