

import React from 'react'
import "./_homeItem.scss"
import PropTypes from "prop-types"
import { useShoppingCart } from '../../context/ShoppingCartContext'

export const HomeItem = ({item}) => {

  const {
    getItemQuantity,
    increaseCartQuantity,
    // decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart()

  const quantity = getItemQuantity(item.id)

  return (
    <div className='homeItem'>
        <img className='homeItem__img' src={item.img} alt='aloo paratha'/>
        <h5 className='homeItem__name'>{item.title}</h5>
        <div>
            <p className='homeItem__price'>₹{item.price} Per Plate</p>
            <p className='homeItem__price'>Extras Available</p>
        </div>
        {quantity === 0 ? (
          <button className='homeItem__btn' onClick={() => increaseCartQuantity(item.id)}>Add to Cart</button>
        ) : (
          <button className='homeItem__btn remove' onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
        )}
    </div>
  )
}

HomeItem.propTypes = {
  item: PropTypes.any
}
