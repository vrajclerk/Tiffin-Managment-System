import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material'
import MealDetail from '../components/Meal/MealDetail'
import MealSubscription from '../components/Meal/MealSubscription'
import HomeLayout from '../layouts/Home.layout'
import { getFoodById } from '../redux/food/food.action'
import TopNavigation from '../components/TopNavigation'
import { cartfoods } from '../redux/Cart/Cart.reducer';

function MealPage() {
  // const params = useParams();
  // const id = params._id
  const dispatch = useDispatch();
  let cart =useSelector(cartfoods)
  let total =0;

  cart.map(food=>total +=(food.amount)* (food.price))
// useEffect  is used to dispatch an action to get food by id from the server when the component mounts
  // it will run only once because of the empty dependency array []
  // useEffect(() => {
  //   dispatch(getFoodById(id));
  // }, [id, dispatch])
  
  // breadcrumbs for the top navigation bar
  let breadcrumbs = [
    <Link to='/' underline="hover" key="1" color="inherit" className='hover:underline'>
      Home
    </Link>,
    <Link
      underline="hover"
      key="2"
      to='/cart'
      color="inherit"
      className='hover:underline'
    >
     Cart
    </Link>,
    
    //typography used to display the name of the food
    <Typography key={'4'}> 
      checkout
    </Typography>
  ];
  //checks if the food is loading then it will display a circular progress bar otherwise it displays the food information
  // if (food.loading) {
  //   return (
  //     <div className='w-full flex items-center justify-center' style={{ height: '90vh' }}>
  //       <CircularProgress />
  //     </div>
  //   )
  // }


  return (
    <>
      <div className='md:px-8 px-2 py-3'>
        <TopNavigation breadcrumbs={breadcrumbs} />
      </div>
      <div className='md:flex lg:gap-8 gap-4 lg:px-16 md:px-6 px-2 pb-4'>
        <div className='md:w-1/2'>
          <MealDetail total={total}/>
        </div>
        <div className='md:sticky top-0 z-10 md:mt-0 mt-20 bg-white md:w-1/2 py-4'>
          <MealSubscription total={total} />
        </div>
      </div>
    </>
  )
}

export default HomeLayout(MealPage)