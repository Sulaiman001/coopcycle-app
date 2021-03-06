import {
  INIT,
  ADD_ITEM,
  REMOVE_ITEM,
  INCREMENT_ITEM,
  DECREMENT_ITEM,
  SET_ADDRESS_RESOURCE,
  CLEAR,
} from './actions'

import Cart from '../../Cart'
import _ from 'lodash'

const initialState = {
  cart: new Cart(),
  address: null,
  addressResource: null,
  date: null
}

export default (state = initialState, action = {}) => {
  let newCart, item

  switch (action.type) {

    case INIT:
      return {
        ...state,
        cart: new Cart(action.payload.restaurant),
        address: action.payload.address,
        date: action.payload.date,
      }

    case CLEAR:
      return {
        ...state,
        cart: new Cart(),
        address: null,
        addressResource: null,
        date: null
      }

    case ADD_ITEM:

      newCart = state.cart.clone()
      newCart.addMenuItem(
        action.payload.item,
        action.payload.options
      )

      return {
        ...state,
        cart: newCart
      }

    case REMOVE_ITEM:

      newCart = state.cart.clone()
      newCart.deleteItem(action.payload)

      return {
        ...state,
        cart: newCart
      }

    case INCREMENT_ITEM:

      newCart = state.cart.clone()

      item = _.find(newCart.items, item => item.menuItem.identifier === action.payload.menuItem.identifier)
      if (item) {
        item.increment()

        return {
          ...state,
          cart: newCart
        }
      }

    case DECREMENT_ITEM:

      newCart = state.cart.clone()

      item = _.find(newCart.items, item => item.menuItem.identifier === action.payload.menuItem.identifier)
      if (item) {
        item.decrement()

        return {
          ...state,
          cart: newCart
        }
      }

    case SET_ADDRESS_RESOURCE:
      return {
        ...state,
        addressResource: action.payload
      }

    default:
      return { ...state }
  }
}
