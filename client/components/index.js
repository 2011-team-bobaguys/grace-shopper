/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as AllProductsConnected} from './all-products'
export {default as SingleProductConnected} from './single-product'
export {default as AllArtistsConnected} from './all-artists'
export {default as SingleArtistConnected} from './single-artist'
export {default as AddProduct} from './add-product'
export {HomePage} from './home'
export {default as GuestCart} from './guestCart'
