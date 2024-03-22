import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { MdEmail, MdDateRange } from 'react-icons/md'
import { RiIncreaseDecreaseLine } from 'react-icons/ri'
import { FiUser, FiPhone, FiClock } from 'react-icons/fi'
import { addOrder } from '../../redux/order/order.action'
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import logo from '../../images/logo.png'
import { cartfoods, clearCart } from '../../redux/Cart/Cart.reducer'

function MealSubscription({total}) {

  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const cart = useSelector(cartfoods)
  let providerId =  1
  // cart[0].provider._id 

  providerId = cart ?cart[0].provider._id:null;

 
  useEffect(() => {
    // Get current location using Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          // Fetch address information from OpenCage Geocoding API
          const apiKey = '9e5f384a4a134589aa5c6bf0f498d191';
          const geocodingUrl = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude}+${longitude}&pretty=1`;

          fetch(geocodingUrl)
            .then((response) => response.json())
            .then((data) => {
              if (data.results && data.results.length > 0) {
                setAddress(data.results[0].formatted);
              } else {
                setAddress('Address not found');
              }
            })
            .catch((error) => {
              console.error('Error fetching address:', error.message);
              setAddress('Error fetching address');
            });
        },
        (error) => {
          alert("please allow location access for your current location")
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);
  const user = useSelector((state) => state.user.user)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
 
  const [mobileNumber, setMobileNumber] = useState("");
  // const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("")
  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setMobileNumber(user.phoneNumber)
    } else {
      setName("")
      setEmail("")
    }

    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
    const year = currentDate.getFullYear();
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    
    setDate(`${day}-${month}-${year}`);
    setTime(`${hours}:${minutes}`);
  }, [user])
  // const food = useSelector((state) => state.foods.food)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!user) {
      toast.error("Plzz Login to Place a order")
      navigate('/signin')
    }
    // if (quantity > food.quantity)
    //   return toast.error("Cannot Provide in this much Quantity")
   console.log(cart)
    const data = {
      user: user._id,
      food: cart,
      provider: providerId,
      address,
      time,
      date,
      totalAmount:total,
    }
    let options = {
      "key": 'rzp_test_yu67T9aDVZ2U2O',
      "amount": Number(total) * 100,
      "currency": "INR",
      "name": "TiffinBuddy",
      "description": "Test Transaction",
      "image": logo,
      "handler": function (response) {
        if (response.razorpay_payment_id) {
          data.paymentStatus = "Success"
          dispatch(addOrder(data))
          toast.success("Order Booked  Successfully")
         
          navigate('/')
          
        } else {
          toast.error("Unable To Place Order Try Again")
        }
      },
      "prefill": {
        "name": `${user.name}`,
        "email": `${user.email}`,
        "contact": "9999999999"
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open()
  }



    

  return (
    <div className=''>
      <form action="" className='flex flex-col gap-2 mb-5' onSubmit={handleSubmit}>
        <h2 className='font-semibold text-xl text-center md:py-0 py-2'>Book Your Tiffin Know</h2>
        <div>
          <label htmlFor="name" className='font-semibold'>Name</label>
          <div className='flex items-center border bg-white w-full'>
            <span className='px-2 h-full'><FiUser /></span>
            <input type="text" value={name} name="name" placeholder='Enter Your Name' className='w-full h-full px-2 py-2 border-l focus:outline-none' id="name" required onChange={(e) => setName(e.target.value)} />
          </div>
        </div>
        <div>
          <label htmlFor="email" className='font-semibold'>Email</label>
          <div className='flex items-center border bg-white w-full'>
            <span className='px-2 h-full'><MdEmail /></span>
            <input type="text" value={email} name="email" placeholder='Enter Your Email' className='w-full h-full px-2 py-2 border-l focus:outline-none' id="email" required onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>
        <div>
          <label htmlFor="phone" className='font-semibold'>Mobile Number</label>
          <div className='flex items-center border bg-white w-full'>
            <span className='px-2 h-full'><FiPhone /></span>
            <input type="tel" value={mobileNumber} name="phone" placeholder='Enter Your Mobile Number' className='w-full h-full px-2 py-2 border-l focus:outline-none' id="phone" required onChange={(e) => setMobileNumber(e.target.value)} />
          </div>
        </div>
        
        
          
          
        <div className=''>
          <label htmlFor="address" className='font-semibold'>Address (Allow location access_) </label>
          <textarea type="time" value={address} name="address" rows={4} placeholder='Enter Your Address' className='w-full h-full px-2 py-2 my-2 border focus:outline-none' id="address" required onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          <input type="submit" value="Book Meal" className='bg-orange-400 text-white rounded px-3 py-2 cursor-pointer w-full' />
        </div>
      </form>

      <div>
           <AccessTimeIcon color='error'/> If you choose to cancel, you can do it within 60 seconds after placing the order.
      </div>
    </div>  

  )
}
export default  MealSubscription;









// import React, { useState, useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-hot-toast'
// import { MdEmail, MdDateRange } from 'react-icons/md'
// import { RiIncreaseDecreaseLine } from 'react-icons/ri'
// import { FiUser, FiPhone, FiClock } from 'react-icons/fi'
// import { addOrder } from '../../redux/order/order.action'
// import AccessTimeIcon from '@mui/icons-material/AccessTime';

// import logo from '../../images/logo.png'

// function MealSubscription() {

//   const [location, setLocation] = useState(null);
//   const [address, setAddress] = useState("");

//   useEffect(() => {
//     // Get current location using Geolocation API
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setLocation({ latitude, longitude });

//           // Fetch address information from OpenCage Geocoding API
//           const apiKey = '9e5f384a4a134589aa5c6bf0f498d191';
//           const geocodingUrl = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude}+${longitude}&pretty=1`;

//           fetch(geocodingUrl)
//             .then((response) => response.json())
//             .then((data) => {
//               if (data.results && data.results.length > 0) {
//                 setAddress(data.results[0].formatted);
//               } else {
//                 setAddress('Address not found');
//               }
//             })
//             .catch((error) => {
//               console.error('Error fetching address:', error.message);
//               setAddress('Error fetching address');
//             });
//         },
//         (error) => {
//           alert("please allow location access for your current location")
//           console.error('Error getting location:', error.message);
//         }
//       );
//     } else {
//       console.error('Geolocation is not supported by this browser.');
//     }
//   }, []);
//   const user = useSelector((state) => state.user.user)
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
 
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("")
//   useEffect(() => {
//     if (user) {
//       setName(user.name)
//       setEmail(user.email)
//       setMobileNumber(user.phoneNumber)
//     } else {
//       setName("")
//       setEmail("")
//     }

//     const currentDate = new Date();
//     const day = String(currentDate.getDate()).padStart(2, '0');
//     const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
//     const year = currentDate.getFullYear();
//     const hours = String(currentDate.getHours()).padStart(2, '0');
//     const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    
//     setDate(`${day}-${month}-${year}`);
//     setTime(`${hours}:${minutes}`);
//   }, [user])
//   const food = useSelector((state) => state.foods.food)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (!user) {
//       toast.error("Plzz Login to Place a order")
//       navigate('/signin')
//     }
//     if (quantity > food.quantity)
//       return toast.error("Cannot Provide in this much Quantity")
//     let totalAmount = food.price * quantity
//     const data = {
//       user: user._id,
//       food: food._id,
//       provider: food.provider,
//       quantity,
//       address,
//       time,
//       date,
//       totalAmount
//     }
//     let options = {
//       "key": 'rzp_test_yu67T9aDVZ2U2O',
//       "amount": Number(totalAmount) * 100,
//       "currency": "INR",
//       "name": "TiffinBuddy",
//       "description": "Test Transaction",
//       "image": logo,
//       "handler": function (response) {
//         if (response.razorpay_payment_id) {
//           data.paymentStatus = "Success"
//           dispatch(addOrder(data))
//           toast.success("Order Placed Successfully")
//           navigate('/')
//         } else {
//           toast.error("Unable To Place Order Try Again")
//         }
//       },
//       "prefill": {
//         "name": `${user.name}`,
//         "email": `${user.email}`,
//         "contact": "9999999999"
//       },
//       "notes": {
//         "address": "Razorpay Corporate Office"
//       },
//       "theme": {
//         "color": "#3399cc"
//       }
//     };
//     var rzp1 = new window.Razorpay(options);
//     rzp1.open()
//   }



    

//   return (
//     <div className=''>
//       <form action="" className='flex flex-col gap-2 mb-5' onSubmit={handleSubmit}>
//         <h2 className='font-semibold text-xl text-center md:py-0 py-4'>Order Your Tiffin Know</h2>
//         <div>
//           <label htmlFor="name" className='font-semibold'>Name</label>
//           <div className='flex items-center border bg-white w-full'>
//             <span className='px-2 h-full'><FiUser /></span>
//             <input type="text" value={name} name="name" placeholder='Enter Your Name' className='w-full h-full px-2 py-2 border-l focus:outline-none' id="name" required onChange={(e) => setName(e.target.value)} />
//           </div>
//         </div>
//         <div>
//           <label htmlFor="email" className='font-semibold'>Email</label>
//           <div className='flex items-center border bg-white w-full'>
//             <span className='px-2 h-full'><MdEmail /></span>
//             <input type="text" value={email} name="email" placeholder='Enter Your Email' className='w-full h-full px-2 py-2 border-l focus:outline-none' id="email" required onChange={(e) => setEmail(e.target.value)} />
//           </div>
//         </div>
//         <div>
//           <label htmlFor="phone" className='font-semibold'>Mobile Number</label>
//           <div className='flex items-center border bg-white w-full'>
//             <span className='px-2 h-full'><FiPhone /></span>
//             <input type="tel" value={mobileNumber} name="phone" placeholder='Enter Your Mobile Number' className='w-full h-full px-2 py-2 border-l focus:outline-none' id="phone" required onChange={(e) => setMobileNumber(e.target.value)} />
//           </div>
//         </div>
//         <div>
//           <label htmlFor="quantity" className='font-semibold'>Quantity</label>
//           <div className='flex items-center border bg-white w-full'>
//             <span className='px-2 h-full'><RiIncreaseDecreaseLine /></span>
//             <input type="number" min={1} value={quantity} name="phone" placeholder='Enter Quantity' className='w-full h-full px-2 py-2 border-l focus:outline-none' id="quantity" required onChange={(e) => setQuantity(e.target.value)} />
//           </div>
//         </div>
        
          
          
//         <div className=''>
//           <label htmlFor="address" className='font-semibold'>Address (Allow location access_) </label>
//           <textarea type="time" value={address} name="address" rows={4} placeholder='Enter Your Address' className='w-full h-full px-2 py-2 my-2 border focus:outline-none' id="address" required onChange={(e) => setAddress(e.target.value)} />
//         </div>
//         <div>
//           <input type="submit" value="Order Meal" className='bg-orange-400 text-white rounded px-3 py-2 cursor-pointer w-full' />
//         </div>
//       </form>

//       <div>
//            <AccessTimeIcon color='error'/> If you choose to cancel, you can do it within 60 seconds after placing the order...
//       </div>
//     </div>  

//   )
// }
// export default  MealSubscription;



