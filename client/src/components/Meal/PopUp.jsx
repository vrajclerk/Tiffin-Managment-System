import {  useRef ,useImperativeHandle, forwardRef } from "react";
import{createPortal} from 'react-dom'
import { addToCart, clearCart } from "../../redux/Cart/Cart.reducer";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";


const Example = forwardRef(function Example({childern},ref) {
    let dialoge=useRef()
    let fooditem=useRef()
    const dispatch = useDispatch()
    useImperativeHandle(ref,()=>{

        return{
            open(food){
                fooditem=food
            
                dialoge.current.showModal();
            }
        }
    })

    function handleReplace(fooditem){
        dispatch(clearCart())
        dispatch(addToCart(fooditem))
        toast.success("Tiffin added to the cart!")
        dialoge.current.close()

    }

    return createPortal(
        <dialog ref={dialoge} className="backdrop:bg-stone-900/90 p-4  rounded-md shadow-md ">
        {childern}
        <h1 className="text-md[] font-bold mb-4 text-center">
        You have selected a tiffin from another provider. Would you like to replace this item with the items in your cart?
      </h1>
    
      <div className="flex gap-4">
        <button onClick={()=>{
            handleReplace(fooditem)
        }} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
          Replace
        </button>
        <button onClick={()=>{
            dialoge.current.close()
        }} className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md"  >
          Cancel
        </button>
      </div>
        </dialog>,document.getElementById('modal-root')

    )

})

export default Example