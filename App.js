import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ShopNavigator from './navigation/ShopNavigator';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/order';
import ReduxThunk from 'redux-thunk';


const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));


const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

export default function App() {

  const [loading, setLoading]= useState(false);
  if(!loading){
    return <AppLoading 
              startAsync={fetchFonts} 
              onFinish={()=> setLoading(true)} 
              onError={(err)=>{console.log("The error", err)}}
              />
  }

  return (
    <Provider store={store}>
          <ShopNavigator />
    </Provider>
  );
}
