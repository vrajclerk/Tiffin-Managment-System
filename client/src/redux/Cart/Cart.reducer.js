import { createSlice } from "@reduxjs/toolkit";

const storedCart = localStorage.getItem("cart");
const initialState = storedCart ? JSON.parse(storedCart) : { foods: [] };
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
           
             const { name , } = action.payload;
             console.log(action.payload)
            const existingProductIndex = state.foods.findIndex(product => product.name === name);
            
            
          //  const existProvider = localStorage.getItem("provider")
           //  const checkProvider = state.foods.findIndex(product => product.provider.name === existProvider.name);
           //  console.log(checkProvider)
            if (existingProductIndex !== -1) {
                // If product already exists, increment its amount
                // state.foods[existingProductIndex].amount += 1;
                            return { foods: state.foods.map(product => product.name === action.payload.name ? {...product, amount: product.amount + 1} : product)}

            } else {
                // If product doesn't exist, add it to the cart
                
                return { foods: [...state.foods, {...action.payload, amount: 1}]}
            }
        },
        clearCart: () => {
            return { foods: []}
        },
        incrementProductAmount: (state, action) => {
            console.log('increment');
            return { foods: state.foods.map(product => product.name === action.payload.name ? {...product, amount: product.amount + 1} : product)}
        }, decrementProductAmount: (state, action) => {
            // return { products: state.products.map(product => product.name === action.payload.name ? {...product, amount: product.amount - 1} : product)}
            const { name } = action.payload;
            const productToUpdate = state.foods.find(product => product.name === name);
            if (productToUpdate) {
                // If amount becomes 0, remove the product from the cart
                if (productToUpdate.amount === 1) {
                    state.foods = state.foods.filter(product => product.name !== name);
                } else {
                    productToUpdate.amount -= 1;
                }
            }
        
        }
    

        
    }
})

export const cartfoods = state => state.cart.foods

export const {  addToCart, clearCart ,incrementProductAmount,decrementProductAmount} = cartSlice.actions
export const subscribeToCartChanges = (store) => {
    store.subscribe(() => {
      const state = store.getState();
      const serializedCart = JSON.stringify(state.cart);
      localStorage.setItem("cart", serializedCart);
    });
  };

export default cartSlice.reducer;