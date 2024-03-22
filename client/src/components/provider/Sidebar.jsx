import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { providerlogout } from '../../redux/provider/provider.action'

function Sidebar({open,setOpen}) {
  const { pathname } = useLocation()
  const sideLinks = [
    {
      name: "Meals",
      path:'meals',
      isActive: pathname.includes("meals")
    },
    {
      name: "Panding Orders",
      path:'orders',
      isActive: pathname.includes("/orders")
    },
    {
      name: "Completed Orders",
      path:'allorders',
      isActive: pathname.includes("/allorders")
    }
   
  ]
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(providerlogout())
    navigate('/')
  }
  
  return (
    <>
      <div className={`h-full md:w-44 w-52 flex flex-col gap-3 transition-all ease-linear duration-300 items-center py-3 pt-6 px-2 text-white md:fixed md:left-0 absolute z-20 left-0  ${open?'translate-x-0':'md:translate-x-0 -translate-x-full'}`} style={{ background: '#1a2225' }}>
        {sideLinks.map((items, index) => (
          <div className={`${items.isActive ? 'bg-blue-500 text-white rounded-2xl ' : ''} hover:bg-blue-400 rounded-2xl w-full text-center py-1`} key={index}>
             {console.log(items.isActive)}
            <Link to={`/provider/dashboard/${items.path}`} onClick={()=> setOpen(false)} >{items.name}</Link>
          </div>
        ))}
        <button className='flex justify-center items-center cursor-pointer hover:bg-blue-500 rounded-2xl w-full py-1 ' onClick={handleLogout}>
          <span>Logout</span>
        </button>
      </div>
    </>
  )
}

export default Sidebar
