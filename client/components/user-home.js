import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchAllCarts} from '../store/carts'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchAllCarts()
  }

  render() {
    const {user} = this.props
    let inActive = this.props.carts.filter(function(cart) {
      return cart.active === false
    })

    return (
      <div>
        <h2>
          Welcome, {user.firstName} {user.lastName}
        </h2>
        <h3>({user.email})</h3>
        <h3>
          <img src={user.imageUrl} alt="Our user" />
        </h3>
        <h2>All your prevoius purchases:</h2>
        <div>
          {inActive.map(cart => (
            <div key={cart.id}>
              {cart.Products.map(product => (
                <div key={product.id}>
                  <p>
                    <i>Title of art: {product.title}</i>
                  </p>
                  <p>
                    <i>Quantity purchased: {product.CartProduct.quantity}</i>
                  </p>
                  <p>
                    <i>Total price: ${product.CartProduct.totalPrice}</i>
                  </p>
                </div>
              ))}
              <p>
                <i>Date of Purchase: {cart.purchaseDate}</i>
              </p>
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
    user: state.user,
    carts: state.carts
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllCarts: () => dispatch(fetchAllCarts())
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
