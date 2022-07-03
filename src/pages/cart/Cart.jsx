

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-dropdown-now'
import CartItem from '../../components/CartItem/CartItem'
import { useShoppingCart } from '../../context/ShoppingCartContext'
import "./_cart.scss"
import 'react-dropdown-now/style.css';
// import data from "../../data/db.json"

const Cart = () => {

  const { cartItems, cartQuantity } = useShoppingCart()
  const [storeItems, setStoreItems] = useState([])
  // const [storeItems, setStoreItems] = useState(data.parathas))
  const [deliveryCharge, setDeliveryCharge] = useState(0)

  const getExtrasTotal = (item, quantity) => item.extras.reduce((total, item) => (total + item.price * quantity), 0)

  useEffect(() => {
    axios.get("http://localhost:8000/parathas").then((res) => {
      setStoreItems(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  const TotalCost = cartItems.reduce((total, cartItem) => {
    const item = storeItems?.find(i => i.id === cartItem.id)
    return total + (item?.price || 0) * cartItem.quantity + getExtrasTotal(cartItem, cartItem.quantity)
  }, 0)

  const options = [
    { id: '1', value: 0, label: 'Upto 5 km', view: <span>Upto 5 km</span> },
    { id: '2', value: 15, label: '5-8 km', view: <span>5-8 km</span> },
    { id: '3', value: 25, label: '9-15 km', view: <span>9-15 km</span> },
    { id: '4', value: 40, label: 'Above 15 km', view: <span>Above 15 km</span> },
  ];

  return (
    <section className='cart'>
      <div className='cart__wrapper'>
        <div className='cart__left'>
          <div className='cart__leftTop'>
            <h4 className='cart__heading'>My Cart ({cartQuantity})</h4>
            <Dropdown
              placeholder="Select Delivery Range"
              options={options}
              value={0}
              onChange={(value) => setDeliveryCharge(value.value)}
            />
          </div>
          {
            cartItems.map((item) => (<CartItem key={item.id} id={item.id} quantity={item.quantity} extras={item.extras}>item</CartItem>))
          }
        </div>
        <div className='cart__right'>
          <h4 className='cart__rightHeading'>PRICE DETAILS</h4>
          <br />
          <div className="flex">
            <p>Price ({cartQuantity} items)</p>
            <p>₹{TotalCost}</p>
          </div>
          <div className="flex">
            <p>Delivery Charges</p>
            <p>₹{deliveryCharge}</p>
          </div>
          <br />
          <div className="flex">
            <p className='total'>Total Amount</p>
            <p className='total'>₹{TotalCost + deliveryCharge}</p>
          </div>
          <br />
          <button className='cart__rightBtn'>Place Order</button>
        </div>
      </div>
    </section>
  )
}

export default Cart