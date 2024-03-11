import React from 'react'
import ImageViewer from '../components/ImageViewer'
import {  useSelector } from 'react-redux/es/hooks/useSelector'
import { cartfoods } from '../redux/Cart/Cart.reducer'
import CartCard from '../components/CartCard'
import HomeLayout from '../layouts/Home.layout'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import TopNavigation from '../components/TopNavigation'
import empty from "../images/empty-cart.svg"
const breadcrumbs = [
    <Link to='/' underline="hover" key="1" color="inherit" className='hover:underline'>
      Home
    </Link>,
    <Typography key="3" color="text.primary">
      Cart
    </Typography>
  ];


const CartPage = () => {
  const cart = useSelector(cartfoods);
 return(
  <div>
  <div className='md:px-8 px-3 py-3'>
      <TopNavigation breadcrumbs={breadcrumbs} />
  </div>
  <div >
      {cart && 
          <div>
              {cart.map((food, index) => (
                  <CartCard key={index} food={food} />
              ))}

          </div>
      }

      {console.log(cart)}
      {cart.length === 0 ? (<div className='flex items-center justify-center'>
        <img className='h-80 w-50 ' src={empty} alt="My SVG" />
      </div>): <Link to={`/cart/chekout`} className='flex justify-center w-screen'>
      <button className='bg-orange-400 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded '>
          Check Out
      </button>
  </Link>}
  </div>
</div>
);
};


export default HomeLayout(CartPage)
