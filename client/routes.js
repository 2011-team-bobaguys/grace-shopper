import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllProductsConnected,
  SingleProductConnected,
  AllArtistsConnected,
  SingleArtistConnected,
  AddProduct,
  HomePage,
  AllUserCarts,
  GuestCart
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props

    if (!window.localStorage.getItem('guestCart')) {
      window.localStorage.setItem('guestCart', JSON.stringify({}))
    }

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={HomePage} />
        <Route exact path="/cart" component={AllUserCarts} />
        <Route exact path="/products" component={AllProductsConnected} />
        <Route
          exact
          path="/products/:productId"
          component={SingleProductConnected}
        />
        {isLoggedIn ? (
          <Route path="/cart" component={AllUserCarts} />
        ) : (
          <Route path="/cart" component={GuestCart} />
        )}
        <Route exact path="/artists" component={AllArtistsConnected} />
        <Route
          exact
          path="/artists/:artistId"
          component={SingleArtistConnected}
        />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            {isAdmin && <Route path="/addProduct" component={AddProduct} />}
          </Switch>
        )}

        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
