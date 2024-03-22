import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Skeleton from "../Skeleton";
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from "react-redux";
import { addToCart, cartfoods } from "../../redux/Cart/Cart.reducer";
import { Button } from "@mui/material";
import { Fragment, useRef} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

// import 'react-toastify/dist/ReactToastify.css';

import Example from "./PopUp";



  

 



function MealBox({ foods }) {
    
  const [loading, setLoading] = useState(true);
  let dispatch = useDispatch();
  let popUp = useRef()
  const cart = useSelector(cartfoods);
  const navigate=useNavigate();
   const user=useSelector((state)=>state.user.user);

  console.log(cart[0] && cart[0].provider.name);

  if (!foods || foods.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 w-full">
        <p className="font-semibold text-gray-500">No Meals Found</p>
      </div>
    );
  }

  const handleAddtocart=(food)=>
  {
    if (user) {
        cart[0]
          ? cart[0].provider.name === food.provider.name
            ? dispatch(addToCart(food))
            : popUp.current.open(food)
          : dispatch(addToCart(food));
  
        // Show success toast
        toast.success('Tifin added to the cart!');
      } else {
        // Navigate to the sign-up page
        alert('Please log in to continue.');
        navigate('/signin');
      }
    };
  
  return (
    <>
    <Example  ref={popUp}>
    <h1>popUp</h1>
    </Example>
   

      {foods && (
        <div className="lg:px-12 md:px-6 px-4  py-4 ">
          <h1 className="font-bold font-mono text-2xl">All Meal Plans</h1>
          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 py-4 gap-6 " >
            {foods.map((food, index) => {
              if (food.quantity > 0) {
                return (
                  <div key={index}>
                    <div className="hover:shadow py-1  px-3 flex flex-col gap-1">
                      <div className="relative h-40">
                        {loading && <Skeleton />}{" "}
                        {/* Use your Skeleton component for loading state */}
                        <img
                          src={food.image}
                          className={`${
                            loading ? "hidden" : "block"
                          }  w-full h-full`}
                          onLoad={() => setLoading(false)}
                          alt={food.name}
                        />
                      </div>

                      <h3 className="font-semibold py-1 px-1">{food.name}</h3>
                      <div className="flex justify-between px-1 items-center">
                        <p>Price</p>
                        <p>
                          ₹{" "}
                          <span className="font-semibold">
                            {food.price}/meal
                          </span>
                        </p>
                      </div>
                      <div className="flex justify-between px-1 items-center">
                        <p>Quantity</p>
                        <p> 
                          <span className="font-semibold">
                            {food.quantity}
                          </span>
                        </p>
                      </div>
                      <div className="flex justify-between px-1 items-center">
                     
                        <span className="font-semibold">
                        {food.description}
                        </span>
                      
                    </div>
                      
                      <button
                        onClick={()=>handleAddtocart(food)}
                        className="bg-orange-500 hover:bg-orange-500 text-white font-semibold hover:text-white py-2 px-4 border border-white   hover:border-transparent rounded"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                );
              } else {
                return <div key={index}></div>;
              }
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default MealBox;
