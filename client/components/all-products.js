import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {Link} from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    maxWidth: 300
  },
  media: {
    height: 300
  }
})

/**
 * COMPONENT
 */
export class AllProducts extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.loadProducts()
  }

  render() {
    const classes = useStyles
    return (
      <div>
        <h2>All Art</h2>
        <div>
          {this.props.products.map(product => (
            <div key={product.id}>
              <Card className={classes.root}>
                <CardActionArea>
                  {/* <CardMedia>
                    <img src={product.imageUrl} />
                  </CardMedia> */}
                  <CardMedia
                    className={classes.media}
                    image="https://upload.wikimedia.org/wikipedia/commons/7/7a/Campbell%27Soup_%281965%29_Andy_Warhol_%281928-1967%29_%2849982308446%29.jpg"
                    title="art"
                  />
                  <CardContent>
                    <Typography variant="h6" component="h3">
                      {product.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {`By ${product.Artist.name}`}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button component={Link} to={`/products/${product.id}`}>
                    View
                  </Button>
                  <Button>Buy</Button>
                </CardActions>
              </Card>
            </div>
          ))}
        </div>
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

const AllProductsConnected = connect(mapState, mapDispatch)(AllProducts)
export default AllProductsConnected
