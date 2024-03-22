import React from 'react'
import { Link } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { BsFacebook, BsInstagram, BsTwitter, BsFillTelephoneFill } from 'react-icons/bs';
import logo1 from '../images/name.png'
function Footer() {
  return (
    <footer>
      <div className="py-2 bg-orange-500 sm:grid text-white sm:grid-cols-2 sm:px-4 md:grid md:grid-cols-3 px-5 lg:grid lg:grid-cols-3 mt-2">
        <div className="naem order-1 pt-5 md:pl-7 lg:flex flex-col items-center ">
        {/* <img src={logo1} className='h-8 object-contain' alt="" /> */}
          <h1 className='font-bold text-3xl  md:text-4xl md:pt-1'>Tiffin Buddy</h1>
          <p className='sm:text-xl sm:font-medium px-3 pt-4 text-lg font-normal md:px-0'>Your Everyday Meals</p>
          <p className='sm:text-xl sm:font-medium px-3 text-lg font-normal md:px-0'>Made Convenient</p>
        </div>
        <div className="contactus py-4 order-2  md:py-4 lg:flex flex-col items-center">
          <h1 className="font-bold py-2  text-2xl">Contact Us</h1>
          <ul className='flex flex-col '>
            <li className='px-2 flex gap-2 items-center  text-lg'><MdEmail className=''
            />tester31190@gmail.com</li>
            <li className='px-2 flex gap-1 items-center text-lg'><BsFillTelephoneFill className=''
            />8238133795 / 7016676270</li>
            <li className='px-2 py-3 flex gap-2 items-center  text-lg cursor-pointer'><BsFacebook color="primary" /> <BsInstagram sx={{ color: "pink[500]" }} /> <BsTwitter color="primary" /></li>
          </ul>
        </div>
        <div className="links order-2  md:pt-4 md:pl-5 lg:flex flex-col items-center">
          <ul className='pb-3 '>
            <h1 className='font-bold text-2xl py-2 '>Links</h1>
            <Link to="/"><li className='pl-2 font-medium cursor-pointer hover:text-blue-700'>Home</li></Link>
            <Link to="/providers"><li className='pl-2 font-medium cursor-pointer  hover:text-blue-700'>Tiffin Providers</li></Link>
            <Link to="/registerProvider"><li className='pl-2 font-medium cursor-pointer  hover:text-blue-700'>Provider Registration</li></Link>
            <Link to="/loginProvider"><li className='pl-2 font-medium cursor-pointer  hover:text-blue-700'>Provider Login</li></Link>
            <Link to="/about"><li className='pl-2 font-medium cursor-pointer  hover:text-blue-700'>About</li></Link>
            <Link to="/contact"><li className='pl-2 font-medium cursor-pointer  hover:text-blue-700'>Contact Us</li></Link>

          </ul>
        </div>
        
      </div>
      {/* <div className=" py-4 bg-green-700 text-white">
        <p className='text-normal text-center font-medium sm:text-lg sm:font-serif'>© Copyright 2023-2024 www.tiffnbuddy.com All rights reserved. Developed by Tiffin Buddy</p>
      </div> */}

    </footer>
  )
}

export default Footer;
