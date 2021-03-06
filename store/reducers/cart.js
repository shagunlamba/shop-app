import CartItem from "../../models/cart-item";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/order";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
    items: {},
    totalAmount: 0
}

const cartReducer = (state = initialState, action)=>{
    switch(action.type) {
        case ADD_TO_CART: 
            const addedProduct = action.product;
            const prodPrice= addedProduct.price;
            const prodTitle = addedProduct.title;
            console.log("The id of the prod", addedProduct.id);
            if(state.items[addedProduct.id]){
                //already present in the cart
                const updatedCartItem = new CartItem(state.items[addedProduct.id].quantity + 1, prodPrice, prodTitle, state.items[addedProduct.id].sum + prodPrice);
                return {
                    items: {
                        ...state.items,
                        [addedProduct.id]: updatedCartItem
                    },
                    totalAmount: state.totalAmount + prodPrice
                }
            }
            else{
                //adding item for the first time in the cart   
                const newCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
                return {
                    items: {
                        ...state.items,
                        [addedProduct.id]: newCartItem
                    },
                    totalAmount: state.totalAmount + prodPrice
                }
            }

        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.pid];
            const currentQty = selectedCartItem.quantity;
            if(currentQty>1){
                const updatedCartItem = new CartItem(
                    selectedCartItem.quantity -1,
                    selectedCartItem.productPrice,
                    selectedCartItem.productTitle,
                    selectedCartItem.sum - selectedCartItem.productPrice
                )
              return {
                  ...state,
                  items: {
                      ...state.items,
                      [action.pid]: updatedCartItem
                  },
                  totalAmount: state.totalAmount - selectedCartItem.productPrice
              }
            }
            else{
                const updatedCartItems = { ...state.items };
                delete updatedCartItems[action.pid];
                return {
                  ...state,
                  items: updatedCartItems,
                  totalAmount: state.totalAmount - selectedCartItem.productPrice
                }
            }   
        
        case ADD_ORDER: 
            return initialState;


        case DELETE_PRODUCT: 
            if(!state.items[actiond.pid]){
                return state;
            }
            const updatedItems = {...state.items};
            const itemTotal = state.items[action.pid].sum;
            delete updatedItems[action.pid];
            return {
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount - itemTotal
            }
        default: 
            return state;
    }
}


export default cartReducer;