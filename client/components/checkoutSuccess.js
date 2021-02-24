import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
const CheckoutSuccess = props => {
  const totalPrice = props.location.totalPrice

  return (
    <div
      id="successContainer"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <h3>Thanks for your purchase!</h3>
      <h2>
        Your order total wass ${(totalPrice / 100).toLocaleString('en-US')}.
      </h2>
      <h2>
        Enjoy your art! For your order history, head to your user profile.
      </h2>
    </div>
  )
}

export default CheckoutSuccess
