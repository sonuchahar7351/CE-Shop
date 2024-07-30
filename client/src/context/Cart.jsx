import axios from "axios";
import { useContext, useState, createContext,useEffect  } from "react";

const CartContext=createContext(null);

const CartProvider=({children})=>{
      const [cart,setCart]=useState([]);

      useEffect(()=>{
            let existingCartItem = localStorage.getItem('cart')
            if(existingCartItem) setCart(JSON.parse(existingCartItem));
      },[])

      useEffect(() => {
            localStorage.setItem('cart', JSON.stringify(cart));
        }, [cart]);

      return (
            <CartContext.Provider value={[cart,setCart]}>
                {children}
            </CartContext.Provider>
      )
}

const useCart=()=>useContext(CartContext)
export {useCart, CartProvider}