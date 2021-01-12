import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'

/**
 * COMPONENT
 */
export class AllProducts extends React.Component {
  componentDidMount() {
    try {
      this.props.loadProducts()
    } catch (err) {
      console.error(err.message)
    }
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h3>All Art</h3>
        {/* <div>{this.props.products[0]}</div> */}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    loadProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
