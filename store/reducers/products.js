import PRODUCTS from '../../data/dummy-data';
import { DELETE_PRODUCT } from '../actions/products';

const initialState= {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter((prod)=> prod.ownerId ==='u1' )
}


const productsReducer = (state = initialState, action)=> {

    switch(action.type){
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter((product)=>{
                    if(product.id!==action.pid)
                    {   
                        return false;
                    }
                    return true;
                }),
                availableProducts: state.availableProducts.filter((product)=>{
                    if(product.id!==action.pid)
                    {   
                        return false;
                    }
                    return true;
                })
            }

        default:
            return state
    }

}

export default productsReducer;