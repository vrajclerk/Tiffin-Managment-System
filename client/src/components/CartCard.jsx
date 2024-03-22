import React from 'react'

import { useDispatch } from 'react-redux';
import { clearCart, decrementProductAmount, incrementProductAmount } from '../redux/Cart/Cart.reducer';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CartCard = ({food}) => {

    const [age, setAge] = React.useState('');
    const dispatch = useDispatch()
    const navigate= useNavigate()
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className='   lg:mx-8 border shadow mb-2' >

                <div className='flex '>
                   <img  className='h-28 w-28'src={food.image}/>
                    <div className='w-full px-4 flex justify-between  gap-10 py-4'>
                    <div className='flex flex-col items-center justify-center'><h2 className='font-bold text-xl '>{food.name}</h2>
                    <p className='flex gap-1 items-center'><span className='font-semibold'>{food.provider.name}</span></p>
                    <p className='flex gap-1 items-center'><span className='font-semibold'>₹{food.price}</span></p>
                    </div>
                    <div className='flex flex-col gap-5 justify-center items-center'>
                    <div className="flex items-center">
                    <button
                      onClick={() => {
                        if (food.amount === 0) {
                          dispatch(clearCart(food));
                         
                        }
                        
                        dispatch(decrementProductAmount(food));
                      }}
                      className="px-4 py-2  bg-gray-300 text-white rounded-l hover:bg-orange-400 focus:outline-none focus:ring focus:border-black-300"
                    >
                      <span className="text-lg">-</span>
                    </button>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 font-semibold">
                      {food.amount}
                    </span>
                    <button
                      onClick={() => {
                        dispatch(incrementProductAmount(food));
                      }}
                      className="px-4 py-2 bg-gray-300 text-white rounded-r hover:bg-orange-400 focus:outline-none focus:ring focus:border-blue-300"
                    >
                      <span className="text-sm">+</span>
                    </button>
                  </div>
                    
                 
                    </div>
                        
                    
              
                    </div>

                    </div>
                    </div>
                    
  )
}

export default CartCard







