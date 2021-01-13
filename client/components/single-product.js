import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    maxWidth: 50
  },
  media: {
    height: 10
  }
})

//SAMPLE IMAGES - DELETE LATER

const artImageDefault =
  'https://upload.wikimedia.org/wikipedia/commons/7/7a/Campbell%27Soup_%281965%29_Andy_Warhol_%281928-1967%29_%2849982308446%29.jpg'

const artistImageDefault =
  'https://upload.wikimedia.org/wikipedia/commons/2/2b/Andy_Warhol_by_Jack_Mitchell.jpg'

// function SingleProductCard() {
//   const classes = useStyles
//   return (
//     <Card className={classes.root}>
//       <CardActionArea>
//         <CardMedia
//           className={classes.media}
//           img={artImageDefault}
//           title="Artwork"
//         />
//         <CardContent>
//           <Typography variant="h6" component="h3">
//             Artist
//           </Typography>
//           <Typography variant="body2" color="textSecondary" component="p">
//             Info about artist here
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   )
// }

/**
 * COMPONENT
 */

export class SingleProduct extends React.Component {
  constructor() {
    super()
    // this.state = {
    //   image: artImageDefault
    // }
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
    let artist = 'Unknown'
    const artistImage = artistImageDefault
    const artImage = artImageDefault
    if (product.artist) artist = product.artist.name
    const classes = useStyles

    return (
      <div>
        {/* <h2>Title: </h2>
        <h2>{product.title}</h2>
        <h3>Artist</h3>
        <img src={artistImage} />
        <h3>{artist}</h3>
        <h3>Genre</h3>
        <h3>{product.genre}</h3>
        <h3>Medium</h3>
        <h3>{product.medium}</h3>
        <img src={artImage} /> */}
        <Card>
          <CardActionArea>
            <CardContent>
              <CardMedia>
                <img src={artImage} />
              </CardMedia>
              <Typography variant="h6" component="h3">
                Artist
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Info about artist here
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
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
