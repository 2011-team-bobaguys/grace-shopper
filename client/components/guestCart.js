import {PlayCircleFilledWhite} from '@material-ui/icons'
import React from 'react'

class GuestCart extends React.Component {
  constructor() {
    super()
  }

  render() {
    const myStorage = window.localStorage
    const guestCart = JSON.parse(myStorage.getItem('guestCart'))

    return (
      <div>
        <div>
          {Object.keys(guestCart).map(key => {
            const productInfo = guestCart[key]
            return (
              <div>
                <h3>{productInfo.title}</h3>
              </div>
            )
          })}
        </div>
        <small>
          ......................................................................................
        </small>
        <h4>Subtotal:100</h4>
      </div>
    )
  }
}

export default GuestCart
