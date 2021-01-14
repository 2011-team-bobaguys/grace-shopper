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
    return (
      <div>
        <h2>All My Carts</h2>
        <div>
          {/* {this.props.products.map(product => (
              <h4 key={product.id}>{product.title}</h4>
            ))} */}
        </div>
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
