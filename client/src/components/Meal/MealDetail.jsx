import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Skeleton from '../Skeleton';
import logo from "../../images/food-ordering.svg"

import { cartfoods } from '../../redux/Cart/Cart.reducer';

function MealDetail({total}) {
  // const mealData = useSelector((state) => state.foods.food);
  const cart = useSelector(cartfoods)
  console.log(cart)
  
  const [loading, setLoading] = useState(true)
  return (
    <>
      { cart   && <div className='pb-2 w-full flex flex-col justify-center items-center'>
        <div className='mealImage mb-5' style={{ height: '380px' }}>
          {loading && <Skeleton />}
          <img src={logo} alt="" className={`${loading ? 'hidden' : 'block'} h-full w-full rounded-lg overflow-hidden`} onLoad={() => setLoading(false)} />
        </div>
        <table className="w-2/3 bg-white border  border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Food Item</th>
            <th className="py-2 px-4 border-b text-left">Quantity</th>
            <th className="py-2 px-4 border-b text-left">Price</th>
          </tr>
        </thead>
        <tbody>
      {  console.log(cart)}
          {cart.map((item, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b text-left">{item.name}</td>
              <td className="py-2 px-4 border-b text-left">{item.amount}</td>
              <td className="py-2 px-4 border-b text-left">₹{(item.amount)*(item.price.toFixed(2))}</td>
            </tr>
            
          ))}
          <tr>
          <td></td>
          <td></td>
          </tr>
          <tr className='border-t-black text-left border-t-2' >
            <td className="py-2 px-4 border-b " >Total Amount</td>
            <td className="py-2 px-4 border-b " ></td>
            <td className="py-2 px-4 border-b text-left" >₹{total}</td>

          </tr>
         
        </tbody>
      </table>
        
      </div>}
    </>
  )
}

export default MealDetail


// <div className='flex flex-col gap-4 py-4 h-40'>
//           <h3 className='font-semibold'>{mealData.name}</h3>
//           <h6 className='font-semibold'>Price: <span className='text-slate-900 font-normal'>₹{mealData.price}/meal</span></h6>
//           <p className='font-semibold'>Quantity Left: <span className='font-normal'>{mealData.quantity}</span></p>
//           <h6 className='font-medium'>Description :</h6>
//           <p className='text-gray-500'>{mealData.description}</p>
//         </div>