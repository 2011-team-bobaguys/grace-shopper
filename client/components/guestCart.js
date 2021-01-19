import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, fetchDeleteProduct} from '../store/products'

class GuestCart extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.loadProducts()
  }

  render() {
    const myStorage = window.localStorage
    const guestCart = JSON.parse(myStorage.getItem('guestCart'))
    const productList = this.props.products

    if (productList.length === 0) {
      return <p>Loading cart...</p>
    }

    if (!Object.keys(guestCart).length) {
      return (
        <div>
          <h3>
            Your cart is empty right now! Why don't you check out some products!
          </h3>
        </div>
      )
    }
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <h1>My Cart</h1>
          <div>
            {Object.keys(guestCart).map(key => {
              const productInfo = productList[key - 1]
              const quantity = guestCart[key]
              return (
                <div
                  key={key}
                  style={{display: 'flex', flexDirection: 'row', marginTop: 10}}
                >
                  <img
                    style={{width: 100, height: 100, objectFit: 'cover'}}
                    src={productInfo.imageUrl}
                  />
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <h4 style={{marginTop: 0, marginBottom: 10}}>
                      {productInfo.title}
                    </h4>
                    <p style={{marginTop: 0, marginBottom: 2}}>
                      Quantity: {quantity}
                    </p>
                    <p style={{marginTop: 0, marginBottom: 2}}>
                      Price: $
                      {(productInfo.price * quantity).toLocaleString('en-US')}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
          <small>
            ......................................................................................
          </small>
        </div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <button
            style={{
              padding: 10,
              backgroundColor: 'lightblue',
              borderRadius: 10,
              height: 40,
              width: 250,
              marginTop: 20
            }}
            type="submit"
          >
            Checkout
          </button>
          <h4>
            Subtotal:$
            {Object.keys(guestCart)
              .reduce((accum, key) => {
                return accum + productList[key - 1].price * guestCart[key]
              }, 0)
              .toLocaleString('en-US')}
          </h4>
        </div>
      </div>
    )
  }
}

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
    loadDeleteProduct: productId => dispatch(fetchDeleteProduct(productId))
  }
}

const GuestCartConnected = connect(mapState, mapDispatch)(GuestCart)

export default GuestCartConnected
