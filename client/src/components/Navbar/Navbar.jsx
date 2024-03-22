import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ProfileAvatar from './Avatar'
import NavbarMenu from './NavbarMenu'
 import logo1 from '../../images/logo2.png'
import logo from '../../images/logo1.png'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { cartfoods } from '../../redux/Cart/Cart.reducer'

function NavbarLg({ name }) {
  const cart = useSelector(cartfoods)
  const user=useSelector((state)=>state.user.user)
  return (
    <>
      <div className='w-full md:flex hidden justify-between shadow items-center py-3 lg:px-16 md:px-12 sm:px-8 px-2'>
        <Link to="/" className='flex gap-1.5 items-center'>
         <img src={logo1} className='h-[80px] w-500  object-contain  ' alt="" />
         <img src={logo} className='h-[40px] w-500  object-contain  ' alt="" />
        
        
          {/* <h1 className='font-bold text-xl font-mono'>{logo1}</h1> */}
        </Link>
        <ul className='gap-4 flex items-center font-semibold relative'>

        
        <li><Link to="/provider">Tiffin Providers</Link></li>
        
        {user &&   
          <li className='relative'>
            <Link to="/cart"><ShoppingCartIcon className='scale-125' /></Link>
            {cart.length> 0 && (
              <div className="rounded-[50%] h-4 w-4 bg-orange-400 text-sm flex items-center justify-center text-white absolute -top-1 -right-1 p-1">
              <span>{cart.length}</span>
                
              </div>
            )}
          </li>
        }
  
        {name ? <ProfileAvatar name={name} /> : <NavbarMenu />}
      </ul>
      </div>
    </>
  )
}
function NavbarSm({ name }) {
  const cart = useSelector(cartfoods)
  console.log(cart)
  const user=useSelector((state)=>state.user.user)
  return (
    <>
      <div className='flex md:hidden px-4 py-2 shadow justify-between'>
        <Link to="/" className='flex items-center'>
        <img src={logo1} className='h-[70px] w-500  object-contain  ' alt="" />
          <img src={logo} className='h-[40px] object-contain' alt="" />
          
        </Link>
       
       <div className='flex items-center gap-1'>
       <ul>
       {user && 
        
          <li className='relative'>
        <Link to="/cart"><ShoppingCartIcon className='scale-125' /></Link>
        {cart.length> 0 && (
          <div className="rounded-[50%] h-4 w-4 bg-orange-400 text-sm flex items-center justify-center text-white absolute -top-1 -right-1 p-1">
          <span>{cart.length}</span>
            
          </div>
        )}
      </li> }
      </ul>
        {name ? <ProfileAvatar name={name} /> : <NavbarMenu />}
        </div>
      </div>
    </>
  )
}
function Navbar() {
  const user = useSelector((state) => state.user.user);
  return (
    <nav>
      <NavbarLg name={user?.name} />
      <NavbarSm name={user?.name} />
    </nav>
  )
}

export default Navbar
