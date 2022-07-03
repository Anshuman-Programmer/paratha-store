

import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types"
import axios from 'axios'
import { useShoppingCart } from '../../context/ShoppingCartContext'
import "./_cartItem.scss"

const CartItem = ({id, quantity, extras}) => {

  const [item, setItem] = useState({})
  const { increaseCartQuantity, decreaseCartQuantity, removeFromCart, addExtras, removeExtras } = useShoppingCart()

  const extrasCost = extras?.reduce((quantity, extra) => extra.price + quantity, 0)

  useEffect(() => {
    axios.get(`http://localhost:8000/parathas/${id}`).then((res) => {
      setItem(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  const handleCheckChange = (event, extra) => {
    if(event.target.checked){
      addExtras(id, extra)
    } else {
      removeExtras(id, extra)
    }
    
  }

  return (
    <div className='cartItem'>
      <div className='cartItem__left'>
        <img className='cartItem__img' src={item.img} alt='product'/>
        <div className='cartItem__box'>
          <button disabled={quantity === 1} onClick={() => decreaseCartQuantity(id)}>-</button> 
          <p>{quantity}</p> 
          <button onClick={() => increaseCartQuantity(id)}>+</button>
        </div>
      </div>
      <div className='cartItem__right'>
        <h4 className='cartItem__title'>{item?.title}</h4>
        <div className='cartItem__extras'>
          {item?.extras?.map((extra) => (
            <div key={extra.id} className="cartItem__extra">
              <input onChange={(event) => handleCheckChange(event, extra)} type="checkbox" id={extra.id} value={extra} name={extra.name}/>
              <p>{extra.name}</p>
            </div>
          ))}
        </div>
        <p className='cartItem__price'>₹{item?.price * quantity} {extrasCost > 0 ? ` + ₹${extrasCost * quantity}(Extras)` : null }</p>
        <button className='cartItem__removeBtn' onClick={() => removeFromCart(id)}>REMOVE</button>
      </div>
    </div>
  )
}

export default CartItem

CartItem.propTypes = {
  id: PropTypes.number,
  quantity: PropTypes.number,
  extras: PropTypes.array
}