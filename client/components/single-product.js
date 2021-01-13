import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'

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
    // console.log('PRODUCT:', product)
    // console.log('PROPS:', this.props)
    console.log('ARTIST', product.artist)
    let artist = 'Unknown'
    if (product.artist) artist = product.artist.name
    return (
      <div>
        <h2>Title: </h2>
        <h2>{product.title}</h2>
        <h3>Artist</h3>
        <h3>ARTIST IMAGE</h3>
        <h3>{artist}</h3>
        <h3>Genre</h3>
        <h3>{product.genre}</h3>
        <h3>Medium</h3>
        <h3>{product.medium}</h3>
        <h3>IMAGE PLACEHOLDER</h3>
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
