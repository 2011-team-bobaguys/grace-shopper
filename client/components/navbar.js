import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleLogout, isLoggedIn, isAdmin}) => (
  <div>
    <h1>100% Real Art Dot Com</h1>
    <nav>
      {isLoggedIn ? (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          {/* The navbar will show these links after you log in */}
          <div>
            <Link to="/home">Home</Link>
            <Link to="/products">View All Products</Link>
            <Link to="/artists">View All Artists</Link>
            {isAdmin && <Link to="/addProduct">Add Product</Link>}
          </div>
          <div>
            <Link to="cart">Cart</Link>
            <a href="#" onClick={handleLogout}>
              Logout
            </a>
          </div>
        </div>
      ) : (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          {/* The navbar will show these links before you log in */}
          <div>
            <Link to="/products">View All Products</Link>
            <Link to="/artists">View All Artists</Link>
          </div>
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/cart">Cart</Link>
          </div>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleLogout() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
