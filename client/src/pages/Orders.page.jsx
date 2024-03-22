import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CircularProgress, Typography } from '@mui/material';
import TopNavigation from '../components/TopNavigation';
import HomeLayout from '../layouts/Home.layout';
import { getUserOrders, updateUserOrder } from '../redux/order/order.action';
import ReviewModal from '../components/ReviewModal';
import { isCancel } from 'axios';

function OrdersPage() {
  const [relod,setRelod]=useState(false)
  const orders = useSelector((state) => state.orders.userOrders);
  const allOrders = useSelector((state) => state.orders);
  const [reviewModal, setReviewModal] = useState(false);
  const [activeOrder, setActiveOrder] = useState('');
  let data = '';

  if (orders || orders?.length === 0) {
    data = (
      <p className='text-gray-600 flex items-center justify-center' style={{ height: '50vh' }}>
        No Orders Found
      </p>
    );
  }

  const handleReviewModal = (order) => {
    setActiveOrder(order);
    setReviewModal(true);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch,relod]);

  
  const isCancelButtonVisible = (order) => {
    const orderTimestamp = new Date(order.createdAt).getTime();
    const currentTimestamp = new Date().getTime();
    const minutesDifference = (currentTimestamp - orderTimestamp) / (1000 * 60);
    setTimeout(()=>{
      setRelod(true)
    },60 * 1000)
    return order.orderStatus === 'Ordered' && minutesDifference < 1;
  };

  const handleCancel = (order) => {
    dispatch(
      updateUserOrder({
        _id: order._id,
        status: 'Cancelled',
        role: 'user',
        user: order.user,
        provider: order.provider,
        food: order.food,
       
      })
    );
  };

  if (allOrders.loading) {
    return (
      <div className='w-full flex items-center justify-center' style={{ height: '50vh' }}>
        <CircularProgress />
      </div>
    );
  }

  const breadcrumbs = [
    <Link to='/' underline='hover' key='1' color='inherit' className='hover:underline'>
      Home
    </Link>,
    <Typography key={'2'}>Orders</Typography>,
  ];

  return (
    <div className='md:px-8 px-1 py-4'>
      <ReviewModal open={reviewModal} setOpen={setReviewModal} order={activeOrder} />
      <TopNavigation breadcrumbs={breadcrumbs} />
      <h1 className='text-3xl font-semibold text-center'>My Orders</h1>
     { console.log(orders)}
      {orders && orders?.length !== 0 ? (
        
        <div className='md:flex flex-col gap-4 pt-4 w-full'>
          {orders.slice().reverse().map((order, idx) => (
            <div className='gap-2 border-b py-2' key={idx}>
              
              <div className='flex justify-between items-center'>
                <div>
                <p>
                <span className='font-semibold text-xl'>{order?.provider?.name}</span>
                </p>
                  <p>
                    Order Id: <span className='font-semibold'>{order._id.slice(-8)    }</span>
                    <span className='font-semibold'>{
                      order.food.map((food, index) => (
                        <div key={food._id}>
                          {`${index + 1}. ${food.name} - Quantity: ${food.amount}`}
                        </div>
                      ))
                    }</span>
                  </p>
                
                  <p>
                    Price : <span className='font-semibold'>₹{order?.totalAmount}</span>
                  </p>
                  <p>
                    OrderStatus: <span className='font-semibold'>{order?.orderStatus}</span>
                  </p>
                  <p>
                  OrderedDate: <span className='font-semibold'>{order?.date}</span>
                
                </p>
                <p>
                   OrderedTime: <span className='font-semibold'>{order?.time}</span>
                </p>
                  <div className='flex gap-2 w-screen items-end justify-end'>
                   
                    <div>
                      {isCancelButtonVisible(order) && (
                        <button
                          className='bg-red-500 text-white px-2 py-1 rounded mr-20'
                          onClick={() => handleCancel(order)}
                        >
                          Cancel Order
                        </button>
                      )}
                    
                    </div>
                  </div>
                  {order?.orderStatus === 'Delivered' && (
                    <button
                      className='cursor-pointer text-blue-800 hover:underline'
                      onClick={() => handleReviewModal(order)}
                    >
                      Write a Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        data
      )}
    </div>
  );
}

export default HomeLayout(OrdersPage);
