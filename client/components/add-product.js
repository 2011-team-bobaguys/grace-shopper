import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'
import {addProductToDB} from '../store/products'

const DADA = 'Dada'
const ABSTRACT_EXPRESSIONISM = 'Abstract Expressionism'
const EXPRESSIONISM = 'Expressionism'
const SURREALISM = 'Surrealism'
const POP_ART = 'Pop art'
const FUTURISM = 'Futurism'

const movements = [
  DADA,
  ABSTRACT_EXPRESSIONISM,
  EXPRESSIONISM,
  SURREALISM,
  POP_ART,
  FUTURISM
]

const OIL_ON_CANVAS = 'Oil on canvas'
const PHOTOGRAPH = 'Photograph'
const GRAPHITE_ON_PAPER = 'Graphite on paper'
const FOUND_OBJECT = 'Found object'
const PAINT_ON_CANVAS = 'Paint on canvas'

const mediums = [
  OIL_ON_CANVAS,
  PHOTOGRAPH,
  GRAPHITE_ON_PAPER,
  FOUND_OBJECT,
  PAINT_ON_CANVAS
]

class AddProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      productInfo: {
        title: 'Add A Title',
        movement: DADA,
        medium: OIL_ON_CANVAS,
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/7/7a/Campbell%27Soup_%281965%29_Andy_Warhol_%281928-1967%29_%2849982308446%29.jpg',
        year: 2020,
        price: 100,
        inventory: 0,
        artist: ''
      },
      submitSuccess: false
    }

    this.submitHandler = this.submitHandler.bind(this)
    this.changeHandler = this.changeHandler.bind(this)
    this.imageClickHandler = this.imageClickHandler.bind(this)
  }

  submitHandler() {
    event.preventDefault()
    this.props.addProductToDB(this.state.productInfo)
    this.setState({submitSuccess: true})
  }
  changeHandler() {
    this.setState({
      productInfo: {
        ...this.state.productInfo,
        [event.target.name]: event.target.value
      }
    })
    this.setState({submitSuccess: false})
  }
  imageClickHandler() {
    this.setState({
      productInfo: {
        ...this.state.productInfo,
        imageUrl: document.getElementById('productImage').value
      }
    })
  }

  render() {
    return (
      <div>
        <h4>Add A New Product</h4>
        {this.state.submitSuccess && (
          <p>New Product Submitted Successfully! </p>
        )}
        <form
          onSubmit={this.submitHandler}
          name="addProduct"
          style={{display: 'flex', flexDirection: 'row', width: '30%'}}
        >
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <img
              src={this.state.productInfo.imageUrl}
              style={{width: '400px', height: '400px', objectFit: 'cover'}}
            />
            <br />
            <label html="imageUrl">Image Url</label>
            <input id="productImage" type="text" />
            <button name="imageUrl" onClick={this.imageClickHandler}>
              Change Image Artwork
            </button>
          </div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <label htmlFor="title">Art Product Title</label>
            <input
              type="text"
              name="title"
              value={this.state.productInfo.title}
              onChange={this.changeHandler}
            />
            <br />
            <label htmlFor="artist">Artist Name</label>
            <input
              type="text"
              name="artist"
              value={this.state.productInfo.artist}
              onChange={this.changeHandler}
            />
            <br />
            <label htmlFor="movement">Select Movement</label>
            <select name="movement" onChange={this.changeHandler}>
              {movements.map((movement, index) => (
                <option key={index}>{movement}</option>
              ))}
            </select>
            <br />
            <label htmlFor="medium">Select Medium</label>
            <select name="medium" onChange={this.changeHandler}>
              {mediums.map((medium, index) => (
                <option key={index}>{medium}</option>
              ))}
            </select>
            <br />
            <label htmlFor="year">Year Created</label>
            <input
              type="number"
              name="year"
              value={this.state.productInfo.year}
              onChange={this.changeHandler}
              min={0}
            />
            <br />
            <label htmlFor="price">Product Price (USD)</label>
            <input
              type="number"
              name="price"
              value={this.state.productInfo.price}
              onChange={this.changeHandler}
              min={0}
            />
            <br />
            <label htmlFor="inventory">Inventory</label>
            <input
              type="number"
              name="inventory"
              value={this.state.productInfo.inventory}
              onChange={this.changeHandler}
              min={0}
            />
            <br />
            <button type="submit" onSubmit={this.submitHandler}>
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    newProduct: state.products[state.products.length - 1]
  }
}

const mapDispatch = dispatch => {
  return {
    addProductToDB: productInfo => dispatch(addProductToDB(productInfo))
  }
}

export default connect(null, mapDispatch)(AddProduct)
