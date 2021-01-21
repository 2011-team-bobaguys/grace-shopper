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
      <img src="https://2.bp.blogspot.com/-h8mk8H6ormE/VIwefHoeIrI/AAAAAAAAAfo/qpMXH_36Taw/s1600/cost.jpg" />
      <h2>
        You just spent ${(totalPrice / 100).toLocaleString('en-US')}! WOW!
      </h2>
      <h2>Enjoy your 100% REAL ART!</h2>
    </div>
  )
}

export default CheckoutSuccess
