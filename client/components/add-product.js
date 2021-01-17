import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Button
} from '@material-ui/core'

//SAMPLE IMAGES - DELETE LATER

/**
 * COMPONENT
 */

class AddProduct extends React.Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit() {
    event.preventDefault()
  }

  render() {
    return <div>Hi, admins only here!</div>
  }
}

export default AddProduct
