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
    return (
      <div>
        <h2>All My Carts</h2>
        <h1>{activeCart.id}</h1>
      </div>
    )
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
